from fastapi import FastAPI

from app.core.config import APP_NAME
from app.core.config import API_PREFIX

from app.db.database import Base
from app.db.database import engine

from fastapi.middleware.cors import CORSMiddleware

import app.db.models

from app.api.routes.sensor_routes import router as sensor_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title=APP_NAME)

app.include_router(
    sensor_router,
    prefix=API_PREFIX
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Smart Factory Backend Running"
    }