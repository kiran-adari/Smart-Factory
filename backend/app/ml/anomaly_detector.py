import numpy as np
from sklearn.ensemble import IsolationForest

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(
            contamination=0.15,
            random_state=42
        )
        self.is_trained = False
        self.train_initial_model()

    def train_initial_model(self):
        normal_temperature = np.random.normal(loc=30, scale=2, size=300)
        normal_vibration = np.random.normal(loc=0.45, scale=0.12, size=300)

        training_data = np.column_stack(
            (normal_temperature, normal_vibration)
        )

        self.model.fit(training_data)
        self.is_trained = True

    def predict(self, temperature: float, vibration: float):
        input_data = np.array([[temperature, vibration]])

        prediction = self.model.predict(input_data)[0]
        anomaly_score = self.model.decision_function(input_data)[0]

        is_anomaly = prediction == -1

        return {
            "is_anomaly": is_anomaly,
            "anomaly_score": round(float(anomaly_score), 4),
        }

anomaly_detector = AnomalyDetector()