import os
import json
from database import get_db

DISEASES_DATA = [
    {
        'disease_key': 'bovine_underweight_malnutrition',
        'name': 'Bovine Underweight / Low Body Condition Score (BCS < 2.0)',
        'species_affected': 'Cow, Buffalo, Goat, Sheep',
        'description': 'A clinical state of marked emaciation characterized by prominent ribs, backbone, and hip bones (transverse and dorsal spinal processes visibly projecting) with severe muscle mass depletion.',
        'causes_risk_factors': '1. Inadequate caloric/protein feed or poor forage quality. 2. Internal parasitic load (Fasciola hepatica, gastrointestinal nematodes). 3. Dental attrition, sharp molars, or wooden tongue. 4. Chronic wasting diseases (Johne\'s Disease / Paratuberculosis, Bovine Tuberculosis). 5. High lactational metabolic stress / negative energy balance.',
        'common_symptoms': 'Prominent skeletal framework, hollow flanks, dull unkempt hair coat, decreased milk yield, sluggish movements, prolonged recumbency.',
        'visible_signs': 'Visible rib cages, sharp projecting spine, hollow paralumbar fossa, deep cavity under tailhead.',
        'invisible_signs': 'Subclinical acidosis, low serum albumin, subclinical parasitic anemia, rumen hypomotility.',
        'differential_possibilities': 'Subnutrition / Starvation, Johne\'s Disease (Paratuberculosis), Gastrointestinal Helminthiasis, Hardware Disease (Traumatic Reticuloperitonitis), Dental Malocclusion.',
        'diagnostic_tests': 'Faecal egg count (McMaster floatation), Serum total protein and albumin, Complete Blood Count (CBC), Acid-fast fecal smear, Dental speculum oral exam, Rumen fluid analysis.',
        'immediate_first_aid': '1. Provide unlimited clean, fresh, cool drinking water. 2. Offer palatable, easily digestible soft green fodder (legumes/berseem/lucerne) and good quality hay in small, frequent portions. 3. House in a clean, shaded, well-ventilated dry barn with soft bedding (straw/sand) to avoid pressure sores. 4. Avoid sudden heavy grain/concentrate feeding to prevent acute rumen acidosis.',
        'supportive_care': 'Supplement with oral bypass fats, mineral mixtures containing zinc, selenium, cobalt, and probiotic rumen yeast cultures under veterinary guidance. Monitor rumination and daily manure consistency.',
        'veterinary_treatment': 'Veterinary evaluation required to establish etiology. Tailored gradual nutritional rehabilitation plan, oral electrolytes, and correction of underlying metabolic or dental disorders.',
        'medicine_info_restrictions': 'STRICT RESTRICTION: Do not administer blanket anthelmintics (dewormers) or antibiotics without veterinary confirmation of parasite species and fecal egg count. High chemical stress on emaciated animals can trigger toxic liver or kidney failure. Prescription only.',
        'prevention_biosecurity': 'Formulate balanced Total Mixed Rations (TMR) based on stage of lactation and body weight. Implement strategic seasonal deworming based on fecal screening. Regular dental checks in aging dairy cows.',
        'warning_signs_urgency': 'URGENT ESCALATION REQUIRED IF: Animal collapses / becomes unable to rise (Downer Cow state), severe watery/bloody diarrhea occurs, respiratory distress develops, or subnormal hypothermia (< 37.5°C) is measured.',
        'recovery_monitoring': 'Weekly Body Condition Score (BCS) evaluation using Penn State / Oklahoma State 1-5 scale. Aim for gradual gain of 0.5 BCS units over 4-6 weeks.',
        'reference_sources': 'Merck Veterinary Manual (Nutritional Management of Cattle); Penn State Extension Dairy BCS Reference; ICAR Livestock Healthcare Standards.',
        'last_reviewed': '2026-10-01',
        'veterinary_reviewer': 'Dr. S. Kabilan, B.V.Sc & A.H., Veterinary Polyclinic'
    },
    {
        'disease_key': 'lumpy_skin_disease',
        'name': 'Lumpy Skin Disease (LSD / Capripoxvirus)',
        'species_affected': 'Cow, Buffalo',
        'description': 'A severe viral transboundary disease of cattle characterized by fever, enlarged superficial lymph nodes, and multiple circumscribed cutaneous nodules (2-5 cm) erupting on skin and mucosal surfaces.',
        'causes_risk_factors': 'Capripoxvirus transmission through hematophagous arthropod vectors (biting flies like Stomoxys calcitrans, mosquitoes, ticks), shared drinking troughs, and direct contact with infected exudates.',
        'common_symptoms': 'High initial fever (40.5 - 41.5°C), abrupt drop in milk yield, ocular/nasal discharge, distinct firm skin nodules across neck, flanks, and udder, edema of limbs and brisket, corneal opacity.',
        'visible_signs': 'Circumscribed cutaneous circular nodules with necrotic centers ("sit-fasts"), ulcerated lesions, severe lameness, edematous dewlap.',
        'invisible_signs': 'Pox lesions in tracheobronchial tree, internal abomasal mucosal erosions, acute viremia.',
        'differential_possibilities': 'Pseudo-lumpy skin disease (Bovine Herpesvirus 2), Demodicosis, Dermatophilosis, Insect bite hypersensitivity, Besnoitiosis.',
        'diagnostic_tests': 'Real-time PCR of nodule biopsy or scab, Antigen ELISA, Histopathological detection of intracytoplasmic inclusion bodies.',
        'immediate_first_aid': '1. Immediately quarantine the affected animal in a separate shaded shed at least 50 meters away from healthy stock. 2. Disinfect surroundings with fly repellents, neem leaf fumigation, or deltamethrin sprays to eliminate biting vectors. 3. Clean external ulcerated lesions gently with 1:1000 potassium permanganate or topical antiseptic neem formulations. 4. Offer soft succulent greens and clean electrolyte water.',
        'supportive_care': 'Anti-inflammatory and antipyretic supportive care (Paracetamol/Meloxicam) strictly under veterinary direction. Topical wound dressings to prevent secondary fly strike (myiasis).',
        'veterinary_treatment': 'There is no specific antiviral therapy. Supportive treatment focuses on controlling high fever, preventing secondary bacterial bronchopneumonia, and comprehensive wound dressing.',
        'medicine_info_restrictions': 'RESTRICTION: Antibiotics have no action against Capripoxvirus. Secondary antibiotic cover must only be prescribed by a licensed veterinarian. Do not use live vaccines during an active outbreak in clinically infected cows without department supervision.',
        'prevention_biosecurity': 'Annual prophylactic vaccination with Heterologous Goat Pox vaccine or Homologous Lumpi-ProVacInd. Strict vector control, quarantine of incoming stock for 28 days, and prohibition of shared grazing during outbreaks.',
        'warning_signs_urgency': 'URGENT: Nodules in oral cavity causing severe breathing stridor/dyspnea, severe mastitis with secondary udder sloughing, or secondary maggot infestation (myiasis).',
        'recovery_monitoring': 'Lesions typically resolve slowly over 2-6 months. Track nodule healing, absence of secondary infections, and restoration of baseline rumination and lactation.',
        'reference_sources': 'WOAH (World Organisation for Animal Health) Terrestrial Manual; DAHD Govt of India LSD Advisory; TANUVAS Clinical Bulletin.',
        'last_reviewed': '2026-09-25',
        'veterinary_reviewer': 'Dr. R. Meenakshi, Senior Veterinary Assistant Surgeon'
    },
    {
        'disease_key': 'foot_and_mouth_disease',
        'name': 'Foot and Mouth Disease (FMD / Aphthovirus)',
        'species_affected': 'Cow, Buffalo, Goat, Sheep, Pigs',
        'description': 'A highly contagious vesicular viral infection affecting cloven-hoofed animals, causing acute fever, vesicles/blisters in oral mucosa, tongue, teats, and interdigital skin of hooves, leading to agonizing lameness and excessive stringy salivation.',
        'causes_risk_factors': 'Aphthovirus (Picornaviridae family, Serotypes O, A, Asia-1 in India). Aerosol transmission over miles, direct contact, swill feeding, contaminated vehicles, and personnel footwear.',
        'common_symptoms': 'Pyrexia (>40°C), profuse ropey/stringy hypersalivation ("smacking of lips"), reluctant to move or grazing due to painful vesicular ulcerations on tongue, dental pad, and hooves.',
        'visible_signs': 'Ruptured vesicular erosions with raw red mucosal beds, interdigital cleft lesions, sloughed hoof soles, teat lesions.',
        'invisible_signs': 'Myocardial degeneration ("tiger heart") in young calves leading to sudden death, internal pharyngeal ulcerations.',
        'differential_possibilities': 'Vesicular Stomatitis, Bovine Viral Diarrhea (BVD), Malignant Catarrhal Fever (MCF), Foot rot (Fusobacterium necrophorum).',
        'diagnostic_tests': 'Antigen detection ELISA (O, A, Asia-1 typing), RT-PCR on vesicular fluid or probang esophageal-pharyngeal fluid samples.',
        'immediate_first_aid': '1. Strict bio-security isolation immediately; do not move milk or personnel to other sheds. 2. Wash oral cavities gently with 1% sodium carbonate (baking soda) or 0.1% potassium permanganate solution. 3. Wash hooves with 2% copper sulfate or 4% sodium carbonate footbaths. 4. Provide cool, highly palatable liquid gruels (cooked rice kanji, boiled ragi mash) as animal cannot chew rough fodder.',
        'supportive_care': 'Protect hooves from muddy slurry; keep animal on dry clean sand or rubber mats. Apply boroglycerine to oral sores to reduce oral pain.',
        'veterinary_treatment': 'Supportive therapy with analgesics (Meloxicam), systemic antipyretics, and topical protective pastes. Fluid therapy for severely dehydrated calves.',
        'medicine_info_restrictions': 'RESTRICTION: No antiviral cures exist. Secondary antibiotics may be prescribed exclusively by a veterinarian if deep foot sepsis occurs. Never sell milk from infected cows during active fever.',
        'prevention_biosecurity': 'Strict bi-annual vaccination under the National Animal Disease Control Programme (NADCP). Disinfect footwear with 4% citric acid or sodium carbonate. 21-day quarantine of all new purchases.',
        'warning_signs_urgency': 'CRITICAL EMERGENCY: Inability to stand, high mortality risk in young calves under 6 months due to myocarditis, or complete sloughing of hoof crowns.',
        'recovery_monitoring': 'Track mouth ulcer epithelialization over 10-14 days. Monitor for chronic sequel ("pantee syndrome" or heat intolerance) and permanent lactation drop.',
        'reference_sources': 'ICAR-DFMD (Directorate of Foot and Mouth Disease); DAHD NADCP Guidelines; Merck Veterinary Manual.',
        'last_reviewed': '2026-09-18',
        'veterinary_reviewer': 'Dr. K. Sundaram, Joint Director of Animal Husbandry (Retd.)'
    },
    {
        'disease_key': 'infectious_bovine_keratoconjunctivitis',
        'name': 'Infectious Bovine Keratoconjunctivitis (Pinkeye)',
        'species_affected': 'Cow, Buffalo, Sheep, Goat',
        'description': 'A painful contagious ocular disease characterized by blepharospasm, conjunctivitis, photophobia, and central corneal ulceration leading to corneal opacity and potential blindness.',
        'causes_risk_factors': 'Moraxella bovis infection exacerbated by ultraviolet solar radiation, face flies (Musca autumnalis), dusty dry conditions, tall grass eye irritation, and vitamin A deficiency.',
        'common_symptoms': 'Watery tearing (epiphora) staining face, squinting in daylight, redness of eyelids, white/cloudy spot on center of cornea, loss of grazing efficiency due to impaired vision.',
        'visible_signs': 'Central corneal ulceration, vascularization (corneal ring redness), cloudy milky-white eye lens, mucopurulent eye discharge.',
        'invisible_signs': 'Severe intraocular pain, uveitis, temporary or permanent blindness in untreated cases.',
        'differential_possibilities': 'Infectious Bovine Rhinotracheitis (IBR / BHV-1), Foreign body trauma (grass awns), Theileriosis ocular manifestation, Photosensitization.',
        'diagnostic_tests': 'Fluorescein eye stain to demarcate corneal ulcer boundary, Conjunctival swab culture, PCR for Moraxella species.',
        'immediate_first_aid': '1. Move the animal into deep shade or a darkened barn away from direct sunlight and wind. 2. Flush eyes gently with sterile isotonic saline (0.9%) to clear dust and discharge. 3. Apply eye patches glued to surrounding fur to shield against flies and light while keeping eye unbandaged underneath. 4. Implement aggressive fly control.',
        'supportive_care': 'Fly repellant sprays around poll (avoiding eyes). Vitamin A, D3, E parenteral supplementation under veterinary guidance.',
        'veterinary_treatment': 'Topical ophthalmic antimicrobial ointments (Oxytetracycline/Cloxacillin) or subconjunctival penicillin injections administered by a veterinarian. Systemic long-acting oxytetracycline in severe herd outbreaks.',
        'medicine_info_restrictions': 'RESTRICTION: NEVER administer corticosteroid eye drops (e.g. dexamethasone/hydrocortisone) if corneal ulcer is present; steroids will cause corneal perforation and irreversible eye loss.',
        'prevention_biosecurity': 'Face fly control using insecticide ear tags, backrubbers, and fly traps. Mow tall pasture seeds. Isolate early cases immediately.',
        'warning_signs_urgency': 'URGENT: Deep descemetocele (cornea bulging outwards, imminent rupture risk) or bilateral total blindness preventing animal from reaching water troughs.',
        'recovery_monitoring': 'Corneal ulcers take 14-28 days to vascularize and heal, leaving a small grey scar that gradually fades.',
        'reference_sources': 'Merck Veterinary Manual; University of California Davis Veterinary Medicine Extension; TANUVAS Diagnostic Guide.',
        'last_reviewed': '2026-09-10',
        'veterinary_reviewer': 'Dr. S. Kabilan, B.V.Sc & A.H.'
    },
    {
        'disease_key': 'hemorrhagic_septicemia',
        'name': 'Hemorrhagic Septicemia (HS / Pasteurellosis)',
        'species_affected': 'Buffalo, Cow (Buffaloes extremely susceptible)',
        'description': 'An acute, hyperacute, fatal bacterial disease of cattle and water buffaloes characterized by sudden high fever, profound depression, painful edema of the throat and brisket, and severe respiratory distress.',
        'causes_risk_factors': 'Pasteurella multocida serotype B:2. Triggered by monsoon climate stress, heavy farm work, sudden temperature shifts, poor nutrition, and crowded transport.',
        'common_symptoms': 'Sudden fever (41-42°C), dramatic loss of appetite, hot painful swelling of submandibular region, neck, and dewlap, open-mouth breathing with protruding tongue, death within 24-48 hours if untreated.',
        'visible_signs': 'Massive throat swelling, protruding purple tongue, groaning expiration, froth from mouth.',
        'invisible_signs': 'Severe hemorrhagic septicemia, pleural effusion, extensive petechial hemorrhages in internal organs.',
        'differential_possibilities': 'Anthrax (Bacillus anthracis), Black Quarter (Clostridium chauvoei), Snakebite, Acute Rumen Bloat, Ephemeral fever.',
        'diagnostic_tests': 'Microscopic examination of peripheral blood smear (bipolar staining organisms with Leishman/Giemsa stain), PCR for Pasteurella multocida (HS-specific).',
        'immediate_first_aid': 'EMERGENCY: Do NOT delay. Call nearest veterinary dispensary or mobile clinic (1962) IMMEDIATELY. Keep animal calm, do not force movement or drench liquids (drenching causes choking and aspiration death due to swollen throat).',
        'supportive_care': 'Keep head elevated in a well-ventilated cool shed. Cool water compresses on throat swelling while awaiting emergency vet arrival.',
        'veterinary_treatment': 'Emergency intravenous antimicrobial therapy (Ceftiofur, Enrofloxacin, Sulfamethazine, or Oxytetracycline) along with non-steroidal anti-inflammatory agents administered by a veterinarian in early stage.',
        'medicine_info_restrictions': 'RESTRICTION: Treatment is only successful if administered within the first few hours of clinical pyrexia before endotoxic shock sets in. Prescription antibiotics must be administered parenterally by licensed vet.',
        'prevention_biosecurity': 'Mandatory pre-monsoon vaccination with Alum-precipitated or Oil-adjuvant HS vaccine at least 2 weeks before monsoon rains begin. Carcass disposal by deep burial with unslaked lime.',
        'warning_signs_urgency': 'CRITICAL MEDICAL EMERGENCY: Submandibular swelling with respiratory stridor is fatal within hours. Immediate vet intervention required.',
        'recovery_monitoring': 'Animals that survive require 2-3 weeks of cardiac rest and respiratory monitoring.',
        'reference_sources': 'DAHD Govt of India Disease Control Protocols; ICAR-IVRI Izatnagar Disease Monograph; TANUVAS Veterinary Clinical Guidelines.',
        'last_reviewed': '2026-10-05',
        'veterinary_reviewer': 'Dr. R. Meenakshi, Senior Veterinary Assistant Surgeon'
    }
]

