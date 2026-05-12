from pydantic import BaseModel

class SensorReadingCreate(BaseModel):
    device_id: str
    zone: str
    temperature: float
    vibration: float