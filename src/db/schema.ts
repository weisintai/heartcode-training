import {
  boolean,
  uuid,
  pgTableCreator,
  varchar,
  serial,
  integer,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `heartcodeTraining_${name}`
);

export const users = createTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  isDrugDealer: boolean().notNull(),
});

export const drugPreventionSurvey = pgTable(
  "heartcodetraining_drug_prevention_survey",
  {
    id: serial("id").primaryKey(),
    educationHours: integer("education_hours").notNull(),
    peerPressureConfidence: integer("peer_pressure_confidence").notNull(),
    trustedAdults: integer("trusted_adults").notNull(),
    campaignMessages: integer("campaign_messages").notNull(),
    drugFreeActivities: integer("drug_free_activities").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }
);

// You can add more related tables or indexes here if needed

export type DrugPreventionSurvey = typeof drugPreventionSurvey.$inferSelect;
export type NewDrugPreventionSurvey = typeof drugPreventionSurvey.$inferInsert;
