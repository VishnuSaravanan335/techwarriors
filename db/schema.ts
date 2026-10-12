import { sql } from "drizzle-orm";
import { pgTable, serial, text, integer, doublePrecision } from "drizzle-orm/pg-core";

// Timestamps are stored as UTC text ("YYYY-MM-DD HH:MM:SS") to match the format the UI displays.
const nowText = sql`to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')`;

export const users = pgTable("users", {
  id: serial().primaryKey(),
  name: text().notNull(),
  mobile: text().notNull().unique(),
  role: text().notNull().default("farmer"),
  state: text().default("Tamil Nadu"),
  district: text().default("Coimbatore"),
  villagePin: text("village_pin").default("641001"),
  createdAt: text("created_at").default(nowText),
});

export const animals = pgTable("animals", {
  id: serial().primaryKey(),
  animalCode: text("animal_code").notNull().unique(),
  uuid: text().notNull().unique(),
  ownerId: integer("owner_id").notNull().references(() => users.id),
  species: text().notNull(),
  breed: text().default("Local / Desi"),
  animalName: text("animal_name"),
  ageYears: doublePrecision("age_years").default(3.0),
  gender: text().default("Female"),
  baselineTemp: doublePrecision("baseline_temp").default(38.6),
  baselineHr: doublePrecision("baseline_hr").default(70.0),
  iotEnabled: integer("iot_enabled").default(0),
  iotDeviceId: text("iot_device_id"),
  status: text().default("active"),
  createdAt: text("created_at").default(nowText),
});

export const iotDevices = pgTable("iot_devices", {
  id: serial().primaryKey(),
  deviceId: text("device_id").notNull().unique(),
  animalId: integer("animal_id").references(() => animals.id),
  deviceType: text("device_type").default("ESP32-Livestock-Tag"),
  status: text().default("online"),
  batteryPct: integer("battery_pct").default(95),
  lastHeartbeat: text("last_heartbeat"),
  createdAt: text("created_at").default(nowText),
});

export const sensorReadings = pgTable("sensor_readings", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  deviceId: text("device_id").notNull(),
  temperature: doublePrecision().notNull(),
  heartRate: doublePrecision("heart_rate").notNull(),
  activityLevel: text("activity_level").notNull(),
  stepsPerHour: integer("steps_per_hour").default(120),
  ruminationTimeMin: integer("rumination_time_min").default(45),
  isAbnormal: integer("is_abnormal").default(0),
  isSimulated: integer("is_simulated").default(0),
  recordedAt: text("recorded_at").default(nowText),
});

export const manualObservations = pgTable("manual_observations", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  temperature: doublePrecision(),
  heartRate: doublePrecision("heart_rate"),
  feedingStatus: text("feeding_status"),
  activityStatus: text("activity_status"),
  symptoms: text(),
  notes: text(),
  recordedAt: text("recorded_at").default(nowText),
});

export const animalImages = pgTable("animal_images", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  imageFilename: text("image_filename").notNull(),
  imagePath: text("image_path").notNull(),
  imageQualityCheck: text("image_quality_check").default("Passed"),
  screenedCondition: text("screened_condition"),
  visualFindings: text("visual_findings"),
  riskScore: doublePrecision("risk_score").default(0),
  riskLevel: text("risk_level").default("Low"),
  confidence: doublePrecision().default(0.0),
  uploadedAt: text("uploaded_at").default(nowText),
});

export const riskAssessments = pgTable("risk_assessments", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  assessmentMode: text("assessment_mode").notNull(),
  riskScore: integer("risk_score").notNull(),
  riskLevel: text("risk_level").notNull(),
  confidencePct: integer("confidence_pct").default(85),
  suspectedConditions: text("suspected_conditions"),
  reasonsBreakdown: text("reasons_breakdown"),
  recommendations: text(),
  urgencyLevel: text("urgency_level").default("Routine"),
  createdAt: text("created_at").default(nowText),
});

