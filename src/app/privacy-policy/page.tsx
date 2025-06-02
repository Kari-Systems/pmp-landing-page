
"use client";

import React from "react";
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = React.useState('');

  React.useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <PageContainer>
      <Section id="privacy-policy">
        <SectionTitle>Privacy Policy</SectionTitle>
        <div className="prose dark:prose-invert max-w-none mx-auto">
          {lastUpdated && <p>Last updated: {lastUpdated}</p>}
          
          <h2>1. Introduction</h2>
          <p>Welcome to Post My Property (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at communication@postmyproperty.in.</p>

          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.</p>
          <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following: names; phone numbers; email addresses; mailing addresses; job titles; usernames; passwords; contact preferences; contact or authentication data; billing addresses; debit/credit card numbers; and other similar information.</p>

          <h2>3. How We Use Your Information</h2>
          <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          
          <h2>4. Will Your Information Be Shared With Anyone?</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

          <h2>5. How Long Do We Keep Your Information?</h2>
          <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>

          <h2>6. How Do We Keep Your Information Safe?</h2>
          <p>We aim to protect your personal information through a system of organizational and technical security measures.</p>

          <h2>7. What Are Your Privacy Rights?</h2>
          <p>In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.</p>

          <h2>8. Controls for Do-Not-Track Features</h2>
          <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>
          
          <h2>9. Updates to This Notice</h2>
          <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>

          <h2>10. How Can You Contact Us About This Notice?</h2>
          <p>If you have questions or comments about this notice, you may email us at communication@postmyproperty.in or by post to:</p>
          <p>Post My Property<br/>Hyderabad<br/>Telangana, 500085<br/>India</p>
        </div>
      </Section>
    </PageContainer>
  );
}
