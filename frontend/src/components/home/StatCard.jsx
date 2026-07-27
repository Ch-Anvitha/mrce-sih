import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, value, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.25, delay, ease: 'easeOut' }}
      whileHover={{ y: -5, transition: { duration: 0.15 } }}
      className="group flex flex-col items-center text-center bg-white border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:text-accent group-hover:bg-accent/5 group-hover:scale-110 transition-all duration-250">
        <Icon className="w-7 h-7" />
      </div>
      <div className="font-mono text-2xl lg:text-3xl font-bold text-primary mb-2">
        {value}
      </div>
      <p className="font-sans text-sm font-semibold text-slate-500 uppercase tracking-wide">
        {description}
      </p>
    </motion.div>
  );
}
