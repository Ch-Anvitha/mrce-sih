import React from 'react';
import { Check, Clock, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StatusTimeline = ({ status }) => {
  const steps = [
    {
      id: 'submitted',
      label: 'Submitted',
      description: 'Application received',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'review',
      label: 'Under Review',
      description: 'Payment verification',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'final',
      label: status === 'REJECTED' ? 'Rejected' : 'Approved',
      description: status === 'REJECTED' ? 'Application declined' : 'Application accepted',
      icon: status === 'REJECTED' ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />
    }
  ];

  // Determine active step index
  let activeIndex = 1; // Default to 'Under Review' because initial status is PAYMENT_PENDING
  if (status === 'APPROVED' || status === 'REJECTED') {
    activeIndex = 2;
  }

  return (
    <div className="py-8">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-[16%] right-[16%] h-1 bg-slate-200 -translate-y-1/2 rounded-full hidden sm:block" />
        
        {/* Dynamic progress line */}
        <div 
          className="absolute top-5 left-[16%] h-1 bg-primary -translate-y-1/2 rounded-full hidden sm:block transition-all duration-500" 
          style={{ width: `calc(${(activeIndex / (steps.length - 1)) * 68}%)` }}
        />

        <div className="relative flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
          {steps.map((step, index) => {
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;
            const isRejected = step.id === 'final' && status === 'REJECTED' && isCurrent;

            return (
              <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-3 relative z-10 sm:flex-1">
                {/* Mobile line connecting steps vertically */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-full bg-slate-200 sm:hidden -translate-x-1/2" />
                )}
                
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-300 bg-white",
                  isCompleted ? "border-primary text-primary" :
                  isCurrent ? (isRejected ? "border-destructive text-destructive" : "border-primary text-primary") :
                  "border-slate-200 text-slate-400"
                )}>
                  {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                
                <div className="sm:text-center">
                  <p className={cn(
                    "font-semibold",
                    (isCurrent || isCompleted) ? "text-slate-900" : "text-slate-500",
                    isRejected && "text-destructive"
                  )}>
                    {step.label}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