export const alerts = pgTable("alerts", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  sourceMode: text("source_mode").notNull(),
  alertTitle: text("alert_title").notNull(),
  reason: text().notNull(),
  riskLevel: text("risk_level").notNull(),
  recommendedAction: text("recommended_action").notNull(),
  isAcknowledged: integer("is_acknowledged").default(0),
  isResolved: integer("is_resolved").default(0),
  createdAt: text("created_at").default(nowText),
  resolvedAt: text("resolved_at"),
});

export const helplines = pgTable("helplines", {
  id: serial().primaryKey(),
  state: text().notNull(),
  district: text(),
  helplineNumber: text("helpline_number").notNull(),
  serviceName: text("service_name").notNull(),
  serviceType: text("service_type").notNull(),
  operatingHours: text("operating_hours").notNull(),
  officialSource: text("official_source").notNull(),
  lastVerifiedDate: text("last_verified_date").notNull(),
  isActive: integer("is_active").default(1),
});

export const veterinaryHospitals = pgTable("veterinary_hospitals", {
  id: serial().primaryKey(),
  name: text().notNull(),
  facilityType: text("facility_type").notNull(),
  state: text().notNull(),
  district: text().notNull(),
  address: text().notNull(),
  phone: text().notNull(),
  distanceKm: doublePrecision("distance_km"),
  operatingHours: text("operating_hours").notNull(),
  mobileUnitAvailable: integer("mobile_unit_available").default(1),
  mapsQuery: text("maps_query"),
});

export const vaccinations = pgTable("vaccinations", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id, { onDelete: "cascade" }),
  vaccineName: text("vaccine_name").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  administeredDate: text("administered_date"),
  status: text().default("Scheduled"),
  veterinarianNotes: text("veterinarian_notes"),
});

export const diseaseLibrary = pgTable("disease_library", {
  id: serial().primaryKey(),
  diseaseKey: text("disease_key").notNull().unique(),
  name: text().notNull(),
  speciesAffected: text("species_affected").notNull(),
  description: text().notNull(),
  causesRiskFactors: text("causes_risk_factors").notNull(),
  commonSymptoms: text("common_symptoms").notNull(),
  visibleSigns: text("visible_signs").notNull(),
  invisibleSigns: text("invisible_signs").notNull(),
  differentialPossibilities: text("differential_possibilities").notNull(),
  diagnosticTests: text("diagnostic_tests").notNull(),
  immediateFirstAid: text("immediate_first_aid").notNull(),
  supportiveCare: text("supportive_care").notNull(),
  veterinaryTreatment: text("veterinary_treatment").notNull(),
  medicineInfoRestrictions: text("medicine_info_restrictions").notNull(),
  preventionBiosecurity: text("prevention_biosecurity").notNull(),
  warningSignsUrgency: text("warning_signs_urgency").notNull(),
  recoveryMonitoring: text("recovery_monitoring").notNull(),
  referenceSources: text("reference_sources").notNull(),
  lastReviewed: text("last_reviewed").notNull(),
  veterinaryReviewer: text("veterinary_reviewer").notNull(),
});

export const carePlans = pgTable("care_plans", {
  id: serial().primaryKey(),
  animalId: integer("animal_id").notNull().references(() => animals.id),
  assessmentId: integer("assessment_id"),
  planTitle: text("plan_title").notNull(),
  observableFindings: text("observable_findings").notNull(),
  bodyConditionScore: text("body_condition_score"),
  suspectedCauses: text("suspected_causes").notNull(),
  overallRiskLevel: text("overall_risk_level").notNull(),
  immediateSafeCare: text("immediate_safe_care").notNull(),
  veterinaryUrgency: text("veterinary_urgency").notNull(),
  followupQuestions: text("followup_questions"),
  treatmentOverview: text("treatment_overview").notNull(),
  preventionPlan: text("prevention_plan").notNull(),
  escalationTriggers: text("escalation_triggers").notNull(),
  createdAt: text("created_at").default(nowText),
});
