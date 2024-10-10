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

const AboutMePage: React.FC = () => {
  return (
    <div className="flex gap-4 flex-col">
      <h1 className="text-xl font-bold">About Me</h1>

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
        <AlertDescription>I have added an alert</AlertDescription>
      </Alert>
    </div>
  );
};

export default AboutMePage;
