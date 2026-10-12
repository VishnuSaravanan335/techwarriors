import unittest
import json
import os
from app import app
from database import get_db, init_db
from seed_data import seed_database
from ai_engine import LivestockHealthAssessmentEngine

class TestLivestockHealthPlatform(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        seed_database()
        cls.client = app.test_client()

    def test_01_database_and_cows_seeded(self):
        """Verify the 3 requested demo cows (Lakshmi COW-1047, Ponni COW-2851, Kaveri COW-6392) exist"""
        conn = get_db()
        cows = conn.execute("SELECT animal_code, animal_name FROM animals WHERE species = 'Cow'").fetchall()
        codes = [c['animal_code'] for c in cows]
        names = [c['animal_name'] for c in cows]
        conn.close()

        self.assertIn('COW-1047', codes)
        self.assertIn('COW-2851', codes)
        self.assertIn('COW-6392', codes)
        self.assertIn('Lakshmi', names)
        self.assertIn('Ponni', names)
        self.assertIn('Kaveri', names)

    def test_02_register_animal_auto_id(self):
        """Verify animal registration auto-generates collision-resistant unique short code"""
        payload = {
            'owner_name': 'Murugan R.',
            'mobile': '9842154321',
            'species': 'Buffalo',
            'animal_name': 'Nandi',
            'age_years': 4.0,
            'iot_enabled': True
        }
        res = self.client.post('/api/animals/register', data=json.dumps(payload), headers={'Content-Type': 'application/json'})
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertTrue(data['animal_code'].startswith('BUF-'))
        self.assertIsNotNone(data['animal_id'])

    def test_03_ai_risk_engine_healthy(self):
        """Verify baseline normal readings evaluate to Low risk"""
        res = LivestockHealthAssessmentEngine.analyze_health_risk(
            species='Cow',
            temperature=38.6,
            heart_rate=68,
            activity_level='Normal Active',
            feeding_status='Normal Appetite',
            symptoms_list=[]
        )
        self.assertEqual(res['risk_level'], 'Low')
        self.assertLess(res['risk_score'], 35)

    def test_04_ai_risk_engine_high_risk_symptom(self):
        """Verify critical symptoms trigger High risk and urgent veterinary referral"""
        res = LivestockHealthAssessmentEngine.analyze_health_risk(
            species='Cow',
            temperature=40.4,
            heart_rate=88,
            activity_level='Restless',
            feeding_status='Refusing Food',
            symptoms_list=['Skin nodules / lumps on body', 'High fever with shivering']
        )
        self.assertEqual(res['risk_level'], 'High')
        self.assertGreaterEqual(res['risk_score'], 65)
        self.assertIn('Lumpy Skin Disease (LSD)', res['suspected_conditions'])

    def test_05_manual_assessment_endpoint(self):
        """Test API endpoint for Mode 2 manual health checklist"""
        payload = {
            'animal_id': 1,
            'temperature': 39.8,
            'heart_rate': 82,
            'feeding_status': 'Reduced Feeding',
            'activity_status': 'Dull / Lethargic',
            'symptoms': ['Dullness / Lethargy / Drooping ears']
        }
        res = self.client.post('/api/assessments/manual', data=json.dumps(payload), headers={'Content-Type': 'application/json'})
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertIn('risk_level', data['result'])

    def test_06_iot_simulation_endpoint(self):
        """Test Mode 1 IoT sensor telemetry simulator"""
        payload = {
            'animal_id': 1,
            'scenario': 'fever'
        }
        res = self.client.post('/api/iot/simulate', data=json.dumps(payload), headers={'Content-Type': 'application/json'})
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['telemetry']['is_abnormal'], 1)

    def test_07_emergency_directory_endpoint(self):
        """Test emergency helpline retrieval (1962 verified Tamil Nadu & Coimbatore polyclinic)"""
        res = self.client.get('/api/emergency/directory?state=Tamil+Nadu&district=Coimbatore')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        helplines = [h['helpline_number'] for h in data['helplines']]
        self.assertIn('1962', helplines)
        self.assertGreaterEqual(len(data['hospitals']), 1)

    def test_08_photo_ai_screening(self):
        """Test computer-vision module for visible cutaneous nodule detection"""
        res = LivestockHealthAssessmentEngine.screen_animal_image('cow_lumpy_skin_flank.jpg', species='Cow')
        self.assertEqual(res['risk_level'], 'High')
        self.assertIn('Cutaneous Nodules', res['screened_condition'])
        self.assertTrue(res['urgent_vet_recommended'])

    def test_09_underweight_cow_care_plan(self):
        """Test veterinary body condition estimation and personalized care plan generation for thin cow"""
        res = LivestockHealthAssessmentEngine.screen_animal_image('thin_cow_underweight.jpg', species='Cow')
        self.assertIn('Underweight', res['screened_condition'])
        self.assertIn('BCS < 2.0', res['bcs_category'])
        self.assertGreater(len(res['differential_causes']), 3)
        self.assertGreater(len(res['safe_immediate_care']), 3)
        self.assertGreater(len(res['followup_questions']), 3)
        self.assertEqual(res['disease_library_key'], 'bovine_underweight_malnutrition')

    def test_10_disease_library_endpoint(self):
        """Test disease library endpoint retrieval"""
        res = self.client.get('/api/diseases?key=bovine_underweight_malnutrition')
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertIn('Underweight', data['name'])
        self.assertIn('Dr. S. Kabilan', data['veterinary_reviewer'])

if __name__ == '__main__':
    unittest.main()
