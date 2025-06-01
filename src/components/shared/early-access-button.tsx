
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { EarlyAccessDialog } from "./early-access-dialog";
import { Rocket } from "lucide-react";

export function EarlyAccessButton() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full animate-pulse bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => setDialogOpen(true)}
      >
        <Rocket className="mr-2 h-5 w-5" />
        Join Early Access
      </Button>
      <EarlyAccessDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
