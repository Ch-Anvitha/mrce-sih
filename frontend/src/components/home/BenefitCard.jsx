import React from 'react';
import { motion } from 'framer-motion';

export default function BenefitCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group flex flex-col h-full bg-white border border-border rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-5 group-hover:text-accent group-hover:bg-accent/5 group-hover:border-accent/20 transition-colors duration-200">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
        {description}
      </p>
    </motion.div>
  );
}
