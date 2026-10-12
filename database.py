import os
import sqlite3
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'database', 'livestock_health.db')

def get_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # 1. Users / Farmers table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mobile TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL DEFAULT 'farmer', -- 'farmer', 'veterinarian', 'admin'
        state TEXT DEFAULT 'Tamil Nadu',
        district TEXT DEFAULT 'Coimbatore',
        village_pin TEXT DEFAULT '641001',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # 2. Animals table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS animals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_code TEXT NOT NULL UNIQUE, -- Short code e.g. COW-1047
        uuid TEXT NOT NULL UNIQUE,
        owner_id INTEGER NOT NULL,
        species TEXT NOT NULL, -- Cow, Buffalo, Goat, Sheep, Dog, Cat, Other
        breed TEXT DEFAULT 'Local / Desi',
        animal_name TEXT,
        age_years REAL DEFAULT 3.0,
        gender TEXT DEFAULT 'Female',
        baseline_temp REAL DEFAULT 38.6,
        baseline_hr REAL DEFAULT 70.0,
        iot_enabled INTEGER DEFAULT 0,
        iot_device_id TEXT,
        status TEXT DEFAULT 'active', -- active, archived
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id)
    )
    ''')

    # 3. IoT Devices table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS iot_devices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL UNIQUE,
        animal_id INTEGER,
        device_type TEXT DEFAULT 'ESP32-Livestock-Tag',
        status TEXT DEFAULT 'online', -- online, offline, simulator
        battery_pct INTEGER DEFAULT 95,
        last_heartbeat TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 4. Sensor Readings table (IoT stream)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sensor_readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        device_id TEXT NOT NULL,
        temperature REAL NOT NULL,
        heart_rate REAL NOT NULL,
        activity_level TEXT NOT NULL, -- Normal, Low/Lethargic, Hyperactive, Restless
        steps_per_hour INTEGER DEFAULT 120,
        rumination_time_min INTEGER DEFAULT 45,
        is_abnormal INTEGER DEFAULT 0,
        is_simulated INTEGER DEFAULT 0,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 5. Manual Health Observations table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS manual_observations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        temperature REAL,
        heart_rate REAL,
        feeding_status TEXT, -- Normal, Reduced, Refusing Food
        activity_status TEXT, -- Normal, Dull/Lethargic, Restless, Downer (Unable to rise)
        symptoms TEXT, -- JSON or comma-separated list of symptoms
        notes TEXT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 6. Animal Images & AI Vision Screening
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS animal_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        image_filename TEXT NOT NULL,
        image_path TEXT NOT NULL,
        image_quality_check TEXT DEFAULT 'Passed', -- Passed, Blurry/Unsuitable
        screened_condition TEXT, -- Lumpy Skin Nodules, Foot Lesions, Eye Discharge, Skin Coat Rash, None
        visual_findings TEXT,
        risk_score REAL DEFAULT 0,
        risk_level TEXT DEFAULT 'Low', -- Low, Moderate, High, Inconclusive
        confidence REAL DEFAULT 0.0,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 7. AI Health Risk Assessments (Combined engine)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS risk_assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        assessment_mode TEXT NOT NULL, -- 'iot', 'manual', 'photo', 'combined'
        risk_score INTEGER NOT NULL, -- 0 to 100
        risk_level TEXT NOT NULL, -- Low, Moderate, High
        confidence_pct INTEGER DEFAULT 85,
        suspected_conditions TEXT,
        reasons_breakdown TEXT, -- Detailed explainability JSON/bullet points
        recommendations TEXT,
        urgency_level TEXT DEFAULT 'Routine', -- Routine, Monitor, Urgent Veterinary Attention
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 8. Alerts & Emergency notifications
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        source_mode TEXT NOT NULL, -- 'iot_sensor', 'manual_symptom', 'ai_vision', 'system'
        alert_title TEXT NOT NULL,
        reason TEXT NOT NULL,
        risk_level TEXT NOT NULL, -- Low, Moderate, High, Critical
        recommended_action TEXT NOT NULL,
        is_acknowledged INTEGER DEFAULT 0,
        is_resolved INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 9. Verified Veterinary Helplines
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS helplines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        district TEXT,
        helpline_number TEXT NOT NULL,
        service_name TEXT NOT NULL,
        service_type TEXT NOT NULL, -- Mobile Veterinary Unit, State Polyclinic, Disaster Animal Care
        operating_hours TEXT NOT NULL,
        official_source TEXT NOT NULL,
        last_verified_date TEXT NOT NULL,
        is_active INTEGER DEFAULT 1
    )
    ''')

    # 10. Verified Veterinary Hospitals & Dispensaries
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS veterinary_hospitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        facility_type TEXT NOT NULL, -- Veterinary Polyclinic, Govt Dispensary, University Teaching Hospital
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        distance_km REAL,
        operating_hours TEXT NOT NULL,
        mobile_unit_available INTEGER DEFAULT 1,
        maps_query TEXT
    )
    ''')

    # 11. Vaccinations & Follow-up Calendar
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS vaccinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        vaccine_name TEXT NOT NULL,
        scheduled_date TEXT NOT NULL,
        administered_date TEXT,
        status TEXT DEFAULT 'Scheduled',
        veterinarian_notes TEXT,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    # 12. Disease & Condition Knowledge Base / Remedial Library
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS disease_library (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        disease_key TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        species_affected TEXT NOT NULL,
        description TEXT NOT NULL,
        causes_risk_factors TEXT NOT NULL,
        common_symptoms TEXT NOT NULL,
        visible_signs TEXT NOT NULL,
        invisible_signs TEXT NOT NULL,
        differential_possibilities TEXT NOT NULL,
        diagnostic_tests TEXT NOT NULL,
        immediate_first_aid TEXT NOT NULL,
        supportive_care TEXT NOT NULL,
        veterinary_treatment TEXT NOT NULL,
        medicine_info_restrictions TEXT NOT NULL,
        prevention_biosecurity TEXT NOT NULL,
        warning_signs_urgency TEXT NOT NULL,
        recovery_monitoring TEXT NOT NULL,
        reference_sources TEXT NOT NULL,
        last_reviewed TEXT NOT NULL,
        veterinary_reviewer TEXT NOT NULL
    )
    ''')

    # 13. Personalized Care Plans
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS care_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animal_id INTEGER NOT NULL,
        assessment_id INTEGER,
        plan_title TEXT NOT NULL,
        observable_findings TEXT NOT NULL,
        body_condition_score TEXT,
        suspected_causes TEXT NOT NULL,
        overall_risk_level TEXT NOT NULL,
        immediate_safe_care TEXT NOT NULL,
        veterinary_urgency TEXT NOT NULL,
        followup_questions TEXT,
        treatment_overview TEXT NOT NULL,
        prevention_plan TEXT NOT NULL,
        escalation_triggers TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animal_id) REFERENCES animals (id)
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database tables initialized successfully.")
