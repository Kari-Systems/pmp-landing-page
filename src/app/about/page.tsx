import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { FounderBio } from "@/components/page-specific/about/founder-bio";
import { InvestorContactForm } from "@/components/page-specific/about/investor-contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Lightbulb, Phone, Mail, DollarSign, MapPin, Rocket, Smartphone, Server, Cloud, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { AnimatedScrollArrow } from "@/components/shared/animated-scroll-arrow";

export const metadata: Metadata = {
  title: "About Post My Property - Our Story, Vision & Investment Opportunity",
  description: "Discover Post My Property: a minimal, fast, affordable property listing app for Hyderabad. Learn about our mission, founder, technology, capital goals, and how we're creating investor value.",
};

const companyInfo = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the simplest and most trusted hyperlocal platform for property listings in Hyderabad, revolutionizing how everyday people connect to buy, sell, and rent."
  },
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower property owners and seekers in Hyderabad with a minimal, fast, and affordable mobile-first tool, cutting out middlemen, tech bloat, and complex flows."
  },
  {
    icon: Lightbulb,
    title: "Our Uniqueness",
    description: "Bootstrapped and founder-led, Post My Property offers a 3-step listing process, transparent pricing (from Rs. 200/month), and direct seller-to-buyer connections. Initially focused hyperlocally on Hyderabad, our lean model and scalable technology are engineered for rapid growth. We are actively working to expand our services to other key cities and states in phases, driven by user adoption and community feedback, demonstrating our commitment to broader market penetration."
  }
];

export default function AboutPage() {
  return (
    <PageContainer>
      <Section id="about-summary"> {/* Removed custom top padding to use Section default */}
        <SectionTitle>Post My Property: Minimal, Fast, Affordable.</SectionTitle>
         <p className="text-center text-xl text-muted-foreground -mt-8 mb-8 max-w-3xl mx-auto">
          Designed for Hyderabad by a local engineer, our app cuts out the middlemen, tech bloat, and complex flows, making property listing as easy as sending a WhatsApp message. We're building a scalable business with strong profit potential.
        </p>
        <AnimatedScrollArrow className="text-center" />
      </Section>

      <Section id="company-overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {companyInfo.map(info => (
            <Card key={info.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <CardHeader className="items-center">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-3">
                  <info.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">{info.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="founder-and-investment">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <FounderBio />
            <InvestorContactForm />
          </div>
          <div className="space-y-8">
            <Card className="shadow-lg">
              
              <CardContent className="space-y-4">
                <div className="my-4" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Get in Touch:</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <a href="tel:+919395151279" className="hover:text-primary text-sm">+91 9395151279 (India)</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <a href="mailto:invest@postmyproperty.in" className="hover:text-primary text-sm">invest@postmyproperty.in (Investors/Partners)</a>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <a href="mailto:communication@postmyproperty.in" className="hover:text-primary text-sm">communication@postmyproperty.in (info / communication)</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">Hyderabad, India</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
