from app.db.models import SensorReading
from app.db.models import Alert

from app.services.alert_service import generate_alerts

def create_sensor_reading(db, sensor_data):
    sensor_reading = SensorReading(
        device_id = sensor_data.device_id,
        zone = sensor_data.zone,
        temperature = sensor_data.temperature,
        vibration = sensor_data.vibration
    )

    db.add(sensor_reading)
    db.commit()
    db.refresh(sensor_reading)

    generated_alerts = generate_alerts(sensor_data)

    for alert in generated_alerts:
        alert_row = Alert(
            device_id = sensor_data.device_id,
            zone = sensor_data.zone,
            alert_type = alert["alert_type"],
            message = alert["message"],
            value = alert["value"]
        )

        db.add(alert_row)
    db.commit()

    return sensor_reading