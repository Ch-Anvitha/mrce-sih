import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: 0.1 }}
      className="flex gap-3 sm:gap-4"
    >
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-14 h-16 sm:w-16 sm:h-20 bg-white border border-border rounded-lg shadow-sm flex items-center justify-center mb-1.5 relative overflow-hidden">
            {/* Subtle top reflection */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-50"></div>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-primary relative z-10">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
