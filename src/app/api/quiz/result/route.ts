import { db } from "@/db";
import { drugPreventionSurvey } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const surveyResults = await db.select().from(drugPreventionSurvey);

  return NextResponse.json(surveyResults);
}
