import type { SensorReading } from "../types/sensor";

const API_BASE_URL = "http://localhost:8000";

export async function getReadings(): Promise<SensorReading[]> {
  const response = await fetch(`${API_BASE_URL}/api/readings/`);

  if (!response.ok) {
    throw new Error("Failed to fetch sensor readings");
  }

  return response.json();
}