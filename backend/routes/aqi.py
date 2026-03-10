from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models.db_models import AQIReading
from backend.schemas import AQIForecastPoint, CurrentAQIResponse, PollutionSourceResponse, RecommendationResponse
from backend.services.advisory import get_health_advisory
from backend.services.ml_service import detect_pollution_sources, persist_predictions, persist_sources, predict_next_24_hours
from backend.services.recommendation_engine import build_recommendation

router = APIRouter()


@router.get("/aqi/current", response_model=List[CurrentAQIResponse])
def get_current_aqi(db: Session = Depends(get_db)):
    rows = db.query(AQIReading).order_by(AQIReading.ward.asc(), AQIReading.timestamp.desc()).all()
    latest_by_ward = {}
    for row in rows:
        latest_by_ward.setdefault(row.ward, row)
    return [
        CurrentAQIResponse(
            ward=row.ward,
            timestamp=row.timestamp,
            aqi=row.aqi,
            pm25=row.pm25,
            pm10=row.pm10,
            no2=row.no2,
            so2=row.so2,
            co=row.co,
            latitude=row.latitude,
            longitude=row.longitude,
            advisory=get_health_advisory(row.aqi),
        )
        for row in latest_by_ward.values()
    ]


@router.get("/aqi/predict", response_model=List[AQIForecastPoint])
def get_aqi_prediction(db: Session = Depends(get_db)):
    try:
        forecasts = predict_next_24_hours(db)
        persist_predictions(db, forecasts)
        return [AQIForecastPoint(**item) for item in forecasts]
    except Exception as e:
        print(f"Error in get_aqi_prediction: {str(e)}")
        import traceback
        traceback.print_exc()
        # Return empty list as fallback
        return []


@router.get("/pollution/source", response_model=List[PollutionSourceResponse])
def get_pollution_source(db: Session = Depends(get_db)):
    try:
        sources = detect_pollution_sources(db)
        persist_sources(db, sources)
        return [
            PollutionSourceResponse(
                ward=item["ward"],
                detected_at=item["detected_at"],
                source=item["source"],
                confidence=item.get("confidence"),
            )
            for item in sources
        ]
    except Exception as e:
        print(f"Error in get_pollution_source: {str(e)}")
        import traceback
        traceback.print_exc()
        # Return empty list as fallback
        return []


@router.get("/recommendations", response_model=List[RecommendationResponse])
def get_recommendations(db: Session = Depends(get_db)):
    rows = db.query(AQIReading).order_by(AQIReading.ward.asc(), AQIReading.timestamp.desc()).all()
    latest_by_ward = {}
    for row in rows:
        latest_by_ward.setdefault(row.ward, row)
    recommendations = []
    for row in latest_by_ward.values():
        recommendations.append(
            RecommendationResponse(
                **build_recommendation(
                    {
                        "ward": row.ward,
                        "pm10": row.pm10,
                        "no2": row.no2,
                        "so2": row.so2,
                        "fire_hotspot": row.fire_hotspot,
                    }
                )
            )
        )
    return recommendations
