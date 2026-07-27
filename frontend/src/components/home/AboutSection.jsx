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
            {/* Custom SVG Illustration */}
            <svg viewBox="0 0 500 500" className="w-full h-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Innovation and Teamwork Illustration">
              {/* Background Shapes */}
              <circle cx="250" cy="250" r="220" fill="#FFFFFF" />
              <circle cx="250" cy="250" r="220" stroke="#0B1F4D" strokeOpacity="0.05" strokeWidth="2" strokeDasharray="10 10" />
              <rect x="150" y="150" width="200" height="200" rx="30" fill="#F8FAFC" />
              
              {/* Central AI/Innovation Node */}
              <circle cx="250" cy="250" r="50" fill="#0B1F4D" className="animate-pulse" style={{animationDuration: '3s'}} />
              <circle cx="250" cy="250" r="35" fill="#F97316" />
              <path d="M240 240 L260 260 M260 240 L240 260" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              
              {/* Orbital Nodes (Teamwork / Technology) */}
              {/* Top Left */}
              <circle cx="160" cy="160" r="25" fill="#15803D" />
              <path d="M150 160 H170 M160 150 V170" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M175 175 L215 215" stroke="#0B1F4D" strokeWidth="3" strokeOpacity="0.2" strokeDasharray="5 5" />
              
              {/* Top Right */}
              <circle cx="340" cy="160" r="20" fill="#F97316" />
              <circle cx="340" cy="160" r="8" fill="#FFFFFF" />
              <path d="M325 175 L285 215" stroke="#0B1F4D" strokeWidth="3" strokeOpacity="0.2" strokeDasharray="5 5" />
              
              {/* Bottom Right */}
              <rect x="320" y="320" width="40" height="40" rx="10" fill="#0B1F4D" />
              <circle cx="340" cy="340" r="6" fill="#FFFFFF" />
              <path d="M325 325 L285 285" stroke="#0B1F4D" strokeWidth="3" strokeOpacity="0.2" strokeDasharray="5 5" />
              
              {/* Bottom Left */}
              <circle cx="160" cy="340" r="25" fill="#0B1F4D" />
              <path d="M150 340 H170 M160 330 V350" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M175 325 L215 285" stroke="#0B1F4D" strokeWidth="3" strokeOpacity="0.2" strokeDasharray="5 5" />

              {/* Data streams */}
              <path d="M100 250 H130 M370 250 H400 M250 100 V130 M250 370 V400" stroke="#F97316" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
              <path d="M60 250 H80 M420 250 H440 M250 60 V80 M250 420 V440" stroke="#15803D" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </svg>
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
