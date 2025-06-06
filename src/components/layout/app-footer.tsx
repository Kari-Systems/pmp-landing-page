
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { SiteLogo } from "@/components/shared/SiteLogo";

export function AppFooter() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
        <div className="flex items-center gap-2">
          {/* Use SiteLogo here, slightly smaller. w-auto is handled by SiteLogo or SVG viewBox */}
          <SiteLogo className="h-6" /> 
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
