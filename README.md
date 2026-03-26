# HealthGuard AI - Live Health Monitoring Dashboard 🚀

HealthGuard AI is a high-performance, full-stack health monitoring application designed for real-time tracking of patient vitals (Heart Rate, SpO2) and GPS location. Built with **Next.js 15**, **MongoDB**, and **Leaflet**, it provides a premium "glassmorphism" interface for medical tracking.

## ✨ Features

- **Real-time Vitals Dashboard**: Heart Rate and SpO2 levels update every 2 seconds via live polling.
- **Dynamic Health Status**: Automatic classification (Normal, Warning, Danger) based on medical thresholds.
- **Interactive Patient Map**: Live GPS tracking using Leaflet and OpenStreetMap.
- **Modern UI/UX**: Dark gradient background with frosted glass cards and smooth Framer Motion animations.
- **Microcontroller Integration**: Ready-to-use API for ESP32/ESP8266 devices.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: MongoDB with Mongoose
- **Animations**: Framer Motion
- **Maps**: Leaflet (react-leaflet)
- **Styling**: Vanilla CSS (Modern CSS Variables & Glassmorphism)

## 📡 Hardware Integration (ESP32)

The project includes a sample Arduino sketch: `arduino_esp32_vitals.ino`.

1. Open the sketch in Arduino IDE.
2. Install `ArduinoJson` library.
3. Replace WiFi credentials and your machine's Local IP.
4. Upload to ESP32 to start streaming live data.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Installation
```bash
git clone https://github.com/Rakshi2609/hellnahh.git
cd hellnahh
npm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🧪 API Verification
Test the endpoint using `curl`:
```bash
curl -X POST http://localhost:3000/api/vitals \
-H "Content-Type: application/json" \
-d '{"heartRate": 85, "spO2": 97, "lat": 13.08, "lng": 80.27}'
```

## 📜 License
MIT
