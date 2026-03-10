from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CurrentAQIResponse(BaseModel):
    ward: str
    timestamp: datetime
    aqi: float
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    advisory: str


class AQIForecastPoint(BaseModel):
    ward: str
    forecast_for: datetime
    predicted_aqi: float
    model_name: str


class PollutionSourceResponse(BaseModel):
    ward: str
    detected_at: datetime
    source: str
    confidence: Optional[float] = None


class RecommendationResponse(BaseModel):
    ward: str
    recommendation: str
    reason: str
