
"use client";

import { EmailCaptureForm } from "@/components/shared/email-capture-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AndroidTesterForm() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-center">
          Become an Android Tester
        </CardTitle>
        <CardDescription className="text-center">
          Get early access to our Android app and help us shape its future. Sign
          up is
          <br />
          <strong>Coming Soon!</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EmailCaptureForm
          formId="android-tester"
          successMessage="Thanks for your interest! We'll contact you soon about Android testing."
          ctaText="Sign Up for Beta"
          disabled={true}
        />
      </CardContent>
    </Card>
  );
}
