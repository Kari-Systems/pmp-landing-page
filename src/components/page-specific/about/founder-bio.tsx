
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FounderBio() {
  const founder = {
    name: "Vamsi Krishna Kari",
    title: "Frontend Software Engineer & Founder",
    photoUrl: "https://avatars.githubusercontent.com/u/46225107?v=4",
    bio: "I’m Vamsi Krishna Kari, a Frontend Software Engineer from Hyderabad with over 2 years of professional experience and a passion for simplifying user journeys through great UI/UX. Over time, I’ve worked with companies like Claranet and Saven Technologies, where I migrated large-scale apps from Angular to React, optimized web performance, and led component design systems. But more than just code, I believe in building tools that genuinely help people — and that’s what led me to Post My Property.",
    history: "In late 2024, after witnessing how difficult and intimidating it was for everyday people — especially non-technical property owners — to post, sell, or even get discovered in the real estate ecosystem, I decided to build something different. Something simpler. Bootstrapped entirely on my own savings, I took a break from full-time work and began designing Post My Property — a lightweight, mobile-first platform built with the average seller in mind. I wasn’t backed by a company. I didn’t have a team. But I had a clear goal: make property posting as easy as sending a WhatsApp message.",
  };

  const socialLinks = [
    { href: siteConfig.founderSocialLinks.github, icon: Github, label: "GitHub" },
    { href: site a.founderSocialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 p-0">
        <div className="p-6 text-center">
          <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <Image
              src={founder.photoUrl}
              alt={founder.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">{founder.name}</CardTitle>
          <p className="text-primary font-semibold">{founder.title}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 font-headline">About Me</h3>
          <p className="text-muted-foreground whitespace-pre-line">{founder.bio}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 font-headline">My Journey</h3>
          <p className="text-muted-foreground whitespace-pre-line">{founder.history}</p>
        </div>
        {socialLinks.length > 0 && (
          <div className="text-center pt-4 border-t">
            <h3 className="text-lg font-semibold mb-3 font-headline">Connect with me</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <Button key={link.label} variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <link.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
