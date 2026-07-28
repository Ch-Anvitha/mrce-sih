import React from 'react';
import SEO from '@/components/seo/SEO';
import HeroSection from '@/components/home/HeroSection';
import OrganizedBySection from '@/components/home/OrganizedBySection';

import TimelineSection from '@/components/home/TimelineSection';

import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <SEO />
      <HeroSection />
      <OrganizedBySection />
  
      <TimelineSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
