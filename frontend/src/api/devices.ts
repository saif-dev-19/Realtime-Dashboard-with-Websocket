import type { Device } from "../types/device";

const API_BASE_URL = "http://localhost";

export async function getDevices(): Promise<Device[]> {
  const response = await fetch(
    `${API_BASE_URL}/devices/devices/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch devices");
  }

  return response.json();
}

export interface CreateDeviceData {
  name: string;
  serial_number: string;
  location: string;
  status: string;
}

export async function createDevice(
  data: CreateDeviceData
): Promise<Device> {
  const response = await fetch(
    `${API_BASE_URL}/devices/devices/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    console.error("Create device error:", errorData);

    throw new Error("Failed to create device");
  }

  return response.json();
}