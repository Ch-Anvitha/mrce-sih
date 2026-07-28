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
    // Changed bg-section -> bg-white so the whole page reads as one clean palette
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Logo Plaque */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg mx-auto lg:mx-0 order-2 lg:order-1"
          >
            {/*
              Redesigned card:
              - Deep blue background instead of white, so the (mostly white/blue) logos pop
              - Gold border + soft gold glow to make it feel premium, not just a container
              - bg-[#0B1F4D] is a custom hex (arbitrary value syntax in Tailwind, the square brackets
                let you use ANY color, not just Tailwind's built-in ones)
            */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl bg-[#0B1F4D] border-2 border-[#D4AF37] shadow-[0_0_40px_-10px_rgba(212,175,55,0.35)] overflow-hidden flex items-center justify-center p-8 lg:p-12">

              {/* Subtle gold glow blob in the corner — purely decorative, adds depth without a 4th color */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#D4AF37]/20 rounded-full blur-3xl" />

              <div className="relative grid grid-cols-2 gap-8 w-full max-w-[400px]">
                <div className="col-span-2 flex justify-center pb-8 border-b border-[#D4AF37]/30">
                  <img src="/images/logos/sih-logo.png" alt="Smart India Hackathon Logo" className="h-32 sm:h-40 w-auto object-contain drop-shadow-md bg-white rounded-lg p-2" />
                </div>
                <div className="flex justify-center pt-2">
                  <img src="/images/logos/mrce-logo.jpg" alt="MRCE Logo" className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm bg-white rounded-lg p-2" />
                </div>
                <div className="flex justify-center pt-2 border-l border-[#D4AF37]/30 pl-8">
                  <img src="/images/logos/iic-logo.png" alt="IIC Logo" className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm bg-white rounded-lg p-2" />
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
              // text-primary -> text-[#0B1F4D] so heading is a true deep blue, not a mystery custom token
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1F4D] mb-4"
            >
              What is Smart India Hackathon?
            </motion.h2>

            {/* NEW: small gold accent bar under the heading — a classic "premium brand" detail */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 64 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-1 bg-[#D4AF37] rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.25, delay: 0.1 }}
              // text-slate-600 -> text-[#0B1F4D]/70 keeps it blue-family but softer, instead of introducing gray
              className="text-lg text-[#0B1F4D]/70 leading-relaxed mb-10"
            >
              Smart India Hackathon (SIH) is a nationwide initiative to provide students with a platform to solve pressing real-world problems. The <strong className="text-[#0B1F4D]">Internal Smart India Hackathon at MRCE</strong> serves as the official qualifying round. It is the crucial first step where teams compete to showcase their technical prowess, with the most innovative solutions earning the prestigious opportunity to represent MRCE at the national grand finale.
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