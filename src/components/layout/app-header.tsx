
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <SiteLogo className="h-7" />
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        
        <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
        </div>
        
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setSheetOpen(false)}>
              <SiteLogo className="h-7" />
            </Link>
            <div className="flex flex-col space-y-3">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                    pathname === item.href
                      ? "text-primary bg-muted"
                      : "text-foreground/80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
               <div className="pt-4">
                  <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
