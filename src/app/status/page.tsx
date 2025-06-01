"use client";

import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { AndroidTesterForm } from "@/components/page-specific/status/android-tester-form";
import { TechStackTable } from "@/components/page-specific/status/tech-stack-table";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import React from "react";

const completedFeatures = [
  "Core Platform Design",
  "Landing Page Development",
  "Initial Feature Set Definition",
  "Tech Stack Selection",
];

const upcomingFeatures = [
  "User Authentication",
  "Property Listing Creation Flow",
  "Search and Filtering Functionality",
  "Payment Gateway Integration",
  "Android App Development - Phase 1",
];

export default function StatusPage() {
  const [progressValue, setProgressValue] = React.useState(0);

  React.useEffect(() => {
    // Simulate progress update
    const timer = setTimeout(() => setProgressValue(35), 500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <PageContainer>
      <Section id="status">
        <SectionTitle>Application Status</SectionTitle>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Development Progress</CardTitle>
              <CardDescription>We are actively building Post My Property. Here's a snapshot of our current progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-primary">Overall Progress</span>
                  <span className="text-sm font-medium text-primary">{progressValue}%</span>
                </div>
                <Progress value={progressValue} aria-label={`${progressValue}% complete`} className="w-full [&>div]:bg-primary" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 font-headline">Completed Milestones:</h3>
                <ul className="space-y-1 list-inside">
                  {completedFeatures.map(feature => (
                    <li key={feature} className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 font-headline">Upcoming Focus:</h3>
                 <ul className="space-y-1 list-inside text-muted-foreground">
                  {upcomingFeatures.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-12">
            <AndroidTesterForm />

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-center">Styling with Tailwind CSS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Our components are styled using Tailwind CSS, a utility-first framework that allows for rapid development of modern, responsive, and customizable user interfaces. This approach ensures a consistent look and feel across the application, adhering to professional design principles with clean, semantic class names.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
         <TechStackTable />
        </div>
      </Section>
    </PageContainer>
  );
}
