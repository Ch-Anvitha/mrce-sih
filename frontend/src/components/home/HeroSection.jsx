import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Lightbulb } from 'lucide-react';
import InfoCard from './InfoCard'; // Assuming you still use this if needed, though we mapped them inline below

export default function HeroSection() {
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
    <section className="relative w-full bg-[#030712] text-white overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Classy Subtle Gold Dot Matrix Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.4) 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px'
        }}
      ></div>

      {/* Ambient Gradients for Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/5 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* TOP SECTION: Badge, Logo, and HUGE Title */}
        <div className="flex flex-col mb-12 lg:mb-16">
          {/* Event Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 w-fit shadow-md backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]"></span>
            <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase">
              Internal Hackathon &bull; MRCE &bull; 2026
            </span>
          </motion.div>

          {/* Title Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
            <motion.img
              src="/images/logos/sih-logo.png"
              alt="Smart India Hackathon Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain shrink-0 [mix-blend-mode:screen] filter drop-shadow-[0_0_15px_rgba(251,191,36,0.25)] bg-transparent"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.05] tracking-tight"
            >
              Internal Smart India <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 mt-2 inline-block">
                Hackathon 2026
              </span>
            </motion.h1>
          </div>
        </div>

        {/* BOTTOM SECTION: Split Layout (Text/CTAs Left, Cards Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 w-full">
          
          {/* Left Column - Description & Buttons */}
          <div className="flex flex-col gap-8 w-full lg:w-[45%] lg:pt-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium"
            >
              Innovate, collaborate, and represent MRCE at the national level. Build the future with your team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button render={<Link to="/register" />} size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold h-14 px-8 text-lg rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300 hover:scale-[1.02]">
                Register Now
              </Button>
              <Button render={<Link to="/timeline" />} size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-slate-700 text-slate-300 bg-slate-900/50 hover:bg-slate-800 hover:text-white hover:border-amber-500/50 transition-all duration-300 rounded-xl backdrop-blur-sm">
                View Timeline
              </Button>
            </motion.div>
          </div>

          {/* Right Column - 2x2 Cards Grid */}
          <div className="w-full lg:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-5">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                className="group relative bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-amber-500/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-5 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-bold text-slate-100 tracking-wide mb-2 group-hover:text-amber-400 transition-colors">
                  {card.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}