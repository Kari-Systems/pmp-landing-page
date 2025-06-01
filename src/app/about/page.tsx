
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { FounderBio } from "@/components/page-specific/about/founder-bio";
import { InvestorContactForm } from "@/components/page-specific/about/investor-contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Lightbulb, Phone, Mail, Settings, DollarSign, MapPin, Rocket, Smartphone, Server, Cloud } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Post My Property - Our Story & Vision",
  description: "Learn about Post My Property: a minimal, fast, affordable property listing app for Hyderabad. Discover our mission, founder's journey, tech stack, and investment opportunities.",
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
    description: "Bootstrapped and founder-led, Post My Property offers a 3-step listing process, hyperlocal focus, transparent pricing (from Rs. 200/month), and direct seller-to-buyer connections, all built for speed and ease of use by a local engineer who understands the market."
  }
];

const productTechStack = [
  { category: "Mobile Application", details: ["Cross-platform development for wide accessibility (Flutter).", "Intuitive user interface and smooth performance with robust state management (Riverpod).", "Offline-friendly UX and native feel."], icon: Smartphone },
  { category: "Backend System", details: ["Scalable microservices architecture (Django/Python).", "Secure and reliable relational database (PostgreSQL).", "Efficient REST API for fast data exchange, with OTP-based authentication."], icon: Server },
  { category: "Cloud Infrastructure", details: ["Hosted on secure and dependable cloud servers (DigitalOcean VPS).", "Ensuring high availability, data integrity, and security (Cloudflare DNS/SSL).", "CI/CD pipelines and planned email services."], icon: Cloud },
];

const landingPageTechStack = [
  "Frontend: Next.js, React, TypeScript",
  "Styling: Tailwind CSS, ShadCN UI",
  "AI (Planned): Genkit for intelligent features",
  "Hosting: Firebase App Hosting / Vercel",
];


export default function AboutPage() {
  return (
    <PageContainer>
      <Section id="about-summary" className="pt-8 pb-0 md:pt-12 md:pb-0">
        <SectionTitle>Post My Property: Minimal, Fast, Affordable.</SectionTitle>
         <p className="text-center text-xl text-muted-foreground -mt-8 mb-16 max-w-3xl mx-auto">
          Designed for Hyderabad by a local engineer, our app cuts out middlemen, tech bloat, and complex flows, making property listing as easy as sending a WhatsApp message.
        </p>
      </Section>

      <Section id="company-overview" className="py-0 md:py-0">
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

      <Section id="founder-and-investment" className="pt-0 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <FounderBio />
            <InvestorContactForm />
          </div>
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-7 w-7 text-primary" />
                  <CardTitle className="font-headline">Capital &amp; Contact</CardTitle>
                </div>
                <CardDescription>We're seeking early-stage capital and strategic partnerships.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">Capital Goals: Rs. 12–15 Lakhs INR (~$15K–$18K USD)</h4>
                  <p className="text-muted-foreground text-sm mb-2">Use of Funds:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li>Marketing & launch campaign in Hyderabad</li>
                    <li>Map-based feature development</li>
                    <li>Agent onboarding platform</li>
                    <li>Dedicated web interface (responsive + dashboard)</li>
                    <li>Team hiring (1–2 dev/design interns)</li>
                  </ul>
                </div>
                <hr className="my-4"/>
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
                      <a href="mailto:vamsikrishna481998@gmail.com" className="hover:text-primary text-sm">vamsikrishna481998@gmail.com (Developer)</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">Hyderabad, India</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
               <CardHeader>
                <div className="flex items-center gap-2">
                   <Rocket className="h-6 w-6 text-primary" />
                  <CardTitle className="font-headline">Core Product Technology</CardTitle>
                </div>
                 <CardDescription>The robust stack powering our mobile application and backend services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {productTechStack.map(stack => (
                  <div key={stack.category}>
                    <div className="flex items-center gap-2 mb-1">
                      <stack.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <h4 className="font-semibold text-md">{stack.category}</h4>
                    </div>
                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5 text-sm pl-7">
                      {stack.details.map(detail => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
               <CardHeader>
                 <div className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline">Landing Page Tech</CardTitle>
                 </div>
                 <CardDescription>This website is built for performance and scalability.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  {landingPageTechStack.map(item => <li key={item}>{item}</li>)}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">Our technology choices prioritize modern development practices, user experience, and rapid iteration.</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </Section>
    </PageContainer>
  );
}
