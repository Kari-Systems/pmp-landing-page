
import { PageContainer, Section } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI WhatsApp Auto-Responder for Agents",
  description: "Instantly reply to buyer leads using our AI-powered WhatsApp auto-responder. Works 24/7, personalized replies, and free during beta.",
};

const features = [
  "Personalized WhatsApp replies",
  "Works 24/7",
  "Setup in 10 minutes",
  "Free during beta launch",
];

export default function AiResponderPage() {
  return (
    <PageContainer>
      <Section className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold font-headline">
              <span role="img" aria-label="fire">🔥</span> AI WhatsApp Auto-Responder for Agents
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
              <span role="img" aria-label="speech bubble">💬</span> Instantly reply to buyer leads using AI — even when you're offline!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 py-4 text-md text-foreground/90">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-6 w-6 text-primary bg-primary/10 rounded-full p-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              size="lg"
              className="w-full bg-[#ff9900] hover:bg-[#ff9900]/90 text-white rounded-full text-lg font-bold shadow-md transition-transform hover:scale-105"
            >
              <span role="img" aria-label="pointing right" className="mr-2">👉</span>
              Get Early Access
            </Button>
          </CardFooter>
        </Card>
      </Section>
    </PageContainer>
  );
}
