from __future__ import annotations

import argparse
from pathlib import Path

import joblib
import pandas as pd

from ml.train_model import FEATURE_COLUMNS


def load_model(model_path: str):
    path = Path(model_path)
    if not path.exists():
        raise FileNotFoundError(f"Model not found: {model_path}")
    return joblib.load(path)


def predict(csv_path: str, model_path: str):
    frame = pd.read_csv(csv_path)
    model = load_model(model_path)
    frame["predicted_aqi"] = model.predict(frame[FEATURE_COLUMNS])
    return frame[["predicted_aqi"]]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True)
    parser.add_argument("--model", required=True)
    args = parser.parse_args()
    print(predict(args.data, args.model).to_string(index=False))
