import uuid
import random
from database import get_db, init_db

# Prefix per species
SPECIES_PREFIX = {
    'Cow': 'COW',
    'Buffalo': 'BUF',
    'Goat': 'GOT',
    'Sheep': 'SHP',
    'Dog': 'DOG',
    'Cat': 'CAT',
    'Other': 'LIV'
}

def generate_unique_animal_code(species, conn):
    """
    Generates collision-resistant human-readable code: e.g. COW-1047, COW-2851.
    Checked against DB uniqueness constraint.
    """
    prefix = SPECIES_PREFIX.get(species, 'LIV')
    while True:
        num = random.randint(1000, 9999)
        code = f"{prefix}-{num}"
        existing = conn.execute("SELECT id FROM animals WHERE animal_code = ?", (code,)).fetchone()
        if not existing:
            return code

def seed_database():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # Check if already seeded
    existing_user = cursor.execute("SELECT id FROM users LIMIT 1").fetchone()
    if existing_user:
        conn.close()
        print("Database already has seed records.")
        return

    # 1. Seed Helplines (verified Tamil Nadu & Indian national animal husbandry directories)
    helplines_data = [
        ('Tamil Nadu', 'All Districts', '1962', 'Toll-Free Mobile Veterinary Clinic (DAHD/TN-AHD)', 'Mobile Veterinary Unit', '24 Hours Emergency & Day Clinics', 'https://dahd.nic.in/schemes/programmes/mobile-veterinary-units', '2026-09-15', 1),
        ('Tamil Nadu', 'Coimbatore', '0422-2381900', 'Veterinary Polyclinic Campus, Town Hall Office', 'Regional Polyclinic', '8:00 AM - 6:00 PM', 'https://coimbatore.nic.in/animal-husbandry/', '2026-09-20', 1),
        ('Tamil Nadu', 'Dindigul', '0451-2460040', 'District Animal Husbandry Joint Director Office', 'District Veterinary HQ', '8:30 AM - 5:30 PM', 'https://dindigul.nic.in', '2026-08-30', 1),
        ('Tamil Nadu', 'Chennai', '044-25551586', 'Madras Veterinary College Teaching Hospital (TANUVAS)', 'Super Specialty Animal Hospital', '24 Hours Emergency / ICU', 'https://tanuvas.ac.in', '2026-10-01', 1),
        ('All India', 'National', '1800-425-1661', 'National Animal Disease Control Control Room', 'Central Advisory Helpdesk', '9:00 AM - 6:00 PM', 'https://nadcp.dahd.gov.in', '2026-07-15', 1)
    ]
    cursor.executemany('''
        INSERT INTO helplines (state, district, helpline_number, service_name, service_type, operating_hours, official_source, last_verified_date, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', helplines_data)

    # 2. Seed Verified Veterinary Hospitals
    hospitals_data = [
        ('District Veterinary Polyclinic Town Hall', 'Veterinary Polyclinic', 'Tamil Nadu', 'Coimbatore', 'Town Hall Main Road, Near Clock Tower, Coimbatore 641001', '0422-2381900', 4.2, '8:00 AM - 5:00 PM (Emergency 24x7)', 1, 'District Veterinary Polyclinic Coimbatore'),
        ('Veterinary Dispensary Thondamuthur', 'Govt Dispensary', 'Tamil Nadu', 'Coimbatore', 'Main Bazaar Road, Thondamuthur, Coimbatore 641109', '0422-2617200', 8.5, '8:00 AM - 2:00 PM', 1, 'Veterinary Dispensary Thondamuthur'),
        ('Veterinary University Peripheral Hospital (TANUVAS)', 'University Hospital', 'Tamil Nadu', 'Coimbatore', 'Kalveerampalayam, Bharathiar University Post, Coimbatore 641046', '0422-2422201', 11.0, '24 Hours Emergency & Inpatient Care', 1, 'TANUVAS Coimbatore Hospital'),
        ('Govt Veterinary Hospital Pollachi', 'Govt Veterinary Hospital', 'Tamil Nadu', 'Coimbatore', 'Palakkad Road, Pollachi 642001', '04259-223450', 38.0, '8:00 AM - 4:00 PM', 1, 'Govt Veterinary Hospital Pollachi')
    ]
    cursor.executemany('''
        INSERT INTO veterinary_hospitals (name, facility_type, state, district, address, phone, distance_km, operating_hours, mobile_unit_available, maps_query)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', hospitals_data)

    # 3. Seed Primary Demo Farmer (Murugan, Coimbatore)
    cursor.execute('''
        INSERT INTO users (name, mobile, role, state, district, village_pin)
        VALUES ('Murugan R.', '9842154321', 'farmer', 'Tamil Nadu', 'Coimbatore', '641001')
    ''')
    farmer_id = cursor.lastrowid

    # 4. Seed the 3 requested demo cows: Lakshmi (COW-1047), Ponni (COW-2851), Kaveri (COW-6392)
    cows = [
        ('COW-1047', 'Lakshmi', 'Cow', 'Kangayam', 4.5, 38.6, 68, 1, 'ESP32-TAG-1047'),
        ('COW-2851', 'Ponni', 'Cow', 'Jersey Cross', 3.0, 38.5, 72, 1, 'ESP32-TAG-2851'),
        ('COW-6392', 'Kaveri', 'Cow', 'Gir', 5.0, 38.7, 70, 0, None)
    ]

    for code, name, species, breed, age, b_temp, b_hr, iot_on, dev_id in cows:
        u_id = str(uuid.uuid4())
        cursor.execute('''
            INSERT INTO animals (animal_code, uuid, owner_id, species, breed, animal_name, age_years, baseline_temp, baseline_hr, iot_enabled, iot_device_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (code, u_id, farmer_id, species, breed, name, age, b_temp, b_hr, iot_on, dev_id))
        anim_id = cursor.lastrowid

        if iot_on and dev_id:
            cursor.execute('''
                INSERT INTO iot_devices (device_id, animal_id, device_type, status, battery_pct, last_heartbeat)
                VALUES (?, ?, 'ESP32-Biometric-Collar', 'online', 92, CURRENT_TIMESTAMP)
            ''', (dev_id, anim_id))

            # Initial normal sensor readings
            cursor.execute('''
                INSERT INTO sensor_readings (animal_id, device_id, temperature, heart_rate, activity_level, steps_per_hour, rumination_time_min, is_abnormal, is_simulated)
                VALUES (?, ?, ?, ?, 'Normal Active', 180, 52, 0, 1)
            ''', (anim_id, dev_id, b_temp, b_hr))

        # Seed vaccination schedule
        cursor.execute('''
            INSERT INTO vaccinations (animal_id, vaccine_name, scheduled_date, administered_date, status, veterinarian_notes)
            VALUES (?, 'FMD (Foot and Mouth Disease) Bi-Annual', '2026-11-15', '2026-05-10', 'Scheduled', 'Next booster dose due under NADCP cycle')
        ''', (anim_id,))
        cursor.execute('''
            INSERT INTO vaccinations (animal_id, vaccine_name, scheduled_date, administered_date, status, veterinarian_notes)
            VALUES (?, 'HS (Hemorrhagic Septicemia) Monsoon Booster', '2026-10-25', NULL, 'Scheduled', 'Pre-monsoon vaccination mandatory')
        ''', (anim_id,))

    # Add a veterinarian user for role-based view demo
    cursor.execute('''
        INSERT INTO users (name, mobile, role, state, district, village_pin)
        VALUES ('Dr. S. Kabilan, B.V.Sc', '9443198765', 'veterinarian', 'Tamil Nadu', 'Coimbatore', '641001')
    ''')

    # Seed an alert on Lakshmi (COW-1047) to demonstrate high risk alert workflow
    lakshmi = cursor.execute("SELECT id FROM animals WHERE animal_code = 'COW-1047'").fetchone()
    if lakshmi:
        lak_id = lakshmi['id']
        cursor.execute('''
            INSERT INTO alerts (animal_id, source_mode, alert_title, reason, risk_level, recommended_action, is_acknowledged)
            VALUES (?, 'iot_sensor', 'Early Fever Detected in Lakshmi', 'Temp spiked to 40.2°C with elevated heart rate (88 bpm) and reduced steps', 'High', 'Isolate in cool shelter, call District Polyclinic (0422-2381900) or 1962 mobile unit', 0)
        ''', (lak_id,))
        cursor.execute('''
            INSERT INTO risk_assessments (animal_id, assessment_mode, risk_score, risk_level, confidence_pct, suspected_conditions, reasons_breakdown, recommendations, urgency_level)
            VALUES (?, 'iot', 78, 'High', 88, 'Early Stage Fever / Suspected Infection', 'Temp: 40.2°C exceeds normal threshold (39.3°C)\nHeart Rate: 88 bpm (Elevated)\nRumination dropped by 45%', 'Isolate animal and seek immediate veterinary guidance. Avoid unprescribed antibiotic usage.', 'Urgent Veterinary Attention Required')
        ''', (lak_id,))

    conn.commit()
    conn.close()
    print("Database successfully seeded with realistic demo records, cows, helplines & hospitals.")

if __name__ == '__main__':
    seed_database()
