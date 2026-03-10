# 🚀 Application Running!

## ✅ Servers Status

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:3000 | ✅ Running |
| **Backend API** | http://localhost:8000 | ✅ Running |
| **API Docs** | http://localhost:8000/docs | ✅ Available |

## 📍 Quick Links

1. **Dashboard** → http://localhost:3000
2. **Health Check** → http://localhost:8000/health
3. **API Documentation** → http://localhost:8000/docs (Swagger UI)

## 🎯 Application Features

### Pages Available

1. **AQI Map** - Ward-level air quality heatmap with health advisories
2. **AQI Forecast** - 24-hour air quality predictions
3. **Pollution Source Map** - Detected pollution sources visualization
4. **Admin Panel** - Mitigation recommendations by ward

### API Endpoints

```
GET  /health              - System health status
GET  /aqi/current         - Current AQI readings by ward
GET  /aqi/predict         - 24-hour AQI forecasts
GET  /pollution/source    - Detected pollution sources
GET  /recommendations     - Mitigation recommendations
GET  /docs               - Interactive API documentation
```

## 🔧 Database

- **Type**: SQLite (local development)
- **Location**: `hyperlocal_aqi.db` in project root
- **For Production**: Configure PostgreSQL via `DATABASE_URL` in `.env`

## 📝 Configuration

All settings stored in `.env`:

```env
# Current: SQLite for local development
DATABASE_URL=sqlite:///./hyperlocal_aqi.db

# API Keys (optional, for real data)
CPCB_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
```

## 🛑 To Stop Services

### Backend (Kill Terminal)
```powershell
# Find and press Ctrl+C in the backend terminal
# Or close the terminal running: uvicorn backend.main:app
```

### Frontend (Kill Terminal)
```powershell
# Find and press Ctrl+C in the frontend terminal
# Or close the terminal running: python -m http.server 3000
```

## 🔄 Restart Services

### Start Backend
```powershell
cd "c:\Users\ADMIN\OneDrive\Documents\New project 2"
.\venv\Scripts\python.exe -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

### Start Frontend
```powershell
cd "c:\Users\ADMIN\OneDrive\Documents\New project 2\frontend"
python -m http.server 3000
```

## 📊 Test Data

The application is ready to accept data from:

1. **Manual API calls** - POST sample AQI readings
2. **Data pipeline** - Run `python ml/data_pipeline.py`
3. **CSV upload** - Use training scripts for ML models

## 🎓 Next Steps

1. Visit http://localhost:3000 to see the dashboard
2. Check http://localhost:8000/docs for API documentation
3. To use real data, configure API keys in `.env`:
   - CPCB API: https://cpcb.indiaaqi.in/
   - OpenWeather: https://openweathermap.org/api

## 💾 Data Persistence

- SQLite database: `hyperlocal_aqi.db`
- Trained ML models: `ml/artifacts/`
- Frontend cache: Browser localStorage

Data persists between restarts.

## 🐳 Docker Alternative (When Available)

When Docker is installed and running:

```bash
docker-compose up --build
```

This will:
- Start PostgreSQL database
- Start FastAPI backend
- Serve React frontend
- Everything accessible on configured ports

## ⚙️ Development Notes

- **Backend**: FastAPI with SQLAlchemy ORM
- **Frontend**: React with Leaflet maps and Recharts
- **Auto-reload**: Backend watches for code changes
- **CORS**: Enabled for all origins (configure for production)

---

**Last Updated**: March 2026
**Version**: 1.0.0
