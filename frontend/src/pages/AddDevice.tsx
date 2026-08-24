import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createDevice,
  type CreateDeviceData,
} from "../api/devices";

function AddDevice() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<CreateDeviceData>({
      name: "",
      serial_number: "",
      location: "",
      status: "online",
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    null
  );

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await createDevice(formData);

      navigate("/");
    } catch (error) {
      console.error(error);

      setError("Failed to create device");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="dashboard">

      <header className="dashboard-header">

        <div>
          <Link to="/">
            ← Back to Dashboard
          </Link>

          <h1>
            Add New Device
          </h1>

          <p>
            Register a new sensor device.
          </p>
        </div>

      </header>


      <section className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">
              Device Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Sensor-02"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="serial_number">
              Serial Number
            </label>

            <input
              id="serial_number"
              name="serial_number"
              type="text"
              placeholder="SN-002"
              value={formData.serial_number}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Room-02"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="status">
                Status
            </label>

            <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="online">
                Online
                </option>

                <option value="offline">
                Offline
                </option>
            </select>
        </div>


          {error && (
            <p className="form-error">
              {error}
            </p>
          )}


          <div className="form-actions">

            <Link
              to="/"
              className="button secondary"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="button primary"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Device"}
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AddDevice;