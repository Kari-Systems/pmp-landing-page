
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { FeatureCard } from "@/components/page-specific/features/feature-card";
import { BadgeIndianRupee, Zap, UsersRound, MapPin, ListChecks, UserMinus, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - Why Post My Property?",
  description: "Discover why Post My Property is the best choice: Simple 3-Step Process, Affordable Pricing, Hyperlocal Focus for Hyderabad, Built for Laymen, Speed, No Brokers, and Trusted & Transparent.",
};

const features = [
  {
    icon: ListChecks,
    title: "Simple 3-Step Process",
    description: "Add → Post → Connect",
    details: "No confusing filters, brokers, or paperwork. Get your property listed in minutes.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Affordable Pricing",
    description: "From just ₹200/month",
    details: "Transparent pricing with no hidden commissions. The best value for your listing.",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Focus",
    description: "Built for Hyderabad",
    details: "Starting with key colonies and localities, we understand the local market.",
  },
  {
    icon: UsersRound,
    title: "Built for Laymen",
    description: "No Jargon, No Tech Hassle",
    details: "Our platform is designed for everyone, regardless of technical skill. Anyone can use it.",
  },
  {
    icon: Zap,
    title: "Built for Speed",
    description: "Optimized & Instant",
    details: "Optimized mobile performance, clean interface, and instant publishing of your listing.",
  },
  {
    icon: UserMinus,
    title: "No Brokers, No Commissions",
    description: "Direct Seller-to-Buyer",
    details: "Connect directly with interested parties. We cut out the middlemen, saving you money.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Transparent",
    description: "Verified & Secure",
    details: "We aim for only verified listings and provide secure OTP-based access for users.",
  },
];

export default function FeaturesPage() {
  return (
    <PageContainer>
      <Section id="features">
        <SectionTitle>Why Choose Post My Property?</SectionTitle>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Post My Property is engineered to be the simplest, fastest, and most affordable way to list your property in Hyderabad. We focus on what truly matters to sellers and buyers.
        </p>
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
