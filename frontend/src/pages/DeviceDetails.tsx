import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getReadings } from "../api/readings";
import type { SensorReading } from "../types/sensor";

function DeviceDetails() {
  const { id } = useParams();

  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReadings() {
      try {
        const data = await getReadings();

        const deviceReadings = data.filter(
          (reading) => String(reading.device) === id
        );

        setReadings(deviceReadings);
      } catch (error) {
        console.error(
          "Failed to fetch readings:",
          error
        );

        setError("Failed to load sensor readings");
      } finally {
        setLoading(false);
      }
    }

    fetchReadings();
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

  return (
    <main className="dashboard">

      <header className="dashboard-header">

        <div>
          <Link to="/">
            ← Back to Dashboard
          </Link>

          <h1>
            Device {id}
          </h1>

          <p>
            Sensor reading history
          </p>
        </div>

      </header>


      <section className="devices-section">

        <div className="section-header">
          <h2>
            Sensor Readings
          </h2>

          <span>
            {readings.length} readings
          </span>
        </div>


        {readings.length === 0 ? (

          <div className="reading-card">
            <p>
              No sensor readings found.
            </p>
          </div>

        ) : (

          <div className="readings-grid">

            {readings.map((reading) => (

              <article
                key={reading.id}
                className="reading-card"
              >

                <div className="reading-card-header">

                  <div>
                    <h3>
                      Device {reading.device}
                    </h3>

                    <span>
                      {new Date(
                        reading.created_at
                      ).toLocaleString()}
                    </span>
                  </div>

                </div>


                <div className="reading-values">

                  <div>
                    <span>
                      Temperature
                    </span>

                    <strong>
                      {reading.temperature}°C
                    </strong>
                  </div>


                  <div>
                    <span>
                      Humidity
                    </span>

                    <strong>
                      {reading.humidity}%
                    </strong>
                  </div>


                  <div>
                    <span>
                      Battery
                    </span>

                    <strong>
                      {reading.battery}%
                    </strong>
                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default DeviceDetails;