def seed_disease_library():
    conn = get_db()
    cursor = conn.cursor()

    for item in DISEASES_DATA:
        cursor.execute('''
            INSERT OR REPLACE INTO disease_library (
                disease_key, name, species_affected, description,
                causes_risk_factors, common_symptoms, visible_signs,
                invisible_signs, differential_possibilities, diagnostic_tests,
                immediate_first_aid, supportive_care, veterinary_treatment,
                medicine_info_restrictions, prevention_biosecurity,
                warning_signs_urgency, recovery_monitoring, reference_sources,
                last_reviewed, veterinary_reviewer
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            item['disease_key'], item['name'], item['species_affected'], item['description'],
            item['causes_risk_factors'], item['common_symptoms'], item['visible_signs'],
            item['invisible_signs'], item['differential_possibilities'], item['diagnostic_tests'],
            item['immediate_first_aid'], item['supportive_care'], item['veterinary_treatment'],
            item['medicine_info_restrictions'], item['prevention_biosecurity'],
            item['warning_signs_urgency'], item['recovery_monitoring'], item['reference_sources'],
            item['last_reviewed'], item['veterinary_reviewer']
        ))

    conn.commit()
    conn.close()
    print("Veterinary Disease Knowledge Base & Remedial Library seeded successfully.")

if __name__ == '__main__':
    seed_disease_library()
