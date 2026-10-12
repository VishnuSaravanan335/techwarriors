// Helper utility functions & Universal Translation Dictionary for SIH26128 Smart Animal Health Platform

const DICTIONARY = {
  // Common UI words
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
  "Livestock Health Dashboard": "கால்நடை சுகாதார முகப்பு பலகை",
  "Real-time overview of herd health, IoT telemetry, and early risk detection": "மந்தை ஆரோக்கியம், சென்சார் தகவல் மற்றும் ஆரம்ப நோய் கணிப்பு",
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
  "Preventative Care & Vaccines": "தடுப்பூசி மற்றும் பராமரிப்பு",
  "View All": "அனைத்தும் காண்க",
  "One-Click Animal Registration": "எளிய கால்நடை பதிவு",
  "Farmer-Friendly Fast UI": "விவசாயிகளுக்கான எளிய திரை",
  "1. Owner Information (Saved for Herd Profile)": "1. உரிமையாளர் விவரங்கள்",
  "Owner Name *": "உரிமையாளர் பெயர் *",
  "Farmer Mobile Number *": "கைபேசி எண் *",
  "Enables fast OTP verification / SMS alert notification": "SMS எச்சரிக்கை மற்றும் OTP பெற உதவும்",
  "State": "மாநிலம்",
  "District (For Emergency 1962 Routing)": "மாவட்டம் (1962 அவசர உதவிக்கு)",
  "2. Animal Identity & Biological Profile": "2. கால்நடை அடையாள விவரங்கள்",
  "Species *": "விலங்கினம் *",
  "Breed": "இனம் / வகை",
  "Animal Given Name / Tag Name": "கால்நடையின் பெயர்",
  "Estimated Age (Years)": "வயது (ஆண்டுகள்)",
  "Gender": "பாலினம்",
  "3. Choose Monitoring Mode (SIH Dual Architecture)": "3. கண்காணிப்பு முறையைத் தேர்ந்தெடுக்கவும்",
  "Mode 1: Automated IoT Wearable Collar": "முறை 1: தானியங்கி IoT சென்சார் பட்டை",
  "Collar / Ear-Tag Device ID (Optional)": "சென்சார் சாதனம் எண் (விருப்பத்தேர்வு)",
  "Auto-generated ESP32 ID if left blank": "காலியாக விட்டால் தானாக உருவாக்கப்படும்",
  "Mode 2: Farmer Manual Health Checklist": "முறை 2: விவசாயி நேரடி அறிகுறி ஆய்வு",
  "Generate Permanent Animal ID & Save": "கால்நடை எண்ணை உருவாக்கி சேமிக்க",
  "Health Observation Checklist": "சுகாதார அறிகுறி ஆய்வுப் பட்டியல்",
  "Select Registered Animal *": "பதிவுசெய்த கால்நடையைத் தேர்ந்தெடுக்கவும் *",
  "Optional Physical Measurements": "உடல் அளவீடுகள் (விருப்பத்தேர்வு)",
  "Body Temp (°C)": "உடல் வெப்பநிலை (°C)",
  "Heart Rate (bpm)": "இதயத் துடிப்பு (bpm)",
  "Feeding & Appetite *": "தீவனம் உண்ணும் நிலை *",
  "Activity & Posture *": "சுறுசுறுப்பு & செயல்பாடு *",
  "Observed Symptoms (Check all that apply)": "தென்படும் அறிகுறிகள் (பொருந்துபவற்றைத் தேர்வு செய்யவும்)",
  "Voice Assistant": "குரல் வழி உள்ளீடு",
  "Additional Observations / Notes": "கூடுதல் மருத்துவக் குறிப்புகள்",
  "Submit for AI Disease-Risk Analysis": "AI நோய் பகுப்பாய்விற்கு சமர்ப்பிக்கவும்",
  "AI Risk Engine Ready": "AI பகுப்பாய்வு இயந்திரம் தயார்",
  "AI Disease-Risk Assessment": "AI நோய் பாதிப்பு பகுப்பாய்வு",
  "Calibrated Disease Risk Score": "கணிக்கப்பட்ட நோய் ஆபத்து அளவு",
  "Suspected Disease Associations / Findings": "கணிக்கப்பட்ட நோய் மற்றும் காரணங்கள்",
  "Key Explainable Health Indicators & Diagnostic Factors": "முக்கிய காரணங்கள் & அறிகுறிகள்",
  "Recommended Action": "பரிந்துரைக்கப்படும் நடவடிக்கை",
  "Capture or Upload Animal Photo": "புகைப்படம் எடுக்கவும் / பதிவேற்றவும்",
  "Veterinary Vision Pipeline": "கால்நடை புகைப்பட ஆய்வு",
  "Select Animal ID *": "கால்நடை எண் தேர்வு *",
  "Animal Photograph (File or Camera)": "கால்நடை புகைப்படம் (கேமரா / படம்)",
  "Click to browse image or snap photo": "புகைப்படம் எடுக்க அல்லது தேர்வு செய்ய கிளிக் செய்யவும்",
  "Instant Clinical Demonstration Presets:": "மாதிரி மருத்துவப் பரிசோதனைகள்:",
  "Underweight Cow (BCS < 2.0)": "மெலிந்த மாடு (BCS < 2.0)",
  "Lumpy Skin Nodules": "சருமக் கட்டிகள் (LSD)",
  "FMD Hoof/Mouth Lesion": "கோமாரி புண்கள் (FMD)",
  "Healthy Normal Coat": "ஆரோக்கியமான மாடு",
  "Blurry / Bad Lighting": "மங்கலான படம்",
  "Analyze Image & Generate Personalized Care Plan": "புகைப்படத்தை ஆய்வு செய்து பராமரிப்புத் திட்டம் பெறுக",
  "AI Clinical Vision Ready": "AI புகைப்பட பரிசோதனை தயார்",
  "Visual Screening Findings": "புகைப்பட ஆய்வு முடிவுகள்",
  "Differential Diagnoses (Suspected Underlying Causes)": "சாத்தியமான நோய்க் காரணங்கள்",
  "Immediate Safe First-Aid & Supportive Care": "பாதுகாப்பான உடனடி முதலுதவி & பராமரிப்பு",
  "Strict Veterinary Medicine Restrictions": "மருந்துப் பயன்பாட்டு கட்டுப்பாடுகள்",
  "Toll-Free 24x7 Mobile Veterinary Ambulance Clinic": "24 மணி நேர கட்டணமில்லா நடமாடும் ஆம்புலன்ஸ்",
  "Call 1962 Now (Toll Free)": "இப்போதே 1962-க்கு அழைக்கவும்",
  "View Nearby Dispensaries": "அருகிலுள்ள மருந்தகங்கள்",
  "Farmer District Location": "விவசாயி இருப்பிடம் / மாவட்டம்",
  "Update": "புதுப்பி",
  "Verified Nearby Veterinary Dispensaries & Polyclinics": "அரசு கால்நடை மருந்தகங்கள் & மருத்துவமனைகள்",
  "Official Government Helplines & Control Rooms": "அரசு அவசர உதவி எண்கள்",
  "Official Veterinary Clinical Repository": "அங்கீகரிக்கப்பட்ட மருத்துவக் களஞ்சியம்",
  "Search": "தேடு",
  "Reset": "மீட்டமை",
  "Search disease, symptom, cause...": "நோய், அறிகுறி அல்லது சிகிச்சை தேடுக...",
  "Active & Resolved Health Alerts": "செயலில் உள்ள & தீர்க்கப்பட்ட எச்சரிக்கைகள்",
  "Schedule New Vaccination": "புதிய தடுப்பூசியைப் பதிவு செய்க",
  "Vaccine / Target Disease *": "தடுப்பூசி / இலக்கு நோய் *",
  "Scheduled Date *": "நிர்ணயிக்கப்பட்ட தேதி *",
  "Clinical Notes": "மருத்துவக் குறிப்புகள்",
  "Add Vaccination to Schedule": "அட்டவணையில் சேர்க்க",
  "National Vaccination Calendar (NADCP)": "தேசிய தடுப்பூசி வழிகாட்டுதல் (NADCP)",
  "Herd Preventative Vaccination Log": "பதிவு செய்யப்பட்ட தடுப்பூசி விவரங்கள்",
  "Generated Personalized Care Plans": "உருவாக்கப்பட்ட தனிப்பயன் பராமரிப்புத் திட்டங்கள்",
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
  "Normal Appetite (வழக்கமான தீவனம்)": "வழக்கமான தீவனம் (Normal Appetite)",
  "Reduced Feeding (தீவனம் குறைந்துள்ளது)": "தீவனம் குறைந்துள்ளது (Reduced Feeding)",
  "Refusing Food / Off-Feed (தீவனம் உண்ணவில்லை)": "தீவனம் உண்ணவில்லை (Refusing Food)",
  "Normal Active & Alert": "சுறுசுறுப்பாக உள்ளது (Active)",
  "Dull / Lethargic (சோர்வாக உள்ளது)": "சோர்வாக உள்ளது (Dull/Lethargic)",
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
  "Dullness / Lethargy / Drooping ears": "காதுகள் தொங்குதல் / மந்தமான நிலை (Lethargy)"
};

