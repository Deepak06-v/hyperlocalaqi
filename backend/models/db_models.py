from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, Integer, String

from backend.database import Base


class AQIReading(Base):
    __tablename__ = "aqi_readings"

    id = Column(Integer, primary_key=True, index=True)
    ward = Column(String(128), index=True, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True, nullable=False)
    pm25 = Column(Float, nullable=False, default=0.0)
    pm10 = Column(Float, nullable=False, default=0.0)
    no2 = Column(Float, nullable=False, default=0.0)
    so2 = Column(Float, nullable=False, default=0.0)
    co = Column(Float, nullable=False, default=0.0)
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    wind_speed = Column(Float, nullable=True)
    fire_hotspot = Column(Boolean, default=False)
    traffic_density = Column(Float, nullable=True, default=0.0)
    aqi = Column(Float, nullable=False, default=0.0)


class AQIPrediction(Base):
    __tablename__ = "aqi_predictions"

    id = Column(Integer, primary_key=True, index=True)
    ward = Column(String(128), index=True, nullable=False)
    forecast_for = Column(DateTime, index=True, nullable=False)
    predicted_aqi = Column(Float, nullable=False)
    model_name = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class PollutionSourceRecord(Base):
    __tablename__ = "pollution_sources"

    id = Column(Integer, primary_key=True, index=True)
    ward = Column(String(128), index=True, nullable=False)
    detected_at = Column(DateTime, default=datetime.utcnow, index=True, nullable=False)
    predicted_source = Column(String(128), nullable=False)
    confidence = Column(Float, nullable=True)
