
"use client";

import React from "react";
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";

export default function TermsOfServicePage() {
  const [lastUpdated, setLastUpdated] = React.useState('');

  React.useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <PageContainer>
      <Section id="terms-of-service">
        <SectionTitle>Terms of Service</SectionTitle>
        <div className="p-6 max-w-4xl mx-auto leading-relaxed">
    <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
    <p className="mb-4"><strong>Effective Date:</strong> August 19, 2025</p>

    <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
    <p>
        These Terms & Conditions ("Terms") govern your access to and use of the
        "Post My Property" mobile application and website (the "Platform"), owned
        and operated by Vamsiram Enterprises Private Limited ("Company," "we,"
        "us," or "our"). By accessing or using the Platform, you agree to be bound
        by these Terms and our Privacy Policy. If you do not agree, you must not
        use the Platform.
    </p>

    <h2 className="text-xl font-semibold mt-6">2. Nature of the Service</h2>
    <p className="mt-2">
        <strong>2.1. Platform as an Intermediary:</strong> The Platform is an
        online marketplace that provides a digital listing and lead generation
        service for real estate properties. We act solely as an intermediary to
        facilitate communication and connection between property listers (sellers,
        landlords, builders, and agents) and prospective buyers.
    </p>
    <p className="mt-2">
        <strong>2.2. No Brokerage or Guarantee:</strong> We do not participate in, advise on, or take
        responsibility for any actual property transactions, negotiations, or
        agreements. We offer no guarantee or warranty as to the authenticity,
        legality, or quality and correctness of the properties listed/posted. All
        transactions are solely the responsibility of the lister and the
        interested party/buyers.
    </p>

    <h2 className="text-xl font-semibold mt-6">3. User Obligations and Representations</h2>
    <p className="mt-2">
        <strong>3.1. Accuracy of Information:</strong> You are solely responsible
        for the accuracy, truthfulness, and completeness of all property details,
        descriptions, images, and documents you upload. You represent and warrant
        that you have the legal right to list the property and that all
        information is free from misrepresentation or fraud.
    </p>
    <p className="mt-2">
        <strong>3.2. RERA Compliance:</strong> If you are an agent or a
        promoter/developer listing a new project, you must possess a valid
        registration under the Real Estate (Regulation and Development) Act, 2016
        ("RERA"), where applicable. The Company reserves the right to request
        proof and to take down any non-compliant listing without a refund.
    </p>
    <p className="mt-2">
        <strong>3.3. Unlawful Listings:</strong>
    </p>
    <ul className="list-disc list-inside ml-4">
        <li>You shall not list any property that is fraudulent, misleading, or illegal. The Company may suspend your
            account and remove any such listing without prior notice or refund.</li>
        <li>If any property posted illegally or unauthorizedly, if right full legal owner claims the posted/listed
            property to dilsited legal action will be taken by the company.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6">4. Subscription and Payments</h2>
    <p><strong>4.1. Subscription Model:</strong> Listers must pay a non-refundable monthly subscription fee. Fees are
        specified on the Platform and may be revised at our discretion.</p>
    <p><strong>4.2. Non-Refundable Fees:</strong> All subscription fees are strictly non-refundable. The only exception
        is if a listing fails to be published due to a technical error on our part, in which case a refund may be
        initiated as per our Refund & Cancellation Policy.</p>
    <p><strong>4.3. Payment Gateway:</strong> Payments are processed through a third-party gateway, Razorpay. By paying,
        you agree to Razorpay's terms. We are not responsible for issues arising from the payment gateway's use.</p>

    <h2 className="text-xl font-semibold mt-6">5. Limitation of Liability and Disclaimers</h2>
    <p><strong>5.1. General Disclaimer:</strong> The Platform is provided on an "as is" basis. The Company makes no
        representations or warranties regarding the Platform's operation or content.</p>
    <p><strong>5.2. Liability Shield:</strong> To the maximum extent permitted by law, Vamsiram Enterprises Private
        Limited, its directors, and employees shall not be liable for any damages, including but not limited to loss of
        profits or data, resulting from your use of the Platform, fraudulent listings, or any regulatory action.</p>
    <p><strong>5.3. Indemnity:</strong> You agree to indemnify and hold the Company harmless from any claims,
        liabilities, or damages arising out of your use of the Platform, your violation of these Terms, or your
        violation of any third-party rights, including RERA provisions.</p>

    <h2 className="text-xl font-semibold mt-6">6. Intellectual Property</h2>
    <p>The Platform, its content, features, and functionality are the exclusive property of Vamsiram Enterprises Private
        Limited. You may not use any of our intellectual property without our express written consent.</p>

    <h2 className="text-xl font-semibold mt-6">7. Governing Law and Jurisdiction</h2>
    <p>These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the
        courts in Hyderabad, Telangana, India.</p>

    <h2 className="text-xl font-semibold mt-6">8. Modifications to Terms</h2>
    <p>The Company reserves the right to modify these Terms at any time without prior notice. Your continued use of the
        Platform constitutes your acceptance of the new Terms.</p>
</div>
      </Section>
    </PageContainer>
  );
}
