import React from 'react';
import { motion } from 'framer-motion';
import { faqData } from '@/constants/faqData';
import FAQItem from './FAQItem';

export default function FAQSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.h2 
            id="faq-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Find answers to the most common questions students have before registering. Understanding the rules ensures a smooth and successful registration process.
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="max-w-3xl mx-auto w-full"
        >
          <div className="flex flex-col w-full">
            {faqData.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
