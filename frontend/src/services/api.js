import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const getLatestSensorReading = async () => {
  const response = await axios.get(`${API_BASE_URL}/sensor-readings/latest`);
  return response.data;
};

export const getAlerts = async () => {
  const response = await axios.get(`${API_BASE_URL}/alerts`);
  return response.data;
};