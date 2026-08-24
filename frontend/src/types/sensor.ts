export interface SensorReading {
  id: number;
  device: string;
  temperature: number;
  humidity: number;
  battery: number;
  created_at: string;
}