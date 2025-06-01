
import { HeroSection } from "@/components/page-specific/home/hero";
import { StepsGuide } from "@/components/page-specific/home/steps-guide";
import { PageContainer, Section, SectionTitle } from "@/components/layout/page-container";
import { AppMockupSection } from "@/components/page-specific/home/app-mockup";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AppMockupSection />
      <PageContainer>
        <Section id="how-it-works">
          <SectionTitle>How It Works</SectionTitle>
          <StepsGuide />
        </Section>
      </PageContainer>
    </>
  );
}
