"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import myImage from "@/app/assets/image.jpg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { DrugPreventionChart } from "@/components/drug-prevention-chart";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type SurveyResult = {
  // Add appropriate properties based on your API response
  id: number;
  educationHours: number;
  peerPressureConfidence: number;
  trustedAdults: number;
  campaignMessages: number;
  drugFreeActivities: number;
  createdAt: Date;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const AboutMePage: React.FC = () => {
  const { data: surveyResults, isLoading } = useQuery({
    queryKey: ["surveyResults"],
    queryFn: async () => {
      try {
        const response = await ky
          .get(`${API_URL}/api/quiz/result`)
          .json<SurveyResult[]>();

        return response;
      } catch (error) {
        console.error("Failed to fetch survey results:", error);
        throw new Error(
          "Failed to fetch survey results. Please try again later."
        );
      }
    },
  });

  return (
    <>
      <h1 className="text-xl font-bold mb-4">About Me</h1>

      <div className="grid grid-cols-[1fr_2fr] overflow-y-auto gap-8">
        <div className="flex gap-4 flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Hello I am Sin</CardTitle>
              <CardDescription>I like to code alot</CardDescription>
              <Image src={myImage} alt="Sin" width={500} />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Name:</p> Sin
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Major:</p> Computer Science
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Hobbies:</p> Singing
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>idk what am I doing</AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-center items-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : surveyResults ? (
            <DrugPreventionChart surveyResults={surveyResults} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AboutMePage;
