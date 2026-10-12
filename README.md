# PashuRaksha AI: Smart Animal Health & Disease Prevention Platform
## Smart India Hackathon 2026 (SIH26128)

**PashuRaksha AI** is an AI-powered livestock healthcare system engineered to detect early signs of animal diseases, assess health risks, and alert farmers and veterinarians before disease spreads across herds.

---

### Key Capabilities & Dual Monitoring Modes

1. **Mode 1: IoT-Based Automatic Monitoring**
   - Seamless telemetry ingestion via authenticated REST APIs and MQTT from ESP32 / ESP8266 wearable tags/collars.
   - Continuous vital tracking (Body Temperature, Heart Rate, Rumination Minutes, Hourly Steps).
   - Dynamic comparison against species physiological baselines (Cow, Buffalo, Goat, Sheep, etc.).
   - Built-in hardware telemetry simulator with scenarios (Normal, Fever Spike, Depressed Rumination, Critical Sepsis).

2. **Mode 2: Manual Health Monitoring**
   - Accessible, low-cost checklist for rural farmers without IoT sensors or reliable internet.
   - Records observed symptoms, appetite changes, postures (e.g. Downer cow), and optional thermometer readings.
   - Feeds into the unified AI disease risk assessment engine.

3. **Collision-Resistant Unique Animal Identification**
   - Simple 1-step registration: farmer mobile number entered once.
   - Collision-resistant unique code auto-generation (e.g., `COW-1047`, `COW-2851`, `COW-6392`).
   - One owner can register multiple animals seamlessly without re-entering personal details.

4. **Photo-Based AI Health Screening**
   - Computer-vision screening for visible symptoms: Lumpy Skin Disease (LSD) dermal nodules, Foot & Mouth Disease (FMD) vesicular lesions, pinkeye corneal opacity.
   - Image quality validation (blurry/lighting checks) and uncertainty reporting.

5. **Emergency Veterinary Assistance & Verified Helplines (1962)**
   - High-risk detection triggers instant referral to verified government veterinary facilities.
   - District-specific contact directories (e.g., Coimbatore Regional Veterinary Polyclinic: `0422-2381900`).
   - Official **Toll-Free 1962 Mobile Veterinary Clinic** one-tap dialing and Google Maps directions.

---

### Project Architecture & File Structure

```
w:\boomika\
├── app.py                     # Flask application & complete REST API endpoints
├── database.py                # SQLite schema (Users, Animals, IoT, Observations, Alerts, Helplines)
├── ai_engine.py               # AI disease-risk prediction engine & vision screening
├── iot_simulator.py           # IoT biometric stream generator & scenario simulator
├── seed_data.py               # Seed script with demo cows (Lakshmi, Ponni, Kaveri) & verified helplines
├── test_suite.py              # Automated test suite (8 passing unit & integration tests)
├── requirements.txt           # Python dependency specifications
├── static/
│   ├── css/
│   │   └── style.css          # Responsive dark/green/slate UI stylesheet
│   ├── js/
│   │   └── main.js            # UI helpers & API utilities
│   └── uploads/               # Animal photo storage
└── templates/
    ├── base.html              # Core navigation layout
    ├── index.html             # Landing & architecture overview
    ├── dashboard.html         # Unified livestock health dashboard
    ├── register_animal.html   # Animal registration with auto-ID generator
    ├── iot_monitor.html       # Mode 1 IoT live telemetry & simulator
    ├── manual_assessment.html # Mode 2 manual health checklist & AI assessment
    ├── photo_screening.html   # AI photo screening module
    ├── emergency_vet.html     # Verified 1962 emergency assistance & dispensaries
    ├── alerts.html            # Health alert audit log
    ├── helpline_admin.html    # Admin helpline directory management
    └── vaccinations.html      # NADCP preventative vaccination schedule
```

---

### Quickstart & Installation Guide

#### 1. Setup & Dependencies
```bash
# Clone or navigate to the directory
cd w:\boomika

# Initialize Database & Seed Demo Data
python seed_data.py
```

#### 2. Run Automated Verification Tests
```bash
python test_suite.py
```
*Expected: 8/8 tests pass (Verifying database integrity, unique IDs, AI risk calculation, IoT simulation, and emergency directory).*

#### 3. Launch Web Application
```bash
python app.py
```
Open your browser and navigate to:
**`http://127.0.0.1:5000`** (or `http://localhost:5000`)

---

### IoT Hardware REST Webhook
Physical ESP32 or ESP8266 devices transmit readings to:
```http
POST /api/iot/telemetry
Content-Type: application/json

{
  "device_id": "ESP32-TAG-1047",
  "temperature": 39.1,
  "heart_rate": 74,
  "activity": "Normal Active"
}
```

---

### Demonstration Walkthrough for Hackathon Presentation
1. **Registered Herd (Lakshmi, Ponni, Kaveri):**
   - Navigate to `/dashboard` to view the 3 demo cows with IDs `COW-1047`, `COW-2851`, and `COW-6392`.
2. **Simple Registration:**
   - Go to `/register-animal`, enter animal name and click Submit. Notice the instant generation of a permanent code (e.g., `BUF-xxxx` or `COW-xxxx`).
3. **Mode 1 IoT Demonstration:**
   - Open `/iot-monitor`. Choose scenario **"Fever Spike"** or **"Critical Sepsis"** and click **"Emit Sensor Reading"**.
   - Notice the immediate detection of hyperthermia, anomaly alert creation, and link to emergency care.
4. **Mode 2 Manual Monitoring:**
   - Open `/manual-assessment`. Check **"Skin nodules / lumps on body"** and **"High fever with shivering"**.
   - Click **"Submit for AI Disease-Risk Analysis"**. The engine computes an explainable High Risk score with suspected Lumpy Skin Disease (LSD) and alerts.
5. **Emergency Assistance & 1962 Helplines:**
   - Click the emergency banner or visit `/emergency-vet`. Review Coimbatore district dispensaries, direct calling links, and verified 1962 Mobile Veterinary Clinic services.
