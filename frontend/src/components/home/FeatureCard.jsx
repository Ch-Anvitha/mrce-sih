import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="flex gap-4 p-5 bg-white border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
