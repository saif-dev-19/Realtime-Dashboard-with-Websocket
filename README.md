# Live Sensor Dashboard

A full-stack real-time IoT sensor monitoring dashboard built with Django, Django REST Framework, Django Channels, Redis, PostgreSQL, React, TypeScript, and Docker.

The system collects sensor readings such as temperature, humidity, and battery level, stores them in PostgreSQL, exposes them through REST APIs, and streams live sensor data to the frontend using WebSockets.

---

## Features

### Device Management

- Create devices
- View all devices
- Device status management
- Device location
- Device serial number
- Online / Offline status

### Sensor Monitoring

Each sensor reading contains:

- Temperature
- Humidity
- Battery level
- Device
- Timestamp

### Real-Time Dashboard

- Real-time sensor updates using WebSockets
- Live temperature
- Live humidity
- Live battery level
- Multiple devices supported
- Device-specific live data

### Historical Data

- Previous sensor readings stored in PostgreSQL
- Latest reading shown when live data is unavailable
- Historical sensor reading table
- Temperature chart
- Humidity chart
- Battery chart

### Dashboard Behavior

The dashboard follows this priority:

1. Live WebSocket data
2. Latest database reading
3. No data

So if the WebSocket temporarily disconnects, the UI continues showing the last available sensor reading instead of becoming empty.

---

# Tech Stack

## Backend

- Python
- Django
- Django REST Framework
- Django Channels
- Daphne
- Redis
- PostgreSQL
- ASGI
- Docker
- Nginx

## Frontend

- React
- TypeScript
- Vite
- React Router
- Recharts
- CSS

## Infrastructure

- Docker Compose
- Nginx reverse proxy
- Redis channel layer
- PostgreSQL database

---

# Project Architecture

```text
                         ┌─────────────────────┐
                         │      React UI       │
                         │   TypeScript/Vite   │
                         └──────────┬──────────┘
                                    │
                         HTTP / WebSocket
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │        Nginx        │
                         │   Reverse Proxy     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Django         │
                         │      Daphne         │
                         │                     │
                         │ DRF + Channels      │
                         └──────┬───────┬──────┘
                                │       │
                       HTTP API  │       │ WebSocket
                                │       │
                                ▼       ▼
                         ┌──────────┐  ┌──────────┐
                         │PostgreSQL│  │  Redis   │
                         │          │  │ Channel  │
                         │ Sensor   │  │  Layer   │
                         │ Readings │  │          │
                         └──────────┘  └──────────┘


# Quick Start

Follow the steps below to run the project locally.

---

## 1. Clone the Repository

First, clone the GitHub repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
