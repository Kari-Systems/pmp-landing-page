
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function AddPropertyCtaButton() {
  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      <Link href="/add-property">
        <Plus className="mr-2 h-5 w-5" />
        Add Property
      </Link>
    </Button>
  );
}
