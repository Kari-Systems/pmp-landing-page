
"use client";

import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { AndroidTesterForm } from "@/components/page-specific/status/android-tester-form";
import { TechStackTable } from "@/components/page-specific/status/tech-stack-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MailCheck, Rocket, ClipboardList, LayoutDashboard, ServerCog, CalendarClock, Construction } from "lucide-react";
import React from "react";

const mobileAppStatus = [
  { text: "Design, Development & Testing Complete", icon: CheckCircle, color: "text-green-500" },
  { text: "Currently accepting internal Android testers via email registration", icon: MailCheck, color: "text-blue-500" },
  { text: "Launch planned for July 2025 on Google Play", icon: Rocket, color: "text-purple-500" },
];

const webAppStatus = [
  { text: "Under planning", icon: ClipboardList, color: "text-orange-500" },
  { text: "Web dashboard and property search planned post-launch based on mobile traction", icon: LayoutDashboard, color: "text-orange-500" },
  { text: "Server and API foundation already prepared", icon: ServerCog, color: "text-green-500" },
];


export default function StatusPage() {
  return (
    <PageContainer>
      <Section id="status">
        <SectionTitle>Application Status</SectionTitle>
        <p className="text-center text-lg text-muted-foreground -mt-8 mb-12 max-w-3xl mx-auto">
          As of June 2025, here's the latest on Post My Property development.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Mobile App (Android)</CardTitle>
              <CardDescription>Our primary focus: a lightweight, fast, and user-friendly Android application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {mobileAppStatus.map(item => (
                    <li key={item.text} className="flex items-start">
                      <item.icon className={`h-5 w-5 mr-3 mt-0.5 ${item.color} flex-shrink-0`} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Web App</CardTitle>
              <CardDescription>Plans for a responsive web interface and dashboard post-mobile launch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {webAppStatus.map(item => (
                    <li key={item.text} className="flex items-start">
                      <item.icon className={`h-5 w-5 mr-3 mt-0.5 ${item.color} flex-shrink-0`} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-1">
            <AndroidTesterForm />
          </div>
          <div className="lg:col-span-2 space-y-8">
             <TechStackTable />
             <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-center">Landing Page Styling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  This landing page is built with Next.js and styled using Tailwind CSS with ShadCN UI components. This approach ensures a modern, responsive, and maintainable presentation layer for Post My Property.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
