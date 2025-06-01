
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { FounderBio } from "@/components/page-specific/about/founder-bio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Lightbulb, Briefcase, Phone, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Post My Property's vision, mission, unique approach, founder, tech stack, and investment opportunities.",
};

const companyInfo = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the most trusted and accessible platform for property listings in India, revolutionizing how people buy, sell, and rent properties."
  },
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower property owners and seekers with simple, affordable, and effective digital tools, fostering transparent and efficient property transactions."
  },
  {
    icon: Lightbulb,
    title: "Our Uniqueness",
    description: "We focus on a streamlined user experience, transparent pricing, and cutting-edge technology to deliver unparalleled value, unlike complex and costly alternatives."
  }
];

export default function AboutPage() {
  return (
    <PageContainer>
      <Section id="about-us">
        <SectionTitle>About Post My Property</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {companyInfo.map(info => (
            <Card key={info.title} className="text-center shadow-lg hover:shadow-xl transition-shadow_transform hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
                  <info.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <FounderBio />
          </div>
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <CardTitle className="font-headline">Investment &amp; Contact</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">Capital Goals</h4>
                  <p className="text-muted-foreground">We are currently seeking seed funding of ₹1 Crore to accelerate product development, expand our marketing efforts, and scale operations to serve a wider audience across India.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Get in Touch (Investors/Stakeholders)</h4>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:invest@postmyproperty.example.com" className="hover:text-primary">invest@postmyproperty.example.com</a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+919876543210" className="hover:text-primary">+91-9876543210</a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
               <CardHeader>
                <CardTitle className="font-headline">Tech Stack Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Frontend:</strong> Next.js, React, TypeScript</li>
                  <li><strong>Styling:</strong> Tailwind CSS, ShadCN UI</li>
                  <li><strong>Backend:</strong> Node.js (planned for custom APIs)</li>
                  <li><strong>Database:</strong> Firebase Firestore / Supabase (under evaluation)</li>
                  <li><strong>Hosting:</strong> Vercel / Firebase Hosting</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">Our technology choices prioritize scalability, developer experience, and rapid iteration.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
