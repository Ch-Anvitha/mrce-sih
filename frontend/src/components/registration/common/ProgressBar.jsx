import React from 'react';
import { useRegistration } from '@/store/RegistrationContext';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const { currentStep } = useRegistration();
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-primary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-medium text-muted-foreground bg-slate-100 px-2 py-1 rounded-md">
          {Math.round(progress)}% Completed
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
