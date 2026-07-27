import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '@/constants/timelineData';
import TimelineItem from './TimelineItem';

export default function TimelineSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-section relative overflow-hidden" aria-labelledby="timeline-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.h2 
            id="timeline-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            Journey to Smart India Hackathon
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Follow the complete path from your initial idea generation to representing MRCE on the national stage. Ensure your team completes every step of this journey for the ultimate innovation challenge.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full mx-auto">
          
          {/* Desktop Horizontal Line (Animated) */}
          <div className="hidden lg:block absolute top-[31px] left-[8.33%] right-[8.33%] h-0.5 bg-border z-0 overflow-hidden">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute top-0 left-0 bottom-0 bg-primary/30 origin-left w-full"
            />
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-6 relative z-10 w-full">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={item.title}
                step={item.step}
                icon={item.icon}
                title={item.title}
                description={item.description}
                isLast={index === timelineData.length - 1}
                delay={0.15 + (index * 0.1)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
