# HyperLocal-AQI-Dashboard

Full-stack hyperlocal AQI monitoring platform with FastAPI, React, PostgreSQL, and Python ML pipelines.

## Structure

- `backend/`: FastAPI API, SQLAlchemy models, and application services
- `ml/`: ingestion, training, forecasting, source detection, and hotspot analysis
- `frontend/`: React dashboard for AQI maps, forecasts, and admin workflows
- `docker/`: Dockerfiles for local orchestration

## Quick start

1. Copy `.env.example` to `.env`
2. Add CPCB and OpenWeather credentials
3. Run `docker-compose up --build`
