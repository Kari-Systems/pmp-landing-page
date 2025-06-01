
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { FeatureCard } from "@/components/page-specific/features/feature-card";
import { BadgeIndianRupee, Zap, Accessibility } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description: "Discover the powerful features of Post My Property: Affordability, Simplicity, and Accessibility.",
};

const features = [
  {
    icon: BadgeIndianRupee,
    title: "Affordability",
    description: "Property Posting Made Easy.",
    details: "Starting at ₹200/month. Transparent pricing with no hidden fees. Get the best value for listing your property.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description: "List in Minutes, Not Hours.",
    details: "Our user-friendly interface allows you to create and manage listings effortlessly. Focus on what matters - selling or renting your property.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description: "Reach Everyone, Everywhere.",
    details: "Our platform is designed to be accessible on all devices, ensuring your listing reaches the widest possible audience. Mobile-first and user-centric.",
  },
];

export default function FeaturesPage() {
  return (
    <PageContainer>
      <Section id="features">
        <SectionTitle>Why Choose Post My Property?</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              details={feature.details}
            />
          ))}
        </div>
      </Section>
    </PageContainer>
  );
}
