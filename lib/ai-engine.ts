import { SPECIES_VITAL_RANGES, SYMPTOM_DISEASE_ASSOCIATIONS, VISION_PLANS } from "./reference-data.js";

export { SPECIES_VITAL_RANGES, SYMPTOM_DISEASE_ASSOCIATIONS };

// Format a float the way Python's f-strings do (39 -> "39.0").
export const pyFloat = (n: number) => (Number.isInteger(n) ? n.toFixed(1) : String(n));

// Mirrors Python's float() on optional form input: blank or unparsable values are ignored.
export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function getSpeciesRanges(species: string) {
  return SPECIES_VITAL_RANGES[species] ?? SPECIES_VITAL_RANGES["Other"];
}

function evaluateVitals(species: string, temperature: unknown, heartRate: unknown, activityLevel: unknown) {
  const ranges = getSpeciesRanges(species);
  let vitalScore = 0;
  const reasons: string[] = [];

  const tempVal = toNumber(temperature);
  if (tempVal !== null) {
    if (tempVal > ranges.temp_max + 1.5) {
      vitalScore += 35;
      reasons.push(`Severe hyperthermia/fever (${pyFloat(tempVal)}°C, reference range ${pyFloat(ranges.temp_min)}-${pyFloat(ranges.temp_max)}°C)`);
    } else if (tempVal > ranges.temp_max) {
      vitalScore += 20;
      reasons.push(`Elevated body temperature (${pyFloat(tempVal)}°C, normal upper limit ${pyFloat(ranges.temp_max)}°C)`);
    } else if (tempVal < ranges.temp_min - 1.0) {
      vitalScore += 30;
      reasons.push(`Subnormal temperature / Hypothermia (${pyFloat(tempVal)}°C, normal lower limit ${pyFloat(ranges.temp_min)}°C)`);
    }
  }

  const hrVal = toNumber(heartRate);
  if (hrVal !== null) {
    if (hrVal > ranges.hr_max + 25) {
      vitalScore += 25;
      reasons.push(`Marked tachycardia / Elevated heart rate (${pyFloat(hrVal)} bpm, normal max ${ranges.hr_max} bpm)`);
    } else if (hrVal > ranges.hr_max) {
      vitalScore += 15;
      reasons.push(`Mild tachycardia (${pyFloat(hrVal)} bpm vs max ${ranges.hr_max} bpm)`);
    } else if (hrVal < ranges.hr_min - 15) {
      vitalScore += 20;
      reasons.push(`Bradycardia / Low heart rate (${pyFloat(hrVal)} bpm vs min ${ranges.hr_min} bpm)`);
    }
  }

  if (activityLevel) {
    const act = String(activityLevel).toLowerCase();
    if (act.includes("downer") || act.includes("unable to rise")) {
      vitalScore += 35;
      reasons.push("Downer state: animal unable to stand, indicates critical medical emergency");
    } else if (act.includes("lethargic") || act.includes("dull") || act.includes("low")) {
      vitalScore += 15;
      reasons.push("Depressed activity and lethargic posture observed");
    } else if (act.includes("restless") || act.includes("hyper")) {
      vitalScore += 10;
      reasons.push("Unusual restlessness/agitation observed");
    }
  }

  return { vitalScore: Math.min(vitalScore, 50), reasons };
}

