import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connectDashboardWebSocket } from "../services/websocket";

interface LiveDeviceData {
  device_id: number;
  device: string;
  temperature: number;
  humidity: number;
  battery: number;
}
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getReadings } from "../api/readings";
import type { SensorReading } from "../types/sensor";

function DeviceDetails() {
  const { id } = useParams();

  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveReading, setLiveReading] =
  useState<LiveDeviceData | null>(null);

  useEffect(() => {
    async function fetchReadings() {
      try {
        const data = await getReadings();

        const deviceReadings = data
          .filter(
            (reading) =>
              String(reading.device) === id
          )
          .reverse();

        setReadings(deviceReadings);
      } catch (error) {
        console.error(
          "Failed to fetch readings:",
          error
        );

        setError(
          "Failed to load sensor readings"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchReadings();
  }, [id]);

useEffect(() => {
  const socket = connectDashboardWebSocket(
    (data) => {
      const sensor = data as LiveDeviceData;

      console.log(
        "DEVICE DETAILS LIVE DATA:",
        sensor
      );

      if (String(sensor.device_id) === id) {
        setLiveReading(sensor);
      }
    }
  );

  return () => {
    socket.close();
  };
}, [id]);

  if (loading) {
    return (
      <main className="dashboard">
        <p>Loading sensor readings...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard">
        <p>{error}</p>
      </main>
    );
  }

    const historicalChartData = readings.map(
    (reading) => ({
        time: new Date(
        reading.created_at
        ).toLocaleTimeString(),

        temperature: reading.temperature,
        humidity: reading.humidity,
        battery: reading.battery,
    })
    );

    const chartData = liveReading
    ? [
        ...historicalChartData,
        {
            time: new Date().toLocaleTimeString(),

            temperature: liveReading.temperature,

            humidity: liveReading.humidity,

            battery: liveReading.battery,
        },
        ]
    : historicalChartData;

  const latest =
  readings[readings.length - 1];

    const currentTemperature =
    liveReading?.temperature ??
    latest?.temperature;

    const currentHumidity =
    liveReading?.humidity ??
    latest?.humidity;

    const currentBattery =
    liveReading?.battery ??
    latest?.battery;

  return (
    <main className="dashboard">

      {/* =========================
          Header
      ========================== */}

      <header className="dashboard-header">

        <div>

          <Link to="/">
            ← Back to Dashboard
          </Link>

          <h1>
            Device {id}
          </h1>

          <p>
            Sensor monitoring and history
          </p>

        </div>

      </header>


      {/* =========================
          Current Reading
      ========================== */}

      {(liveReading || latest) && (
  <section className="current-reading">

    <div className="current-reading-header">

      <div>
        <span className="current-label">
          Current Reading
        </span>

        <h2>
          Device {id}
        </h2>
      </div>

      <span
        className={`reading-live-status ${
          liveReading
            ? "live"
            : "last"
        }`}
      >
        <span className="status-indicator"></span>

        {liveReading
          ? "Live"
          : "Last reading"}
      </span>

    </div>


    <div className="current-reading-values">

      <div className="current-reading-card">

        <span>
          Temperature
        </span>

        <strong>
          {currentTemperature !== undefined
            ? `${currentTemperature}°C`
            : "--"}
        </strong>

      </div>


      <div className="current-reading-card">

        <span>
          Humidity
        </span>

        <strong>
          {currentHumidity !== undefined
            ? `${currentHumidity}%`
            : "--"}
        </strong>

      </div>


      <div className="current-reading-card">

        <span>
          Battery
        </span>

        <strong>
          {currentBattery !== undefined
            ? `${currentBattery}%`
            : "--"}
        </strong>

      </div>

    </div>

  </section>
)}


      {/* =========================
          Charts
      ========================== */}

      {readings.length > 0 ? (

        <section className="charts-section">

          {/* Temperature */}

          <div className="chart-card">

            <div className="chart-header">

              <h2>
                Temperature
              </h2>

              <span>
                °C
              </span>

            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={chartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="time"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>


          {/* Humidity */}

          <div className="chart-card">

            <div className="chart-header">

              <h2>
                Humidity
              </h2>

              <span>
                %
              </span>

            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={chartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="time"
                />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>


          {/* Battery */}

          <div className="chart-card">

            <div className="chart-header">

              <h2>
                Battery
              </h2>

              <span>
                %
              </span>

            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={chartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="time"
                />

                <YAxis
                  domain={[0, 100]}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="battery"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

        </section>

      ) : (

        <div className="reading-card">

          <p>
            No sensor readings found.
          </p>

        </div>

      )}


      {/* =========================
          Reading History
      ========================== */}

      <section className="history-section">

        <div className="section-header">

          <h2>
            Reading History
          </h2>

          <span>
            {readings.length} readings
          </span>

        </div>


        {readings.length > 0 ? (

          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>

                <tr>
                  <th>Time</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Battery</th>
                </tr>

              </thead>

              <tbody>

                {[...readings]
                  .reverse()
                  .map((reading) => (

                    <tr key={reading.id}>

                      <td>
                        {new Date(
                          reading.created_at
                        ).toLocaleString()}
                      </td>

                      <td>
                        {reading.temperature}°C
                      </td>

                      <td>
                        {reading.humidity}%
                      </td>

                      <td>
                        {reading.battery}%
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        ) : null}

      </section>

    </main>
  );
}

export default DeviceDetails;