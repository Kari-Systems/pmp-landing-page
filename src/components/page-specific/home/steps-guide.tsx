
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2, CreditCard, Send, PhoneForwarded, type LucideIcon } from "lucide-react";
import React from "react";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: FilePlus2,
    title: "1. Create a Listing",
    description: "Add your property details using our simple form — no tech skills needed.",
  },
  {
    icon: CreditCard,
    title: "2. Choose a Plan",
    description: "Select from affordable posting plans starting at ₹200/month.",
  },
  {
    icon: Send,
    title: "3. Publish & Get Noticed",
    description: "Your property becomes visible to buyers instantly in the Hyderabad region.",
  },
  {
    icon: PhoneForwarded,
    title: "4. Connect & Close",
    description: "Buyers can directly connect with you via contact info (or via platform chat in a later version).",
  },
];

export function StepsGuide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
