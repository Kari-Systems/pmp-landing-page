
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  user_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  user_email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are not set!");
      toast({
        title: "Configuration Error",
        description: "The contact form is not configured correctly. Please contact support.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // We need to send the form data via a form element for EmailJS
    // so we create a temporary form and submit it.
    const tempForm = document.createElement('form');
    Object.entries(values).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.name = key;
        input.value = value;
        tempForm.appendChild(input);
    });


    try {
      await emailjs.sendForm(serviceId, templateId, tempForm, publicKey);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("EmailJS failed:", error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
}
