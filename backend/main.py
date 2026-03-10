from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database import Base, engine
from backend.routes.aqi import router as aqi_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="HyperLocal AQI Dashboard", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aqi_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
