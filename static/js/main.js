// Comprehensive Translation Dictionary & Dynamic Content Translator for PashuRaksha AI

const DICTIONARY = {
  // Navigation & Brand
  "Dashboard": "முகப்பு பலகை",
  "Register Animal": "கால்நடை பதிவு",
  "Mode 1: IoT Monitor": "முறை 1: சென்சார் கண்காணிப்பு",
  "Mode 2: Manual Check": "முறை 2: நேரடி அறிகுறி ஆய்வு",
  "AI Photo Screening": "AI புகைப்பட ஆய்வு",
  "Disease Library": "நோய் & மருந்து நூலகம்",
  "Care Plans": "பராமரிப்புத் திட்டங்கள்",
  "Health Alerts": "சுகாதார எச்சரிக்கைகள்",
  "Emergency Vet (1962)": "அவசர சிகிச்சை (1962)",
  "Vaccine Schedule": "தடுப்பூசி அட்டவணை",
  "Helpline Directory": "அரசு உதவி எண்கள்",
  "Farmer • Coimbatore, TN": "விவசாயி • கோயம்புத்தூர்",
  "PashuRaksha AI": "பசு ரக்ஷா AI",
  "SIH26128 • Animal Health": "SIH26128 • கால்நடை நலம்",

  // Top Navbar Headings & Subheadings
  "Livestock Health Dashboard": "கால்நடை சுகாதார முகப்பு பலகை",
  "Real-time overview of herd health, IoT telemetry, and early risk detection": "மந்தை ஆரோக்கியம், சென்சார் தகவல் மற்றும் ஆரம்ப நோய் கணிப்பு",
  "Simple Animal Registration": "எளிய கால்நடை பதிவு",
  "Zero-hassle registration: enter owner mobile once, auto-generate collision-resistant unique animal code": "உரிமையாளர் கைபேசி எண்ணுடன் தனித்துவமான கால்நடை அடையாளக் குறியீட்டை உருவாக்குங்கள்",
  "Mode 1: IoT Wearable Sensor Monitoring": "முறை 1: IoT சென்சார் கண்காணிப்பு",
  "Automated continuous telemetry from ESP32 biometric collars. Live stream & simulated hardware generator.": "ESP32 சென்சார் பட்டைகள் மூலம் உடல் வெப்பநிலை மற்றும் இதயத் துடிப்பு தானியங்கி கண்காணிப்பு.",
  "Mode 2: Manual Health Monitoring": "முறை 2: நேரடி அறிகுறி ஆய்வு முறை",
  "Affordable checklist for farmers without IoT sensors. Feeds into unified AI disease prediction.": "சென்சார்கள் இல்லாத விவசாயிகளுக்கான எளிய மருத்துவக் குறிப்புப் பட்டியல் மற்றும் AI நோய் கணிப்பு.",
  "AI Photo Screening & Care Plan": "AI புகைப்பட ஆய்வு & பராமரிப்புத் திட்டம்",
  "Veterinary vision pipeline: Body condition scoring, lesions, cause analysis & care plans": "கால்நடை புகைப்பட ஆய்வு: உடல் நிலை மதிப்பீடு, புண்கள், காரணங்கள் மற்றும் பராமரிப்பு வழிகாட்டல்",
  "Veterinary Disease Knowledge Base & Remedial Library": "கால்நடை நோய் & மருத்துவக் களஞ்சியம்",
  "Comprehensive, reviewed livestock disease entries with differential diagnoses, safe first aid, medicine restrictions & biosecurity protocols": "கால்நடை நோய்கள், அறிகுறிகள், பாதுகாப்பான முதலுதவி மற்றும் தடுப்பு வழிகாட்டல்கள்",
  "Personalized Livestock Care Plans & Recovery Tracking": "தனிப்பயன் கால்நடை பராமரிப்பு & மீட்பு அட்டவணை",
  "Historical record of generated supportive care plans, follow-up questionnaires, and veterinary evaluation logs": "பரிந்துரைக்கப்பட்ட பராமரிப்புத் திட்டங்கள் மற்றும் மருத்துவப் பதிவுகள்",
  "Health Alerts & Incident Audit": "சுகாதார எச்சரிக்கைகள் & விபத்து தணிக்கை",
  "Review abnormal sensor readings, concerning manual observations, and take preventative actions": "சென்சார் மற்றும் மருத்துவ அறிகுறிகளின் எச்சரிக்கைகளை ஆய்வு செய்க",
  "Emergency Veterinary Assistance": "அவசர கால்நடை மருத்துவ உதவி",
  "Immediate response for high-risk livestock: Verified state & district helplines and nearby government dispensaries": "அதிதீவிர கால்நடை அவசர நிலை: தமிழ்நாடு அரசு உதவி எண் 1962 மற்றும் அரசு மருந்தகங்கள்",
  "Vaccination & Preventative Care Calendar": "தடுப்பூசி மற்றும் தடுப்புப் பராமரிப்பு அட்டவணை",
  "NADCP bi-annual vaccination tracking, pre-monsoon disease prevention, and veterinary booster schedules": "கால்நடை நோய்த்தடுப்பு திட்டம் (NADCP), பருவமழைக்கு முந்தைய தடுப்பூசிகள் மற்றும் நினைவூட்டல்",
  "Configurable Helpline & Polyclinic Directory": "அரசு உதவி எண்கள் & மருத்துவ மையங்கள்",
  "Administrator interface to add or update state & district verified veterinary helplines without altering code": "மாநில மற்றும் மாவட்ட அரசு உதவி எண்களை நிர்வகிக்கும் பக்கம்",

  // Section Headers & UI Cards
  "Dual-Mode Monitoring Active": "இரட்டை முறை கண்காணிப்பு இயக்கத்தில் உள்ளது",
  "Seamlessly monitor dairy livestock via automated ESP32 wearable sensors (Mode 1) or affordable manual farmer health observation checklists (Mode 2) feeding into unified AI risk analytics.": "ESP32 சென்சார்கள் (முறை 1) அல்லது விவசாயியின் நேரடி அறிகுறி பட்டியல் (முறை 2) மூலம் செயற்கை நுண்ணறிவு உதவியுடன் நோய்களை முன்கூட்டியே கண்டறியுங்கள்.",
  "IoT Telemetry": "சென்சார் கண்காணிப்பு",
  "Manual Check": "நேரடி அறிகுறி ஆய்வு",
  "Total Animals": "மொத்த கால்நடைகள்",
  "Registered with Unique IDs": "பதிவு செய்யப்பட்ட அடையாள எண்கள்",
  "IoT Telemetry Active": "சென்சார் இயங்குகிறது",
  "ESP32 Collar Tags Connected": "இணைக்கப்பட்ட ESP32 பட்டைகள்",
  "Manual Monitoring": "நேரடி ஆய்வு",
  "Farmer Observation Mode": "விவசாயி நேரடி முறை",
  "Open Health Alerts": "எச்சரிக்கைகள்",
  "High/Moderate Risk Alerts": "தீவிர / மிதமான ஆபத்து எச்சரிக்கைகள்",
  "Registered Herd Animals": "பதிவு செய்யப்பட்ட கால்நடைகள்",
  "Add Another Animal": "புதிய கால்நடை சேர்க்க",
  "Animal ID": "கால்நடை எண்",
  "Name & Species": "பெயர் & இனம்",
  "Monitoring Mode": "கண்காணிப்பு முறை",
  "Latest Vitals": "உடல் வெப்பநிலை / நாடி",
  "AI Health Status": "AI ஆரோக்கிய நிலை",
  "Actions": "செயல்கள்",
  "Recent AI Risk Assessments": "சமீபத்திய AI பரிசோதனைகள்",
  "Upcoming Vaccinations": "வரவிருக்கும் தடுப்பூசிகள்",
  "Preventative Care & Vaccines": "தடுப்பூசி மற்றும் பராமரிப்பு",
  "View All": "அனைத்தும் காண்க",
  "Loading herd data...": "கால்நடை விவரங்கள் ஏற்றப்படுகின்றன...",
  "No animals found. Please register an animal.": "கால்நடைகள் எதுவும் இல்லை. புதிய கால்நடையைப் பதிவு செய்க.",
  "No recent assessments recorded.": "சமீபத்திய பரிசோதனைப் பதிவுகள் எதுவும் இல்லை.",
  "No upcoming vaccinations.": "வரவிருக்கும் தடுப்பூசிகள் எதுவும் இல்லை.",
  "Routine screening": "வழக்கமான பரிசோதனை",
  "For": "இதற்காக:",
  "Due:": "தவணை:",
  "Due Date": "தவணை தேதி",

  // One-Click Registration
  "One-Click Animal Registration": "எளிய கால்நடை பதிவு",
  "Farmer-Friendly Fast UI": "விவசாயிகளுக்கான எளிய திரை",
  "1. Owner Information (Saved for Herd Profile)": "1. உரிமையாளர் விவரங்கள் (Herd Profile)",
  "Owner Name *": "உரிமையாளர் பெயர் *",
  "Farmer Mobile Number *": "கைபேசி எண் *",
  "Enables fast OTP verification / SMS alert notification": "SMS எச்சரிக்கை மற்றும் OTP பெற உதவும்",
  "State": "மாநிலம்",
  "District (For Emergency 1962 Routing)": "மாவட்டம் (1962 அவசர உதவிக்கு)",
  "2. Animal Identity & Biological Profile": "2. கால்நடை அடையாள விவரங்கள்",
  "2. Animal Details": "2. கால்நடை விவரங்கள்",
  "Species *": "விலங்கினம் *",
  "Animal Type / Species *": "விலங்கினம் / இனம் *",
  "Breed": "இனம் / வகை",
  "Breed (Optional)": "இனம் / வகை (விருப்பத்தேர்வு)",
  "Animal Given Name / Tag Name": "கால்நடையின் பெயர்",
  "Animal Name (Optional)": "கால்நடை பெயர் (விருப்பத்தேர்வு)",
  "Helps dairy workers easily recognize the animal": "பண்ணை பணியாளர்கள் எளிதில் அடையாளம் காண உதவும்",
  "Estimated Age (Years)": "வயது (ஆண்டுகள்)",
  "Age (Years)": "வயது (ஆண்டுகள்)",
  "Gender": "பாலினம்",
  "Enable IoT Telemetry Tracking for this animal": "இந்தக் கால்நடைக்கு IoT சென்சார் கண்காணிப்பை இயக்கு",
  "3. Choose Monitoring Mode (SIH Dual Architecture)": "3. கண்காணிப்பு முறையைத் தேர்ந்தெடுக்கவும்",
  "Mode 1: Automated IoT Wearable Collar": "முறை 1: தானியங்கி IoT சென்சார் பட்டை",
  "Collar / Ear-Tag Device ID (Optional)": "சென்சார் சாதனம் எண் (விருப்பத்தேர்வு)",
  "Auto-generated ESP32 ID if left blank": "காலியாக விட்டால் தானாக உருவாக்கப்படும்",
  "Mode 2: Farmer Manual Health Checklist": "முறை 2: விவசாயி நேரடி அறிகுறி ஆய்வு",
  "Generate Permanent Animal ID & Save": "கால்நடை எண்ணை உருவாக்கி சேமிக்க",
  "Register Animal & Generate Unique ID": "கால்நடையைப் பதிவு செய்து அடையாள எண் பெறுக",

  // Manual Check Form & AI Detector
  "Health Observation Checklist": "சுகாதார அறிகுறி ஆய்வுப் பட்டியல்",
  "Select Registered Animal *": "பதிவுசெய்த கால்நடையைத் தேர்ந்தெடுக்கவும் *",
  "Loading animals...": "கால்நடைகள் ஏற்றப்படுகின்றன...",
  "Select animal to view reference vitals & history": "ஆரம்ப உடல் நிலை விவரங்களைக் காண கால்நடையைத் தேர்ந்தெடுக்கவும்",
  "Optional Physical Measurements": "உடல் அளவீடுகள் (விருப்பத்தேர்வு)",
  "Body Temp (°C)": "உடல் வெப்பநிலை (°C)",
  "Heart Rate (bpm)": "இதயத் துடிப்பு (bpm)",
  "Feeding & Appetite *": "தீவனம் உண்ணும் நிலை *",
  "Activity & Posture *": "சுறுசுறுப்பு & செயல்பாடு *",
  "Observed Symptoms (Check all that apply)": "தென்படும் அறிகுறிகள் (பொருந்துபவற்றைத் தேர்வு செய்யவும்)",
  "Voice Assistant": "குரல் வழி உள்ளீடு",
  "Additional Observations / Notes": "கூடுதல் மருத்துவக் குறிப்புகள்",
  "Submit for AI Disease-Risk Analysis": "AI நோய் பகுப்பாய்விற்கு சமர்ப்பிக்கவும்",
  "Analyzing Health Risk...": "ஆரோக்கிய பாதிப்பு பகுப்பாய்வு செய்யப்படுகிறது...",
  "AI Risk Engine Ready": "AI பகுப்பாய்வு இயந்திரம் தயார்",
  "AI Disease-Risk Assessment": "AI நோய் பாதிப்பு பகுப்பாய்வு",
  "Calibrated Disease Risk Score": "கணிக்கப்பட்ட நோய் ஆபத்து அளவு",
  "Suspected Disease Associations / Findings": "கணிக்கப்பட்ட நோய் மற்றும் காரணங்கள்",
  "Key Explainable Health Indicators & Diagnostic Factors": "முக்கிய காரணங்கள் & அறிகுறிகள்",
  "Explainable Risk Factors": "விளக்கக்கூடிய ஆபத்துக் காரணிகள்",
  "Recommended Action": "பரிந்துரைக்கப்படும் நடவடிக்கை",
  "High Risk Detected: Immediate Action Needed": "அதிதீவிர ஆபத்து: உடனடி நடவடிக்கை தேவை",
  "Contact nearest mobile veterinary dispensary or call Toll-Free 1962 for on-farm intervention.": "அருகிலுள்ள அரசு கால்நடை மருந்தகம் அல்லது கட்டணமில்லா உதவி எண் 1962-ஐ உடனடியாக அழைக்கவும்.",
  "View Emergency Hospital & Helpline": "அவசர சிகிச்சை மையம் & உதவி எண்கள் காண்க",
  "Early disease-risk screening advisory only. Does not replace clinical diagnosis by a certified veterinarian. No antibiotics should be administered without veterinary prescription.": "ஆரம்ப நோய்-ஆபத்து எச்சரிக்கை ஆலோசனை மட்டுமே. சான்றளிக்கப்பட்ட கால்நடை மருத்துவரின் நேரடி பரிசோதனைக்கு மாற்றாகாது. மருத்துவர் பரிந்துரையின்றி ஆன்டிபயாடிக் மருந்துகளை செலுத்தக் கூடாது.",
  "Listening (Click to Stop)": "கேட்கிறது... (நிறுத்த கிளிக் செய்)",
  "Voice Assistant checked": "குரல் உதவியாளர் தானாகத் தேர்ந்தெடுத்தது",

  // Vision Screening
  "Capture or Upload Animal Photo": "புகைப்படம் எடுக்கவும் / பதிவேற்றவும்",
  "Veterinary Vision Pipeline": "கால்நடை புகைப்பட ஆய்வு",
  "Select Animal ID *": "கால்நடை எண் தேர்வு *",
  "Animal Photograph (File or Camera)": "கால்நடை புகைப்படம் (கேமரா / படம்)",
  "Click to browse image or snap photo": "புகைப்படம் எடுக்க அல்லது தேர்வு செய்ய கிளிக் செய்யவும்",
  "Supports JPG, PNG (Max 10MB). Full side-profile (for body condition), flank, mouth, or hooves.": "JPG, PNG ஏற்கப்படும். உடல் நிலை மதிப்பீட்டிற்கு பக்கவாட்டு தோற்றம், வாய் அல்லது குளம்புகள்.",
  "Instant Clinical Demonstration Presets:": "மாதிரி மருத்துவப் பரிசோதனைகள்:",
  "Underweight Cow (BCS < 2.0)": "மெலிந்த மாடு (BCS < 2.0)",
  "Lumpy Skin Nodules": "சருமக் கட்டிகள் (LSD)",
  "FMD Hoof/Mouth Lesion": "கோமாரி புண்கள் (FMD)",
  "Healthy Normal Coat": "ஆரோக்கியமான மாடு",
  "Blurry / Bad Lighting": "மங்கலான படம்",
  "Analyze Image & Generate Personalized Care Plan": "புகைப்படத்தை ஆய்வு செய்து பராமரிப்புத் திட்டம் பெறுக",
  "AI Clinical Vision Ready": "AI புகைப்பட பரிசோதனை தயார்",
  "Veterinary Intelligence Engine Ready": "கால்நடை AI பார்வை இயந்திரம் தயார்",
  "Veterinary Care Plan & Visual Assessment": "கால்நடை பராமரிப்புத் திட்டம் & பார்வை மதிப்பீடு",
  "1. AI Visual Findings (Observable Anatomical Signs)": "1. AI பார்வை கண்டுபிடிப்புகள் (தென்படும் உடற்கூறு அறிகுறிகள்)",
  "2. Possible Underlying Causes (Not assumed from shape alone):": "2. சாத்தியமான நோய்க் காரணங்கள் (தோற்றத்தை மட்டும் வைத்து உறுதி செய்யாமல்):",
  "3. Safe Immediate Care Plan:": "3. பாதுகாப்பான உடனடிப் பராமரிப்புத் திட்டம்:",
  "4. Important Follow-up Questions to Check:": "4. கவனிக்க வேண்டிய முக்கியப் பின்தொடர் கேள்விகள்:",
  "5. Veterinary Care Plan:": "5. கால்நடை மருத்துவ பராமரிப்புத் திட்டம்:",
  "Escalation Triggers:": "தீவிர நிலை எச்சரிக்கைக் குறிகள்:",
  "View Full Remedial Protocol": "முழு சிகிச்சை முறையைக் காண்க",
  "Emergency Vet Hotline (1962)": "அவசர உதவி எண் (1962)",
  "Quality: Passed": "படத் தரம்: நன்று",
  "Quality: Low Light": "படத் தரம்: குறைந்த வெளிச்சம்",
  "Quality: Blurry": "படத் தரம்: மங்கலானது",

  // Disease Library Modal & Cards
  "Official Veterinary Clinical Repository": "அங்கீகரிக்கப்பட்ட மருத்துவக் களஞ்சியம்",
  "Verified by registered veterinary surgeons • Merck Veterinary Manual & ICAR reference standards": "பதிவுசெய்யப்பட்ட கால்நடை மருத்துவர்களால் சரிபார்க்கப்பட்டது • ICAR வழிகாட்டல்கள்",
  "Search": "தேடு",
  "Reset": "மீட்டமை",
  "Search disease, symptom, cause...": "நோய், அறிகுறி அல்லது சிகிச்சை தேடுக...",
  "Close": "மூடு",
  "Disease Overview": "நோய் பற்றிய கண்ணோட்டம்",
  "Causes & Risk Factors": "நோய்க் காரணங்கள் & பரவும் வழிகள்",
  "Visible vs Invisible Signs": "வெளிப்படையான மற்றும் உள்ளமை அறிகுறிகள்",
  "Observable Signs:": "வெளியில் தென்படும் அறிகுறிகள்:",
  "Internal / Laboratory Signs:": "உள் உறுப்பு / ஆய்வக அறிகுறிகள்:",
  "Diagnostic Tests for Veterinarian": "மருத்துவப் பரிசோதனை முறைகள்",
  "Safe Immediate First Aid (Farmer Action)": "பாதுகாப்பான உடனடி முதலுதவி (விவசாயி செய்ய வேண்டியவை)",
  "Medicine Safety & Legal Restrictions": "மருந்துப் பயன்பாட்டு கட்டுப்பாடுகள் & சட்ட விதிகள்",
  "Prevention & Biosecurity": "தடுப்பு முறைகள் & பண்ணை உயிரியல் பாதுகாப்பு",
  "Warning Signs Requiring Urgent Veterinary Call": "உடனடியாக மருத்துவரை அழைக்க வேண்டிய எச்சரிக்கை அறிகுறிகள்",
  "View Clinical Remedial Protocol": "மருத்துவப் பராமரிப்பு முறையைக் காண்க",
  "Loading veterinary disease entries...": "கால்நடை நோய் விவரங்கள் ஏற்றப்படுகின்றன...",
  "Key Signs:": "முக்கிய அறிகுறிகள்:",

  // Emergency & Helpline
  "Toll-Free 24x7 Mobile Veterinary Ambulance Clinic": "24 மணி நேர கட்டணமில்லா நடமாடும் ஆம்புலன்ஸ்",
  "Call 1962 Now (Toll Free)": "இப்போதே 1962-க்கு அழைக்கவும்",
  "View Nearby Dispensaries": "அருகிலுள்ள மருந்தகங்கள்",
  "Farmer District Location": "விவசாயி இருப்பிடம் / மாவட்டம்",
  "Update": "புதுப்பி",
  "Verified Nearby Veterinary Dispensaries & Polyclinics": "அரசு கால்நடை மருந்தகங்கள் & மருத்துவமனைகள்",
  "Official Dept Verified": "கால்நடைத்துறை உறுதிப்படுத்தியது",
  "Official Government Helplines & Control Rooms": "அரசு அவசர உதவி எண்கள்",
  "Helpline Directory Admin": "உதவி எண் மேலாண்மை",
  "Service Name": "சேவையின் பெயர்",
  "Jurisdiction": "பகுதி",
  "Helpline / Contact": "தொடர்பு எண்",
  "Hours": "செயல்படும் நேரம்",
  "Source Verification": "உறுதிப்படுத்திய ஆதாரம்",

  // Vaccinations
  "Schedule New Vaccination": "புதிய தடுப்பூசியைப் பதிவு செய்க",
  "Vaccine / Target Disease *": "தடுப்பூசி / இலக்கு நோய் *",
  "Scheduled Date *": "நிர்ணயிக்கப்பட்ட தேதி *",
  "Clinical Notes": "மருத்துவக் குறிப்புகள்",
  "Add Vaccination to Schedule": "அட்டவணையில் சேர்க்க",
  "National Vaccination Calendar (NADCP)": "தேசிய தடுப்பூசி வழிகாட்டுதல் (NADCP)",
  "Herd Preventative Vaccination Log": "பதிவு செய்யப்பட்ட தடுப்பூசி விவரங்கள்",
  "Status": "நிலை",
  "Veterinary Clinical Notes": "மருத்துவக் குறிப்புகள்",
  "Action": "செயல்",
  "Scheduled": "அட்டவணையில்",
  "Completed": "முடிந்தது",
  "Confirm Done": "முடிந்தது என உறுதிசெய்",
  "Recorded": "பதிவு செய்யப்பட்டது",
  "Remove": "நீக்கு",

  // Care Plans
  "Generated Personalized Care Plans": "உருவாக்கப்பட்ட தனிப்பயன் பராமரிப்புத் திட்டங்கள்",
  "Veterinary-Aligned Protocols": "கால்நடை மருத்துவ நெறிமுறைகள்",

  // Alerts
  "Active & Resolved Health Alerts": "நடப்பு & தீர்க்கப்பட்ட சுகாதார எச்சரிக்கைகள்",
  "1 Unresolved": "1 தீர்க்கப்படாத எச்சரிக்கை",
  "Source Mode": "கண்காணிப்பு முறை",
  "Alert Title & Symptoms": "எச்சரிக்கை தலைப்பு & அறிகுறிகள்",
  "Risk Level": "ஆபத்து அளவு",
  "Recommended Next Step": "அடுத்த கட்ட நடவடிக்கை",
  "Status & Action": "நிலை & செயல்",
  "Loading alert stream...": "எச்சரிக்கைகள் ஏற்றப்படுகின்றன...",
  "Mark Resolved": "தீர்க்கப்பட்டது என குறிக்க",
  "Resolved": "தீர்க்கப்பட்டது",
  "Unresolved": "தீர்க்கப்படாதது",

  // IoT Simulator
  "IoT Hardware Link & Telemetry Simulator": "IoT சென்சார் & தகவல் மாதிரி இயக்கி",
  "Select Monitored Animal": "கண்காணிக்கப்படும் கால்நடை",
  "Telemetry Injection Scenario": "சென்சார் மாதிரி சூழல்",
  "Normal Baseline (Healthy vitals)": "வழக்கமான ஆரோக்கிய நிலை",
  "Fever Spike (Hyperthermia 40.2°C)": "கடுமையான காய்ச்சல் (40.2°C)",
  "Depressed Rumination & Inactive": "தீவனம் அசைபோடாமை & சோர்வு",
  "Critical Sepsis / High Fever (41.0°C)": "அதிதீவிர காய்ச்சல் / தொற்று (41.0°C)",
  "Emit Sensor Reading": "சென்சார் தகவலை அனுப்புக",
  "Body Temperature": "உடல் வெப்பநிலை",
  "Heart Rate": "இதயத் துடிப்பு",
  "Activity Level": "செயல்பாட்டு நிலை",
  "Rumination / Digestion": "அசைபோடும் நேரம்",
  "Live Biometric Telemetry Stream": "நேரடி சென்சார் தகவல் பதிவு",

  // Risk Badges & Statuses
  "High Risk": "அதிதீவிர ஆபத்து",
  "Moderate Risk": "மிதமான ஆபத்து",
  "Low Risk": "குறைந்த ஆபத்து",
  "IoT Sensor": "IoT சென்சார்",
  "Photo AI": "புகைப்பட AI",

  // Animals & Species
  "Cow": "பசு",
  "Buffalo": "எருமை",
  "Goat": "ஆடு",
  "Sheep": "செம்மறி ஆடு",
  "Dog": "நாய்",
  "Cat": "பூனை",
  "Other Livestock": "பிற கால்நடைகள்",

  // Symptoms & Form Choices
  "Normal Appetite (வழக்கமான தீவனம்)": "வழக்கமான தீவனம் (Normal)",
  "Reduced Feeding (தீவனம் குறைந்துள்ளது)": "தீவனம் குறைந்துள்ளது (Reduced)",
  "Refusing Food / Off-Feed (தீவனம் உண்ணவில்லை)": "தீவனம் உண்ணவில்லை (Refusing Food)",
  "Normal Active & Alert": "சுறுசுறுப்பாக உள்ளது (Active)",
  "Dull / Lethargic (சோர்வாக உள்ளது)": "சோர்வாக உள்ளது (Dull)",
  "Restless / Shivering (நடுக்கம் / அமைதியின்மை)": "நடுக்கம் / அமைதியின்மை (Restless)",
  "Downer (படுத்துள்ளது / எழ முடியவில்லை)": "படுத்துள்ளது / எழ முடியவில்லை (Downer)",
  "Blisters / lesions on mouth or hooves": "வாய் அல்லது கால்களில் கொப்பளங்கள் / புண்கள் (FMD)",
  "High fever with shivering": "நடுக்கத்துடன் கூடிய அதிக காய்ச்சல் (Fever)",
  "Sudden drop in milk yield (>40%)": "பால் உற்பத்தி திடீரென குறைதல் (>40%)",
  "Skin nodules / lumps on body": "உடலில் சருமக் கட்டிகள் / புடைப்புகள் (LSD)",
  "Swollen throat / difficulty breathing": "தொண்டை வீக்கம் / மூச்சுத் திணறல் (HS)",
  "Severe diarrhea or dysentery": "கடுமையான வயிற்றுப்போக்கு (Diarrhea)",
  "Complete refusal to eat (Anorexia)": "தீவனம் உண்ண முற்றிலும் மறுத்தல் (Off-Feed)",
  "Lameness / unable to walk or stand": "நொண்டி நடத்தல் / நடக்க முடியாமை (Lameness)",
  "Eye discharge / cloudiness / tears": "கண்களில் நீர் / பீளை / வெண்படலம் (Eye Discharge)",
  "Dullness / Lethargy / Drooping ears": "காதுகள் தொங்குதல் / மந்தமான நிலை (Lethargy)",

  // Common Disease Titles
  "Foot and Mouth Disease (FMD)": "கோமாரி நோய் (FMD)",
  "Lumpy Skin Disease (LSD)": "சருமக் கழலை நோய் (LSD)",
  "Hemorrhagic Septicemia (HS)": "தொண்டை அடைப்பான் நோய் (HS)",
  "Black Quarter (BQ)": "கருங்கால் நோய் (BQ)",
  "Brucellosis": "புருசெல்லோசிஸ்",
  "Theileriosis": "தைலீரியோசிஸ்",
  "Normal Condition / Unremarkable": "ஆரோக்கியமான நிலை",

  // Common Placeholders
  "e.g. Murugan R.": "எ.கா: முருகன் ரா.",
  "10-digit mobile number": "10-இலக்க கைபேசி எண்",
  "e.g. Lakshmi, Ponni, Kaveri": "எ.கா: லட்சுமி, பொன்னி, காவேரி",
  "e.g. Kangayam, Gir, Jersey Cross, Murrah": "எ.கா: காங்கேயம், கிர், முர்ரா",
  "e.g. 38.6": "எ.கா: 38.6",
  "e.g. 70": "எ.கா: 70",
  "e.g., Started showing signs yesterday evening; water intake dropped...": "எ.கா: நேற்று மாலை முதல் அறிகுறி; தீவனம் மற்றும் தண்ணீர் உட்கொள்ளவில்லை...",

  // Home Page / Index
  "Smart Animal Health & Disease Prevention System": "ஸ்மார்ட் கால்நடை நலம் & நோய் தடுப்பு தளம்",
  "SIH26128 Solution — AI-Powered Livestock Healthcare with Dual-Mode (IoT & Manual) Monitoring": "SIH26128 தீர்வு — AI-இயங்கும் இரட்டை முறை (IoT & நேரடி) கால்நடை கண்காணிப்பு தளம்",
  "Smart India Hackathon 2026 • Problem Statement SIH26128": "ஸ்மார்ட் இந்தியா ஹேக்கத்தான் 2026 • SIH26128",
  "Empowering dairy farmers and veterinarians with early disease detection, collision-resistant unique animal identities, and rapid 1962 emergency assistance.": "ஆரம்ப நோய் கண்டறிதல், தனித்துவமான அடையாள குறியீடு மற்றும் 1962 அவசர உதவி மூலம் பால் பண்ணையாளர்கள் மற்றும் மருத்துவர்களை மேம்படுத்துதல்.",
  "Open Unified Dashboard": "ஒருங்கிணைந்த முகப்பு பலகை",
  "Quick Animal Registration": "விரைவான கால்நடை பதிவு",
  "IoT Automated Telemetry": "தானியங்கி IoT சென்சார் கண்காணிப்பு",
  "Continuous biometric collar & tag telemetry using ESP32/ESP8266. Automatic sensor anomaly alarms, rumination tracking, and temperature thresholds.": "ESP32/ESP8266 காலர் பட்டைகள் மூலம் தொடர்ச்சியான உடல் வெப்பநிலை, நாடி மற்றும் அசைபோடும் நேரம் கண்காணிப்பு.",
  "ESP32 / ESP8266 REST and MQTT transmission": "ESP32 / ESP8266 REST & MQTT தகவல் தொடர்பு",
  "Continuous body temperature and heart-rate monitoring": "தொடர்ச்சியான உடல் வெப்பநிலை மற்றும் இதயத் துடிப்பு கண்காணிப்பு",
  "Automated anomaly alarms with species baseline comparison": "இயல்பு நிலையை ஒப்பிட்டு தானியங்கி ஆபத்து எச்சரிக்கை",
  "Built-in hardware telemetry simulator": "உள்ளமைக்கப்பட்ட சென்சார் மாதிரி இயக்கி",
  "Launch IoT Monitor": "IoT கண்காணிப்பைத் தொடங்கு",
  "Manual Health Monitoring": "நேரடி சுகாதார அறிகுறி ஆய்வு",
  "Affordable observation checklist for rural farmers without IoT hardware or reliable internet. Feeds into the same AI disease prediction engine.": "சென்சார்கள் அல்லது இணையம் இல்லாத விவசாயிகளுக்கான எளிய மருத்துவக் குறிப்புப் பட்டியல் மற்றும் AI நோய் கணிப்பு.",
  "Structured checklist for feeding, posture & symptoms": "தீவனம், சுறுசுறுப்பு & அறிகுறிகளுக்கான முறைப்படுத்தப்பட்ட பட்டியல்",
  "Optional physical vital measurements (temp / pulse)": "உடல் வெப்பநிலை மற்றும் நாடித் துடிப்பு விருப்ப அளவீடுகள்",
  "0-100 calibrated disease risk score with explainable factors": "விளக்கக்கூடிய காரணங்களுடன் 0-100 நோய் ஆபத்து மதிப்பீடு",
  "NADCP vaccination reminders and preventative schedules": "NADCP தடுப்பூசி நினைவூட்டல் மற்றும் அட்டவணை",
  "Launch Manual Check": "நேரடி ஆய்வைத் தொடங்கு",
  "Core Architectural Features": "முக்கிய கட்டமைப்பு சிறப்பம்சங்கள்",
  "Permanent Animal IDs": "நிரந்தர கால்நடை அடையாள எண்கள்",
  "Collision-resistant short codes (e.g. COW-1047) linked to farmer mobile. Reusable profiles across herd additions.": "கைபேசி எண்ணுடன் இணைக்கப்பட்ட தனித்துவமான எளிய அடையாளக் குறியீடு (எ.கா: COW-1047).",
  "Computer Vision AI": "கம்ப்யூட்டர் விஷன் AI பார்வை",
  "Photo screening for Lumpy Skin Disease (LSD) dermal nodules and Foot & Mouth (FMD) lesions with quality checks.": "சருமக் கட்டிகள் (LSD) மற்றும் கோமாரிப் புண்களை (FMD) புகைப்பட ஆய்வு மூலம் கண்டறிதல்.",
  "1962 Emergency Care": "1962 அவசர மருத்துவ உதவி",
  "Automated referral to official state/district veterinary dispensaries and verified mobile veterinary clinic helplines.": "அரசு கால்நடை மருந்தகங்கள் மற்றும் 1962 ஆம்புலன்ஸ் சேவைக்கு தானியங்கி பரிந்துரை.",
  "Rumination Time": "அசைபோடும் நேரம்",
  "Baseline Normal": "இயல்பான நிலை",
  "Normal Rhythm": "வழக்கமான துடிப்பு",
  "Rumen Motility: Optimal": "செரிமான இயக்கம்: சீரானது",
  "Simulation Stream": "மாதிரி தகவல் இயக்கம்",
  "Auto-Stream: OFF": "தானியங்கி இயக்கம்: ஆஃப்",
  "Auto-Stream: ON": "தானியங்கி இயக்கம்: ஆன்",
  "Loading IoT-enabled herd...": "சென்சார் இணைக்கப்பட்ட கால்நடைகள் ஏற்றப்படுகின்றன...",
  "ESP32 / ESP8266 REST & MQTT Compatible": "ESP32 / ESP8266 REST & MQTT இணக்கமானது",
  "Directions": "வழித்தடம் காண்க",
  "Call": "அழைக்க",
  "Observable Findings:": "தென்படும் அறிகுறிகள்:",
  "Safe Immediate Care:": "பாதுகாப்பான உடனடிப் பராமரிப்பு:",
  "Urgency:": "அவசர நிலை:",
  "Escalation:": "தீவிர நிலை குறி:"
};

