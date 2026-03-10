# HyperLocal AQI Dashboard - Setup Guide

## Prerequisites

- Docker and Docker Compose (for containerized deployment)
- Python 3.11+ (for local backend development)
- Node.js 20+ (for frontend development)
- PostgreSQL 16 (if running without Docker)

## Quick Start with Docker

```bash
# Clone/navigate to project directory
cd "path/to/New project 2"

# Ensure .env file exists (already created)
ls -la .env

# Build and start all services
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Local Development Setup

### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start PostgreSQL (ensure it's running on localhost:5432)
# On Windows, use pgAdmin or start PostgreSQL service

# Run migrations (creates tables)
python -c "from backend.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Start backend server
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Or for production build:
npm start
```

## API Endpoints

- `GET /health` - Health check
- `GET /aqi/current` - Get current AQI readings by ward
- `GET /aqi/predict` - Get 24-hour AQI predictions
- `GET /pollution/source` - Get detected pollution sources
- `GET /recommendations` - Get mitigation recommendations
- `GET /docs` - Interactive API documentation (Swagger UI)

## Configuration

### Environment Variables

Key configuration in `.env`:

```env
# Database
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

**Note**: Replace API keys with your actual credentials from:
- CPCB: https://cpcb.indiaaqi.in/
- OpenWeather: https://openweathermap.org/api

## Data Pipeline

### Training ML Models

```bash
# Place your training data in CSV format
# Required columns: pm25, pm10, no2, so2, co, temperature, humidity, wind_speed, aqi

# Train AQI prediction models
python ml/train_model.py --data path/to/training_data.csv

# Train pollution source classifier
python ml/source_detection.py --data path/to/source_labeled_data.csv

# Detect hotspots
python ml/hotspot_detection.py --data path/to/aqi_data.csv
```

### Data Ingestion

```bash
# Run the data pipeline to fetch and store data
python -m ml.data_pipeline
```

## Project Structure

```
.
├── backend/              # FastAPI backend
│   ├── routes/          # API endpoint definitions
│   ├── services/        # Business logic (ML, recommendations)
│   ├── models/          # SQLAlchemy database models
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── config.py        # Environment configuration
│   ├── database.py      # Database setup
│   └── main.py          # FastAPI app entrypoint
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── App.js       # Root app component
│   │   └── index.js     # React entry point
│   ├── index.html       # HTML template
│   └── package.json     # Frontend dependencies
├── ml/                  # Machine learning pipelines
│   ├── train_model.py   # AQI prediction model training
│   ├── source_detection.py  # Pollution source classification
│   ├── hotspot_detection.py # Spatial hotspot detection
│   ├── data_pipeline.py # Data ingestion and processing
│   ├── utils.py         # ML utilities
│   └── artifacts/       # Trained model storage
├── docker/              # Docker configuration
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
├── docker-compose.yml   # Multi-container orchestration
├── .env                 # Environment variables
└── README.md            # Project overview
```

## Features

### Real-time AQI Monitoring
- Ward-level air quality readings
- Multiple pollutant tracking (PM2.5, PM10, NO2, SO2, CO)
- Health advisories based on AQI levels

### 24-hour Forecasting
- Machine learning-based AQI predictions
- Support for multiple forecasting models (Random Forest, XGBoost)
- Historical prediction tracking

### Pollution Source Detection
- Automated source classification (traffic, industrial, construction, biomass)
- Confidence scores for each detection
- Spatial visualization on interactive maps

### Mitigation Recommendations
- Data-driven policy recommendations
- Ward-specific action items
- Evidence-based justifications

### Fire Hotspot Detection
- Real-time biomass burning alerts
- Traffic density correlation
- Industrial emission tracking

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify POSTGRES_HOST is correct (use `postgres` for Docker, `localhost` for local)

### API Connection Errors
- Check CPCB_API_URL and OPENWEATHER_API_URL
- Verify API keys are valid
- Check network connectivity

### Frontend can't connect to backend
- Verify backend is running on port 8000
- Check CORS middleware is enabled
- Look at browser console for detailed errors

### Model loading issues
- Ensure ML artifacts exist in ml/artifacts/
- Check model paths in .env match actual files
- If models missing, train them using train_model.py

## Performance Notes

- Initial AQI data load depends on API response times
- ML predictions are cached in database to avoid repeated computation
- Frontend uses React for efficient UI updates
- Database queries are optimized with indexes on ward and timestamp

## Security Considerations

- Change default PostgreSQL password in production
- Use environment-specific API keys via .env
- Enable HTTPS in production
- Implement authentication/authorization as needed
- Validate and sanitize all external API inputs
