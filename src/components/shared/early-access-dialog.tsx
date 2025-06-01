
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmailCaptureForm } from "./email-capture-form";

type EarlyAccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EarlyAccessDialog({ open, onOpenChange }: EarlyAccessDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false); // Close dialog on successful submission
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Join Early Access</DialogTitle>
          <DialogDescription>
            Be the first to know when we launch. Enter your email below to get exclusive updates and early bird offers.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <EmailCaptureForm
            formId="early-access"
            successMessage="You've been added to the early access list!"
            ctaText="Join Waitlist"
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
