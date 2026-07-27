import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Lightbulb } from 'lucide-react';
import Countdown from './Countdown';
import InfoCard from './InfoCard';

export default function HeroSection() {
  // Configurable placeholder date (e.g., 30 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  const infoCards = [
    {
      icon: Clock,
      title: "24 Hours",
      description: "Intense coding and problem-solving session."
    },
    {
      icon: MapPin,
      title: "MRCE Campus",
      description: "Held on-site at Malla Reddy College of Engineering."
    },
    {
      icon: Users,
      title: "Maximum Team Size: 6",
      description: "Collaborate with peers to build innovative solutions."
    },
    {
      icon: Lightbulb,
      title: "Innovation Challenge",
      description: "Tackle real-world problems with cutting-edge tech."
    }
  ];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-white overflow-hidden pt-12 pb-24 lg:pt-0 lg:pb-0">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.04] to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/[0.04] to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Event Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 w-fit shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide uppercase">
                Internal Hackathon &bull; MRCE &bull; 2026
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-bold text-primary leading-[1.1] tracking-tight"
            >
              Internal Smart India <br className="hidden sm:block" />
              Hackathon 2026
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Unleash your innovation and problem-solving skills in a collaborative team environment. Seize the opportunity to build the future and represent MRCE at the national level.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button render={<Link to="/register" />} size="lg" className="bg-primary text-white hover:bg-primary/90 h-12 px-8 text-base shadow-md hover:shadow-lg transition-all duration-200">
                Register Now
              </Button>
              <Button render={<Link to="/timeline" />} size="lg" variant="outline" className="h-12 px-8 text-base border-primary/20 text-primary hover:bg-primary/5 transition-all duration-200">
                View Timeline
              </Button>
            </motion.div>

            {/* Countdown */}
            <div className="pt-6">
              <Countdown targetDate={targetDate} />
            </div>
          </div>

          {/* Right Column: Illustration & Cards */}
          <div className="flex flex-col gap-8 lg:items-end w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="w-full max-w-lg mx-auto lg:mx-0 relative"
            >
              {/* Abstract Innovation SVG */}
              <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Abstract Innovation Illustration">
                {/* Background Halo */}
                <circle cx="250" cy="200" r="180" fill="url(#bg-gradient)" />
                <circle cx="250" cy="200" r="140" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" />
                
                {/* Tech/AI Node network base */}
                <path d="M140 160 L210 260 L310 270 L360 170 L260 110 Z" stroke="#0B1F4D" strokeWidth="1.5" strokeOpacity="0.2" fill="url(#net-gradient)" />
                
                {/* Modern floating elements representing ideas/data */}
                <rect x="180" y="160" width="70" height="70" rx="16" fill="#0B1F4D" transform="rotate(15 215 195)" />
                <rect x="250" y="140" width="85" height="85" rx="20" fill="#F97316" transform="rotate(-12 292 182)" />
                <circle cx="250" cy="265" r="40" fill="#15803D" />
                
                {/* Connecting nodes */}
                <circle cx="140" cy="160" r="6" fill="#F97316" />
                <circle cx="210" cy="260" r="8" fill="#0B1F4D" />
                <circle cx="310" cy="270" r="6" fill="#15803D" />
                <circle cx="360" cy="170" r="8" fill="#F97316" />
                <circle cx="260" cy="110" r="6" fill="#0B1F4D" />
                
                {/* Abstract Data lines */}
                <path d="M160 210 H100" stroke="#0B1F4D" strokeWidth="3" strokeLinecap="round" />
                <path d="M335 225 H385" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
                <path d="M280 120 V80" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />

                <defs>
                  <radialGradient id="bg-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 200) rotate(90) scale(180)">
                    <stop stopColor="#0B1F4D" stopOpacity="0.06" />
                    <stop offset="1" stopColor="#0B1F4D" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="net-gradient" x1="140" y1="110" x2="360" y2="270" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0B1F4D" stopOpacity="0.04" />
                    <stop offset="1" stopColor="#F97316" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto lg:mx-0">
              {infoCards.map((card, index) => (
                <InfoCard 
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  delay={0.2 + (index * 0.05)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
