import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDevices } from "../api/devices";
import { getReadings } from "../api/readings";

import type { Device } from "../types/device";
import type { SensorReading } from "../types/sensor";

import { connectDashboardWebSocket } from "../services/websocket";

interface LiveDeviceData {
  device: string;
  temperature: number;
  humidity: number;
  battery: number;
}

function Home() {
  const [devices, setDevices] = useState<Device[]>([]);

  const [latestReadings, setLatestReadings] = useState<
    Record<string, SensorReading>
  >({});

  const [liveData, setLiveData] = useState<
    Record<string, LiveDeviceData>
  >({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =====================================
  // Fetch devices + latest readings
  // =====================================

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [deviceData, readingData] =
          await Promise.all([
            getDevices(),
            getReadings(),
          ]);

        setDevices(deviceData);

        const latest: Record<string, SensorReading> = {};

        for (const reading of readingData) {
          const deviceId = String(reading.device);

          if (!latest[deviceId]) {
            latest[deviceId] = reading;
          }
        }

        setLatestReadings(latest);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // =====================================
  // WebSocket
  // =====================================

  useEffect(() => {
    const socket = connectDashboardWebSocket(
      (data) => {
        const sensor = data as LiveDeviceData;

        setLiveData((previous) => ({
          ...previous,
          [sensor.device]: sensor,
        }));
      }
    );

    return () => {
      socket.close();
    };
  }, []);

  // =====================================
  // Loading
  // =====================================

  if (loading) {
    return (
      <main className="dashboard">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  // =====================================
  // Error
  // =====================================

  if (error) {
    return (
      <main className="dashboard">
        <p>{error}</p>
      </main>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <main className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>
            Live Sensor Dashboard
          </h1>

          <p>
            Monitor your devices in real time.
          </p>
        </div>

        <Link
          to="/devices/add"
          className="button primary"
        >
          + Add Device
        </Link>

      </header>


      <section className="devices-section">

        <div className="section-header">

          <h2>
            Devices
          </h2>

          <span>
            {devices.length} device
            {devices.length !== 1 ? "s" : ""}
          </span>

        </div>


        <div className="readings-grid">

          {devices.map((device) => {

            const live = liveData[device.name];

            const latest =
              latestReadings[String(device.id)];

            return (
              <Link
                key={device.id}
                to={`/devices/${device.id}`}
                className="device-link"
              >

                <article className="reading-card">

                  <div className="reading-card-header">

                    <div>

                      <h3>
                        {device.name}
                      </h3>

                      <span>
                        {device.location}
                      </span>

                    </div>


                    <span
                      className={`device-status ${
                        device.status === "online"
                          ? "online"
                          : "offline"
                      }`}
                    >
                      <span className="status-indicator"></span>

                      {device.status === "online"
                        ? "Online"
                        : "Offline"}
                    </span>

                  </div>


                  <div className="reading-values">

                    <div>

                      <span>
                        Temperature
                      </span>

                      <strong>

                        {live
                          ? `${live.temperature}°C`
                          : latest
                            ? `${latest.temperature}°C`
                            : "--"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Humidity
                      </span>

                      <strong>

                        {live
                          ? `${live.humidity}%`
                          : latest
                            ? `${latest.humidity}%`
                            : "--"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Battery
                      </span>

                      <strong>

                        {live
                          ? `${live.battery}%`
                          : latest
                            ? `${latest.battery}%`
                            : "--"}

                      </strong>

                    </div>

                  </div>


                  <div className="reading-source">

                    {live
                      ? "● Live"
                      : latest
                        ? "Last reading"
                        : "No data"}

                  </div>

                </article>

              </Link>
            );
          })}

        </div>

      </section>

    </main>
  );
}

export default Home;