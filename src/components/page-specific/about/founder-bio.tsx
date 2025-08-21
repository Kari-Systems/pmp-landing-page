
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function FounderBio() {
  return (
    <Card className="shadow-lg mb-12">
      <CardHeader>
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src="https://avatars.githubusercontent.com/u/1234567" alt="Founder's Photo" />
            <AvatarFallback>VS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="font-headline text-2xl">Meet the Founder</CardTitle>
            <p className="text-primary font-semibold">Vamsi S.</p>
            <CardDescription className="text-md">Principal Engineer & Founder</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <Link href={siteConfig.founderSocialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href={siteConfig.founderSocialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Vamsi is a seasoned principal engineer with over a decade of experience building scalable, high-performance software for global tech companies. With a deep passion for both technology and his hometown of Hyderabad, he founded Post My Property to solve a personal pain point: the unnecessarily complex and expensive process of listing property in the local market.
          <br /><br />
          Frustrated by bloated platforms and broker-dominated ecosystems, he envisioned a minimal, mobile-first solution that empowers everyday individuals to connect directly. Vamsi’s technical expertise and commitment to user-centric design are the driving forces behind Post My Property’s mission to make real estate accessible, transparent, and affordable for everyone in Hyderabad.
        </p>
      </CardContent>
    </Card>
  );
}
