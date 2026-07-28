import React from 'react';
import StatsSection from '@/components/home/StatsSection';
import WhyParticipateSection from '@/components/home/WhyParticipateSection';

export default function AboutPage() {
  return (
    <div className="bg-[#030712] text-white min-h-screen py-12">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
          About the Event
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Learn more about Internal Smart India Hackathon 2026, its goals, and why you should be part of this innovation journey.
        </p>
      </div>

      {/* Event At A Glance */}
      <StatsSection />

      {/* Why Participate Section */}
      <WhyParticipateSection />
    </div>
  );
}