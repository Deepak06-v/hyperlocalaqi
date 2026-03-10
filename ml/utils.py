from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


def ensure_artifact_dir() -> Path:
    path = Path("ml/artifacts")
    path.mkdir(parents=True, exist_ok=True)
    return path


def save_model(model, filename: str) -> Path:
    artifact_dir = ensure_artifact_dir()
    path = artifact_dir / filename
    joblib.dump(model, path)
    return path


def build_numeric_preprocessor():
    return Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )


def calculate_aqi_proxy(frame: pd.DataFrame) -> pd.Series:
    return (
        frame["pm25"] * 0.45
        + frame["pm10"] * 0.25
        + frame["no2"] * 0.15
        + frame["so2"] * 0.1
        + frame["co"] * 0.05
    ).clip(lower=0)


def compute_rmse(y_true, y_pred) -> float:
    return float(np.sqrt(np.mean((np.array(y_true) - np.array(y_pred)) ** 2)))
