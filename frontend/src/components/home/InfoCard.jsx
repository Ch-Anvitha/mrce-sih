import React from 'react';
import { motion } from 'framer-motion';

export default function InfoCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
      whileHover={{ y: -5, transition: { duration: 0.15 } }}
      className="flex flex-col bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-heading font-semibold text-foreground mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
