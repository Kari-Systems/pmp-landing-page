
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FounderBio() {
  const founder = {
    name: "Chandra Sekhar",
    title: "Founder & CEO",
    photoUrl: "https://placehold.co/200x200.png",
    aiHint: "professional portrait man",
    bio: "Chandra is a passionate technologist and real estate enthusiast with over 10 years of experience in software development and product management. He founded Post My Property with the vision to simplify property transactions in India, making them more accessible and transparent for everyone. His journey began with a personal frustration in navigating the complexities of the property market, which fueled his determination to build a better solution.",
    history: "Previously, Chandra led several successful tech projects at leading startups, focusing on user-centric design and scalable architectures. He holds a Master's degree in Computer Science and is an advocate for leveraging technology to solve real-world problems.",
  };

  const socialLinks = [
    { href: siteConfig.founderSocialLinks.github, icon: Github, label: "GitHub" },
    { href: siteConfig.founderSocialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: siteConfig.founderSocialLinks.twitter, icon: Twitter, label: "Twitter" },
  ];

  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 p-0">
        <div className="p-6 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <Image
              src={founder.photoUrl}
              alt={founder.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={founder.aiHint}
            />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">{founder.name}</CardTitle>
          <p className="text-primary font-semibold">{founder.title}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 font-headline">About Me</h3>
          <p className="text-muted-foreground">{founder.bio}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 font-headline">My Journey</h3>
          <p className="text-muted-foreground">{founder.history}</p>
        </div>
        <div className="text-center">
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
      </CardContent>
    </Card>
  );
}
