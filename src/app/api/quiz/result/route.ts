import { db } from "@/db";
import { drugPreventionSurvey } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const surveyResults = await db.select().from(drugPreventionSurvey);

  return NextResponse.json(surveyResults);
}
