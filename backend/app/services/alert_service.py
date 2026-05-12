from app.ml.anomaly_detector import anomaly_detector


def generate_alerts(sensor_data):
    alerts = []

    if sensor_data.temperature > 35:
        alerts.append({
            "alert_type": "warning",
            "message": f"High temperature detected in {sensor_data.zone}",
            "value": sensor_data.temperature
        })

    if sensor_data.vibration > 0.8:
        alerts.append({
            "alert_type": "critical",
            "message": f"High vibration detected in {sensor_data.zone}",
            "value": sensor_data.vibration
        })

    ml_result = anomaly_detector.predict(
        temperature=sensor_data.temperature,
        vibration=sensor_data.vibration
    )

    if ml_result["is_anomaly"]:
        alerts.append({
            "alert_type": "ml_anomaly",
            "message": f"ML anomaly detected in {sensor_data.zone}",
            "value": ml_result["anomaly_score"]
        })

    return alerts