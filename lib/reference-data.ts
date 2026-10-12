// Reference data and care-plan templates ported verbatim from the original Python AI engine.

export const SPECIES_VITAL_RANGES: Record<string, VitalRange> = {
  "Cow": {
    "temp_min": 38.0,
    "temp_max": 39.3,
    "temp_unit": "°C",
    "hr_min": 48,
    "hr_max": 84,
    "hr_unit": "bpm",
    "rumination_min_day": 400,
    "steps_min_day": 1200
  },
  "Buffalo": {
    "temp_min": 37.5,
    "temp_max": 39.0,
    "temp_unit": "°C",
    "hr_min": 40,
    "hr_max": 75,
    "hr_unit": "bpm",
    "rumination_min_day": 380,
    "steps_min_day": 1000
  },
  "Goat": {
    "temp_min": 38.5,
    "temp_max": 40.0,
    "temp_unit": "°C",
    "hr_min": 70,
    "hr_max": 90,
    "hr_unit": "bpm",
    "rumination_min_day": 300,
    "steps_min_day": 2000
  },
  "Sheep": {
    "temp_min": 38.5,
    "temp_max": 40.0,
    "temp_unit": "°C",
    "hr_min": 70,
    "hr_max": 90,
    "hr_unit": "bpm",
    "rumination_min_day": 300,
    "steps_min_day": 1800
  },
  "Dog": {
    "temp_min": 38.0,
    "temp_max": 39.2,
    "temp_unit": "°C",
    "hr_min": 60,
    "hr_max": 140,
    "hr_unit": "bpm",
    "rumination_min_day": 0,
    "steps_min_day": 3000
  },
  "Cat": {
    "temp_min": 38.1,
    "temp_max": 39.2,
    "temp_unit": "°C",
    "hr_min": 140,
    "hr_max": 220,
    "hr_unit": "bpm",
    "rumination_min_day": 0,
    "steps_min_day": 1500
  },
  "Other": {
    "temp_min": 37.5,
    "temp_max": 39.5,
    "temp_unit": "°C",
    "hr_min": 50,
    "hr_max": 100,
    "hr_unit": "bpm",
    "rumination_min_day": 250,
    "steps_min_day": 1000
  }
};

export const SYMPTOM_DISEASE_ASSOCIATIONS: Record<string, SymptomInfo> = {
  "Blisters / lesions on mouth or hooves": {
    "diseases": [
      "Foot and Mouth Disease (FMD)"
    ],
    "weight": 35,
    "critical": true,
    "advice": "Isolate animal immediately to prevent rapid herd transmission. Strict bio-security required."
  },
  "High fever with shivering": {
    "diseases": [
      "Hemorrhagic Septicemia (HS)",
      "Bovine Babesiosis / Tick Fever",
      "Ephemeral Fever"
    ],
    "weight": 30,
    "critical": true,
    "advice": "High fever detected. Keep animal in cool shade, provide electrolyte water and contact vet."
  },
  "Sudden drop in milk yield (>40%)": {
    "diseases": [
      "Acute Mastitis",
      "Subclinical Ketosis",
      "Early Infectious Fever"
    ],
    "weight": 20,
    "critical": false,
    "advice": "Check udder for heat, swelling, or milk clots. Perform strip cup test."
  },
  "Skin nodules / lumps on body": {
    "diseases": [
      "Lumpy Skin Disease (LSD)"
    ],
    "weight": 30,
    "critical": true,
    "advice": "Apply neem oil / antiseptic lotion on open sores. Vector control (mosquito/fly repellent) needed."
  },
  "Swollen throat / difficulty breathing": {
    "diseases": [
      "Hemorrhagic Septicemia (HS)",
      "Pneumonic Pasteurellosis"
    ],
    "weight": 40,
    "critical": true,
    "advice": "EMERGENCY: Swelling near throat indicates possible acute HS. Immediate antibiotic therapy required by veterinarian."
  },
  "Severe diarrhea or dysentery": {
    "diseases": [
      "Enterotoxemia",
      "Bovine Viral Diarrhea (BVD)",
      "Coccidiosis"
    ],
    "weight": 25,
    "critical": false,
    "advice": "Risk of severe dehydration. Offer oral rehydration salts (ORS) frequently."
  },
  "Complete refusal to eat (Anorexia)": {
    "diseases": [
      "Simple Indigestion",
      "Rumen Acidosis",
      "Severe Systemic Illness"
    ],
    "weight": 20,
    "critical": false,
    "advice": "Evaluate rumen motility. Offer clean fresh green fodder and fresh water."
  },
  "Lameness / unable to walk or stand": {
    "diseases": [
      "Foot Rot",
      "Black Quarter (BQ)",
      "Hypocalcemia / Milk Fever"
    ],
    "weight": 30,
    "critical": true,
    "advice": "Inspect hoof soles for foreign objects or swelling in quarter muscles. Do not force animal to stand."
  },
  "Eye discharge / cloudiness / tears": {
    "diseases": [
      "Infectious Bovine Keratoconjunctivitis (Pinkeye)",
      "Theileriosis"
    ],
    "weight": 15,
    "critical": false,
    "advice": "Clean eyes with warm saline solution. Keep away from direct glare and flies."
  },
  "Dullness / Lethargy / Drooping ears": {
    "diseases": [
      "Early Stage Sickness",
      "Nutritional Deficiency",
      "Mild Dehydration"
    ],
    "weight": 15,
    "critical": false,
    "advice": "Continuous observation needed. Check body temperature twice daily."
  }
};

