export interface SensorReading {
  id: number;
  temperature: number;
  humidity: number;
  battery: number;
  created_at: string;
  device: number;
}