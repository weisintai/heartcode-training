"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Heart, Users } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  const words: string[] = ["Alchohol", "Vape", "Drug"];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-8 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-black flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span>Choose a </span>
              <FlipWords words={words} />
              <span>Free Life</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empower yourself with knowledge and make informed decisions.
              Discover why staying drug-free is the best choice for your health,
              future, and well-being.
            </p>
          </div>
        </section>

        <section
          id="reasons"
          className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Why Say No to Drugs
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Brain className="w-8 h-8 mr-2 text-blue-500" />
                  Protect Your Brain
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Drug use can severely impact brain function, affecting memory,
                learning, and decision-making abilities. Staying drug-free helps
                maintain cognitive health.
              </CardContent>
            </Card>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Heart className="w-8 h-8 mr-2 text-red-500" />
                  Safeguard Your Health
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Drugs can cause serious health problems, including heart
                disease, lung damage, and increased risk of infections. A
                drug-free life promotes overall well-being.
              </CardContent>
            </Card>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Users className="w-8 h-8 mr-2 text-green-500" />
                  Strengthen Relationships
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Drug use often leads to strained relationships with family and
                friends. Staying drug-free helps maintain healthy, meaningful
                connect ions with loved ones.
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          id="get-help"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black flex flex-col items-center"
        >
          <div className="text-center px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Need Help? You&apos;re Not Alone
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              If you or someone you know is struggling with drug use, help is
              available. Reach out to professionals who can provide support and
              guidance.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="w-full max-w-md" asChild>
                <a
                  href="https://www.ncada.org.sg/seeking-help/"
                  target="__blank"
                >
                  Find Resources
                </a>
              </Button>
              <p className="text-sm text-gray-500">
                Confidential and judgment-free support available 24/7
              </p>
            </div>
          </div>
        </section>

        <section
          id="resources"
          className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Helpful Resources in Singapore
          </h2>
          <div className="grid gap-8 md:grid-cols-2 px-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle className="text-center">
                  National Anti-Drug Abuse Helpline
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold mb-4">6-RECOVER (6-7326837)</p>
                <p className="text-gray-600">
                  Free, confidential, 24/7 helpline for individuals and families
                  facing drug-related issues in Singapore.
                </p>
              </CardContent>
            </Card>
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle className="text-center">Online Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-center">
                  <li>
                    <a
                      href="https://www.cnb.gov.sg"
                      className="text-blue-500 hover:underline"
                      target="__blank"
                    >
                      Central Narcotics Bureau (CNB)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nams.sg"
                      className="text-blue-500 hover:underline"
                      target="__blank"
                    >
                      National Addictions Management Service (NAMS)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.ncada.org.sg"
                      className="text-blue-500 hover:underline"
                      target="__blank"
                    >
                      National Council Against Drug Abuse (NCADA)
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-100 dark:bg-black text-center">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Drug-Free Life Singapore. All rights
            reserved.
          </p>
          <nav className="flex justify-center gap-4">
            <a
              className="text-sm text-gray-600 hover:underline"
              href="https://www.mha.gov.sg/policies/drugs/legal-framework"
            >
              Legal Framework
            </a>
            <a
              className="text-sm text-gray-600 hover:underline"
              href="https://www.cnb.gov.sg/about-us/privacy-statement"
            >
              Privacy Policy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
