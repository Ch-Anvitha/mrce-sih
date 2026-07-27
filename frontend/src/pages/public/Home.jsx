import React from 'react';
import SEO from '@/components/seo/SEO';
import HeroSection from '@/components/home/HeroSection';
import OrganizedBySection from '@/components/home/OrganizedBySection';
import AboutSection from '@/components/home/AboutSection';
import WhyParticipateSection from '@/components/home/WhyParticipateSection';
import EventDetailsSection from '@/components/home/EventDetailsSection';
import TimelineSection from '@/components/home/TimelineSection';
import StatsSection from '@/components/home/StatsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <SEO />
      <HeroSection />
      <OrganizedBySection />
      <StatsSection />
      <AboutSection />
      <WhyParticipateSection />
      <EventDetailsSection />
      <TimelineSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
