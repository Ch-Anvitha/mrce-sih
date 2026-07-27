import React from 'react';
import { motion } from 'framer-motion';
import { detailsData } from '@/constants/detailsData';
import DetailCard from './DetailCard';

export default function EventDetailsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-section relative" aria-labelledby="details-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.h2 
            id="details-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            Event Details
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Ensure you review all essential event information and guidelines. Understanding these requirements is a crucial step before registering your team for the hackathon.
          </motion.p>
        </div>

        {/* Details Grid - 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {detailsData.map((detail, index) => (
            <DetailCard 
              key={detail.title}
              icon={detail.icon}
              title={detail.title}
              description={detail.description}
              delay={0.15 + (index * 0.05)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
