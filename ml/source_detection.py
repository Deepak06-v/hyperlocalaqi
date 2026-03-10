from __future__ import annotations

import argparse
from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

from ml.utils import build_numeric_preprocessor, save_model

FEATURE_COLUMNS = [
    "pm25",
    "pm10",
    "no2",
    "so2",
    "fire_hotspot",
    "traffic_density",
]
TARGET_COLUMN = "pollution_source"


def build_classifier() -> Pipeline:
    preprocessor = ColumnTransformer(
        transformers=[("num", build_numeric_preprocessor(), FEATURE_COLUMNS)]
    )
    classifier = RandomForestClassifier(n_estimators=250, random_state=42)
    return Pipeline(steps=[("preprocessor", preprocessor), ("model", classifier)])


def train_classifier(csv_path: str):
    dataset = pd.read_csv(csv_path)
    X = dataset[FEATURE_COLUMNS]
    y = dataset[TARGET_COLUMN]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    pipeline = build_classifier()
    pipeline.fit(X_train, y_train)
    predictions = pipeline.predict(X_test)
    save_model(pipeline, "source_classifier.joblib")
    return classification_report(y_test, predictions)


def predict_source(model_path: str, sample: dict) -> str:
    path = Path(model_path)
    model = joblib.load(path)
    frame = pd.DataFrame([sample])
    return str(model.predict(frame[FEATURE_COLUMNS])[0])


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True, help="CSV with labeled pollution source data")
    args = parser.parse_args()
    print(train_classifier(args.data))
