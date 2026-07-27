import React from 'react';
import { useRegistration } from '@/store/RegistrationContext';
import { Check } from 'lucide-react';

export default function RegistrationStepper({ steps }) {
  const { currentStep } = useRegistration();

  return (
    <div className="w-full relative mt-4 md:mt-8" aria-label="Registration Progress">
      {/* Background track line */}
      <div className="absolute top-[20px] left-8 right-8 h-1 bg-slate-100 -z-10 hidden sm:block rounded-full"></div>
      
      {/* Active progress line */}
      <div 
        className="absolute top-[20px] left-8 h-1 bg-primary -z-10 hidden sm:block rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `calc(${(currentStep - 1) / (steps.length - 1)} * (100% - 4rem))` }}
      ></div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 w-full relative" role="list">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={step.id} className="flex sm:flex-col items-center gap-3 sm:gap-0 z-10 w-full sm:w-auto bg-white sm:bg-transparent" role="listitem" aria-current={isActive ? 'step' : undefined}>
              <div 
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm mb-0 sm:mb-3 transition-all duration-300
                  ${isActive ? 'bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-md' : ''}
                  ${isCompleted ? 'bg-accent text-white shadow-sm scale-105' : ''}
                  ${!isActive && !isCompleted ? 'bg-slate-100 text-slate-400 border border-slate-200' : ''}
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <span className={`text-sm sm:text-xs font-semibold sm:text-center
                ${isActive ? 'text-primary' : ''}
                ${isCompleted ? 'text-slate-700' : ''}
                ${!isActive && !isCompleted ? 'text-slate-400' : ''}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