// Reverse dictionary for Tamil -> English
const REVERSE_DICT = {};
for (const [en, ta] of Object.entries(DICTIONARY)) {
  REVERSE_DICT[ta] = en;
}

// Phrase list sorted by descending length for sub-string replacements
const PHRASE_LIST = Object.entries(DICTIONARY).sort((a, b) => b[0].length - a[0].length);
const REVERSE_PHRASE_LIST = Object.entries(REVERSE_DICT).sort((a, b) => b[0].length - a[0].length);

// ----------------- DISEASE CONTENT TRANSLATION DICTIONARY -----------------
const DISEASE_TRANSLATIONS = {
  "bovine_underweight_malnutrition": {
    name: "மெலிந்த மாடு / குறைந்த உடல் நிலை மதிப்பீடு (BCS < 2.0)",
    description: "விலா எலும்புகள், முதுகுத்தண்டு மற்றும் இடுப்பு எலும்புகள் தெளிவாக துருத்திக் கொண்டு தசை வெகுவாகக் குறைந்து காணப்படுகின்ற கடுமையான மெலிவு நிலை.",
    causes: "1. போதிய ஊட்டச்சத்து இல்லாத உணவளிப்பு அல்லது குறைந்த தரமுள்ள தீவனம். 2. குடற்புழுக்கள் (கல்லீரல் புழு, உருண்டை புழுக்கள்). 3. பல் தேய்மானம் அல்லது நாக்குப் புண். 4. நீண்ட கால விரய நோய்கள் (ஜோன்ஸ் நோய், காசநோய்). 5. அதிக பால் கறவை தரும் மாடுகளில் ஏற்படும் ஆற்றல் பற்றாக்குறை.",
    visible_signs: "தெளிவாக துருத்தி நிற்கும் விலா எலும்புகள், கூர்மையான முதுகுத்தண்டு, ஒட்டிய வயிறு, வால் பகுதியின் கீழ் ஆழமான குழி.",
    invisible_signs: "உள்ளுறை அமிலவாதம், இரத்தத்தில் குறைந்த அல்புமின், இரத்த சோகை, அசைபோடும் திறன் குறைதல்.",
    diagnostic_tests: "சாணப் பரிசோதனை (McMaster முறை), இரத்த புரத அளவு மற்றும் CBC, வாய் மற்றும் பல் பரிசோதனை.",
    first_aid: "1. சுத்தமான குளிர்ந்த குடிநீர் தாராளமாக வைக்கவும். 2. எளிதில் செரிக்கக்கூடிய பசுந்தீவனம் (அகத்தி, கோ-4, வேலிமசால்) மற்றும் உலர் தீவனம் சிறுகச் சிறுக அடிக்கடி கொடுக்கவும். 3. மென்மையான வைக்கோல் அல்லது மணல் படுக்கை அமைத்து நிழலான கொட்டகையில் கட்டவும். 4. திடீரென அதிக அடர்தீவனம் அளிப்பதைத் தவிர்க்கவும்.",
    medicine_info: "கடுமையான எச்சரிக்கை: மருத்துவர் ஆலோசனை இன்றி சொந்தமாக வலுவான குடற்புழு மருந்துகள் அல்லது ஊசிகளை செலுத்தக் கூடாது. பலவீனமான மாடுகளுக்கு இது கல்லீரல் பாதிப்பை ஏற்படுத்தலாம்.",
    prevention: "கறவை காலத்திற்கேற்ப சரிவிகித சத்துணவு (TMR) அளித்தல். பருவ கால சாணப் பரிசோதனை மற்றும் முறையான குடற்புழு நீக்கம்.",
    warning_signs: "அவசர மருத்துவ உதவி தேவை: மாடு படுத்து எழ முடியாமல் போனால் (Downer Cow), ரத்தக் கழிச்சல் அல்லது உடல் வெப்பநிலை 37.5°C-க்கு கீழ் குறைந்தால் உடனடியாக 1962-க்கு அழைக்கவும்."
  },
  "lumpy_skin_disease": {
    name: "தோல் கழலை நோய் / சருமக் கட்டிகள் (Lumpy Skin Disease - LSD)",
    description: "வைரஸ் தொற்றினால் ஏற்படும் தீவிர தொற்றுநோய். அதிக காய்ச்சல், நிணநீர் சுரப்பிகள் வீங்குதல் மற்றும் உடல் முழுவதும் 2-5 செ.மீ அளவிலான உருண்டையான சருமக் கட்டிகள் தோன்றும்.",
    causes: "கொசுக்கள், கடிக்கும் ஈக்கள், உண்ணிகள் மூலமாகவும் பாதிக்கப்பட்ட மாட்டின் உமிழ்நீர் மற்றும் சளி வழியே பிற மாடுகளுக்குப் பரவுகிறது.",
    visible_signs: "உடல் முழுவதும் உருண்டையான கடினமான சருமக் கட்டிகள், கால்கள் மற்றும் தொண்டை வீக்கம், கண்களில் நீர், கடுமையான நொண்டல்.",
    invisible_signs: "மூச்சுக்குழல் மற்றும் தீவனக் குழாயில் கொப்பளங்கள், நுரையீரல் சளித் தொற்று.",
    diagnostic_tests: "PCR பரிசோதனை, ELISA ஆய்வு, திசு ஆய்வு.",
    first_aid: "1. பாதிக்கப்பட்ட மாட்டை மற்ற மாடுகளிலிருந்து உடனடியாக 50 மீட்டர் தள்ளி தனியாகக் கட்டவும். 2. வேப்பிலைப் புகை, இயற்கை ஈ விரட்டி தெளித்து கொசு ஈக்களைக் கட்டுப்படுத்தவும். 3. புண்களின் மீது பொட்டாசியம் பெர்மாங்கனேட் அல்லது வேப்பெண்ணெய் தடவவும். 4. குளிர்ந்த கஞ்சி, பசுந்தீவனம் கொடுக்கவும்.",
    medicine_info: "கட்டுப்பாடு: வைரஸ் நோய்க்கு ஆன்டிபயாடிக் மருந்துகள் பலனளிக்காது. புண்களில் புழுக்கள் வைக்காமல் தடுக்கவும் காய்ச்சலைக் குறைக்கவும் மட்டுமே மருத்துவர் ஆலோசனைப்படி மருந்தளிக்க வேண்டும்.",
    prevention: "ஆண்டுதோறும் கோட் பாக்ஸ் அல்லது லும்பி-புரோவேக் தடுப்பூசி செலுத்துதல். கொட்டகையை சுத்தமாக பராமரித்து ஈக்களை ஒழித்தல்.",
    warning_signs: "அவசரம்: தொண்டையில் கட்டிகள் ஏற்பட்டு மூச்சு விடத் திணறினால், மடி அழுகி பால் வராமல் போனால் உடனடியாக மருத்துவரை அழைக்கவும்."
  },
  "foot_and_mouth_disease": {
    name: "கோமாரி நோய் / வாய் மற்றும் கால் புண் நோய் (FMD)",
    description: "இரட்டை குளம்பு கொண்ட விலங்குகளைத் தாக்கும் தீவிர வைரஸ் தொற்று. வாயிலும் கால்களிலும் கொப்பளங்கள் ஏற்பட்டு கடுமையான வலியையும் உமிழ்நீர் வழிதலையும் ஏற்படுத்தும்.",
    causes: "காற்றின் மூலமாகவும், அசுத்தமான தீவனம், நீர் மற்றும் நேரடித் தொடர்பு மூலமாகவும் வெகுவேகமாக மந்தைக்குப் பரவுகிறது.",
    visible_signs: "வாயில் நாக்கு மற்றும் ஈறுகளில் புண்கள், குளம்பு இடுக்குகளில் கொப்பளங்கள், நூல் போல் உமிழ்நீர் தொங்குதல், கால்களை உதறுதல்.",
    invisible_signs: "இளங்கன்றுகளின் இதயத் தசை பாதிப்பு (புலி இதயம்), உள் தொண்டை அழற்சி.",
    diagnostic_tests: "ஆன்டிஜென் ELISA பரிசோதனை, RT-PCR முறை.",
    first_aid: "1. மாட்டை ஈரமில்லாத மென்மையான மணல் தரையில் கட்டவும். 2. வாயை பொட்டாசியம் பெர்மாங்கனேட் (1:1000) அல்லது படிகார நீரால் கழுவவும். 3. கஞ்சி, கூழ் போன்ற மென்மையான உணவுகளை மட்டுமே ஊட்டவும்.",
    medicine_info: "எச்சரிக்கை: வாய்ப் புண்களுக்கு கடுமையான ரசாயனங்களை இடக் கூடாது. ஆன்டிபயாடிக் மருந்துகளை மருத்துவர் பரிந்துரையின்றி தரக்கூடாது.",
    prevention: "தேசிய கால்நடை நோய்த்தடுப்பு திட்டத்தின் (NADCP) கீழ் 6 மாதத்திற்கு ஒருமுறை தவறாமல் FMD தடுப்பூசி செலுத்துதல்.",
    warning_signs: "அவசரம்: கன்றுகள் பலவீனமடைந்து விழுந்தாலோ, குளம்பு கழன்று விழுந்தாலோ தாமதிக்காமல் 1962 ஆம்புலன்ஸை அழைக்கவும்."
  },
  "hemorrhagic_septicemia": {
    name: "தொண்டை அடைப்பான் நோய் (Hemorrhagic Septicemia - HS)",
    description: "பாக்டீரியாவினால் ஏற்படும் அதிதீவிர தொற்றுநோய். 24-48 மணி நேரத்திற்குள் திடீர் மரணத்தை ஏற்படுத்தக்கூடிய ஆபத்தானது.",
    causes: "பாஸ்டுரெல்லா மல்டோசிடா பாக்டீரியா தொற்று. பருவமழைக் காலங்களில் பனி, குளிர், அசுத்தமான நீர் வழியே பரவுகிறது.",
    visible_signs: "தொண்டை மற்றும் தாடையின் கீழ் சூடான வலிமிக்க பெரும் வீக்கம், நாக்கு வெளியே தள்ளுதல், மூச்சுத் திணறல், வாயில் நுரை.",
    invisible_signs: "நுரையீரலில் நீர் கோர்த்தல், உள் உறுப்புகளில் கடுமையான ரத்தக் கசிவு.",
    diagnostic_tests: "இரத்தப் பூச்சு நுண்ணோக்கி பரிசோதனை (Leishman stain), PCR பரிசோதனை.",
    first_aid: "மிக அவசரம்: சிறிதும் தாமதிக்காமல் உடனடியாக 1962 அவசர எண்ணை அழைக்கவும். மாட்டின் தொண்டையில் நீர் ஊற்றவோ மருந்து புகட்டவோ கூடாது (புரை ஏறி உடனடியாக இறக்க நேரிடும்).",
    medicine_info: "சட்ட விதி: முதல் சில மணி நேரத்திற்குள் மருத்துவரிடம் தீவிர ஆன்டிபயாடிக் சிகிச்சை பெறாவிட்டால் மாட்டை காப்பாற்றுவது கடினம்.",
    prevention: "பருவமழை தொடங்குவதற்கு 2 வாரங்களுக்கு முன்பாகவே HS தடுப்பூசி தவறாமல் செலுத்துதல்.",
    warning_signs: "அதிதீவிர அவசர நிலை: தொண்டை வீக்கத்துடன் நாக்கு வெளியே தள்ளினால் தாமதிக்காமல் மருத்துவரை அழைக்கவும்."
  }
};

