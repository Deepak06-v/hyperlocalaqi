# HyperLocal AQI Dashboard

A full-stack hyperlocal air quality monitoring platform that provides real-time AQI readings, 24-hour forecasts, pollution source detection, and intelligent mitigation recommendations. Built with FastAPI, React, PostgreSQL, and advanced Python ML pipelines.

## 🎯 Features

- **Real-Time AQI Monitoring**: Ward-level air quality heatmaps with live data visualization
- **24-Hour Forecasting**: ML-powered AQI predictions using Random Forest and XGBoost models
- **Pollution Source Detection**: Identify and map detected pollution sources using classification
- **Hotspot Analysis**: Spatial clustering and detection of air quality hotspots
- **Health Advisories**: Data-driven health recommendations based on current AQI levels
- **Admin Dashboard**: Mitigation recommendations for policymakers by ward
- **Interactive API**: Comprehensive REST API with Swagger UI documentation

## 🏗️ Architecture

```
HyperLocal-AQI-Dashboard/
├── backend/              # FastAPI REST API server
│   ├── main.py          # Flask app entry point
│   ├── config.py        # Environment configuration
│   ├── database.py      # SQLAlchemy ORM setup
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── models/          # Database models (AQIReading, AQIPrediction, etc.)
│   ├── routes/          # API endpoints
│   └── services/        # Business logic (ML inference, recommendations)
├── frontend/            # React web dashboard
│   └── src/
│       ├── components/  # Reusable UI components (MapCard, NavBar, API client)
│       └── pages/       # Page components (AQIMapPage, ForecastPage, etc.)
├── ml/                  # Machine learning pipelines
│   ├── train_model.py   # Model training (Random Forest, XGBoost)
│   ├── predict_aqi.py   # Batch AQI predictions
│   ├── source_detection.py  # Pollution source classification
│   ├── hotspot_detection.py # DBSCAN spatial clustering
│   ├── data_pipeline.py # Data ingestion and preprocessing
│   └── artifacts/       # Trained ML models
├── docker/              # Docker configuration
└── docker-compose.yml   # Multi-container orchestration
```

## 🚀 Quick Start with Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- `.env` file with API credentials (CPCB, OpenWeather)

### Steps

```bash
# Navigate to project directory
cd "New project 2"

# Build and start all services
docker-compose up --build
```

The application will be available at:
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 💻 Local Development Setup

### Prerequisites
- Python 3.11+ (for backend)
- Node.js 20+ (for frontend)
- PostgreSQL 16 (optional, SQLite used for local development)

### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
.\venv\Scripts\activate
# Or on macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start backend server
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | System health check |
| GET | `/aqi/current` | Current AQI readings by ward |
| GET | `/aqi/predict` | 24-hour AQI forecasts |
| GET | `/pollution/source` | Detected pollution sources |
| GET | `/recommendations` | Mitigation recommendations by ward |
| GET | `/docs` | Interactive Swagger UI documentation |

## 🔧 Configuration

All environment variables are stored in `.env`:

```env
# Database (PostgreSQL for production, SQLite for development)
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/hyperlocal_aqi
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# External APIs
CPCB_API_URL=https://api.example-cpcb.in/air-quality
CPCB_API_KEY=your_api_key
OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
OPENWEATHER_API_KEY=your_api_key

# ML Models
AQI_REGRESSION_MODEL_PATH=ml/artifacts/aqi_random_forest.joblib
AQI_XGB_MODEL_PATH=ml/artifacts/aqi_xgboost.joblib
SOURCE_CLASSIFIER_PATH=ml/artifacts/source_classifier.joblib
```

## 📊 Database Models

- **AQIReading**: Current air quality measurements by ward
- **AQIPrediction**: 24-hour AQI forecasts
- **PollutionSourceRecord**: Detected pollution sources with locations
- **HealthAdvisory**: Action recommendations based on AQI levels

## 🤖 Machine Learning Pipeline

The `ml/` directory contains:

- **train_model.py**: Trains Random Forest and XGBoost models for AQI prediction
- **source_detection.py**: Trains classifier to identify pollution sources
- **hotspot_detection.py**: Uses DBSCAN for spatial hotspot detection
- **predict_aqi.py**: Batch prediction script for generating forecasts
- **data_pipeline.py**: Data ingestion from CPCB and OpenWeather APIs

## 📖 Additional Documentation

- [Quick Start Guide](QUICK_START.md) - Step-by-step startup instructions
- [Setup Guide](SETUP.md) - Detailed configuration and prerequisites
- [Running Guide](RUNNING.md) - Application status and features
- [Project Checklist](PROJECT_CHECKLIST.md) - Implementation status
