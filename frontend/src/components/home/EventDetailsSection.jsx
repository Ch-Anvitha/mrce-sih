import React from 'react';
import { Clock, Users, MapPin, Award } from 'lucide-react';

export default function EventDetailsSection() {
  const details = [
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: "24 Hours",
      subtitle: "HACKATHON DURATION",
    },
    {
      icon: <Users className="w-6 h-6 text-amber-400" />,
      title: "6 Members",
      subtitle: "MAXIMUM TEAM SIZE",
    },
    {
      icon: <MapPin className="w-6 h-6 text-amber-400" />,
      title: "MRCE Campus",
      subtitle: "EVENT VENUE",
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: "1 Team/Student",
      subtitle: "PARTICIPATION RULE",
    },
  ];

  return (
    <section className="py-20 bg-[#030712] text-white relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Event At A Glance
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Review the essential details and key rules before you register. Prepare yourself and your team for intense, non-stop innovation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 text-white shadow-xl hover:border-amber-500/40 transition-all flex flex-col items-center text-center group"
            >
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4 group-hover:bg-amber-500/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-amber-400/80 tracking-wider">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}