async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`API Fetch Error [${url}]:`, err);
    throw err;
  }
}

function showNotification(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.zIndex = '9999';
  toast.style.padding = '14px 22px';
  toast.style.borderRadius = '12px';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.92rem';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
  toast.style.color = '#fff';
  toast.style.transition = 'all 0.3s ease';

  if (type === 'success') {
    toast.style.backgroundColor = '#059669';
    toast.style.border = '1.5px solid #10b981';
  } else if (type === 'error') {
    toast.style.backgroundColor = '#e11d48';
    toast.style.border = '1.5px solid #f43f5e';
  } else {
    toast.style.backgroundColor = '#0284c7';
    toast.style.border = '1.5px solid #38bdf8';
  }

  toast.innerHTML = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function getRiskBadge(level) {
  const isTamil = localStorage.getItem('pashu_lang') === 'ta';
  if (level === 'High') {
    return `<span class="risk-pill risk-high"><i class="fa-solid fa-triangle-exclamation"></i> ${isTamil ? 'அதிதீவிர ஆபத்து' : 'High Risk'}</span>`;
  } else if (level === 'Moderate') {
    return `<span class="risk-pill risk-moderate"><i class="fa-solid fa-circle-exclamation"></i> ${isTamil ? 'மிதமான ஆபத்து' : 'Moderate Risk'}</span>`;
  } else {
    return `<span class="risk-pill risk-low"><i class="fa-solid fa-circle-check"></i> ${isTamil ? 'குறைந்த ஆபத்து' : 'Low Risk'}</span>`;
  }
}

// ----------------- COMPREHENSIVE BILINGUAL CLIENT TRANSLATOR -----------------
function setLanguage(lang) {
  try {
    localStorage.setItem('pashu_lang', lang);
  } catch (e) {
    console.warn('Could not save language to localStorage:', e);
  }
  document.documentElement.lang = lang;
  applyCurrentLanguage();
  if (typeof showNotification === 'function') {
    showNotification(lang === 'ta' ? 'தமிழ் மொழிக்கு மாற்றப்பட்டது (Tamil Active)' : 'Switched to English', 'info');
  }
}

function toggleLanguage() {
  const current = localStorage.getItem('pashu_lang') || 'en';
  const next = current === 'en' ? 'ta' : 'en';
  setLanguage(next);
}

function translateDOMTree(root, targetLang) {
  if (!root) return;

  const isTamilChar = /[\u0B80-\u0BFF]/;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toUpperCase();
        if (['SCRIPT', 'STYLE', 'CODE', 'NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('#lang-switcher-bar') || parent.closest('#btn-lang-toggle')) return NodeFilter.FILTER_REJECT;
        if (parent.closest('[data-lang-en]')) return NodeFilter.FILTER_REJECT;
        if (parent.classList.contains('animal-code-tag')) return NodeFilter.FILTER_REJECT;
        if (parent.classList.contains('fa') || parent.classList.contains('fas') || parent.classList.contains('fa-solid')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );

  const textNodes = [];
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  for (const node of textNodes) {
    const val = node.nodeValue;
    const trimmed = val.trim();
    if (!trimmed) continue;

    // Maintain true original English text
    if (typeof node._pashuOrigEn === 'undefined' || isTamilChar.test(node._pashuOrigEn)) {
      if (REVERSE_DICT[trimmed]) {
        node._pashuOrigEn = val.replace(trimmed, REVERSE_DICT[trimmed]);
      } else if (!isTamilChar.test(val)) {
        node._pashuOrigEn = val;
      } else {
        // Reverse translate Tamil phrases to reconstruct English
        let recovered = val;
        for (const [ta, en] of REVERSE_PHRASE_LIST) {
          if (recovered.includes(ta)) {
            recovered = recovered.split(ta).join(en);
          }
        }
        node._pashuOrigEn = recovered;
      }
    }

    if (targetLang === 'ta') {
      const source = node._pashuOrigEn || val;
      const sourceTrimmed = source.trim();
      if (DICTIONARY[sourceTrimmed]) {
        node.nodeValue = source.replace(sourceTrimmed, DICTIONARY[sourceTrimmed]);
      } else {
        let res = source;
        let matched = false;
        for (const [enPhrase, taPhrase] of PHRASE_LIST) {
          if (res.includes(enPhrase)) {
            res = res.split(enPhrase).join(taPhrase);
            matched = true;
          }
        }
        if (matched) {
          node.nodeValue = res;
        }
      }
    } else {
      // Restore English cleanly
      if (node._pashuOrigEn && !isTamilChar.test(node._pashuOrigEn)) {
        node.nodeValue = node._pashuOrigEn;
      } else if (REVERSE_DICT[trimmed]) {
        node.nodeValue = val.replace(trimmed, REVERSE_DICT[trimmed]);
      } else {
        let res = val;
        for (const [taPhrase, enPhrase] of REVERSE_PHRASE_LIST) {
          if (res.includes(taPhrase)) {
            res = res.split(taPhrase).join(enPhrase);
          }
        }
        node.nodeValue = res;
        node._pashuOrigEn = res;
      }
    }
  }
}

function applyCurrentLanguage() {
  const lang = (localStorage.getItem('pashu_lang') || 'en').toLowerCase();
  document.documentElement.lang = lang;
  
  // 1. Update dual language buttons display in navbar
  const btnTa = document.getElementById('btn-lang-ta');
  const btnEn = document.getElementById('btn-lang-en');
  if (btnTa && btnEn) {
    const iconTa = btnTa.querySelector('i');
    if (lang === 'ta') {
      btnTa.classList.add('active-ta');
      btnTa.classList.remove('active-en');
      btnTa.style.background = '#059669';
      btnTa.style.color = '#ffffff';
      btnTa.style.boxShadow = '0 2px 8px rgba(5, 150, 105, 0.4)';
      if (iconTa) iconTa.style.color = '#ffffff';

      btnEn.classList.remove('active-en', 'active-ta');
      btnEn.style.background = 'transparent';
      btnEn.style.color = '#334155';
      btnEn.style.boxShadow = 'none';
    } else {
      btnEn.classList.add('active-en');
      btnEn.classList.remove('active-ta');
      btnEn.style.background = '#0284c7';
      btnEn.style.color = '#ffffff';
      btnEn.style.boxShadow = '0 2px 8px rgba(2, 132, 199, 0.4)';

      btnTa.classList.remove('active-ta', 'active-en');
      btnTa.style.background = 'transparent';
      btnTa.style.color = '#334155';
      btnTa.style.boxShadow = 'none';
      if (iconTa) iconTa.style.color = '#059669';
    }
  }

  // Also support legacy toggle button if present
  const btnText = document.getElementById('current-lang-text');
  if (btnText) {
    if (lang === 'en') {
      btnText.innerHTML = '<span style="opacity: 0.75;">Lang:</span> English • <strong>தமிழ்</strong>';
    } else {
      btnText.innerHTML = '<span style="opacity: 0.75;">மொழி:</span> தமிழ் • <strong>English</strong>';
    }
  }

  // 2. Elements with explicit data-lang-en and data-lang-ta
  document.querySelectorAll('[data-lang-en]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      el.innerText = text;
    }
  });

  // 3. Translate all text nodes in the DOM recursively without breaking HTML icons or markup
  translateDOMTree(document.body, lang);

  // 4. Translate input & textarea placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    if (typeof el._pashuOrigPlaceholder === 'undefined') {
      el._pashuOrigPlaceholder = el.placeholder;
    }
    if (lang === 'ta') {
      if (DICTIONARY[el._pashuOrigPlaceholder]) {
        el.placeholder = DICTIONARY[el._pashuOrigPlaceholder];
      }
    } else {
      if (el._pashuOrigPlaceholder) {
        el.placeholder = el._pashuOrigPlaceholder;
      }
    }
  });

  // 5. Translate select options
  document.querySelectorAll('select option').forEach(opt => {
    if (typeof opt._pashuOrigText === 'undefined') {
      opt._pashuOrigText = opt.innerText.trim();
    }
    if (lang === 'ta') {
      if (DICTIONARY[opt._pashuOrigText]) {
        opt.innerText = DICTIONARY[opt._pashuOrigText];
      }
    } else {
      if (opt._pashuOrigText) {
        opt.innerText = opt._pashuOrigText;
      }
    }
  });

  // 6. Translate dynamic components if active
  translateDiseaseModalIfOpen(lang);
  translateDiseaseCardsIfPresent(lang);
  translateCarePlanIfOpen(lang);
  translateAssessmentIfOpen(lang);
  translateTelemetryIfOpen(lang);
}

