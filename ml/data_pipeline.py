from __future__ import annotations

from datetime import datetime
from typing import Dict, Iterable, List

import pandas as pd
import requests
from sqlalchemy import create_engine

from backend.config import settings

POLLUTION_FIELDS = ["pm25", "pm10", "no2", "so2", "co"]
WEATHER_FIELDS = ["temperature", "humidity", "wind_speed"]


class AirQualityDataPipeline:
    def __init__(self, database_url: str | None = None):
        self.database_url = database_url or settings.database_url
        self.engine = create_engine(self.database_url)

    def fetch_pollution_data(self, wards: Iterable[str]) -> pd.DataFrame:
        records: List[Dict] = []
        headers = {"Authorization": f"Bearer {settings.cpcb_api_key}"} if settings.cpcb_api_key else {}
        for ward in wards:
            response = requests.get(
                settings.cpcb_api_url,
                params={"ward": ward},
                headers=headers,
                timeout=30,
            )
            response.raise_for_status()
            payload = response.json()
            for item in payload.get("data", []):
                records.append(
                    {
                        "ward": ward,
                        "timestamp": pd.to_datetime(item.get("timestamp", datetime.utcnow())),
                        "latitude": item.get("latitude"),
                        "longitude": item.get("longitude"),
                        "pm25": item.get("pm25"),
                        "pm10": item.get("pm10"),
                        "no2": item.get("no2"),
                        "so2": item.get("so2"),
                        "co": item.get("co"),
                        "fire_hotspot": bool(item.get("fire_hotspot", False)),
                        "traffic_density": item.get("traffic_density", 0),
                    }
                )
        return pd.DataFrame(records)

    def fetch_weather_data(self, ward_locations: Dict[str, Dict[str, float]]) -> pd.DataFrame:
        records: List[Dict] = []
        for ward, coords in ward_locations.items():
            response = requests.get(
                settings.openweather_api_url,
                params={
                    "lat": coords["latitude"],
                    "lon": coords["longitude"],
                    "appid": settings.openweather_api_key,
                    "units": "metric",
                },
                timeout=30,
            )
            response.raise_for_status()
            payload = response.json()
            records.append(
                {
                    "ward": ward,
                    "timestamp": pd.to_datetime(payload.get("dt", datetime.utcnow()), unit="s"),
                    "temperature": payload.get("main", {}).get("temp"),
                    "humidity": payload.get("main", {}).get("humidity"),
                    "wind_speed": payload.get("wind", {}).get("speed"),
                }
            )
        return pd.DataFrame(records)

    def merge_and_clean(self, pollution_df: pd.DataFrame, weather_df: pd.DataFrame) -> pd.DataFrame:
        if pollution_df.empty:
            return pollution_df
        pollution_df = pollution_df.sort_values("timestamp")
        weather_df = weather_df.sort_values("timestamp")
        merged = pd.merge_asof(
            pollution_df,
            weather_df,
            on="timestamp",
            by="ward",
            direction="nearest",
            tolerance=pd.Timedelta("2h"),
        )
        numeric_columns = POLLUTION_FIELDS + WEATHER_FIELDS + ["traffic_density"]
        merged[numeric_columns] = merged[numeric_columns].apply(pd.to_numeric, errors="coerce")
        merged[numeric_columns] = merged[numeric_columns].ffill().bfill()
        merged["fire_hotspot"] = merged["fire_hotspot"].fillna(False)
        merged["aqi"] = (
            merged["pm25"] * 0.45
            + merged["pm10"] * 0.25
            + merged["no2"] * 0.15
            + merged["so2"] * 0.1
            + merged["co"] * 0.05
        )
        return merged

    def store_processed_data(self, processed_df: pd.DataFrame, table_name: str = "aqi_readings") -> None:
        processed_df.to_sql(table_name, self.engine, if_exists="append", index=False)


if __name__ == "__main__":
    pipeline = AirQualityDataPipeline()
    wards = ["Ward 1", "Ward 2"]
    ward_locations = {
        "Ward 1": {"latitude": 28.6139, "longitude": 77.2090},
        "Ward 2": {"latitude": 28.5355, "longitude": 77.3910},
    }
    pollution = pipeline.fetch_pollution_data(wards)
    weather = pipeline.fetch_weather_data(ward_locations)
    processed = pipeline.merge_and_clean(pollution, weather)
    pipeline.store_processed_data(processed)
