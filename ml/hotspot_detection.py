from __future__ import annotations

import argparse

import pandas as pd
from sklearn.cluster import DBSCAN


def detect_hotspots(csv_path: str, eps: float = 0.01, min_samples: int = 3) -> pd.DataFrame:
    frame = pd.read_csv(csv_path)
    features = frame[["latitude", "longitude", "pm25"]]
    clustering = DBSCAN(eps=eps, min_samples=min_samples)
    frame["cluster_id"] = clustering.fit_predict(features)
    clusters = (
        frame[frame["cluster_id"] >= 0]
        .groupby("cluster_id")
        .agg(
            size=("cluster_id", "count"),
            avg_pm25=("pm25", "mean"),
            center_latitude=("latitude", "mean"),
            center_longitude=("longitude", "mean"),
        )
        .reset_index()
    )
    return clusters


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True)
    args = parser.parse_args()
    print(detect_hotspots(args.data).to_string(index=False))
