import os
import json
import uuid
import datetime
from flask import Flask, request, jsonify, render_template, send_from_directory, session
from database import get_db, init_db
from ai_engine import LivestockHealthAssessmentEngine, SPECIES_VITAL_RANGES, SYMPTOM_DISEASE_ASSOCIATIONS
from iot_simulator import IoTSensorSimulator
from seed_data import generate_unique_animal_code, seed_database

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = os.environ.get('SECRET_KEY', 'sih26128_smart_livestock_health_key_2026')
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Ensure database and seed data are ready on launch
init_db()
seed_database()

# ----------------- HELPER FUNCTIONS -----------------
def dict_from_row(row):
    return dict(row) if row else None

# ----------------- PAGE ROUTES -----------------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard_page():
    return render_template('dashboard.html')

@app.route('/register-animal')
def register_animal_page():
    return render_template('register_animal.html')

@app.route('/manual-assessment')
def manual_assessment_page():
    return render_template('manual_assessment.html')

@app.route('/iot-monitor')
def iot_monitor_page():
    return render_template('iot_monitor.html')

@app.route('/photo-screening')
def photo_screening_page():
    return render_template('photo_screening.html')

@app.route('/emergency-vet')
def emergency_vet_page():
    return render_template('emergency_vet.html')

@app.route('/alerts')
def alerts_page():
    return render_template('alerts.html')

@app.route('/vaccinations')
def vaccinations_page():
    return render_template('vaccinations.html')

@app.route('/helpline-admin')
def helpline_admin_page():
    return render_template('helpline_admin.html')

@app.route('/disease-library')
def disease_library_page():
    return render_template('disease_library.html')

@app.route('/care-plans')
def care_plans_page():
    return render_template('care_plans.html')

# ----------------- REST APIs: AUTH & USERS -----------------
@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    mobile = data.get('mobile', '').strip()
    role = data.get('role', 'farmer')

    if not mobile:
        return jsonify({'error': 'Mobile number is required'}), 400

    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE mobile = ?", (mobile,)).fetchone()

    if not user:
        # Dev-mode auto-create farmer for seamless testing
        name = data.get('name', f"Farmer {mobile[-4:]}")
        state = data.get('state', 'Tamil Nadu')
        district = data.get('district', 'Coimbatore')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (name, mobile, role, state, district)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, mobile, role, state, district))
        conn.commit()
        user = conn.execute("SELECT * FROM users WHERE id = ?", (cursor.lastrowid,)).fetchone()

    conn.close()
    user_dict = dict_from_row(user)
    session['user_id'] = user_dict['id']
    session['user_name'] = user_dict['name']
    session['user_role'] = user_dict['role']
    return jsonify({'success': True, 'user': user_dict})

@app.route('/api/auth/current_user', methods=['GET'])
def api_current_user():
    user_id = session.get('user_id', 1) # Default to seeded demo farmer (Murugan)
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if user:
        return jsonify({'authenticated': True, 'user': dict_from_row(user)})
    return jsonify({'authenticated': False, 'user': None})

# ----------------- REST APIs: ANIMALS -----------------
@app.route('/api/animals', methods=['GET'])
def api_get_animals():
    owner_id = request.args.get('owner_id', session.get('user_id', 1))
    conn = get_db()
    animals = conn.execute('''
        SELECT a.*, u.name as owner_name, u.mobile as owner_mobile, u.district as owner_district,
               (SELECT COUNT(*) FROM sensor_readings sr WHERE sr.animal_id = a.id AND sr.is_abnormal = 1) as abnormal_readings_count,
               (SELECT COUNT(*) FROM alerts al WHERE al.animal_id = a.id AND al.is_resolved = 0) as open_alerts_count,
               (SELECT risk_level FROM risk_assessments ra WHERE ra.animal_id = a.id ORDER BY ra.id DESC LIMIT 1) as latest_risk_level,
               (SELECT temperature FROM sensor_readings sr WHERE sr.animal_id = a.id ORDER BY sr.id DESC LIMIT 1) as latest_temp,
               (SELECT heart_rate FROM sensor_readings sr WHERE sr.animal_id = a.id ORDER BY sr.id DESC LIMIT 1) as latest_hr,
               (SELECT recorded_at FROM sensor_readings sr WHERE sr.animal_id = a.id ORDER BY sr.id DESC LIMIT 1) as latest_telemetry_time
        FROM animals a
        JOIN users u ON a.owner_id = u.id
        WHERE a.status = 'active'
        ORDER BY a.id ASC
    ''').fetchall()
    conn.close()
    return jsonify([dict_from_row(r) for r in animals])

