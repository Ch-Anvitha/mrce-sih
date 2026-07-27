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
    <section className="relative w-full bg-white overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.04] to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/[0.04] to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* TOP TIER: Title & Logo */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="flex flex-col gap-6 lg:w-[55%]">
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
          </div>

          <div className="flex justify-center lg:justify-end lg:w-[45%] w-full lg:pt-14">
            {/* SIH Official Logo */}
            <motion.img
              src="/images/logos/sih-logo.png"
              alt="Smart India Hackathon Logo"
              className="w-full max-w-[280px] lg:max-w-[360px] object-contain drop-shadow-xl"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* BOTTOM TIER: Countdown/CTAs & Cards */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-12 w-full">
          
          {/* Left Column (55%) */}
          <div className="flex flex-col gap-8 lg:w-[55%] w-full">
            
            {/* Premium Countdown Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">Registration Ends In</h3>
              <Countdown targetDate={targetDate} />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button render={<Link to="/register" />} size="lg" className="bg-primary text-white hover:bg-primary/90 h-14 px-8 text-base shadow-md hover:shadow-lg transition-all duration-200 rounded-xl">
                Register Now
              </Button>
              <Button render={<Link to="/timeline" />} size="lg" variant="outline" className="h-14 px-8 text-base border-primary/20 text-primary hover:bg-primary/5 transition-all duration-200 rounded-xl">
                View Timeline
              </Button>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Unleash your innovation and problem-solving skills in a collaborative team environment. Seize the opportunity to build the future and represent MRCE at the national level.
            </motion.p>
          </div>

          {/* Right Column (45%) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:w-[45%] w-full">
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
    </section>
  );
}
