"use server";

import { db } from "@/db";
import { drugPreventionSurvey } from "@/db/schema";

export async function insertQuizResults(
  educationHours: number,
  peerPressureConfidence: number,
  trustedAdults: number,
  campaignMessages: number,
  drugFreeActivities: number
) {
  await db.insert(drugPreventionSurvey).values({
    educationHours,
    peerPressureConfidence,
    trustedAdults,
    campaignMessages,
    drugFreeActivities,
  });
}

export async function getAllQuizResults() {
  return await db.select().from(drugPreventionSurvey);
}