@app.route('/api/animals/<int:animal_id>', methods=['GET'])
def api_get_animal(animal_id):
    conn = get_db()
    animal = conn.execute('''
        SELECT a.*, u.name as owner_name, u.mobile as owner_mobile, u.state, u.district
        FROM animals a
        JOIN users u ON a.owner_id = u.id
        WHERE a.id = ?
    ''', (animal_id,)).fetchone()

    if not animal:
        conn.close()
        return jsonify({'error': 'Animal not found'}), 404

    # Latest assessments & sensor history
    readings = conn.execute('''
        SELECT * FROM sensor_readings WHERE animal_id = ? ORDER BY id DESC LIMIT 20
    ''', (animal_id,)).fetchall()

    assessments = conn.execute('''
        SELECT * FROM risk_assessments WHERE animal_id = ? ORDER BY id DESC LIMIT 10
    ''', (animal_id,)).fetchall()

    images = conn.execute('''
        SELECT * FROM animal_images WHERE animal_id = ? ORDER BY id DESC
    ''', (animal_id,)).fetchall()

    vaccines = conn.execute('''
        SELECT * FROM vaccinations WHERE animal_id = ? ORDER BY scheduled_date ASC
    ''', (animal_id,)).fetchall()

    conn.close()
    return jsonify({
        'animal': dict_from_row(animal),
        'recent_readings': [dict_from_row(r) for r in readings],
        'recent_assessments': [dict_from_row(a) for a in assessments],
        'images': [dict_from_row(img) for img in images],
        'vaccines': [dict_from_row(v) for v in vaccines]
    })

