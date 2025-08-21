
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
        <div className="p-6 max-w-4xl mx-auto leading-relaxed">
    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-4"><strong>Effective Date:</strong> August 19, 2025</p>

    <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
    <p>
        This Privacy Policy outlines how Vamsiram Enterprises Private Limited and
        its "Post My Property" Platform collect, use, store, and protect your data.
        This policy is subject to Indian laws, including the Information
        Technology Act, 2000, the IT (Reasonable Security Practices and Procedures
        and Sensitive Personal Data or Information) Rules, 2011, and the
        principles of the proposed Digital Personal Data Protection Bill, 2023.
    </p>

    <h2 className="text-xl font-semibold mt-6">2. Information We Collect</h2>
    <ul className="list-disc list-inside ml-4">
        <li>Contact Information: Name, email address, and phone number.</li>
        <li>Property Details: Information you provide about a property, including location, price, and images.</li>
        <li>RERA Information: Valid RERA registration number for agents and promoters, if applicable.</li>
        <li>Payment Information: We do not store your credit/debit card details. All payment information is processed by
            our third-party payment gateway, Razorpay, in a secure manner as per RBI guidelines.</li>
        <li>Usage Data: Information about how you use the Platform, such as your IP address and device type.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">3. How We Use Your Information</h2>
    <ul className="list-disc list-inside ml-4">
        <li>Platform Functioning: To enable you to list properties and manage your account.</li>
        <li>Lead Management: Once seller/lister property listing is publicly visible, interested buyers can contact
            seller/lister directly or add your property to their shortlist. The buyers number and name will be visible
            to seller/lister. When buyer is interested in a property, the lister's (seller's) name and phone number are
            visible to buyer, allowing for direct communication.</li>
        <li>Compliance: To comply with legal and regulatory obligations, including verifying RERA compliance.</li>
        <li>Improvement: To analyze usage trends and improve the Platform.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">4. Data Sharing and Disclosure</h2>
    <p>We will not sell or rent your personal data to any third party for marketing. We may share your information with:
    </p>
    <ul className="list-disc list-inside ml-4">
        <li>Other Users: Your contact and property details will be visible to other users of this Platform.</li>
        <li>Third-Party Service Providers: We use third-party services for payment processing (Razorpay), hosting, and
            analytics. These providers are bound by confidentiality agreements.</li>
        <li>Legal & Regulatory Authorities: We may disclose your data if required by law or in response to a valid
            request from government authorities, including RERA, the RBI, or law enforcement.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">5. Data Security</h2>
    <p>We implement reasonable security practices to protect your data. However, no electronic storage is 100% secure,
        and we cannot guarantee absolute security.</p>

    <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
    <p>You have the right to access, correct, or delete your personal data. You can manage your information through
        contacting communication@postmyproperty.in.</p>

    <h2 className="text-xl font-semibold mt-6">7. Policy Revisions</h2>
    <p>This policy may be updated periodically. The updated policy will be effective upon posting.</p>
</div>
      </Section>
    </PageContainer>
  );
}
