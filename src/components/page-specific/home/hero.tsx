
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-br from-background to-secondary/30">
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl font-headline">
            Post My Property:
            <br />
            <span className="text-primary">Your Listing, Simplified.</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            A minimal, fast, and affordable property listing app designed for Hyderabad. Cut out the middlemen and complex flows. Get started today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
              <Link href="/features">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform hover:scale-105">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
           <Image
            src="https://placehold.co/1200x675.png"
            alt="Modern home exterior in Hyderabad"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint="modern house hyderabad"
            priority
          />
        </div>
      </div>
    </section>
  );
}