@app.route('/api/animals/register', methods=['POST'])
def api_register_animal():
    """
    Extremely simple registration:
    - Owner name + Mobile number (one-time or reused)
    - Animal type + Optional animal name
    - Automatically generates collision-resistant Unique Animal Code (e.g., COW-1047)
    """
    data = request.get_json() or {}
    owner_name = data.get('owner_name', '').strip()
    mobile = data.get('mobile', '').strip()
    species = data.get('species', 'Cow').strip()
    animal_name = data.get('animal_name', '').strip() or None
    breed = data.get('breed', 'Local / Desi').strip()
    age = float(data.get('age_years', 3.0))
    state = data.get('state', 'Tamil Nadu').strip()
    district = data.get('district', 'Coimbatore').strip()
    iot_enabled = 1 if data.get('iot_enabled') else 0

    if not mobile:
        return jsonify({'error': 'Mobile number is required for ownership verification'}), 400

    conn = get_db()
    cursor = conn.cursor()

    # Find or create owner
    user = conn.execute("SELECT * FROM users WHERE mobile = ?", (mobile,)).fetchone()
    if user:
        owner_id = user['id']
        # Update owner details if given
        if owner_name and owner_name != user['name']:
            cursor.execute("UPDATE users SET name = ?, state = ?, district = ? WHERE id = ?", (owner_name, state, district, owner_id))
    else:
        cursor.execute('''
            INSERT INTO users (name, mobile, role, state, district)
            VALUES (?, ?, 'farmer', ?, ?)
        ''', (owner_name or f"Farmer {mobile[-4:]}", mobile, state, district))
        owner_id = cursor.lastrowid

    # Generate Unique Animal Code
    animal_code = generate_unique_animal_code(species, conn)
    animal_uuid = str(uuid.uuid4())
    iot_device_id = f"ESP32-TAG-{animal_code.split('-')[-1]}" if iot_enabled else None

    # Get species baseline vitals
    ranges = SPECIES_VITAL_RANGES.get(species, SPECIES_VITAL_RANGES['Cow'])
    b_temp = round((ranges['temp_min'] + ranges['temp_max']) / 2.0, 1)
    b_hr = round((ranges['hr_min'] + ranges['hr_max']) / 2.0, 0)

    cursor.execute('''
        INSERT INTO animals (animal_code, uuid, owner_id, species, breed, animal_name, age_years, baseline_temp, baseline_hr, iot_enabled, iot_device_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (animal_code, animal_uuid, owner_id, species, breed, animal_name, age, b_temp, b_hr, iot_enabled, iot_device_id))
    new_animal_id = cursor.lastrowid

    if iot_enabled and iot_device_id:
        cursor.execute('''
            INSERT INTO iot_devices (device_id, animal_id, device_type, status, battery_pct, last_heartbeat)
            VALUES (?, ?, 'ESP32-Biometric-Collar', 'online', 98, CURRENT_TIMESTAMP)
        ''', (iot_device_id, new_animal_id))

        # Add initial baseline reading
        cursor.execute('''
            INSERT INTO sensor_readings (animal_id, device_id, temperature, heart_rate, activity_level, steps_per_hour, rumination_time_min, is_abnormal, is_simulated)
            VALUES (?, ?, ?, ?, 'Normal Active', 160, 50, 0, 1)
        ''', (new_animal_id, iot_device_id, b_temp, b_hr))

    # Add standard default vaccination reminder
    cursor.execute('''
        INSERT INTO vaccinations (animal_id, vaccine_name, scheduled_date, status, veterinarian_notes)
        VALUES (?, 'FMD Bi-Annual Booster (NADCP)', date('now', '+30 days'), 'Scheduled', 'Routine preventative protection')
    ''', (new_animal_id,))

    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'message': f"Animal registered successfully with Unique Code {animal_code}!",
        'animal_id': new_animal_id,
        'animal_code': animal_code,
        'owner_name': owner_name,
        'mobile': mobile,
        'species': species,
        'animal_name': animal_name
    })

# ----------------- REST APIs: MANUAL ASSESSMENT -----------------
@app.route('/api/assessments/manual', methods=['POST'])
def api_manual_assessment():
    data = request.get_json() or {}
    animal_id = data.get('animal_id')
    temperature = data.get('temperature')
    heart_rate = data.get('heart_rate')
    feeding_status = data.get('feeding_status', 'Normal')
    activity_status = data.get('activity_status', 'Normal')
    symptoms = data.get('symptoms', []) # list of strings
    notes = data.get('notes', '')

    if not animal_id:
        return jsonify({'error': 'Animal ID is required'}), 400

    conn = get_db()
    animal = conn.execute("SELECT * FROM animals WHERE id = ?", (animal_id,)).fetchone()
    if not animal:
        conn.close()
        return jsonify({'error': 'Animal not found'}), 404

    # Count historical abnormal events
    abnormal_history = conn.execute("SELECT COUNT(*) as cnt FROM alerts WHERE animal_id = ?", (animal_id,)).fetchone()['cnt']

    # AI Evaluation
    analysis = LivestockHealthAssessmentEngine.analyze_health_risk(
        species=animal['species'],
        temperature=temperature,
        heart_rate=heart_rate,
        activity_level=activity_status,
        feeding_status=feeding_status,
        symptoms_list=symptoms,
        historical_abnormal_count=abnormal_history,
        mode='manual'
    )

    cursor = conn.cursor()
    # Save manual observation
    cursor.execute('''
        INSERT INTO manual_observations (animal_id, temperature, heart_rate, feeding_status, activity_status, symptoms, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (animal_id, temperature, heart_rate, feeding_status, activity_status, json.dumps(symptoms), notes))

    # Save risk assessment
    cursor.execute('''
        INSERT INTO risk_assessments (animal_id, assessment_mode, risk_score, risk_level, confidence_pct, suspected_conditions, reasons_breakdown, recommendations, urgency_level)
        VALUES (?, 'manual', ?, ?, ?, ?, ?, ?, ?)
    ''', (
        animal_id,
        analysis['risk_score'],
        analysis['risk_level'],
        analysis['confidence_pct'],
        ", ".join(analysis['suspected_conditions']),
        "\n".join(analysis['reasons_breakdown']),
        analysis['recommendations'],
        analysis['urgency_level']
    ))
    assessment_id = cursor.lastrowid

    # If risk is Moderate or High, create an alert
    if analysis['risk_level'] in ['Moderate', 'High']:
        cursor.execute('''
            INSERT INTO alerts (animal_id, source_mode, alert_title, reason, risk_level, recommended_action)
            VALUES (?, 'manual_symptom', ?, ?, ?, ?)
        ''', (
            animal_id,
            f"{analysis['risk_level']} Health Risk from Manual Observation ({animal['animal_code']})",
            "; ".join(analysis['reasons_breakdown'][:2]),
            analysis['risk_level'],
            analysis['recommendations']
        ))

    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'assessment_id': assessment_id,
        'animal_code': animal['animal_code'],
        'animal_name': animal['animal_name'],
        'result': analysis
    })

