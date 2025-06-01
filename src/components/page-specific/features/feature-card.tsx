
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import React from "react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string;
};

export function FeatureCard({ icon: Icon, title, description, details }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full_transform hover:-translate-y-1">
      <CardHeader className="items-center text-center pb-4">
        <div className="p-4 bg-accent/10 rounded-full mb-4 inline-block">
          <Icon className="h-10 w-10 text-accent" />
        </div>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        <CardDescription className="text-lg text-muted-foreground mb-2">{description}</CardDescription>
        {details && <p className="text-md text-foreground">{details}</p>}
      </CardContent>
    </Card>
  );
}