function normalizeSymptoms(symptoms: unknown): string[] {
  if (!symptoms) return [];
  if (Array.isArray(symptoms)) return symptoms.map(String);
  if (typeof symptoms === "string") {
    try {
      const parsed = JSON.parse(symptoms);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // fall through to comma-separated parsing
    }
    return symptoms.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function evaluateSymptoms(symptomsList: string[]) {
  let symptomScore = 0;
  const reasons: string[] = [];
  const suspected = new Set<string>();
  let hasCritical = false;

  for (const symptom of symptomsList) {
    const s = symptom.toLowerCase();
    const matchedKey = Object.keys(SYMPTOM_DISEASE_ASSOCIATIONS).find(
      (key) => s.includes(key.toLowerCase()) || key.toLowerCase().includes(s),
    );
    if (matchedKey) {
      const info = SYMPTOM_DISEASE_ASSOCIATIONS[matchedKey];
      symptomScore += info.weight;
      reasons.push(`Symptom '${matchedKey}': ${info.advice}`);
      info.diseases.forEach((d) => suspected.add(d));
      if (info.critical) hasCritical = true;
    } else {
      symptomScore += 10;
      reasons.push(`Reported observation: ${symptom}`);
    }
  }

  return { symptomScore: Math.min(symptomScore, 60), reasons, suspected: [...suspected], hasCritical };
}

export interface HealthRiskInput {
  species: string;
  temperature?: unknown;
  heartRate?: unknown;
  activityLevel?: unknown;
  feedingStatus?: unknown;
  symptoms?: unknown;
  historicalAbnormalCount?: number;
  mode?: string;
}

export function analyzeHealthRisk(input: HealthRiskInput) {
  const { species, temperature, heartRate, activityLevel, feedingStatus } = input;
  const historicalAbnormalCount = input.historicalAbnormalCount ?? 0;
  const symptomsList = normalizeSymptoms(input.symptoms);
  const reasonsBreakdown: string[] = [];
  const suspectedConditions = new Set<string>();

  // 1. Vitals evaluation
  const { vitalScore, reasons: vitalReasons } = evaluateVitals(species, temperature, heartRate, activityLevel);
  reasonsBreakdown.push(...vitalReasons);

  // 2. Symptoms evaluation
  const { symptomScore, reasons: symptomReasons, suspected, hasCritical } = evaluateSymptoms(symptomsList);
  reasonsBreakdown.push(...symptomReasons);
  suspected.forEach((d) => suspectedConditions.add(d));

  // 3. Feeding evaluation
  let feedingScore = 0;
  if (feedingStatus) {
    const f = String(feedingStatus).toLowerCase();
    if (f.includes("refusing") || f.includes("anorexia") || f.includes("stopped")) {
      feedingScore = 20;
      reasonsBreakdown.push("Complete feed refusal reported (inappetence indicates acute distress)");
    } else if (f.includes("reduced") || f.includes("less")) {
      feedingScore = 10;
      reasonsBreakdown.push("Appetite reduced below typical intake");
    }
  }

  // 4. Historical trend multiplier
  let historyPenalty = 0;
  if (historicalAbnormalCount >= 3) {
    historyPenalty = 15;
    reasonsBreakdown.push(`Historical trend alert: Animal had ${historicalAbnormalCount} abnormal readings in recent days`);
  } else if (historicalAbnormalCount >= 1) {
    historyPenalty = 5;
  }

  let rawScore = vitalScore + symptomScore + feedingScore + historyPenalty;
  if (hasCritical && (vitalScore > 20 || feedingScore > 10)) rawScore = Math.max(rawScore, 75);
  else if (hasCritical) rawScore = Math.max(rawScore, 65);

  const riskScore = Math.min(Math.max(Math.trunc(rawScore), 5), 98);

  let riskLevel: "Low" | "Moderate" | "High";
  let urgency: string;
  let rec: string;
  if (riskScore >= 65) {
    riskLevel = "High";
    urgency = "Urgent Veterinary Attention Required";
    rec = "Isolate the animal immediately. Contact the nearest Veterinary Dispensary / Mobile Clinic (Toll-Free 1962). Avoid unprescribed antibiotics.";
  } else if (riskScore >= 35) {
    riskLevel = "Moderate";
    urgency = "Monitor Closely & Schedule Veterinary Checkup";
    rec = "Keep under observation for the next 12-24 hours. Check temperature every 6 hours, ensure clean water, and consult a vet if signs worsen.";
  } else {
    riskLevel = "Low";
    urgency = "Routine Care & Preventative Maintenance";
    rec = "Health indicators appear within acceptable baseline. Continue balanced nutrition, deworming schedule, and routine vaccination.";
  }

  const hasTemp = temperature !== null && temperature !== undefined;
  const hasSymptoms = symptomsList.length > 0;
  const confidencePct = hasTemp && hasSymptoms ? 90 : hasTemp || hasSymptoms ? 82 : 75;

  if (suspectedConditions.size === 0) {
    suspectedConditions.add(
      riskLevel === "Low"
        ? "Healthy / Normal Physiological State"
        : riskLevel === "Moderate"
          ? "Mild Indigestion or Early Subclinical State"
          : "Acute Unspecified Systemic Infection",
    );
  }

  return {
    risk_score: riskScore,
    risk_level: riskLevel,
    urgency_level: urgency,
    confidence_pct: confidencePct,
    suspected_conditions: [...suspectedConditions],
    reasons_breakdown: reasonsBreakdown,
    recommendations: rec,
    disclaimer:
      "AI screening is an early-warning advisory tool and does NOT substitute clinical diagnosis or laboratory tests by a licensed veterinary doctor.",
  };
}

const hasAny = (target: string, keywords: string[]) => keywords.some((k) => target.includes(k));

/**
 * Keyword-driven visual screening: picks a structured care plan based on the
 * selected sample preset or uploaded filename, with a size check for tiny/blank images.
 */
export function screenAnimalImage(filename: string, species = "Cow", fileSizeBytes = 0, sampleType = "") {
  const target = `${sampleType.toLowerCase()} ${filename.toLowerCase()}`;
  const fileSizeKb = fileSizeBytes / 1024;

  let plan: (typeof VISION_PLANS)[keyof typeof VISION_PLANS];
  if (hasAny(target, ["thin", "underweight", "emaciated", "ribs", "bcs", "malnutrition", "weak"])) {
    plan = VISION_PLANS.underweight;
  } else if (hasAny(target, ["skin_disease", "nodule", "lumpy", "lsd", "bump", "pox"])) {
    plan = VISION_PLANS.lumpy_skin;
  } else if (hasAny(target, ["fmd", "hoof", "lesion", "foot", "mouth", "blister", "saliva", "ulcer"])) {
    plan = VISION_PLANS.fmd;
  } else if (hasAny(target, ["eye", "discharge", "pinkeye", "cornea", "lacrimation", "conjunctiv"])) {
    plan = VISION_PLANS.pinkeye;
  } else if (hasAny(target, ["blurry", "unclear", "dark", "bad", "poor", "noise"]) || (fileSizeKb > 0 && fileSizeKb < 5)) {
    plan = VISION_PLANS.inconclusive;
  } else if (hasAny(target, ["healthy", "normal", "clean", "fine"])) {
    plan = VISION_PLANS.healthy;
  } else {
    plan = VISION_PLANS.general;
  }

  return {
    image_filename: filename,
    species_detected: species,
    ...(JSON.parse(JSON.stringify(plan)) as Record<string, any>),
  } as Record<string, any> & {
    image_quality_check: string;
    screened_condition: string;
    visual_findings: string;
    risk_score: number;
    risk_level: string;
    confidence: number;
    urgent_vet_recommended: boolean;
  };
}