# ----------------- REST APIs: IOT TELEMETRY & SIMULATOR -----------------
@app.route('/api/iot/simulate', methods=['POST'])
def api_iot_simulate():
    data = request.get_json() or {}
    animal_id = data.get('animal_id', 1)
    scenario = data.get('scenario', 'normal') # normal, fever, lethargic, critical_infection

    conn = get_db()
    animal = conn.execute("SELECT * FROM animals WHERE id = ?", (animal_id,)).fetchone()
    conn.close()

    if not animal:
        return jsonify({'error': 'Animal not found'}), 404

    device_id = animal['iot_device_id'] or f"ESP32-TAG-{animal['animal_code'].split('-')[-1]}"
    result = IoTSensorSimulator.generate_reading(animal_id, device_id, scenario=scenario)

    return jsonify({
        'success': True,
        'telemetry': result,
        'scenario': scenario
    })

@app.route('/api/iot/telemetry', methods=['POST'])
def api_iot_telemetry_webhook():
    """
    Authenticated / Direct REST API endpoint for physical ESP32 or ESP8266 devices.
    Payload: { "device_id": "ESP32-TAG-1047", "temperature": 39.1, "heart_rate": 72, "activity": "Normal" }
    """
    data = request.get_json() or {}
    device_id = data.get('device_id')
    temp = data.get('temperature')
    hr = data.get('heart_rate')
    act = data.get('activity', 'Normal')

    if not device_id or temp is None or hr is None:
        return jsonify({'error': 'device_id, temperature, and heart_rate are required'}), 400

    conn = get_db()
    device = conn.execute("SELECT * FROM iot_devices WHERE device_id = ?", (device_id,)).fetchone()
    if not device:
        conn.close()
        return jsonify({'error': f'Device {device_id} not registered'}), 404

    animal_id = device['animal_id']
    animal = conn.execute("SELECT * FROM animals WHERE id = ?", (animal_id,)).fetchone()
    species = animal['species'] if animal else 'Cow'
    ranges = SPECIES_VITAL_RANGES.get(species, SPECIES_VITAL_RANGES['Cow'])

    is_abnormal = 1 if (float(temp) > ranges['temp_max'] or float(hr) > ranges['hr_max']) else 0

    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO sensor_readings (animal_id, device_id, temperature, heart_rate, activity_level, is_abnormal, is_simulated)
        VALUES (?, ?, ?, ?, ?, ?, 0)
    ''', (animal_id, device_id, float(temp), float(hr), act, is_abnormal))

    cursor.execute("UPDATE iot_devices SET last_heartbeat = CURRENT_TIMESTAMP, status = 'online' WHERE id = ?", (device['id'],))

    if is_abnormal:
        eval_res = LivestockHealthAssessmentEngine.analyze_health_risk(species, temperature=temp, heart_rate=hr, activity_level=act, mode='iot')
        cursor.execute('''
            INSERT INTO alerts (animal_id, source_mode, alert_title, reason, risk_level, recommended_action)
            VALUES (?, 'iot_sensor', ?, ?, ?, ?)
        ''', (animal_id, f"Threshold Exceeded on {animal['animal_code']}", f"Temp: {temp}°C, HR: {hr} bpm", eval_res['risk_level'], eval_res['recommendations']))

    conn.commit()
    conn.close()

    return jsonify({'success': True, 'is_abnormal': is_abnormal})

# ----------------- REST APIs: PHOTO AI SCREENING -----------------
@app.route('/api/vision/screen', methods=['POST'])
def api_vision_screen():
    animal_id = request.form.get('animal_id')
    file = request.files.get('photo')

    if not animal_id:
        return jsonify({'error': 'Animal ID is required'}), 400

    conn = get_db()
    animal = conn.execute("SELECT * FROM animals WHERE id = ?", (animal_id,)).fetchone()
    if not animal:
        conn.close()
        return jsonify({'error': 'Animal not found'}), 404

    filename = "placeholder_sample.jpg"
    full_save_path = None
    sample_type = request.form.get('sample_type', '').strip()

    if file and file.filename:
        ext = os.path.splitext(file.filename)[1] or '.jpg'
        unique_name = f"{animal['animal_code']}_{int(datetime.datetime.now().timestamp())}{ext}"
        full_save_path = os.path.join(UPLOAD_FOLDER, unique_name)
        file.save(full_save_path)
        filename = unique_name
    elif sample_type:
        filename = f"{sample_type}_{animal['animal_code']}.jpg"

    # AI Vision Screening with filename, species, path and sample preset
    vision_res = LivestockHealthAssessmentEngine.screen_animal_image(
        filename=filename,
        species=animal['species'],
        file_path=full_save_path,
        sample_type=sample_type
    )

    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO animal_images (animal_id, image_filename, image_path, image_quality_check, screened_condition, visual_findings, risk_score, risk_level, confidence)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        animal_id,
        filename,
        f"/static/uploads/{filename}",
        vision_res['image_quality_check'],
        vision_res['screened_condition'],
        vision_res['visual_findings'],
        vision_res['risk_score'],
        vision_res['risk_level'],
        vision_res['confidence']
    ))

    # Also log to risk_assessments table
    cursor.execute('''
        INSERT INTO risk_assessments (animal_id, assessment_mode, risk_score, risk_level, confidence_pct, suspected_conditions, reasons_breakdown, recommendations, urgency_level)
        VALUES (?, 'photo', ?, ?, ?, ?, ?, ?, ?)
    ''', (
        animal_id,
        vision_res['risk_score'],
        vision_res['risk_level'],
        int(vision_res['confidence'] * 100),
        vision_res['screened_condition'],
        vision_res['visual_findings'],
        vision_res.get('veterinary_care_plan') or ("Consult veterinary hospital if skin nodules or vesicular sores are active" if vision_res['risk_level'] == 'High' else "Routine hygiene maintenance"),
        vision_res.get('veterinary_urgency') or ("Urgent Veterinary Attention Required" if vision_res['urgent_vet_recommended'] else "Routine Care")
    ))
    assessment_id = cursor.lastrowid

    # Save to care_plans table
    cursor.execute('''
        INSERT INTO care_plans (
            animal_id, assessment_id, plan_title, observable_findings,
            body_condition_score, suspected_causes, overall_risk_level,
            immediate_safe_care, veterinary_urgency, followup_questions,
            treatment_overview, prevention_plan, escalation_triggers
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        animal_id,
        assessment_id,
        f"Care Plan: {vision_res['screened_condition'][:60]} ({animal['animal_code']})",
        vision_res['visual_findings'],
        vision_res.get('bcs_category', 'Not specified'),
        "\n".join(vision_res.get('differential_causes', [])),
        vision_res['risk_level'],
        "\n".join(vision_res.get('safe_immediate_care', [])),
        vision_res.get('veterinary_urgency', 'Routine checkup'),
        "\n".join(vision_res.get('followup_questions', [])),
        vision_res.get('veterinary_care_plan', 'Veterinary clinical examination advised.'),
        "Follow biosecurity and balanced nutrition.",
        vision_res.get('escalation_triggers', 'Seek emergency care if recumbent or severely dyspneic.')
    ))

    if vision_res['risk_level'] == 'High':
        cursor.execute('''
            INSERT INTO alerts (animal_id, source_mode, alert_title, reason, risk_level, recommended_action)
            VALUES (?, 'ai_vision', ?, ?, 'High', 'Isolate animal and contact veterinary polyclinic')
        ''', (
            animal_id,
            f"Visual Lesion Alert ({animal['animal_code']})",
            vision_res['visual_findings']
        ))

    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'animal_code': animal['animal_code'],
        'animal_name': animal['animal_name'],
        'screening': vision_res,
        'image_url': f"/static/uploads/{filename}"
    })

