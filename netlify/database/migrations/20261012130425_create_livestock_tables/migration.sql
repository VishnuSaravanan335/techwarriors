CREATE TABLE "alerts" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"source_mode" text NOT NULL,
	"alert_title" text NOT NULL,
	"reason" text NOT NULL,
	"risk_level" text NOT NULL,
	"recommended_action" text NOT NULL,
	"is_acknowledged" integer DEFAULT 0,
	"is_resolved" integer DEFAULT 0,
	"created_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS'),
	"resolved_at" text
);
--> statement-breakpoint
CREATE TABLE "animal_images" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"image_filename" text NOT NULL,
	"image_path" text NOT NULL,
	"image_quality_check" text DEFAULT 'Passed',
	"screened_condition" text,
	"visual_findings" text,
	"risk_score" double precision DEFAULT 0,
	"risk_level" text DEFAULT 'Low',
	"confidence" double precision DEFAULT 0,
	"uploaded_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "animals" (
	"id" serial PRIMARY KEY,
	"animal_code" text NOT NULL UNIQUE,
	"uuid" text NOT NULL UNIQUE,
	"owner_id" integer NOT NULL,
	"species" text NOT NULL,
	"breed" text DEFAULT 'Local / Desi',
	"animal_name" text,
	"age_years" double precision DEFAULT 3,
	"gender" text DEFAULT 'Female',
	"baseline_temp" double precision DEFAULT 38.6,
	"baseline_hr" double precision DEFAULT 70,
	"iot_enabled" integer DEFAULT 0,
	"iot_device_id" text,
	"status" text DEFAULT 'active',
	"created_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "care_plans" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"assessment_id" integer,
	"plan_title" text NOT NULL,
	"observable_findings" text NOT NULL,
	"body_condition_score" text,
	"suspected_causes" text NOT NULL,
	"overall_risk_level" text NOT NULL,
	"immediate_safe_care" text NOT NULL,
	"veterinary_urgency" text NOT NULL,
	"followup_questions" text,
	"treatment_overview" text NOT NULL,
	"prevention_plan" text NOT NULL,
	"escalation_triggers" text NOT NULL,
	"created_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "disease_library" (
	"id" serial PRIMARY KEY,
	"disease_key" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"species_affected" text NOT NULL,
	"description" text NOT NULL,
	"causes_risk_factors" text NOT NULL,
	"common_symptoms" text NOT NULL,
	"visible_signs" text NOT NULL,
	"invisible_signs" text NOT NULL,
	"differential_possibilities" text NOT NULL,
	"diagnostic_tests" text NOT NULL,
	"immediate_first_aid" text NOT NULL,
	"supportive_care" text NOT NULL,
	"veterinary_treatment" text NOT NULL,
	"medicine_info_restrictions" text NOT NULL,
	"prevention_biosecurity" text NOT NULL,
	"warning_signs_urgency" text NOT NULL,
	"recovery_monitoring" text NOT NULL,
	"reference_sources" text NOT NULL,
	"last_reviewed" text NOT NULL,
	"veterinary_reviewer" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helplines" (
	"id" serial PRIMARY KEY,
	"state" text NOT NULL,
	"district" text,
	"helpline_number" text NOT NULL,
	"service_name" text NOT NULL,
	"service_type" text NOT NULL,
	"operating_hours" text NOT NULL,
	"official_source" text NOT NULL,
	"last_verified_date" text NOT NULL,
	"is_active" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE "iot_devices" (
	"id" serial PRIMARY KEY,
	"device_id" text NOT NULL UNIQUE,
	"animal_id" integer,
	"device_type" text DEFAULT 'ESP32-Livestock-Tag',
	"status" text DEFAULT 'online',
	"battery_pct" integer DEFAULT 95,
	"last_heartbeat" text,
	"created_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "manual_observations" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"temperature" double precision,
	"heart_rate" double precision,
	"feeding_status" text,
	"activity_status" text,
	"symptoms" text,
	"notes" text,
	"recorded_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "risk_assessments" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"assessment_mode" text NOT NULL,
	"risk_score" integer NOT NULL,
	"risk_level" text NOT NULL,
	"confidence_pct" integer DEFAULT 85,
	"suspected_conditions" text,
	"reasons_breakdown" text,
	"recommendations" text,
	"urgency_level" text DEFAULT 'Routine',
	"created_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "sensor_readings" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"device_id" text NOT NULL,
	"temperature" double precision NOT NULL,
	"heart_rate" double precision NOT NULL,
	"activity_level" text NOT NULL,
	"steps_per_hour" integer DEFAULT 120,
	"rumination_time_min" integer DEFAULT 45,
	"is_abnormal" integer DEFAULT 0,
	"is_simulated" integer DEFAULT 0,
	"recorded_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"mobile" text NOT NULL UNIQUE,
	"role" text DEFAULT 'farmer' NOT NULL,
	"state" text DEFAULT 'Tamil Nadu',
	"district" text DEFAULT 'Coimbatore',
	"village_pin" text DEFAULT '641001',
	"created_at" text DEFAULT to_char(now() at time zone 'utc', 'YYYY-MM-DD HH24:MI:SS')
);
--> statement-breakpoint
CREATE TABLE "vaccinations" (
	"id" serial PRIMARY KEY,
	"animal_id" integer NOT NULL,
	"vaccine_name" text NOT NULL,
	"scheduled_date" text NOT NULL,
	"administered_date" text,
	"status" text DEFAULT 'Scheduled',
	"veterinarian_notes" text
);
--> statement-breakpoint
CREATE TABLE "veterinary_hospitals" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"facility_type" text NOT NULL,
	"state" text NOT NULL,
	"district" text NOT NULL,
	"address" text NOT NULL,
	"phone" text NOT NULL,
	"distance_km" double precision,
	"operating_hours" text NOT NULL,
	"mobile_unit_available" integer DEFAULT 1,
	"maps_query" text
);
--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "animal_images" ADD CONSTRAINT "animal_images_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "animals" ADD CONSTRAINT "animals_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "care_plans" ADD CONSTRAINT "care_plans_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "iot_devices" ADD CONSTRAINT "iot_devices_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "manual_observations" ADD CONSTRAINT "manual_observations_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "risk_assessments" ADD CONSTRAINT "risk_assessments_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id");--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_animal_id_animals_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE CASCADE;