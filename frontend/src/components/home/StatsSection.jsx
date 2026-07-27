import React from 'react';
import { motion } from 'framer-motion';
import { statsData } from '@/constants/statsData';
import StatCard from './StatCard';

export default function StatsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative" aria-labelledby="stats-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.h2 
            id="stats-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            Event At A Glance
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Review the essential details and key rules before you register. Prepare yourself and your team for intense, non-stop innovation.
          </motion.p>
        </div>

        {/* Stats Grid - 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {statsData.map((stat, index) => (
            <StatCard 
              key={stat.description}
              icon={stat.icon}
              value={stat.value}
              description={stat.description}
              delay={0.15 + (index * 0.1)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