# ----------------- REST APIs: DISEASE KNOWLEDGE BASE -----------------
@app.route('/api/diseases', methods=['GET'])
def api_get_disease_library():
    key = request.args.get('key')
    search = request.args.get('q', '').strip().lower()
    conn = get_db()

    if key:
        disease = conn.execute("SELECT * FROM disease_library WHERE disease_key = ?", (key,)).fetchone()
        conn.close()
        if disease:
            return jsonify(dict_from_row(disease))
        return jsonify({'error': 'Disease not found'}), 404

    query = "SELECT * FROM disease_library"
    params = []
    if search:
        query += " WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(common_symptoms) LIKE ?"
        params.extend([f"%{search}%", f"%{search}%", f"%{search}%"])
    query += " ORDER BY name ASC"

    rows = conn.execute(query, params).fetchall()
    conn.close()
    return jsonify([dict_from_row(r) for r in rows])

@app.route('/api/care-plans', methods=['GET'])
def api_get_care_plans():
    animal_id = request.args.get('animal_id')
    conn = get_db()
    if animal_id:
        plans = conn.execute('''
            SELECT cp.*, a.animal_code, a.animal_name, a.species
            FROM care_plans cp
            JOIN animals a ON cp.animal_id = a.id
            WHERE cp.animal_id = ?
            ORDER BY cp.id DESC
        ''', (animal_id,)).fetchall()
    else:
        plans = conn.execute('''
            SELECT cp.*, a.animal_code, a.animal_name, a.species
            FROM care_plans cp
            JOIN animals a ON cp.animal_id = a.id
            ORDER BY cp.id DESC LIMIT 20
        ''').fetchall()
    conn.close()
    return jsonify([dict_from_row(p) for p in plans])