function translateCarePlanIfOpen(lang) {
  const card = document.getElementById('vision-result-card');
  if (card && card.style.display !== 'none' && card._currentScreening) {
    if (typeof renderCarePlanResult === 'function') {
      renderCarePlanResult(card._currentScreening);
    }
  }
}

function translateAssessmentIfOpen(lang) {
  const box = document.getElementById('ai-result-box');
  if (box && box.style.display !== 'none' && box._currentResult) {
    if (typeof renderAssessmentResult === 'function') {
      const { res, animalCode, animalName } = box._currentResult;
      renderAssessmentResult(res, animalCode, animalName);
    }
  }
}

function translateTelemetryIfOpen(lang) {
  const statusEl = document.getElementById('live-temp-status');
  if (statusEl) {
    const isTa = (lang === 'ta');
    const isAbn = statusEl.style.color.includes('f43f5e') || statusEl.innerText.includes('ABNORMAL') || statusEl.innerText.includes('எச்சரிக்கை');
    if (isAbn) {
      statusEl.innerText = isTa ? '⚠️ எச்சரிக்கை: அளவீடு வழக்கத்திற்கு மாறாக உள்ளது' : '⚠️ ABNORMAL: Reading exceeded normal bounds';
    } else {
      statusEl.innerText = isTa ? 'இயல்பான ஆரோக்கிய எல்லைக்குள் உள்ளது' : 'Within normal physiological range';
    }
  }
}

