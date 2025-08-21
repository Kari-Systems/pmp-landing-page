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
          Designed for Hyderabad by a local engineer, our app cuts out middlemen, tech bloat, and complex flows, making property listing as easy as sending a WhatsApp message. We're building a scalable business with strong profit potential.
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

            {/* <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-7 w-7 text-primary" />
                  <CardTitle className="font-headline">Investor Value &amp; Profitability</CardTitle>
                </div>
                <CardDescription>A lean, scalable model targeting a high-growth market for attractive returns.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Post My Property offers a compelling investment opportunity driven by a lean operational model and a clear path to profitability. Our affordable subscription (starting at just Rs. 200/month) is designed to attract a high volume of users within Hyderabad's booming real estate sector.
                </p>
                <p className="font-semibold text-foreground/90">Key drivers for investor returns:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-4">
                  <li>
                    <strong>Scalable Revenue Model:</strong> Low customer acquisition cost coupled with recurring subscription revenue creates a strong foundation for exponential growth.
                  </li>
                  <li>
                    <strong>Large Addressable Market:</strong> Hyderabad's dynamic property market presents a vast pool of potential users.
                  </li>
                  <li>
                    <strong>Low Operational Overheads:</strong> Our efficient tech stack and streamlined processes ensure cost-effectiveness, maximizing profit margins as we scale.
                  </li>
                  <li>
                    <strong>Future Monetization:</strong> Beyond subscriptions, we envision future revenue streams through premium listings, agent partnerships, and value-added services.
                  </li>
                </ul>
                <p className="font-semibold text-foreground pt-1">
                  Your investment will directly fuel strategic marketing and feature development, accelerating user adoption and solidifying our market position for substantial long-term returns.
                </p>
              </CardContent>
            </Card> */}

            {/* <Card className="shadow-lg">
               <CardHeader>
                <div className="flex items-center gap-2">
                   <Rocket className="h-6 w-6 text-primary" />
                  <CardTitle className="font-headline">Built for Growth: Our Technology</CardTitle>
                </div>
                 <CardDescription>Engineered for speed, scale, and a seamless user experience, paving the way for market leadership.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex items-start gap-3 mb-1">
                    <Smartphone className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <h4 className="font-semibold text-md">Intuitive Mobile-First Platform</h4>
                  </div>
                  <p className="text-muted-foreground text-sm ml-[36px]">
                    Our core application is a user-friendly mobile platform, making property listing effortless. Non-technical users will find it remarkably simple, while the underlying modern, cross-platform technology (Flutter) ensures wide reach, rapid development, and a native-like experience.
                  </p>
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-1">
                    <Server className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <h4 className="font-semibold text-md">Scalable & Secure Backend</h4>
                  </div>
                  <p className="text-muted-foreground text-sm ml-[36px]">
                    The engine of Post My Property is built for growth using robust and proven technologies (Django/Python, PostgreSQL). It's designed for high performance and strong security, protecting user data and ensuring reliable service as we expand.
                  </p>
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-1">
                    <Cloud className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <h4 className="font-semibold text-md">Reliable Cloud Infrastructure</h4>
                  </div>
                  <p className="text-muted-foreground text-sm ml-[36px]">
                    We operate on dependable cloud infrastructure (DigitalOcean, Firebase), guaranteeing high availability and consistent performance, ensuring the platform is always accessible and can scale with user demand.
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
