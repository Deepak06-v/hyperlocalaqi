import os
from dataclasses import dataclass


@dataclass
class Settings:
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/hyperlocal_aqi",
    )
    cpcb_api_url: str = os.getenv(
        "CPCB_API_URL",
        "https://api.example-cpcb.in/air-quality",
    )
    cpcb_api_key: str = os.getenv("CPCB_API_KEY", "")
    openweather_api_url: str = os.getenv(
        "OPENWEATHER_API_URL",
        "https://api.openweathermap.org/data/2.5/weather",
    )
    openweather_api_key: str = os.getenv("OPENWEATHER_API_KEY", "")
    aqi_regression_model_path: str = os.getenv(
        "AQI_REGRESSION_MODEL_PATH", "ml/artifacts/aqi_random_forest.joblib"
    )
    aqi_xgb_model_path: str = os.getenv(
        "AQI_XGB_MODEL_PATH", "ml/artifacts/aqi_xgboost.joblib"
    )
    source_classifier_path: str = os.getenv(
        "SOURCE_CLASSIFIER_PATH", "ml/artifacts/source_classifier.joblib"
    )


settings = Settings()
