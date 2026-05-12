# Smart Factory 

A real-time industrial monitoring platform that combines IoT telemetry, machine learning anomaly detection, FastAPI backend services, PostgreSQL database management, and a React-based industrial dashboard.

---

# Features

- Real-time machine telemetry monitoring
- Temperature and vibration tracking
- Machine learning anomaly detection
- Industrial-style dashboard UI
- PostgreSQL database integration
- FastAPI REST APIs
- React frontend with live visualization
- Alert management system
- Factory zone monitoring

---

# Tech Stack

## Backend
- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Scikit-learn

## Frontend
- React
- Vite
- Axios
- Recharts
- Lucide React

## Machine Learning
- Isolation Forest
- Unsupervised anomaly detection

---

# System Architecture

```text
Sensors
   ↓
FastAPI Backend
   ↓
Machine Learning Layer
   ↓
PostgreSQL Database
   ↓
React Dashboard
```

---

# Machine Learning

The platform uses an Isolation Forest anomaly detection model to identify abnormal machine telemetry patterns.

Features used:
- Temperature
- Vibration

The ML system predicts:
- Normal behavior
- Anomalous behavior

---

# Dashboard

The dashboard includes:
- Live telemetry
- Factory status
- Machine health
- Trend visualization
- Alert feed
- ML anomaly alerts

---

# Project Structure

```text
smart_factory/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# Backend Setup

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger API docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Example Sensor Reading

```json
{
  "device_id": "sensor-1",
  "zone": "Zone-A",
  "temperature": 39.5,
  "vibration": 0.87
}
```

---

# Future Improvements

- WebSocket realtime streaming
- MQTT/Kafka integration
- Predictive maintenance
- Computer vision safety monitoring
- Docker deployment
- Cloud deployment
- Time-series forecasting

---

# Author

Kiran Adari  
NetID: ka988  
Rutgers University  
16:198:536:01 MACHINE LEARNING
