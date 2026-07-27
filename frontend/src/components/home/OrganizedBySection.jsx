import React from 'react';
import { motion } from 'framer-motion';

export default function OrganizedBySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 md:mb-16"
          >
            Organized By
          </motion.h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 md:gap-24 w-full">
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 group">
              <img 
                src="/images/logos/mrce-logo.jpg" 
                alt="Malla Reddy College of Engineering Logo" 
                className="h-20 sm:h-24 md:h-28 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 group">
              <img 
                src="/images/logos/iic-logo.png" 
                alt="Institution's Innovation Council Logo" 
                className="h-20 sm:h-24 md:h-28 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 group">
              <img 
                src="/images/logos/sih-logo.png" 
                alt="Smart India Hackathon Logo" 
                className="h-20 sm:h-24 md:h-28 w-auto object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