export const VISION_PLANS = {
  "underweight": {
    "image_quality_check": "Passed (Valid Lateral View)",
    "screened_condition": "Visibly Underweight / Prominent Skeletal Framework (Estimated BCS < 2.0 / 5.0)",
    "bcs_category": "Underweight / Emaciated (BCS < 2.0)",
    "risk_level": "Moderate",
    "risk_score": 58,
    "confidence": 0.88,
    "visual_findings": "Visual landmarks identify prominent projecting ribs, sharp dorsal spine ridge, and visible depression around hip bones (hook and pin bones). Depleted paralumbar fossa fat pads.",
    "differential_causes": [
      "Inadequate caloric/protein feed or poor quality roughage (Subnutrition)",
      "Internal gastrointestinal parasites (Liver Fluke / Roundworms)",
      "Dental malocclusion, sharp molar points, or oral pain preventing chewing",
      "Chronic wasting disease (Johne's Disease / Paratuberculosis or Bovine TB)",
      "High post-calving metabolic negative energy balance / Subclinical Ketosis"
    ],
    "safe_immediate_care": [
      "Provide continuous access to cool, fresh, clean drinking water in clean troughs.",
      "Offer good-quality soft green fodder (legumes, berseem, lucerne) and palatable green grass in small, frequent meals.",
      "House in a comfortable, dry, shaded shed with thick soft bedding (straw or rubber mats) to prevent decubital sores.",
      "Observe daily appetite, cud rumination time (minimum 400 min/day), and manure consistency.",
      "CRITICAL SAFETY: DO NOT make sudden major grain/concentrate increases (risk of acute rumen acidosis).",
      "CRITICAL SAFETY: DO NOT administer blanket commercial dewormers or antibiotics without veterinary verification of body weight and fecal egg test."
    ],
    "followup_questions": [
      "How long has the animal been losing weight (sudden over 1-2 weeks vs. gradual over months)?",
      "What is the current appetite (eating eagerly, chewing slowly, or completely refusing)?",
      "Is there chronic diarrhea, loose pipe-stem manure, or normal dung pats?",
      "Did the cow calve recently, or is she currently at peak daily milk production?",
      "When was the animal last dewormed, and with what specific compound?"
    ],
    "veterinary_care_plan": "Arrange a veterinary farm visit. The veterinarian will assess dental health, perform rectal palpation and body score palpation, run a fecal floatation test for parasite eggs, and design a gradual nutritional rehabilitation ration with protected fats and minerals.",
    "escalation_triggers": "SEEK IMMEDIATE EMERGENCY VETERINARY HELP IF: The cow collapses or is unable to rise (Downer Cow), develops rapid labored breathing, displays severe watery/bloody diarrhea, or stops drinking water.",
    "veterinary_urgency": "Prompt Veterinary Examination Recommended within 24-48 Hours",
    "urgent_vet_recommended": false,
    "disease_library_key": "bovine_underweight_malnutrition",
    "care_plan_badge": "Veterinary Assessment Required (Not an Automatic Single Disease)",
    "disclaimer": "Visual thinness is an observation of body condition, NOT a confirmed single diagnosis. Many distinct medical, parasitic, and nutritional factors cause weight loss. Professional veterinary diagnostic testing is required."
  },
  "lumpy_skin": {
    "image_quality_check": "Passed",
    "screened_condition": "Circumscribed Cutaneous Nodules (Consistent with Lumpy Skin Disease signs)",
    "bcs_category": "Variable Body Condition (Active Dermatological Pathology)",
    "risk_level": "High",
    "risk_score": 84,
    "confidence": 0.91,
    "visual_findings": "Multiple firm circular cutaneous nodules (2-5 cm) detected across neck, flank, and perineal skin regions. Characteristic capripoxvirus epidermal lesions.",
    "differential_causes": [
      "Lumpy Skin Disease (Capripoxvirus) - Primary suspicion",
      "Pseudo-lumpy skin disease (Bovine Herpesvirus 2 / Allerton virus)",
      "Demodectic mange or severe tick bite hypersensitivity",
      "Cutaneous Streptothricosis (Dermatophilosis)"
    ],
    "safe_immediate_care": [
      "QUARANTINE IMMEDIATELY: Isolate the animal in a separate shed away from healthy herd members to stop vector transmission.",
      "Vector control: Burn dried neem leaves (fumigation) or use fly repellents to eliminate biting flies and mosquitoes.",
      "Gently dress open ulcerated nodules with mild antiseptic solutions (neem extract or 1:1000 potassium permanganate) to prevent fly strike (maggots).",
      "Provide cool shaded environment, easily digestible green fodder, and electrolyte water."
    ],
    "followup_questions": [
      "Does the cow have an active high fever (above 40°C / 104°F)?",
      "Are there swelling/edema in the legs or dewlap brisket area?",
      "Are other cows in the same village or farm exhibiting similar skin nodules?"
    ],
    "veterinary_care_plan": "Veterinarian will evaluate for secondary pneumonia, prescribe veterinary-approved antipyretics and anti-inflammatory therapy (Meloxicam), and monitor for respiratory distress.",
    "escalation_triggers": "EMERGENCY: Swelling obstructing throat/breathing, extreme weakness, or deep maggot infestation in necrotic skin sores.",
    "veterinary_urgency": "Urgent Veterinary Intervention Required (Call 1962)",
    "urgent_vet_recommended": true,
    "disease_library_key": "lumpy_skin_disease",
    "care_plan_badge": "High Risk / Quarantine Action Required",
    "disclaimer": "Computer vision detects dermal nodule patterns. Definitive confirmation requires PCR or veterinary clinical inspection. Do not administer antibiotics without veterinary prescription."
  },
  "fmd": {
    "image_quality_check": "Passed",
    "screened_condition": "Vesicular Erosions on Mucosa & Interdigital Cleft (Consistent with FMD signs)",
    "bcs_category": "Pain-associated anorexia risk",
    "risk_level": "High",
    "risk_score": 88,
    "confidence": 0.89,
    "visual_findings": "Epithelial erosions and ruptured blister beds observed on dental pad/mucosa or interdigital hoof cleft with stringy hypersalivation indicators.",
    "differential_causes": [
      "Foot and Mouth Disease (Aphthovirus) - High contagion alert",
      "Vesicular Stomatitis",
      "Bovine Viral Diarrhea (Mucosal Disease complex)",
      "Severe traumatic ulceration / chemical burn"
    ],
    "safe_immediate_care": [
      "STRICT BIOSECURITY: Quarantine animal immediately; disinfect farm entrances with 4% sodium carbonate.",
      "Wash mouth sores gently with 1% sodium bicarbonate (baking soda) or 0.1% potassium permanganate.",
      "Keep feet clean and dry on sand bedding; wash hooves with 2% copper sulfate solution.",
      "Offer cool liquid gruels (cooked rice kanji, boiled ragi mash) because chewing solid fodder is agonizing."
    ],
    "followup_questions": [
      "Is there profuse stringy salivation or lip smacking?",
      "Is the animal reluctant to walk or standing with arched back?",
      "Are young calves showing sudden severe weakness?"
    ],
    "veterinary_care_plan": "Veterinarian must assess for cardiac involvement (especially in young calves) and report outbreak to State Animal Husbandry Department.",
    "escalation_triggers": "CRITICAL: Severe hoof separation (sloughing), sudden collapse in young calves, or complete dehydration.",
    "veterinary_urgency": "Urgent Veterinary Emergency (Call 1962 Immediately)",
    "urgent_vet_recommended": true,
    "disease_library_key": "foot_and_mouth_disease",
    "care_plan_badge": "Critical Contagious Alert",
    "disclaimer": "FMD is a statutory notifiable disease. Strict biosecurity isolation is mandatory to prevent herd catastrophe."
  },
  "pinkeye": {
    "image_quality_check": "Passed",
    "screened_condition": "Ocular Lacrimation and Corneal Opacity (Pinkeye / Keratoconjunctivitis)",
    "bcs_category": "Normal Body Condition",
    "risk_level": "Moderate",
    "risk_score": 56,
    "confidence": 0.83,
    "visual_findings": "Bilateral/unilateral ocular discharge, conjunctival redness, and cloudy opacity over the central cornea.",
    "differential_causes": [
      "Infectious Bovine Keratoconjunctivitis (Moraxella bovis)",
      "Foreign body trauma (grass seed/chaff in eye)",
      "Infectious Bovine Rhinotracheitis (IBR)",
      "Theileriosis ocular manifestation"
    ],
    "safe_immediate_care": [
      "Move the cow into a shaded, dark barn away from bright sunlight and dusty wind.",
      "Flush eye gently with sterile saline solution (0.9%) to clear dust.",
      "Apply fly repellent around the face (avoiding eyes directly) and glue an eye patch over the affected eye to block UV glare.",
      "STRICT WARNING: NEVER apply steroid/dexamethasone eye drops to an ulcerated cornea; doing so can cause eye rupture."
    ],
    "followup_questions": [
      "Is the eye weeping clear tears or thick yellow pus?",
      "Is there a noticeable white crater/ulcer on the center of the eyeball?",
      "Are multiple animals in the herd showing squinting or tearing?"
    ],
    "veterinary_care_plan": "Veterinarian will perform a fluorescein stain to evaluate ulcer depth and apply prescription ophthalmic antibiotic ointment (oxytetracycline) or subconjunctival therapy.",
    "escalation_triggers": "URGENT: Cornea bulging outwards (imminent eyeball rupture risk) or bilateral total blindness preventing animal from finding water.",
    "veterinary_urgency": "Prompt Veterinary Consultation within 24 Hours",
    "urgent_vet_recommended": false,
    "disease_library_key": "infectious_bovine_keratoconjunctivitis",
    "care_plan_badge": "Veterinary Eye Examination Required",
    "disclaimer": "Veterinary inspection with fluorescein dye is required to verify corneal integrity before administering antimicrobial eye ointments."
  },
  "inconclusive": {
    "image_quality_check": "Poor Quality / Retake Recommended",
    "screened_condition": "Inconclusive / Low Quality Image",
    "bcs_category": "Unable to determine from photograph",
    "risk_level": "Inconclusive",
    "risk_score": 0,
    "confidence": 0.25,
    "visual_findings": "Photograph lighting or focus is inadequate for automated anatomical and dermatological assessment. Visual landmarks (ribs, skin coat, eye cornea) cannot be verified.",
    "differential_causes": [
      "Image blurred, poorly lit, or subject too far away"
    ],
    "safe_immediate_care": [
      "Ensure animal has standard access to clean drinking water and green fodder.",
      "Take a new clear side-profile photograph in natural daylight from 2-3 meters distance."
    ],
    "followup_questions": [
      "Does the animal appear visibly thin or active to your eyes?",
      "Has there been any recent drop in daily milk yield or feed intake?"
    ],
    "veterinary_urgency": "Routine Observation (Retake photo or consult vet if signs worsen)",
    "urgent_vet_recommended": false,
    "disease_library_key": null,
    "care_plan_badge": "Inconclusive Image Assessment",
    "disclaimer": "Photograph quality was insufficient for automated analysis. Never assume an animal is healthy solely from an unreadable photo."
  },
  "healthy": {
    "image_quality_check": "Passed (Clear Daylight Lighting)",
    "screened_condition": "No Visible External Nodules, Lesions, or Severe Emaciation Detected",
    "bcs_category": "Moderate / Adequate Body Condition (Estimated BCS 3.0 - 3.5)",
    "risk_level": "Low",
    "risk_score": 10,
    "confidence": 0.92,
    "visual_findings": "Anatomical frame shows smooth transition over ribs and loin. Skin coat appears uniform without active circumscribed nodules or vesicular erosions.",
    "differential_causes": [
      "Normal healthy physiological state",
      "Adequate dietary energy and mineral balance"
    ],
    "safe_immediate_care": [
      "Continue offering balanced green and dry fodder with clean fresh water.",
      "Maintain regular mineral mixture supplementation (50g daily) and deworming schedule.",
      "Keep housing dry, clean, and well-ventilated."
    ],
    "followup_questions": [
      "Is the animal ruminating regularly (40-60 chews per cud)?",
      "Are daily milk yields matching the expected production curve?"
    ],
    "veterinary_urgency": "Routine Care & Preventative Maintenance",
    "urgent_vet_recommended": false,
    "disease_library_key": null,
    "care_plan_badge": "Safe General Maintenance",
    "disclaimer": "Normal external visual features do not rule out internal subclinical infections (e.g. Mastitis, Babesiosis, Subclinical Ketosis). Monitor daily vitals."
  },
  "general": {
    "image_quality_check": "Passed",
    "screened_condition": "General Visual Scan Completed",
    "bcs_category": "Estimated Body Condition Score 2.75 - 3.25 (Normal)",
    "risk_level": "Low",
    "risk_score": 15,
    "confidence": 0.85,
    "visual_findings": "Visual scan detected no severe skeletal emaciation, large skin nodule clusters, or vesicular mouth ulcers. General posture appears alert.",
    "differential_causes": [
      "Normal visual condition",
      "Potential early subclinical state requiring vital check"
    ],
    "safe_immediate_care": [
      "Provide clean water, quality forage, and comfortable bedding.",
      "Observe rumination, manure texture, and daily milk yield over the next 48 hours."
    ],
    "followup_questions": [
      "Has there been any change in feed consumption or water intake?",
      "Are there any subtle changes in movement or demeanor?"
    ],
    "veterinary_urgency": "Routine Health Monitoring",
    "urgent_vet_recommended": false,
    "disease_library_key": null,
    "care_plan_badge": "Safe General Care",
    "disclaimer": "Automated visual screening advisory only. Consult a veterinarian if you observe subtle behavioral or appetite changes."
  }
} as const;

export interface VitalRange {
  temp_min: number;
  temp_max: number;
  temp_unit: string;
  hr_min: number;
  hr_max: number;
  hr_unit: string;
  rumination_min_day: number;
  steps_min_day: number;
}

export interface SymptomInfo {
  diseases: string[];
  weight: number;
  critical: boolean;
  advice: string;
}
