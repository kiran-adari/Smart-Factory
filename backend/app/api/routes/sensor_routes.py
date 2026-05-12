from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import SensorReading
from app.db.models import Alert

from app.schemas.sensor_schema import SensorReadingCreate

from app.services.sensor_service import create_sensor_reading

router = APIRouter()

@router.post("/sensor-readings")
def add_sensor_reading(
        sensor_data: SensorReadingCreate,
        db: Session = Depends(get_db)
):
    reading = create_sensor_reading(db, sensor_data)

    return {
        "message": "Sensor reading stored successfully",
        "reading_id": reading.id
    }

@router.get("/sensor-readings/latest")
def get_latest_readings(db: Session = Depends(get_db)):
    latest = (
        db.query(SensorReading)
        .order_by(SensorReading.id.desc())
        .first()
    )

    if not latest:
        return {}

    return latest

@router.get("/alerts")
def get_alerts(db: Session = Depends(get_db)):
    alerts = (
        db.query(Alert)
        .order_by(Alert.timestamp.desc())
        .limit(10)
        .all()
    )

    return alerts