# ----------------- REST APIs: VETERINARY EMERGENCY & HELPLINES -----------------
@app.route('/api/emergency/directory', methods=['GET'])
def api_get_emergency_directory():
    state = request.args.get('state', 'Tamil Nadu')
    district = request.args.get('district', 'Coimbatore')

    conn = get_db()
    # District or state helplines
    helplines = conn.execute('''
        SELECT * FROM helplines
        WHERE is_active = 1 AND (state = ? OR state = 'All India')
        ORDER BY CASE WHEN district = ? THEN 1 WHEN district = 'All Districts' THEN 2 ELSE 3 END
    ''', (state, district)).fetchall()

    # Hospitals
    hospitals = conn.execute('''
        SELECT * FROM veterinary_hospitals
        WHERE state = ? AND district = ?
        ORDER BY distance_km ASC
    ''', (state, district)).fetchall()

    conn.close()
    return jsonify({
        'state': state,
        'district': district,
        'helplines': [dict_from_row(h) for h in helplines],
        'hospitals': [dict_from_row(hp) for hp in hospitals]
    })

@app.route('/api/admin/helplines', methods=['GET', 'POST'])
def api_admin_helplines():
    conn = get_db()
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.get_json() or {}
        cursor.execute('''
            INSERT INTO helplines (state, district, helpline_number, service_name, service_type, operating_hours, official_source, last_verified_date, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
        ''', (
            data.get('state', 'Tamil Nadu'),
            data.get('district', 'All Districts'),
            data.get('helpline_number', '1962'),
            data.get('service_name', 'Mobile Veterinary Care'),
            data.get('service_type', 'Mobile Unit'),
            data.get('operating_hours', '24x7'),
            data.get('official_source', 'https://dahd.nic.in'),
            datetime.date.today().isoformat()
        ))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Helpline registered'})

    rows = conn.execute("SELECT * FROM helplines ORDER BY id DESC").fetchall()
    conn.close()
    return jsonify([dict_from_row(r) for r in rows])

# ----------------- REST APIs: VACCINATIONS (ADD / REMOVE / LIST) -----------------
@app.route('/api/vaccinations', methods=['GET', 'POST'])
def api_vaccinations_handler():
    conn = get_db()
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.get_json() or {}
        animal_id = data.get('animal_id')
        vaccine_name = data.get('vaccine_name', '').strip()
        scheduled_date = data.get('scheduled_date', '').strip()
        notes = data.get('notes', 'Scheduled vaccination').strip()

        if not animal_id or not vaccine_name or not scheduled_date:
            conn.close()
            return jsonify({'error': 'animal_id, vaccine_name and scheduled_date are required'}), 400

        cursor.execute('''
            INSERT INTO vaccinations (animal_id, vaccine_name, scheduled_date, status, veterinarian_notes)
            VALUES (?, ?, ?, 'Scheduled', ?)
        ''', (animal_id, vaccine_name, scheduled_date, notes))
        conn.commit()
        new_id = cursor.lastrowid
        conn.close()
        return jsonify({'success': True, 'id': new_id, 'message': 'Vaccine record scheduled successfully'})

    # GET all
    rows = conn.execute('''
        SELECT v.*, a.animal_code, a.animal_name, a.species
        FROM vaccinations v
        JOIN animals a ON v.animal_id = a.id
        ORDER BY v.scheduled_date ASC
    ''').fetchall()
    conn.close()
    return jsonify([dict_from_row(r) for r in rows])

