# Live Sensor Dashboard

A full-stack real-time IoT sensor monitoring dashboard built with Django, Django REST Framework, Django Channels, Redis, PostgreSQL, React, TypeScript, and Docker.

The system manages multiple IoT devices, stores sensor readings in PostgreSQL, provides REST APIs, and streams real-time sensor data to the frontend using WebSockets.

---

## Features

- Device management
- Add new sensors/devices
- Online / Offline device status
- Device location and serial number
- Historical sensor readings
- Real-time sensor data
- Temperature monitoring
- Humidity monitoring
- Battery monitoring
- Real-time WebSocket updates
- Device-specific live data
- Live sensor charts
- Last known reading fallback
- REST API
- PostgreSQL database
- Redis Channel Layer
- Nginx reverse proxy
- Dockerized backend infrastructure
- React + TypeScript frontend

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

## Frontend

- React
- TypeScript
- Vite
- React Router
- Recharts
- CSS

## Infrastructure

- Docker
- Docker Compose
- Nginx
- Redis
- PostgreSQL

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
                                │       │
                                ▼       ▼
                         ┌──────────┐  ┌──────────┐
                         │PostgreSQL│  │  Redis   │
                         │          │  │ Channel  │
                         │ Sensor   │  │  Layer   │
                         │ Readings │  │          │
                         └──────────┘  └──────────┘


live-sensor-dashboard/
│
├── backend/
│   │
│   ├── apps/
│   │   ├── devices/
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   └── ...
│   │   │
│   │   └── dashboard/
│   │       ├── models.py
│   │       ├── consumers.py
│   │       ├── signals.py
│   │       ├── routing.py
│   │       └── ...
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── ...
│   │
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── manage.py
│
└── frontend/
    │
    ├── src/
    │   ├── api/
    │   │   ├── devices.ts
    │   │   └── readings.ts
    │   │
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── AddDevice.tsx
    │   │   └── DeviceDetails.tsx
    │   │
    │   ├── services/
    │   │   └── websocket.ts
    │   │
    │   ├── types/
    │   │   ├── device.ts
    │   │   ├── sensor.ts
    │   │   └── websocket.ts
    │   │
    │   ├── App.tsx
    │   ├── App.css
    │   └── main.tsx
    │
    ├── package.json
    ├── vite.config.ts
    └── ...


git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd YOUR_REPOSITORY/backend

cp .env.example .env

docker compose up --build -d

docker compose exec backend python manage.py migrate


git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd YOUR_REPOSITORY/backend

cp .env.example .env

docker compose up --build -d

docker compose exec backend python manage.py migrate
