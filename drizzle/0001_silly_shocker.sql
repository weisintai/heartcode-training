CREATE TABLE IF NOT EXISTS "heartcodeTraining_drug_prevention_survey" (
	"id" serial PRIMARY KEY NOT NULL,
	"education_hours" integer NOT NULL,
	"peer_pressure_confidence" integer NOT NULL,
	"trusted_adults" integer NOT NULL,
	"campaign_messages" integer NOT NULL,
	"drug_free_activities" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
