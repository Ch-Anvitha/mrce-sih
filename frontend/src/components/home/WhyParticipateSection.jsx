import React from 'react';
import { motion } from 'framer-motion';
import BenefitCard from './BenefitCard';
import { benefits } from '@/constants/benefits';

export default function WhyParticipateSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative" aria-labelledby="why-participate-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.h2 
            id="why-participate-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            Why Participate?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Participating in the Internal Smart India Hackathon is more than just a competition. It is a transformative experience where students gain invaluable practical experience, improve teamwork capabilities, strengthen complex problem-solving skills, and earn the exclusive opportunity to represent MRCE on a national stage.
          </motion.p>
        </div>

        {/* Benefits Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={0.15 + (index * 0.05)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
