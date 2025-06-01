
"use client";

import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { AndroidTesterForm } from "@/components/page-specific/status/android-tester-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MailCheck, Rocket, ClipboardList, LayoutDashboard, ServerCog } from "lucide-react";
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

        <div className="mt-12 flex justify-center">
          <div className="lg:col-span-1">
            <AndroidTesterForm />
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
