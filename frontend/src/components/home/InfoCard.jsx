import React from 'react';
import { motion } from 'framer-motion';

export default function InfoCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="flex flex-col justify-center bg-white border border-border rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 w-full min-h-[230px]"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-6">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-heading font-bold text-xl text-foreground mb-3">
        {title}
      </h3>
      <p className="text-base text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