function translateDiseaseCardsIfPresent(lang) {
  const container = document.getElementById('disease-cards-container');
  if (!container) return;

  // If allDiseases array is loaded in disease_library.html
  if (typeof allDiseases !== 'undefined' && Array.isArray(allDiseases) && allDiseases.length > 0) {
    if (typeof renderDiseaseCards === 'function') {
      renderDiseaseCards(allDiseases);
    }
  }
}

function translateDiseaseModalIfOpen(lang) {
  const modal = document.getElementById('disease-detail-modal');
  if (!modal || modal.style.display === 'none') return;

  const currentKey = modal.getAttribute('data-current-disease-key');
  if (!currentKey || !DISEASE_TRANSLATIONS[currentKey]) return;

  const t = DISEASE_TRANSLATIONS[currentKey];
  const orig = modal._originalDiseaseData || {};

  if (lang === 'ta') {
    if (t.name) document.getElementById('modal-disease-title').innerText = t.name;
    if (t.description) document.getElementById('modal-description').innerText = t.description;
    if (t.causes) document.getElementById('modal-causes').innerText = t.causes;
    if (t.visible_signs) document.getElementById('modal-visible-signs').innerText = t.visible_signs;
    if (t.invisible_signs) document.getElementById('modal-invisible-signs').innerText = t.invisible_signs;
    if (t.diagnostic_tests) document.getElementById('modal-tests').innerText = t.diagnostic_tests;
    if (t.first_aid) document.getElementById('modal-first-aid').innerText = t.first_aid;
    if (t.medicine_info) document.getElementById('modal-medicine-info').innerText = t.medicine_info;
    if (t.prevention) document.getElementById('modal-prevention').innerText = t.prevention;
    if (t.warning_signs) document.getElementById('modal-warning-urgency').innerText = t.warning_signs;
  } else {
    // Restore English from original disease object
    if (orig.name) document.getElementById('modal-disease-title').innerText = orig.name;
    if (orig.description) document.getElementById('modal-description').innerText = orig.description;
    if (orig.causes_risk_factors) document.getElementById('modal-causes').innerText = orig.causes_risk_factors;
    if (orig.visible_signs) document.getElementById('modal-visible-signs').innerText = orig.visible_signs;
    if (orig.invisible_signs) document.getElementById('modal-invisible-signs').innerText = orig.invisible_signs;
    if (orig.diagnostic_tests) document.getElementById('modal-tests').innerText = orig.diagnostic_tests;
    if (orig.immediate_first_aid) document.getElementById('modal-first-aid').innerText = orig.immediate_first_aid;
    if (orig.medicine_info_restrictions) document.getElementById('modal-medicine-info').innerText = orig.medicine_info_restrictions;
    if (orig.prevention_biosecurity) document.getElementById('modal-prevention').innerText = orig.prevention_biosecurity;
    if (orig.warning_signs_urgency) document.getElementById('modal-warning-urgency').innerText = orig.warning_signs_urgency;
  }
}

// Global hooks for dynamic content translation
window.setLanguage = setLanguage;
window.applyCurrentLanguage = applyCurrentLanguage;
window.toggleLanguage = toggleLanguage;

function bindLanguageButtons() {
  const btnTa = document.getElementById('btn-lang-ta');
  const btnEn = document.getElementById('btn-lang-en');
  if (btnTa) {
    btnTa.onclick = function(e) {
      if (e) e.preventDefault();
      setLanguage('ta');
    };
  }
  if (btnEn) {
    btnEn.onclick = function(e) {
      if (e) e.preventDefault();
      setLanguage('en');
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  bindLanguageButtons();
  applyCurrentLanguage();
  setTimeout(applyCurrentLanguage, 300);
  setTimeout(applyCurrentLanguage, 1000);
});
