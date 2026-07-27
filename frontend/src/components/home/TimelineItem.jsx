import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineItem({ step, icon: Icon, title, description, isLast, delay = 0 }) {
  return (
    <div className="relative flex flex-1 w-full group">
      
      {/* Mobile Vertical Connector Line (Animated) */}
      {!isLast && (
        <div className="absolute left-[31px] top-[64px] bottom-[-32px] w-0.5 bg-border lg:hidden z-0 overflow-hidden">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.2 }}
            className="absolute top-0 left-0 right-0 bg-primary/30 origin-top h-full"
          />
        </div>
      )}

      {/* Item Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.25, delay, ease: 'easeOut' }}
        className="flex flex-row lg:flex-col gap-4 lg:gap-6 w-full relative z-10"
      >
        {/* Step Badge & Icon */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-border shadow-sm group-hover:border-primary transition-colors duration-200 mx-0 lg:mx-auto">
          <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-200" />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[11px] font-bold shadow-sm">
            {step}
          </div>
        </div>

        {/* Card Content */}
        <motion.div 
          whileHover={{ y: -4, transition: { duration: 0.15 } }}
          className="flex-1 lg:text-center bg-white border border-border rounded-xl p-4 sm:p-5 shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-200 h-full"
        >
          <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
