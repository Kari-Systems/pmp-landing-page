
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, Users, Handshake, Icon } from "lucide-react";
import React from "react";

type Step = {
  icon: Icon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: FilePlus2,
    title: "1. Create Your Listing",
    description: "Easily create a detailed property listing in minutes with our intuitive form. Add photos, amenities, and all essential details effortlessly.",
  },
  {
    icon: Users,
    title: "2. Reach Buyers & Renters",
    description: "Your property gets immediate visibility to a wide and engaged audience actively searching for properties like yours.",
  },
  {
    icon: Handshake,
    title: "3. Close the Deal",
    description: "Connect directly with interested parties, manage inquiries efficiently, and close your deal faster. We make communication simple.",
  },
];

export function StepsGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300_transform hover:-translate-y-1">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
              <step.icon className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">{step.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
