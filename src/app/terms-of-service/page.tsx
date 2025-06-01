
"use client";

import React from "react";
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import type { Metadata } from "next";

// Note: Metadata export is not allowed in client components.
// Consider moving this to a server component parent or layout if page-specific metadata is crucial.
// export const metadata: Metadata = {
//   title: "Terms of Service",
//   description: "Terms of Service for Post My Property.",
// };

export default function TermsOfServicePage() {
  const [lastUpdated, setLastUpdated] = React.useState('');

  React.useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <PageContainer>
      <Section id="terms-of-service">
        <SectionTitle>Terms of Service</SectionTitle>
        <div className="prose dark:prose-invert max-w-none mx-auto">
          {lastUpdated && <p>Last updated: {lastUpdated}</p>}

          <h2>1. Agreement to Terms</h2>
          <p>By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

          <h2>2. Changes to Terms or Services</h2>
          <p>We may modify the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the modified Terms on the Site or through other communications. It’s important that you review the Terms whenever we modify them because if you continue to use the Services after we have posted modified Terms on the Site, you are indicating to us that you agree to be bound by the modified Terms.</p>

          <h2>3. Who May Use the Services</h2>
          <p>You may use the Services only if you are 18 years or older and capable of forming a binding contract with Post My Property and are not barred from using the Services under applicable law.</p>

          <h2>4. Privacy Policy</h2>
          <p>Please refer to our Privacy Policy for information on how we collect, use and disclose information from our users.</p>

          <h2>5. Content Ownership, Responsibility and Removal</h2>
          <p>We do not claim any ownership rights in any User Content and nothing in these Terms will be deemed to restrict any rights that you may have to use and exploit your User Content. Subject to the foregoing, Post My Property and its licensors exclusively own all right, title and interest in and to the Services and Content, including all associated intellectual property rights.</p>
          
          <h2>6. General Prohibitions</h2>
          <p>You agree not to do any of the following: Post, upload, publish, submit or transmit any Content that: (i) infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages any conduct that would violate, any applicable law or regulation or would give rise to civil liability; (iii) is fraudulent, false, misleading or deceptive; (iv) is defamatory, obscene, pornographic, vulgar or offensive; (v) promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group; (vi) is violent or threatening or promotes violence or actions that are threatening to any person or entity; or (vii) promotes illegal or harmful activities or substances.</p>

          <h2>7. Termination</h2>
          <p>We may terminate your access to and use of the Services, at our sole discretion, at any time and without notice to you.</p>

          <h2>8. Disclaimers</h2>
          <p>The Services and Content are provided &quot;AS IS,&quot; without warranty of any kind. Without limiting the foregoing, WE EXPLICITLY DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.</p>
          
          <h2>9. Limitation of Liability</h2>
          <p>NEITHER POST MY PROPERTY NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SERVICES OR CONTENT WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE SERVICES ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICES OR CONTENT.</p>

          <h2>10. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at legal@postmyproperty.example.com.</p>
        </div>
      </Section>
    </PageContainer>
  );
}
