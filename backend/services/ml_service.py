from __future__ import annotations

from datetime import timedelta
from pathlib import Path
from typing import Dict, List

import joblib
import numpy as np
import pandas as pd
from sqlalchemy import desc
from sqlalchemy.orm import Session

from backend.config import settings
from backend.models.db_models import AQIReading, AQIPrediction, PollutionSourceRecord

FEATURE_COLUMNS = [
    "pm25",
    "pm10",
    "no2",
    "so2",
    "co",
    "temperature",
    "humidity",
    "wind_speed",
]

SOURCE_FEATURE_COLUMNS = [
    "pm25",
    "pm10",
    "no2",
    "so2",
    "fire_hotspot",
    "traffic_density",
]


def _load_model(path: str):
    file_path = Path(path)
    if not file_path.exists():
        return None
    return joblib.load(file_path)


def _latest_readings(db: Session) -> List[AQIReading]:
    rows = db.query(AQIReading).order_by(AQIReading.ward.asc(), AQIReading.timestamp.desc()).all()
    latest_by_ward = {}
    for row in rows:
        latest_by_ward.setdefault(row.ward, row)
    return list(latest_by_ward.values())


def predict_next_24_hours(db: Session) -> List[Dict]:
    model = _load_model(settings.aqi_xgb_model_path) or _load_model(settings.aqi_regression_model_path)
    model_name = "xgboost" if Path(settings.aqi_xgb_model_path).exists() else "random_forest"
    outputs: List[Dict] = []

    for reading in _latest_readings(db):
        base_vector = pd.DataFrame(
            [{
                "pm25": reading.pm25,
                "pm10": reading.pm10,
                "no2": reading.no2,
                "so2": reading.so2,
                "co": reading.co,
                "temperature": reading.temperature or 0.0,
                "humidity": reading.humidity or 0.0,
                "wind_speed": reading.wind_speed or 0.0,
            }]
        )
        for hour in range(1, 25):
            vector = base_vector.copy()
            vector["wind_speed"] = vector["wind_speed"] + (hour * 0.02)
            vector["humidity"] = np.clip(vector["humidity"] + (hour * 0.1), 0, 100)
            if model is not None:
                predicted = float(model.predict(vector[FEATURE_COLUMNS])[0])
            else:
                predicted = max(
                    0.0,
                    0.45 * reading.pm25
                    + 0.25 * reading.pm10
                    + 0.15 * reading.no2
                    + 0.1 * reading.so2
                    + 0.05 * reading.co
                    - 0.2 * (reading.wind_speed or 0.0),
                )
            outputs.append(
                {
                    "ward": reading.ward,
                    "forecast_for": reading.timestamp + timedelta(hours=hour),
                    "predicted_aqi": round(predicted, 2),
                    "model_name": model_name,
                }
            )
    return outputs


def detect_pollution_sources(db: Session) -> List[Dict]:
    classifier = _load_model(settings.source_classifier_path)
    labels = []
    for reading in _latest_readings(db):
        feature_row = pd.DataFrame(
            [{
                "pm25": reading.pm25,
                "pm10": reading.pm10,
                "no2": reading.no2,
                "so2": reading.so2,
                "fire_hotspot": int(reading.fire_hotspot),
                "traffic_density": reading.traffic_density or 0.0,
            }]
        )
        if classifier is not None:
            source = str(classifier.predict(feature_row[SOURCE_FEATURE_COLUMNS])[0])
            confidence = (
                float(np.max(classifier.predict_proba(feature_row[SOURCE_FEATURE_COLUMNS])[0]))
                if hasattr(classifier, "predict_proba")
                else None
            )
        else:
            source, confidence = _rule_based_source(reading)
        labels.append(
            {
                "ward": reading.ward,
                "detected_at": reading.timestamp,
                "source": source,
                "confidence": confidence,
            }
        )
    return labels


def _rule_based_source(reading: AQIReading):
    if reading.fire_hotspot:
        return "biomass_burning", 0.82
    if reading.no2 >= 120:
        return "traffic_emissions", 0.76
    if reading.so2 >= 80:
        return "industrial_pollution", 0.74
    return "construction_dust", 0.68


def persist_predictions(db: Session, forecasts: List[Dict]) -> None:
    db.query(AQIPrediction).delete()
    for item in forecasts:
        db.add(AQIPrediction(**item))
    db.commit()


def persist_sources(db: Session, sources: List[Dict]) -> None:
    db.query(PollutionSourceRecord).delete()
    for item in sources:
        db.add(PollutionSourceRecord(
            ward=item["ward"],
            detected_at=item["detected_at"],
            predicted_source=item["source"],
            confidence=item["confidence"],
        ))
    db.commit()