@app.route('/api/vaccinations/<int:vac_id>/complete', methods=['POST'])
def api_complete_vaccination(vac_id):
    conn = get_db()
    today_str = datetime.date.today().isoformat()
    conn.execute('''
        UPDATE vaccinations
        SET status = 'Completed', administered_date = ?
        WHERE id = ?
    ''', (today_str, vac_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Vaccination confirmed & recorded as Completed!'})

@app.route('/api/vaccinations/<int:vac_id>', methods=['DELETE'])
def api_delete_vaccination(vac_id):
    conn = get_db()
    conn.execute("DELETE FROM vaccinations WHERE id = ?", (vac_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Vaccination record removed from schedule successfully'})

# ----------------- REST APIs: ALERTS & DASHBOARD STATS -----------------
@app.route('/api/alerts', methods=['GET'])
def api_get_alerts():
    conn = get_db()
    alerts = conn.execute('''
        SELECT al.*, a.animal_code, a.animal_name, a.species, u.name as owner_name, u.mobile as owner_mobile, u.district as owner_district
        FROM alerts al
        JOIN animals a ON al.animal_id = a.id
        JOIN users u ON a.owner_id = u.id
        ORDER BY al.id DESC
    ''').fetchall()
    conn.close()
    return jsonify([dict_from_row(a) for a in alerts])

@app.route('/api/alerts/<int:alert_id>/resolve', methods=['POST'])
def api_resolve_alert(alert_id):
    conn = get_db()
    conn.execute('''
        UPDATE alerts SET is_resolved = 1, resolved_at = CURRENT_TIMESTAMP WHERE id = ?
    ''', (alert_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/dashboard/stats', methods=['GET'])
def api_dashboard_stats():
    conn = get_db()

    total_animals = conn.execute("SELECT COUNT(*) as c FROM animals WHERE status = 'active'").fetchone()['c']
    iot_animals = conn.execute("SELECT COUNT(*) as c FROM animals WHERE iot_enabled = 1 AND status = 'active'").fetchone()['c']
    manual_animals = total_animals - iot_animals

    open_alerts = conn.execute("SELECT COUNT(*) as c FROM alerts WHERE is_resolved = 0").fetchone()['c']
    high_risk_alerts = conn.execute("SELECT COUNT(*) as c FROM alerts WHERE is_resolved = 0 AND risk_level = 'High'").fetchone()['c']

    recent_assessments = conn.execute('''
        SELECT ra.*, a.animal_code, a.animal_name, a.species
        FROM risk_assessments ra
        JOIN animals a ON ra.animal_id = a.id
        ORDER BY ra.id DESC LIMIT 5
    ''').fetchall()

    upcoming_vaccines = conn.execute('''
        SELECT v.*, a.animal_code, a.animal_name, a.species
        FROM vaccinations v
        JOIN animals a ON v.animal_id = a.id
        WHERE v.status = 'Scheduled'
        ORDER BY v.scheduled_date ASC LIMIT 5
    ''').fetchall()

    conn.close()
    return jsonify({
        'total_animals': total_animals,
        'iot_animals': iot_animals,
        'manual_animals': manual_animals,
        'open_alerts': open_alerts,
        'high_risk_alerts': high_risk_alerts,
        'recent_assessments': [dict_from_row(r) for r in recent_assessments],
        'upcoming_vaccines': [dict_from_row(v) for v in upcoming_vaccines]
    })

# ----------------- REFERENCE METADATA API -----------------
@app.route('/api/metadata/reference-ranges', methods=['GET'])
def api_reference_ranges():
    return jsonify({
        'vitals': SPECIES_VITAL_RANGES,
        'symptoms': SYMPTOM_DISEASE_ASSOCIATIONS
    })

if __name__ == '__main__':
    print("Starting SIH26128 Smart Animal Health Platform on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=False)
