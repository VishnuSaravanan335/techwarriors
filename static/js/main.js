// Helper utility functions for SIH26128 Smart Animal Health Platform

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

// ----------------- BILINGUAL TAMIL / ENGLISH CLIENT TRANSLATOR -----------------
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

  // Update all elements with data-lang-en and data-lang-ta
  document.querySelectorAll('[data-lang-en]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      el.innerText = text;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyCurrentLanguage();
});
