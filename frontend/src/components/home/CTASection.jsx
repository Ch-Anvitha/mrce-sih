import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { trustIndicators } from '@/constants/trustIndicators';
import TrustIndicator from './TrustIndicator';

export default function CTASection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[#030712] relative flex justify-center border-t border-slate-800/80" aria-labelledby="cta-heading">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl rounded-3xl bg-[#0B1120] border border-slate-800 text-white overflow-hidden relative shadow-2xl"
      >
        {/* Subtle Radial Gold Accent */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 lg:px-20 flex flex-col items-center text-center">
          
          <motion.h2 
            id="cta-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
          >
            Ready to Build the Next Big Idea?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
          >
            Don't miss this opportunity to represent MRCE through innovation and teamwork. Register your team for the Internal Smart India Hackathon 2026 and turn your groundbreaking ideas into reality.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto"
          >
            <Button render={<Link to="/register" />} size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 duration-200 border border-transparent shadow-lg shadow-amber-500/20">
              Register Your Team
            </Button>
            <Button render={<Link to="/edit-registration" />} variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-amber-500/40 font-semibold rounded-full px-8 py-6 text-lg transition-transform hover:scale-105 duration-200">
              Edit Registration
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-slate-800 pt-8 w-full text-slate-400"
          >
            {trustIndicators.map((indicator, index) => (
              <TrustIndicator 
                key={index} 
                icon={indicator.icon} 
                label={indicator.label} 
              />
            ))}
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}