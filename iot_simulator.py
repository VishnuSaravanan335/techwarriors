import random
import time
from datetime import datetime
from database import get_db
from ai_engine import SPECIES_VITAL_RANGES, LivestockHealthAssessmentEngine

class IoTSensorSimulator:
    """
    Simulates real-time telemetry from ESP32 / ESP8266 wearable livestock collars / ear tags.
    Generates realistic physiological streams with drift, anomaly states, and automated alert triggering.
    """

    @classmethod
    def generate_reading(cls, animal_id, device_id, scenario="normal"):
        """
        Scenarios:
        - 'normal': Healthy baseline within normal bounds
        - 'fever': Hyperthermia elevated temperature + tachycardia
        - 'lethargic': Depressed steps, low rumination, moderate vitals
        - 'critical_infection': High fever (>40.8C), tachycardia (>95 bpm), low rumination
        """
        conn = get_db()
        animal = conn.execute("SELECT * FROM animals WHERE id = ?", (animal_id,)).fetchone()
        if not animal:
            conn.close()
            return None

        species = animal['species']
        vitals = SPECIES_VITAL_RANGES.get(species, SPECIES_VITAL_RANGES['Cow'])

        if scenario == 'critical_infection':
            temperature = round(random.uniform(vitals['temp_max'] + 1.2, vitals['temp_max'] + 2.4), 1)
            heart_rate = round(random.uniform(vitals['hr_max'] + 20, vitals['hr_max'] + 45), 0)
            activity_level = "Downer / Severe Lethargy"
            steps = random.randint(10, 80)
            rumination = random.randint(5, 20)
            is_abnormal = 1
        elif scenario == 'fever':
            temperature = round(random.uniform(vitals['temp_max'] + 0.5, vitals['temp_max'] + 1.4), 1)
            heart_rate = round(random.uniform(vitals['hr_max'] + 10, vitals['hr_max'] + 25), 0)
            activity_level = "Restless"
            steps = random.randint(150, 300)
            rumination = random.randint(25, 40)
            is_abnormal = 1
        elif scenario == 'lethargic':
            temperature = round(random.uniform(vitals['temp_min'], vitals['temp_max']), 1)
            heart_rate = round(random.uniform(vitals['hr_min'], vitals['hr_max']), 0)
            activity_level = "Low / Lethargic"
            steps = random.randint(30, 90)
            rumination = random.randint(15, 30)
            is_abnormal = 1
        else: # normal
            temperature = round(random.uniform(vitals['temp_min'] + 0.1, vitals['temp_max'] - 0.1), 1)
            heart_rate = round(random.uniform(vitals['hr_min'] + 5, vitals['hr_max'] - 5), 0)
            activity_level = "Normal Active"
            steps = random.randint(120, 250)
            rumination = random.randint(45, 65)
            is_abnormal = 0

        # Insert reading
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO sensor_readings
            (animal_id, device_id, temperature, heart_rate, activity_level, steps_per_hour, rumination_time_min, is_abnormal, is_simulated)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
        ''', (animal_id, device_id, temperature, heart_rate, activity_level, steps, rumination, is_abnormal))
        reading_id = cursor.lastrowid

        # Update IoT device heartbeat
        cursor.execute('''
            UPDATE iot_devices SET last_heartbeat = CURRENT_TIMESTAMP, status = 'online'
            WHERE device_id = ?
        ''', (device_id,))

        # If abnormal, check whether an alert should be raised
        if is_abnormal:
            ai_eval = LivestockHealthAssessmentEngine.analyze_health_risk(
                species=species,
                temperature=temperature,
                heart_rate=heart_rate,
                activity_level=activity_level,
                mode='iot'
            )

            # Insert alert
            cursor.execute('''
                INSERT INTO alerts
                (animal_id, source_mode, alert_title, reason, risk_level, recommended_action)
                VALUES (?, 'iot_sensor', ?, ?, ?, ?)
            ''', (
                animal_id,
                f"Abnormal Sensor Telemetry ({species} {animal['animal_code']})",
                f"Temp: {temperature}°C (Ref {vitals['temp_min']}-{vitals['temp_max']}°C), HR: {int(heart_rate)} bpm, Activity: {activity_level}",
                ai_eval['risk_level'],
                ai_eval['recommendations']
            ))

            # Record in risk assessments table
            cursor.execute('''
                INSERT INTO risk_assessments
                (animal_id, assessment_mode, risk_score, risk_level, confidence_pct, suspected_conditions, reasons_breakdown, recommendations, urgency_level)
                VALUES (?, 'iot', ?, ?, ?, ?, ?, ?, ?)
            ''', (
                animal_id,
                ai_eval['risk_score'],
                ai_eval['risk_level'],
                ai_eval['confidence_pct'],
                ", ".join(ai_eval['suspected_conditions']),
                "\n".join(ai_eval['reasons_breakdown']),
                ai_eval['recommendations'],
                ai_eval['urgency_level']
            ))

        conn.commit()
        conn.close()

        return {
            'reading_id': reading_id,
            'animal_id': animal_id,
            'device_id': device_id,
            'temperature': temperature,
            'heart_rate': heart_rate,
            'activity_level': activity_level,
            'steps_per_hour': steps,
            'rumination_time_min': rumination,
            'is_abnormal': is_abnormal,
            'scenario': scenario
        }
