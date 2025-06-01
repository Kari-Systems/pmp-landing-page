
"use client";

import Link from "next/link";
import { Menu, Home, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import { siteConfig, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EarlyAccessDialog } from "@/components/shared/early-access-dialog";

export function AppHeader() {
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block font-headline">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button
              variant="default"
              size="sm"
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              onClick={() => setDialogOpen(true)}
            >
              <Rocket className="mr-2 h-4 w-4" />
              Join Early Access
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Home className="h-6 w-6 text-primary" />
                  <span className="font-bold inline-block font-headline">
                    {siteConfig.name}
                  </span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {siteConfig.navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
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
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                        // To close the sheet first, then open dialog.
                        // No direct way to close Sheet from here, SheetTrigger manages its own state.
                        // For a better UX, consider custom Sheet implementation or global state.
                        setTimeout(() => setDialogOpen(true), 150); 
                      }
                    }
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Join Early Access
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <EarlyAccessDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
