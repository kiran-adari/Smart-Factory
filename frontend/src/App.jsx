import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Factory,
  Gauge,
  LayoutDashboard,
  Radio,
  ShieldAlert,
  Thermometer,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getLatestSensorReading, getAlerts } from "./services/api";
import "./App.css";

function App() {
  const [latestReading, setLatestReading] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const latestData = await getLatestSensorReading();
      const alertsData = await getAlerts();

      setLatestReading(latestData);
      setAlerts(alertsData);
      setLastUpdated(new Date().toLocaleTimeString());

      if (latestData && latestData.temperature) {
        setTrendData((prev) => [
          ...prev.slice(-12),
          {
            time: new Date().toLocaleTimeString(),
            temperature: latestData.temperature,
            vibration: latestData.vibration,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 3000);
    return () => clearInterval(interval);
  }, []);

  const criticalAlerts = alerts.filter((a) => a.alert_type === "critical").length;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <Factory size={28} />
          <div>
            <h2>SmartFactory</h2>
            <span>AI + IoT Platform</span>
          </div>
        </div>

        <nav>
          <a className="active"><LayoutDashboard size={18} /> Dashboard</a>
          <a><Cpu size={18} /> Machines</a>
          <a><ShieldAlert size={18} /> Safety</a>
          <a><Activity size={18} /> Analytics</a>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Real-Time Operations Dashboard</h1>
            <p>Live factory telemetry, machine health, and safety monitoring</p>
          </div>

          <div className="live-pill">
            <span className="pulse"></span>
            LIVE
          </div>
        </header>

        <section className="status-row">
          <div className="status-card">
            <Factory />
            <div>
              <p>Factory Status</p>
              <h3>Operational</h3>
            </div>
          </div>

          <div className="status-card">
            <Cpu />
            <div>
              <p>Active Device</p>
              <h3>{latestReading?.device_id || "No device"}</h3>
            </div>
          </div>

          <div className="status-card warning">
            <AlertTriangle />
            <div>
              <p>Critical Alerts</p>
              <h3>{criticalAlerts}</h3>
            </div>
          </div>

          <div className="status-card">
            <Radio />
            <div>
              <p>Last Update</p>
              <h3>{lastUpdated || "--"}</h3>
            </div>
          </div>
        </section>

        <section className="grid-two">
          <div className="panel">
            <div className="panel-header">
              <h2>Live Sensor Telemetry</h2>
              <span>{latestReading?.zone || "No Zone"}</span>
            </div>

            <div className="telemetry-grid">
              <div className="metric-card">
                <Thermometer />
                <p>Temperature</p>
                <h2>{latestReading?.temperature ?? "--"}°C</h2>
              </div>

              <div className="metric-card">
                <Gauge />
                <p>Vibration</p>
                <h2>{latestReading?.vibration ?? "--"}</h2>
              </div>
            </div>

            <div className="machine-card">
              <div>
                <h3>Conveyor Line A</h3>
                <p>Linked Sensor: {latestReading?.device_id || "sensor-1"}</p>
              </div>
              <span className="health-good">Health 87%</span>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Realtime Trends</h2>
              <span>Last 12 samples</span>
            </div>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" hide />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" strokeWidth={2} />
                  <Line type="monotone" dataKey="vibration" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid-two">
          <div className="panel">
            <div className="panel-header">
              <h2>Factory Zones</h2>
              <span>Live zone overview</span>
            </div>

            <div className="zone-map">
              <div className="zone active-zone">Zone A<br />Assembly</div>
              <div className="zone">Zone B<br />Packaging</div>
              <div className="zone danger-zone">Zone C<br />Maintenance</div>
              <div className="zone">Zone D<br />Storage</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Live Alert Feed</h2>
              <span>{alerts.length} recent</span>
            </div>

            <div className="alert-feed">
              {alerts.length === 0 ? (
                <p className="empty">No alerts yet</p>
              ) : (
                alerts.map((alert) => (
                  <div className={`alert-item ${alert.alert_type}`} key={alert.id}>
                    <AlertTriangle size={18} />
                    <div>
                      <h4>
                        {alert.alert_type === "ml_anomaly"
                        ? "ML Anomaly Detection"
                        : alert.alert_type.toUpperCase()}
                      </h4>

                      <p>
                        {alert.message} · {alert.device_id} · {alert.zone} · Score: {alert.value}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;