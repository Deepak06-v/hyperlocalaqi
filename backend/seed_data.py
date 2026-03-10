"""
Seed script to populate the database with sample data.
Run this from the project root: python -m backend.seed_data
"""
from datetime import datetime, timedelta
from backend.database import SessionLocal, Base, engine
from backend.models.db_models import AQIReading, AQIPrediction, PollutionSourceRecord

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear existing data
db.query(AQIReading).delete()
db.query(AQIPrediction).delete()
db.query(PollutionSourceRecord).delete()
db.commit()

# Sample ward locations in Delhi
WARDS = [
    {"name": "Ward 1 - Chandni Chowk", "lat": 28.6505, "lon": 77.2303},
    {"name": "Ward 2 - New Delhi", "lat": 28.5921, "lon": 77.2046},
    {"name": "Ward 3 - South Delhi", "lat": 28.5244, "lon": 77.1855},
    {"name": "Ward 4 - East Delhi", "lat": 28.5841, "lon": 77.2994},
    {"name": "Ward 5 - West Delhi", "lat": 28.6162, "lon": 77.0308},
    {"name": "Ward 6 - Noida", "lat": 28.5355, "lon": 77.3910},
]

# Add sample AQI readings
now = datetime.utcnow()
for ward in WARDS:
    reading = AQIReading(
        ward=ward["name"],
        latitude=ward["lat"],
        longitude=ward["lon"],
        timestamp=now,
        pm25=45.5,
        pm10=78.2,
        no2=38.5,
        so2=12.3,
        co=0.8,
        temperature=28.5,
        humidity=65,
        wind_speed=4.2,
        fire_hotspot=False,
        traffic_density=0.7,
        aqi=85,
    )
    db.add(reading)

db.commit()

# Add sample AQI predictions for next 24 hours
current_time = now
for i in range(24):
    for ward in WARDS:
        prediction = AQIPrediction(
            ward=ward["name"],
            forecast_for=current_time + timedelta(hours=i),
            predicted_aqi=82 + (i % 5),
            model_name="LSTM",
        )
        db.add(prediction)

db.commit()

# Add sample pollution source data
sources = ["traffic_emissions", "industrial_pollution", "construction_dust", "biomass_burning"]
for idx, ward in enumerate(WARDS):
    source = PollutionSourceRecord(
        ward=ward["name"],
        detected_at=now,
        predicted_source=sources[idx % len(sources)],
        confidence=0.85,
    )
    db.add(source)

db.commit()

print("✅ Database seeded with sample data!")
print(f"Added {len(WARDS)} wards with AQI readings, predictions, and sources")

db.close()
