from __future__ import annotations

import argparse

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor

from ml.utils import build_numeric_preprocessor, calculate_aqi_proxy, compute_rmse, save_model

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


def load_dataset(csv_path: str) -> pd.DataFrame:
    frame = pd.read_csv(csv_path)
    if "aqi" not in frame.columns:
        frame["aqi"] = calculate_aqi_proxy(frame)
    return frame


def build_regression_pipeline(model_name: str) -> Pipeline:
    preprocessor = ColumnTransformer(
        transformers=[("num", build_numeric_preprocessor(), FEATURE_COLUMNS)]
    )
    if model_name == "xgboost":
        model = XGBRegressor(
            n_estimators=300,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.9,
            colsample_bytree=0.9,
            objective="reg:squarederror",
            random_state=42,
        )
    else:
        model = RandomForestRegressor(n_estimators=300, random_state=42)
    return Pipeline(steps=[("preprocessor", preprocessor), ("model", model)])


def train_and_evaluate(csv_path: str):
    dataset = load_dataset(csv_path)
    X = dataset[FEATURE_COLUMNS]
    y = dataset["aqi"]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    results = {}
    for model_name, output_name in [
        ("random_forest", "aqi_random_forest.joblib"),
        ("xgboost", "aqi_xgboost.joblib"),
    ]:
        pipeline = build_regression_pipeline(model_name)
        pipeline.fit(X_train, y_train)
        predictions = pipeline.predict(X_test)
        mae = mean_absolute_error(y_test, predictions)
        rmse = compute_rmse(y_test, predictions)
        save_model(pipeline, output_name)
        results[model_name] = {"mae": round(float(mae), 3), "rmse": round(float(rmse), 3)}
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True, help="Path to processed AQI CSV file")
    args = parser.parse_args()
    metrics = train_and_evaluate(args.data)
    for name, values in metrics.items():
        print(f"{name}: MAE={values['mae']} RMSE={values['rmse']}")