// Reverse dictionary for Tamil -> English
const REVERSE_DICT = {};
for (const [en, ta] of Object.entries(DICTIONARY)) {
  REVERSE_DICT[ta] = en;
}

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
function toggleLanguage() {
  const current = localStorage.getItem('pashu_lang') || 'en';
  const next = current === 'en' ? 'ta' : 'en';
  localStorage.setItem('pashu_lang', next);
  applyCurrentLanguage();
}

function applyCurrentLanguage() {
  const lang = localStorage.getItem('pashu_lang') || 'en';
  const btnText = document.getElementById('current-lang-text');
  if (btnText) {
    btnText.innerText = lang === 'en' ? 'தமிழ் (Tamil)' : 'English (ஆங்கிலம்)';
  }

  // 1. First process any elements with data-lang-en and data-lang-ta
  document.querySelectorAll('[data-lang-en]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      el.innerText = text;
    }
  });

  // 2. Translate all visible text elements across the page using our comprehensive dictionary
  const textSelectors = 'h1, h2, h3, h4, h5, p, span, label, th, a, button, .stat-title, .stat-sub, .form-hint';
  document.querySelectorAll(textSelectors).forEach(el => {
    // Skip language toggle button itself and code tags
    if (el.id === 'current-lang-text' || el.closest('#btn-lang-toggle') || el.classList.contains('animal-code-tag')) return;
    
    // Only translate elements with single text node or pure direct text
    const text = (el.innerText || '').trim();
    if (!text) return;

    if (lang === 'ta') {
      if (DICTIONARY[text]) {
        if (!el.getAttribute('data-original-en')) el.setAttribute('data-original-en', text);
        el.innerText = DICTIONARY[text];
      }
    } else {
      const orig = el.getAttribute('data-original-en');
      if (orig) {
        el.innerText = orig;
      } else if (REVERSE_DICT[text]) {
        el.innerText = REVERSE_DICT[text];
      }
    }
  });

  // 3. Translate select options text
  document.querySelectorAll('select option').forEach(opt => {
    const text = (opt.innerText || '').trim();
    if (!text) return;
    if (lang === 'ta') {
      if (DICTIONARY[text]) {
        if (!opt.getAttribute('data-original-en')) opt.setAttribute('data-original-en', text);
        opt.innerText = DICTIONARY[text];
      }
    } else {
      const orig = opt.getAttribute('data-original-en');
      if (orig) opt.innerText = orig;
      else if (REVERSE_DICT[text]) opt.innerText = REVERSE_DICT[text];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyCurrentLanguage();
  // Re-run language check after dynamic content finishes initial load
  setTimeout(applyCurrentLanguage, 400);
  setTimeout(applyCurrentLanguage, 1200);
});
