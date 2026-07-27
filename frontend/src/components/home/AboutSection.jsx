import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Briefcase, Users, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function AboutSection() {
  const features = [
    {
      icon: Globe,
      title: "National Innovation",
      description: "A nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives."
    },
    {
      icon: Briefcase,
      title: "Industry Exposure",
      description: "Gain hands-on experience by tackling problem statements provided by various ministries and leading industry partners."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together in teams of 6 to brainstorm, design, and develop scalable solutions under expert mentorship."
    },
    {
      icon: Award,
      title: "Represent MRCE",
      description: "The Internal SIH is the official gateway. Top teams selected here will officially represent MRCE at the national level."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-section relative overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg mx-auto lg:mx-0 order-2 lg:order-1"
          >
            {/* Official Logos Composition */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl bg-white border border-slate-100 shadow-xl overflow-hidden flex items-center justify-center p-8 lg:p-12">
              <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-3xl -z-10" />
              <div className="grid grid-cols-2 gap-8 w-full max-w-[400px]">
                <div className="col-span-2 flex justify-center pb-8 border-b border-slate-100">
                  <img src="/images/logos/sih-logo.png" alt="Smart India Hackathon Logo" className="h-32 sm:h-40 w-auto object-contain drop-shadow-md" />
                </div>
                <div className="flex justify-center pt-2">
                  <img src="/images/logos/mrce-logo.jpg" alt="MRCE Logo" className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm" />
                </div>
                <div className="flex justify-center pt-2 border-l border-slate-100 pl-8">
                  <img src="/images/logos/iic-logo.png" alt="IIC Logo" className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="flex flex-col max-w-2xl mx-auto lg:mx-0 order-1 lg:order-2">
            <motion.h2 
              id="about-heading"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.25 }}
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
            >
              What is Smart India Hackathon?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed mb-10"
            >
              Smart India Hackathon (SIH) is a nationwide initiative to provide students with a platform to solve pressing real-world problems. The <strong>Internal Smart India Hackathon at MRCE</strong> serves as the official qualifying round. It is the crucial first step where teams compete to showcase their technical prowess, with the most innovative solutions earning the prestigious opportunity to represent MRCE at the national grand finale.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.15 + (index * 0.05)}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
