/**
 * PashuRaksha AI - Client-side Storage & Full API Simulation Engine
 * Provides persistent localStorage simulation for all Flask backend routes,
 * AI risk analysis, image screening presets, IoT telemetry simulation,
 * vaccination management, alerts, and emergency directories.
 */

(function () {
  const STORE_KEY = 'pashuraksha_db_v2';

  // Species vital ranges
  const SPECIES_VITAL_RANGES = {
    'Cow': { temp_min: 38.0, temp_max: 39.3, hr_min: 48, hr_max: 84 },
    'Buffalo': { temp_min: 37.5, temp_max: 39.0, hr_min: 40, hr_max: 75 },
    'Goat': { temp_min: 38.5, temp_max: 40.0, hr_min: 70, hr_max: 90 },
    'Sheep': { temp_min: 38.5, temp_max: 40.0, hr_min: 70, hr_max: 90 },
    'Dog': { temp_min: 38.0, temp_max: 39.2, hr_min: 60, hr_max: 140 },
    'Cat': { temp_min: 38.1, temp_max: 39.2, hr_min: 140, hr_max: 220 },
    'Other': { temp_min: 37.5, temp_max: 39.5, hr_min: 50, hr_max: 100 }
  };

  const SYMPTOM_ASSOCIATIONS = {
    'Blisters / lesions on mouth or hooves': {
      diseases: ['Foot and Mouth Disease (FMD)'],
      weight: 35,
      critical: true,
      advice: 'Isolate animal immediately to prevent rapid herd transmission. Strict bio-security required.'
    },
    'High fever with shivering': {
      diseases: ['Hemorrhagic Septicemia (HS)', 'Bovine Babesiosis / Tick Fever', 'Ephemeral Fever'],
      weight: 30,
      critical: true,
      advice: 'High fever detected. Keep animal in cool shade, provide electrolyte water and contact vet.'
    },
    'Sudden drop in milk yield (>40%)': {
      diseases: ['Acute Mastitis', 'Subclinical Ketosis', 'Early Infectious Fever'],
      weight: 20,
      critical: false,
      advice: 'Check udder for heat, swelling, or milk clots. Perform strip cup test.'
    },
    'Skin nodules / lumps on body': {
      diseases: ['Lumpy Skin Disease (LSD)'],
      weight: 30,
      critical: true,
      advice: 'Apply neem oil / antiseptic lotion on open sores. Vector control needed.'
    },
    'Swollen throat / difficulty breathing': {
      diseases: ['Hemorrhagic Septicemia (HS)', 'Pneumonic Pasteurellosis'],
      weight: 40,
      critical: true,
      advice: 'EMERGENCY: Swelling near throat indicates possible acute HS. Immediate antibiotic therapy required by veterinarian.'
    },
    'Severe diarrhea or dysentery': {
      diseases: ['Enterotoxemia', 'Bovine Viral Diarrhea (BVD)', 'Coccidiosis'],
      weight: 25,
      critical: false,
      advice: 'Risk of severe dehydration. Offer oral rehydration salts (ORS) frequently.'
    },
    'Complete refusal to eat (Anorexia)': {
      diseases: ['Simple Indigestion', 'Rumen Acidosis', 'Severe Systemic Illness'],
      weight: 20,
      critical: false,
      advice: 'Evaluate rumen motility. Offer clean fresh green fodder and fresh water.'
    },
    'Lameness / unable to walk or stand': {
      diseases: ['Foot Rot', 'Black Quarter (BQ)', 'Hypocalcemia / Milk Fever'],
      weight: 30,
      critical: true,
      advice: 'Inspect hoof soles for foreign objects or swelling in quarter muscles. Do not force animal to stand.'
    },
    'Eye discharge / cloudiness / tears': {
      diseases: ['Infectious Bovine Keratoconjunctivitis (Pinkeye)', 'Theileriosis'],
      weight: 15,
      critical: false,
      advice: 'Clean eyes with warm saline solution. Keep away from direct glare and flies.'
    },
    'Dullness / Lethargy / Drooping ears': {
      diseases: ['Early Stage Sickness', 'Nutritional Deficiency', 'Mild Dehydration'],
      weight: 15,
      critical: false,
      advice: 'Continuous observation needed. Check body temperature twice daily.'
    }
  };

  function getDB() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to parse localStorage db:', e);
    }
    return null;
  }

  function saveDB(db) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // Pre-seed from initial_store.json if not present
  async function initDatabase() {
    if (!getDB()) {
      try {
        const res = await fetch('/static/data/initial_store.json');
        if (res.ok) {
          const data = await res.json();
          saveDB(data);
          console.log('PashuRaksha AI database seeded into localStorage');
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
      }
    }
  }

  // Risk evaluation logic matching Python ai_engine.py
  function evaluateRisk(species, temp, hr, act, feeding, symptoms, historyCount = 0) {
    const ranges = SPECIES_VITAL_RANGES[species] || SPECIES_VITAL_RANGES['Other'];
    let vitalScore = 0;
    const reasons = [];
    const suspected = new Set();
    let hasCritical = false;

    if (temp !== undefined && temp !== null && temp !== '') {
      const t = parseFloat(temp);
      if (t > ranges.temp_max + 1.5) {
        vitalScore += 35;
        reasons.push(`Severe hyperthermia/fever (${t}°C, normal range ${ranges.temp_min}-${ranges.temp_max}°C)`);
      } else if (t > ranges.temp_max) {
        vitalScore += 20;
        reasons.push(`Elevated body temperature (${t}°C, normal max ${ranges.temp_max}°C)`);
      } else if (t < ranges.temp_min - 1.0) {
        vitalScore += 30;
        reasons.push(`Subnormal temperature / Hypothermia (${t}°C, normal min ${ranges.temp_min}°C)`);
      }
    }

    if (hr !== undefined && hr !== null && hr !== '') {
      const h = parseFloat(hr);
      if (h > ranges.hr_max + 25) {
        vitalScore += 25;
        reasons.push(`Marked tachycardia (${h} bpm, normal max ${ranges.hr_max} bpm)`);
      } else if (h > ranges.hr_max) {
        vitalScore += 15;
        reasons.push(`Mild tachycardia (${h} bpm vs max ${ranges.hr_max} bpm)`);
      } else if (h < ranges.hr_min - 15) {
        vitalScore += 20;
        reasons.push(`Bradycardia (${h} bpm vs min ${ranges.hr_min} bpm)`);
      }
    }

    if (act) {
      const actLower = String(act).toLowerCase();
      if (actLower.includes('downer') || actLower.includes('unable to rise')) {
        vitalScore += 35;
        reasons.push('Downer state: animal unable to stand, indicates critical emergency');
      } else if (actLower.includes('lethargic') || actLower.includes('dull') || actLower.includes('low')) {
        vitalScore += 15;
        reasons.push('Depressed activity and lethargic posture observed');
      } else if (actLower.includes('restless') || actLower.includes('hyper')) {
        vitalScore += 10;
        reasons.push('Unusual restlessness/agitation observed');
      }
    }

    let symptomScore = 0;
    if (symptoms) {
      const symList = Array.isArray(symptoms) ? symptoms : [symptoms];
      for (const s of symList) {
        let matched = null;
        for (const [key, info] of Object.entries(SYMPTOM_ASSOCIATIONS)) {
          if (key.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(key.toLowerCase())) {
            matched = info;
            break;
          }
        }
        if (matched) {
          symptomScore += matched.weight;
          reasons.push(matched.advice);
          matched.diseases.forEach(d => suspected.add(d));
          if (matched.critical) hasCritical = true;
        } else {
          symptomScore += 10;
          reasons.push(`Reported observation: ${s}`);
        }
      }
    }

    let feedingScore = 0;
    if (feeding) {
      const fLower = String(feeding).toLowerCase();
      if (fLower.includes('refusing') || fLower.includes('anorexia') || fLower.includes('stopped')) {
        feedingScore = 20;
        reasons.push('Complete feed refusal reported (inappetence indicates acute distress)');
      } else if (fLower.includes('reduced') || fLower.includes('less')) {
        feedingScore = 10;
        reasons.push('Appetite reduced below typical intake');
      }
    }

    let rawScore = Math.min(vitalScore, 50) + Math.min(symptomScore, 60) + feedingScore;
    if (historyCount >= 3) rawScore += 15;
    else if (historyCount >= 1) rawScore += 5;

    if (hasCritical && (vitalScore > 20 || feedingScore > 10)) {
      rawScore = Math.max(rawScore, 75);
    } else if (hasCritical) {
      rawScore = Math.max(rawScore, 65);
    }

    const riskScore = Math.min(Math.max(Math.round(rawScore), 5), 98);
    let riskLevel = 'Low';
    let urgency = 'Routine Care & Preventative Maintenance';
    let rec = 'Health indicators appear within acceptable baseline. Continue balanced nutrition, deworming schedule, and routine vaccination.';

    if (riskScore >= 65) {
      riskLevel = 'High';
      urgency = 'Urgent Veterinary Attention Required';
      rec = 'Isolate the animal immediately. Contact the nearest Veterinary Dispensary / Mobile Clinic (Toll-Free 1962). Avoid unprescribed antibiotics.';
    } else if (riskScore >= 35) {
      riskLevel = 'Moderate';
      urgency = 'Monitor Closely & Schedule Veterinary Checkup';
      rec = 'Keep under observation for the next 12-24 hours. Check temperature every 6 hours, ensure clean water, and consult a vet if signs worsen.';
    }

    if (suspected.size === 0) {
      if (riskLevel === 'Low') suspected.add('Healthy / Normal Physiological State');
      else if (riskLevel === 'Moderate') suspected.add('Mild Indigestion or Early Subclinical State');
      else suspected.add('Acute Unspecified Systemic Infection');
    }

    return {
      risk_score: riskScore,
      risk_level: riskLevel,
      urgency_level: urgency,
      confidence_pct: (temp && symptoms) ? 90 : 82,
      suspected_conditions: Array.from(suspected),
      reasons_breakdown: reasons,
      recommendations: rec,
      disclaimer: 'AI screening is an early-warning advisory tool and does NOT substitute clinical diagnosis by a licensed veterinarian.'
    };
  }

  // Vision presets and pipeline
  function screenImagePipeline(filename, sampleType, species) {
    const target = `${sampleType || ''} ${filename || ''}`.toLowerCase();
    
    if (target.includes('thin') || target.includes('underweight') || target.includes('ribs') || target.includes('bcs') || target.includes('bone')) {
      return {
        image_quality_check: 'Acceptable High Resolution',
        screened_condition: 'Low Body Condition Score (BCS 1.5 - 2.0 / Severe Underweight)',
        bcs_category: 'Underweight / Emaciated (BCS < 2.0)',
        visual_findings: 'Prominent dorsal spinal processes and transverse rib projections clearly visible with noticeable muscle wasting across flanks.',
        differential_causes: [
          'Subnutrition / Low Caloric Intake',
          'Heavy Internal Parasitic Load (Gastrointestinal Nematodes / Flukes)',
          'Dental Attrition / Poor Mastication',
          "Johne's Disease (Paratuberculosis) subclinical wasting"
        ],
        risk_score: 72,
        risk_level: 'High',
        confidence: 0.88,
        urgent_vet_recommended: true,
        safe_immediate_care: [
          'Provide clean, fresh drinking water and digestible soft green fodder in small frequent feedings.',
          'Quarantine in a shaded, well-bedded stall to prevent pressure lesions.',
          'Do NOT administer unprescribed high-dose anthelmintics or steroids without veterinary diagnosis.'
        ],
        veterinary_urgency: 'Schedule veterinary polyclinic evaluation for fecal egg floatation and nutritional plan.',
        veterinary_care_plan: 'Nutritional rehabilitation with total mixed ration, targeted anthelmintic therapy upon McMaster fecal count.',
        followup_questions: [
          'Has the animal experienced chronic watery diarrhea or loose stools?',
          'Is the animal currently lactating or recently calved?',
          'When was the last scheduled deworming administered?'
        ],
        escalation_triggers: 'Immediate escalation if animal becomes recumbent (Downer Cow) or temperature drops below 37.5°C.'
      };
    } else if (target.includes('nodule') || target.includes('lumpy') || target.includes('lsd') || target.includes('skin_disease')) {
      return {
        image_quality_check: 'Good Clarity & Illumination',
        screened_condition: 'Suspected Lumpy Skin Disease (LSD Cutaneous Nodules)',
        bcs_category: 'BCS 2.5 (Moderate)',
        visual_findings: 'Multiple circumscribed 2-5 cm cutaneous firm nodules observed across neck, flank, and rump surfaces.',
        differential_causes: [
          'Capripoxvirus (Lumpy Skin Disease)',
          'Pseudo-Lumpy Skin Disease (Bovine Herpesvirus 2)',
          'Demodicosis / Insect Bite Hypersensitivity'
        ],
        risk_score: 85,
        risk_level: 'High',
        confidence: 0.91,
        urgent_vet_recommended: true,
        safe_immediate_care: [
          'Strict physical isolation of the infected cow from other cattle immediately.',
          'Apply antiseptic fly-repellent dressings (neem oil or topical sprays) to open lesions to prevent maggot strikes.',
          'Disinfect sheds and implement mosquito/biting-fly control measures.'
        ],
        veterinary_urgency: 'URGENT: Notify veterinary authorities / 1962 mobile unit for statutory transboundary disease protocol.',
        veterinary_care_plan: 'Antipyretics, supportive NSAID therapy, antiseptic topical sprays, biosecurity containment.',
        followup_questions: [
          'Are there enlarged superficial lymph nodes near the shoulder or stifle?',
          'Has an acute drop in daily milk yield or fever (>40°C) occurred?',
          'Are other animals in the village exhibiting similar nodules?'
        ],
        escalation_triggers: 'Oral or respiratory mucosal lesions causing labored stridor breathing or secondary mastitis.'
      };
    } else if (target.includes('fmd') || target.includes('lesion') || target.includes('hoof') || target.includes('mouth') || target.includes('blister')) {
      return {
        image_quality_check: 'High Clarity',
        screened_condition: 'Suspected Foot and Mouth Disease (FMD Vesicular Ulcerations)',
        bcs_category: 'BCS 3.0 (Adequate)',
        visual_findings: 'Erosive vesicular lesions and raw red mucosal margins identified along interdigital hoof cleft / dental pad.',
        differential_causes: [
          'Aphthovirus (Foot and Mouth Disease)',
          'Vesicular Stomatitis',
          'Foot Rot (Fusobacterium necrophorum)'
        ],
        risk_score: 92,
        risk_level: 'High',
        confidence: 0.94,
        urgent_vet_recommended: true,
        safe_immediate_care: [
          'Isolate animal in dry soft-bedded shed. Avoid driving animal on hard or pebbled roads.',
          'Wash mouth and lesions with mild 1:1000 potassium permanganate solution or boric acid wash.',
          'Offer soft digestible gruel / mash (cooked rice, ragi porridge) as roughage will cause painful oral bleeding.'
        ],
        veterinary_urgency: 'HIGH EMERGENCY: Contagious transboundary disease. Call 1962 immediately.',
        veterinary_care_plan: 'Supportive topical antiseptic therapy, protective foot baths, fluid replacement if off-feed.',
        followup_questions: [
          'Is ropey, stringy hypersalivation or lip-smacking observed?',
          'Is the animal reluctant to bear weight on one or more limbs?'
        ],
        escalation_triggers: 'Hoof sloughing or sudden weakness/collapse in suckling calves.'
      };
    } else if (target.includes('blurry') || target.includes('dark') || target.includes('unclear')) {
      return {
        image_quality_check: 'Suboptimal / Low Lighting',
        screened_condition: 'Inconclusive / Low Quality Image',
        bcs_category: 'Unable to evaluate reliably',
        visual_findings: 'Image is too blurred or inadequately illuminated to inspect skin lesions or anatomical skeletal margins.',
        differential_causes: ['Image blur / motion artifacts'],
        risk_score: 15,
        risk_level: 'Inconclusive',
        confidence: 0.40,
        urgent_vet_recommended: false,
        safe_immediate_care: ['Please capture a clear, well-lit side-profile photograph in daylight.'],
        veterinary_urgency: 'Retake photo for screening.',
        veterinary_care_plan: 'Retake clinical photograph.',
        followup_questions: ['Can you provide a clear image of the animal in daylight?'],
        escalation_triggers: 'None.'
      };
    } else {
      // Healthy normal
      return {
        image_quality_check: 'Excellent Sharpness & Daylight Lighting',
        screened_condition: 'Normal Healthy Body Condition & Glossy Coat',
        bcs_category: 'Optimal Normal BCS (3.0 - 3.25)',
        visual_findings: 'Even muscle tone, smooth hair coat, well-covered ribs without hollow paralumbar depression. No cutaneous nodules or erosions.',
        differential_causes: ['Normal Healthy Bovine'],
        risk_score: 10,
        risk_level: 'Low',
        confidence: 0.96,
        urgent_vet_recommended: false,
        safe_immediate_care: [
          'Maintain regular feeding of balanced Total Mixed Ration (TMR) and clean ad-libitum water.',
          'Ensure routine bi-annual NADCP vaccination boosters for FMD and HS.',
          'Continue regular seasonal ectoparasite prevention.'
        ],
        veterinary_urgency: 'No immediate veterinary intervention required. Maintain routine monitoring.',
        veterinary_care_plan: 'Standard preventive herd management and nutritional maintenance.',
        followup_questions: [
          'Is current daily milk yield and rumination rate stable at baseline?'
        ],
        escalation_triggers: 'Monitor for any sudden decline in feeding or rumination time.'
      };
    }
  }

  // Intercept window.fetch to service /api/* routes locally
  const originalFetch = window.fetch;

  window.fetch = async function (resource, options = {}) {
    const urlStr = typeof resource === 'string' ? resource : (resource ? resource.url : '');
    
    // Only intercept local /api/ requests
    if (urlStr.startsWith('/api/')) {
      await initDatabase();
      const db = getDB() || {};
      const method = (options.method || 'GET').toUpperCase();
      const parsedUrl = new URL(urlStr, window.location.origin);
      const pathname = parsedUrl.pathname;
      const params = parsedUrl.searchParams;

      // 1. Current user
      if (pathname === '/api/auth/current_user') {
        const users = db.users || [];
        const user = users[0] || { id: 1, name: 'Murugan R.', mobile: '9842154321', role: 'farmer', state: 'Tamil Nadu', district: 'Coimbatore' };
        return mockResponse({ authenticated: true, user });
      }

      // 2. Auth login
      if (pathname === '/api/auth/login' && method === 'POST') {
        let body = {};
        try { body = JSON.parse(options.body || '{}'); } catch(e){}
        const mobile = body.mobile || '9842154321';
        let user = (db.users || []).find(u => u.mobile === mobile);
        if (!user) {
          user = {
            id: (db.users || []).length + 1,
            name: body.name || `Farmer ${mobile.slice(-4)}`,
            mobile: mobile,
            role: body.role || 'farmer',
            state: body.state || 'Tamil Nadu',
            district: body.district || 'Coimbatore',
            village_pin: '641001',
            created_at: new Date().toISOString()
          };
          db.users = db.users || [];
          db.users.push(user);
          saveDB(db);
        }
        return mockResponse({ success: true, user });
      }

      // 3. Animals list
      if (pathname === '/api/animals' && method === 'GET') {
        const animals = (db.animals || []).map(a => {
          const user = (db.users || []).find(u => u.id === a.owner_id) || {};
          const animalReadings = (db.sensor_readings || []).filter(sr => sr.animal_id === a.id);
          const latestReading = animalReadings[animalReadings.length - 1] || {};
          const animalAssessments = (db.risk_assessments || []).filter(ra => ra.animal_id === a.id);
          const latestAssessment = animalAssessments[animalAssessments.length - 1] || {};
          const openAlerts = (db.alerts || []).filter(al => al.animal_id === a.id && !al.is_resolved).length;

          return {
            ...a,
            owner_name: user.name || 'Murugan R.',
            owner_mobile: user.mobile || '9842154321',
            owner_district: user.district || 'Coimbatore',
            open_alerts_count: openAlerts,
            latest_risk_level: latestAssessment.risk_level || 'Low',
            latest_temp: latestReading.temperature || a.baseline_temp || 38.6,
            latest_hr: latestReading.heart_rate || a.baseline_hr || 70,
            latest_telemetry_time: latestReading.recorded_at || a.created_at
          };
        });
        return mockResponse(animals);
      }

      // 4. Animal single
      if (pathname.match(/^\/api\/animals\/\d+$/) && method === 'GET') {
        const id = parseInt(pathname.split('/').pop(), 10);
        const animal = (db.animals || []).find(a => a.id === id);
        if (!animal) return mockResponse({ error: 'Animal not found' }, 404);
        const user = (db.users || []).find(u => u.id === animal.owner_id) || {};
        const readings = (db.sensor_readings || []).filter(sr => sr.animal_id === id).slice(-20);
        const assessments = (db.risk_assessments || []).filter(ra => ra.animal_id === id).slice(-10);
        return mockResponse({
          ...animal,
          owner_name: user.name,
          owner_mobile: user.mobile,
          state: user.state,
          district: user.district,
          sensor_readings: readings,
          assessments: assessments
        });
      }

      // 5. Register animal
      if (pathname === '/api/animals/register' && method === 'POST') {
        let body = {};
        try { body = JSON.parse(options.body || '{}'); } catch(e){}
        const species = body.species || 'Cow';
        const prefix = species.substring(0, 3).toUpperCase();
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const animalCode = `${prefix}-${randNum}`;

        const newId = (db.animals || []).length + 1;
        const newAnimal = {
          id: newId,
          animal_code: animalCode,
          uuid: 'uuid-' + Math.random().toString(36).substring(2, 9),
          owner_id: 1,
          species: species,
          breed: body.breed || 'Local / Desi',
          animal_name: body.animal_name || `${species} ${animalCode}`,
          age_years: parseFloat(body.age_years) || 3.0,
          gender: body.gender || 'Female',
          baseline_temp: (SPECIES_VITAL_RANGES[species] || SPECIES_VITAL_RANGES['Cow']).temp_min + 0.6,
          baseline_hr: (SPECIES_VITAL_RANGES[species] || SPECIES_VITAL_RANGES['Cow']).hr_min + 15,
          iot_enabled: body.iot_enabled ? 1 : 0,
          iot_device_id: body.iot_enabled ? (body.iot_device_id || `ESP32-TAG-${randNum}`) : null,
          status: 'active',
          created_at: new Date().toISOString()
        };

        db.animals = db.animals || [];
        db.animals.push(newAnimal);

        // If IoT enabled, add device
        if (newAnimal.iot_enabled) {
          db.iot_devices = db.iot_devices || [];
          db.iot_devices.push({
            id: db.iot_devices.length + 1,
            device_id: newAnimal.iot_device_id,
            animal_id: newId,
            device_type: 'ESP32-Livestock-Tag',
            status: 'online',
            battery_pct: 98,
            last_heartbeat: new Date().toISOString(),
            created_at: new Date().toISOString()
          });
        }

        saveDB(db);
        return mockResponse({
          success: true,
          animal_id: newId,
          animal_code: animalCode,
          message: `Animal ${animalCode} successfully registered!`
        });
      }

      // 6. Manual assessment
      if (pathname === '/api/assessment/manual' && method === 'POST') {
        let body = {};
        try { body = JSON.parse(options.body || '{}'); } catch(e){}
        const animalId = parseInt(body.animal_id, 10);
        const animal = (db.animals || []).find(a => a.id === animalId) || {};
        const abnormalHistory = (db.sensor_readings || []).filter(sr => sr.animal_id === animalId && sr.is_abnormal).length;

        const analysis = evaluateRisk(
          animal.species || 'Cow',
          body.temperature,
          body.heart_rate,
          body.activity_status,
          body.feeding_status,
          body.symptoms,
          abnormalHistory
        );

        db.manual_observations = db.manual_observations || [];
        db.manual_observations.push({
          id: db.manual_observations.length + 1,
          animal_id: animalId,
          temperature: body.temperature || null,
          heart_rate: body.heart_rate || null,
          feeding_status: body.feeding_status,
          activity_status: body.activity_status,
          symptoms: JSON.stringify(body.symptoms || []),
          notes: body.notes || '',
          recorded_at: new Date().toISOString()
        });

        const assessmentId = (db.risk_assessments || []).length + 1;
        db.risk_assessments = db.risk_assessments || [];
        db.risk_assessments.push({
          id: assessmentId,
          animal_id: animalId,
          assessment_mode: 'manual',
          risk_score: analysis.risk_score,
          risk_level: analysis.risk_level,
          confidence_pct: analysis.confidence_pct,
          suspected_conditions: analysis.suspected_conditions.join(', '),
          reasons_breakdown: analysis.reasons_breakdown.join('\n'),
          recommendations: analysis.recommendations,
          urgency_level: analysis.urgency_level,
          created_at: new Date().toISOString()
        });

        if (analysis.risk_level === 'Moderate' || analysis.risk_level === 'High') {
          db.alerts = db.alerts || [];
          db.alerts.unshift({
            id: db.alerts.length + 1,
            animal_id: animalId,
            source_mode: 'manual_symptom',
            alert_title: `${analysis.risk_level} Health Risk from Manual Check (${animal.animal_code || 'Herd'})`,
            reason: analysis.reasons_breakdown.slice(0, 2).join('; '),
            risk_level: analysis.risk_level,
            recommended_action: analysis.recommendations,
            is_resolved: 0,
            created_at: new Date().toISOString()
          });
        }

        saveDB(db);
        return mockResponse({
          success: true,
          assessment_id: assessmentId,
          animal_code: animal.animal_code,
          animal_name: animal.animal_name,
          result: analysis
        });
      }

      // 7. IoT simulate
      if (pathname === '/api/iot/simulate' && method === 'POST') {
        let body = {};
        try { body = JSON.parse(options.body || '{}'); } catch(e){}
        const animalId = parseInt(body.animal_id || 1, 10);
        const scenario = body.scenario || 'normal';
        const animal = (db.animals || []).find(a => a.id === animalId) || { animal_code: 'COW-1047', species: 'Cow' };
        const ranges = SPECIES_VITAL_RANGES[animal.species] || SPECIES_VITAL_RANGES['Cow'];

        let temp = ranges.temp_min + 0.6;
        let hr = ranges.hr_min + 15;
        let act = 'Normal';
        let isAbnormal = 0;

        if (scenario === 'fever') {
          temp = 40.2;
          hr = ranges.hr_max + 12;
          act = 'Restless';
          isAbnormal = 1;
        } else if (scenario === 'lethargic') {
          temp = ranges.temp_min - 0.4;
          hr = ranges.hr_min - 6;
          act = 'Low/Lethargic';
          isAbnormal = 1;
        } else if (scenario === 'critical_infection') {
          temp = 41.1;
          hr = ranges.hr_max + 32;
          act = 'Downer / Recumbent';
          isAbnormal = 1;
        }

        db.sensor_readings = db.sensor_readings || [];
        db.sensor_readings.push({
          id: db.sensor_readings.length + 1,
          animal_id: animalId,
          device_id: animal.iot_device_id || 'ESP32-COLLAR-1047',
          temperature: temp,
          heart_rate: hr,
          activity_level: act,
          is_abnormal: isAbnormal,
          is_simulated: 1,
          recorded_at: new Date().toISOString()
        });

        if (isAbnormal) {
          const evalRes = evaluateRisk(animal.species, temp, hr, act);
          db.alerts = db.alerts || [];
          db.alerts.unshift({
            id: db.alerts.length + 1,
            animal_id: animalId,
            source_mode: 'iot_sensor',
            alert_title: `IoT Alert: Abnormal Vitals (${animal.animal_code})`,
            reason: `Temp: ${temp}°C, HR: ${hr} bpm, Activity: ${act}`,
            risk_level: evalRes.risk_level,
            recommended_action: evalRes.recommendations,
            is_resolved: 0,
            created_at: new Date().toISOString()
          });
        }

        saveDB(db);
        return mockResponse({
          success: true,
          scenario: scenario,
          telemetry: {
            temperature: temp,
            heart_rate: hr,
            activity_level: act,
            is_abnormal: isAbnormal,
            device_id: animal.iot_device_id || 'ESP32-COLLAR-1047',
            recorded_at: new Date().toISOString()
          }
        });
      }

      // 8. Vision screening
      if (pathname === '/api/vision/screen' && method === 'POST') {
        let animalId = 1;
        let sampleType = '';
        let fileName = 'sample.jpg';

        if (options.body instanceof FormData) {
          animalId = parseInt(options.body.get('animal_id') || 1, 10);
          sampleType = options.body.get('sample_type') || '';
          const photo = options.body.get('photo');
          if (photo && photo.name) fileName = photo.name;
        }

        const animal = (db.animals || []).find(a => a.id === animalId) || { animal_code: 'COW-1047', species: 'Cow' };
        const visionRes = screenImagePipeline(fileName, sampleType, animal.species);

        const assessmentId = (db.risk_assessments || []).length + 1;
        db.risk_assessments = db.risk_assessments || [];
        db.risk_assessments.push({
          id: assessmentId,
          animal_id: animalId,
          assessment_mode: 'photo',
          risk_score: visionRes.risk_score,
          risk_level: visionRes.risk_level,
          confidence_pct: Math.round(visionRes.confidence * 100),
          suspected_conditions: visionRes.screened_condition,
          reasons_breakdown: visionRes.visual_findings,
          recommendations: visionRes.veterinary_care_plan || visionRes.safe_immediate_care[0],
          urgency_level: visionRes.veterinary_urgency || 'Routine Care',
          created_at: new Date().toISOString()
        });

        db.care_plans = db.care_plans || [];
        db.care_plans.unshift({
          id: db.care_plans.length + 1,
          animal_id: animalId,
          assessment_id: assessmentId,
          plan_title: `Care Plan: ${visionRes.screened_condition.substring(0, 50)} (${animal.animal_code})`,
          observable_findings: visionRes.visual_findings,
          body_condition_score: visionRes.bcs_category || 'Not specified',
          suspected_causes: (visionRes.differential_causes || []).join('\n'),
          overall_risk_level: visionRes.risk_level,
          immediate_safe_care: (visionRes.safe_immediate_care || []).join('\n'),
          veterinary_urgency: visionRes.veterinary_urgency || 'Routine checkup',
          followup_questions: (visionRes.followup_questions || []).join('\n'),
          treatment_overview: visionRes.veterinary_care_plan || 'Clinical evaluation advised.',
          prevention_plan: 'Follow biosecurity and balanced nutrition.',
          escalation_triggers: visionRes.escalation_triggers || 'Seek emergency vet care if animal collapses.',
          created_at: new Date().toISOString()
        });

        if (visionRes.risk_level === 'High') {
          db.alerts = db.alerts || [];
          db.alerts.unshift({
            id: db.alerts.length + 1,
            animal_id: animalId,
            source_mode: 'ai_vision',
            alert_title: `Visual Screening Alert (${animal.animal_code})`,
            reason: visionRes.visual_findings,
            risk_level: 'High',
            recommended_action: 'Isolate animal and contact veterinary polyclinic',
            is_resolved: 0,
            created_at: new Date().toISOString()
          });
        }

        saveDB(db);
        return mockResponse({
          success: true,
          animal_code: animal.animal_code,
          animal_name: animal.animal_name,
          screening: visionRes,
          image_url: `/static/uploads/${fileName}`
        });
      }

      // 9. Disease library
      if (pathname === '/api/diseases' && method === 'GET') {
        const key = params.get('key');
        const q = (params.get('q') || '').toLowerCase();
        let list = db.disease_library || [];

        if (key) {
          const item = list.find(d => d.disease_key === key);
          if (item) return mockResponse(item);
          return mockResponse({ error: 'Disease not found' }, 404);
        }

        if (q) {
          list = list.filter(d => 
            (d.name || '').toLowerCase().includes(q) ||
            (d.description || '').toLowerCase().includes(q) ||
            (d.common_symptoms || '').toLowerCase().includes(q)
          );
        }
        return mockResponse(list);
      }

      // 10. Care plans
      if (pathname === '/api/care-plans' && method === 'GET') {
        const animalId = params.get('animal_id');
        let plans = (db.care_plans || []).map(cp => {
          const a = (db.animals || []).find(an => an.id === cp.animal_id) || {};
          return {
            ...cp,
            animal_code: a.animal_code || 'COW-1047',
            animal_name: a.animal_name || 'Lakshmi',
            species: a.species || 'Cow'
          };
        });
        if (animalId) {
          plans = plans.filter(p => String(p.animal_id) === String(animalId));
        }
        return mockResponse(plans);
      }

      // 11. Emergency directory
      if (pathname === '/api/emergency/directory' && method === 'GET') {
        const state = params.get('state') || 'Tamil Nadu';
        const district = params.get('district') || 'Coimbatore';

        const helplines = (db.helplines || []).filter(h => h.state === state || h.state === 'All India');
        const hospitals = (db.veterinary_hospitals || []).filter(h => h.state === state && (h.district === district || !district));

        return mockResponse({
          state,
          district,
          helplines: helplines.length > 0 ? helplines : db.helplines || [],
          hospitals: hospitals.length > 0 ? hospitals : db.veterinary_hospitals || []
        });
      }

      // 12. Helpline admin
      if (pathname === '/api/admin/helplines') {
        if (method === 'POST') {
          let body = {};
          try { body = JSON.parse(options.body || '{}'); } catch(e){}
          db.helplines = db.helplines || [];
          db.helplines.push({
            id: db.helplines.length + 1,
            state: body.state || 'Tamil Nadu',
            district: body.district || 'All Districts',
            helpline_number: body.helpline_number || '1962',
            service_name: body.service_name || 'Mobile Clinic',
            service_type: body.service_type || 'Mobile Unit',
            operating_hours: body.operating_hours || '24x7',
            official_source: body.official_source || 'https://dahd.nic.in',
            last_verified_date: new Date().toISOString().split('T')[0],
            is_active: 1
          });
          saveDB(db);
          return mockResponse({ success: true, message: 'Helpline registered' });
        }
        return mockResponse(db.helplines || []);
      }

      // 13. Vaccinations
      if (pathname === '/api/vaccinations') {
        if (method === 'POST') {
          let body = {};
          try { body = JSON.parse(options.body || '{}'); } catch(e){}
          const newId = (db.vaccinations || []).length + 1;
          db.vaccinations = db.vaccinations || [];
          db.vaccinations.push({
            id: newId,
            animal_id: parseInt(body.animal_id, 10),
            vaccine_name: body.vaccine_name,
            scheduled_date: body.scheduled_date,
            status: 'Scheduled',
            veterinarian_notes: body.notes || 'Scheduled vaccination'
          });
          saveDB(db);
          return mockResponse({ success: true, id: newId, message: 'Vaccine record scheduled successfully' });
        }

        const list = (db.vaccinations || []).map(v => {
          const a = (db.animals || []).find(an => an.id === v.animal_id) || {};
          return {
            ...v,
            animal_code: a.animal_code || 'COW-1047',
            animal_name: a.animal_name || 'Cow',
            species: a.species || 'Cow'
          };
        });
        return mockResponse(list);
      }

      if (pathname.match(/^\/api\/vaccinations\/\d+\/complete$/) && method === 'POST') {
        const id = parseInt(pathname.split('/')[3], 10);
        const v = (db.vaccinations || []).find(vac => vac.id === id);
        if (v) {
          v.status = 'Completed';
          v.administered_date = new Date().toISOString().split('T')[0];
          saveDB(db);
        }
        return mockResponse({ success: true, message: 'Vaccination confirmed as Completed!' });
      }

      if (pathname.match(/^\/api\/vaccinations\/\d+$/) && method === 'DELETE') {
        const id = parseInt(pathname.split('/').pop(), 10);
        db.vaccinations = (db.vaccinations || []).filter(v => v.id !== id);
        saveDB(db);
        return mockResponse({ success: true, message: 'Vaccination record removed successfully' });
      }

      // 14. Alerts
      if (pathname === '/api/alerts' && method === 'GET') {
        const list = (db.alerts || []).map(al => {
          const a = (db.animals || []).find(an => an.id === al.animal_id) || {};
          const u = (db.users || []).find(usr => usr.id === a.owner_id) || {};
          return {
            ...al,
            animal_code: a.animal_code || 'COW-1047',
            animal_name: a.animal_name || a.species || 'Livestock',
            species: a.species || 'Cow',
            owner_name: u.name || 'Farmer',
            owner_mobile: u.mobile || '9842154321',
            owner_district: u.district || 'Coimbatore'
          };
        });
        return mockResponse(list);
      }

      if (pathname.match(/^\/api\/alerts\/\d+\/resolve$/) && method === 'POST') {
        const id = parseInt(pathname.split('/')[3], 10);
        const alert = (db.alerts || []).find(al => al.id === id);
        if (alert) {
          alert.is_resolved = 1;
          alert.resolved_at = new Date().toISOString();
          saveDB(db);
        }
        return mockResponse({ success: true });
      }

      // 15. Dashboard stats
      if (pathname === '/api/dashboard/stats' && method === 'GET') {
        const total = (db.animals || []).filter(a => a.status === 'active').length;
        const iot = (db.animals || []).filter(a => a.status === 'active' && a.iot_enabled).length;
        const openAlerts = (db.alerts || []).filter(al => !al.is_resolved).length;
        const highRisk = (db.alerts || []).filter(al => !al.is_resolved && al.risk_level === 'High').length;

        const recentAssessments = (db.risk_assessments || []).slice(-5).reverse().map(ra => {
          const a = (db.animals || []).find(an => an.id === ra.animal_id) || {};
          return {
            ...ra,
            animal_code: a.animal_code || 'COW-1047',
            animal_name: a.animal_name || 'Livestock',
            species: a.species || 'Cow'
          };
        });

        const upcomingVaccines = (db.vaccinations || []).filter(v => v.status === 'Scheduled').slice(0, 5).map(v => {
          const a = (db.animals || []).find(an => an.id === v.animal_id) || {};
          return {
            ...v,
            animal_code: a.animal_code || 'COW-1047',
            animal_name: a.animal_name || 'Livestock',
            species: a.species || 'Cow'
          };
        });

        return mockResponse({
          total_animals: total,
          iot_animals: iot,
          manual_animals: total - iot,
          open_alerts: openAlerts,
          high_risk_alerts: highRisk,
          recent_assessments: recentAssessments,
          upcoming_vaccines: upcomingVaccines
        });
      }

      // 16. Metadata
      if (pathname === '/api/metadata/reference-ranges') {
        return mockResponse({
          vitals: SPECIES_VITAL_RANGES,
          symptoms: SYMPTOM_ASSOCIATIONS
        });
      }

      return mockResponse({ error: 'Endpoint not found' }, 404);
    }

    // Default to network fetch for static files, etc.
    return originalFetch.apply(this, arguments);
  };

  function mockResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status: status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Auto initialize on script load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDatabase);
  } else {
    initDatabase();
  }
})();
