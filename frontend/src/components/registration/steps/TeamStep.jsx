import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamSchema } from '@/validation/registration/teamSchema';
import { useRegistration } from '@/store/RegistrationContext';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function TeamStep({ onNext }) {
  const { formData, setFormData } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: formData.team || {
      teamName: '',
      problemStatementTitle: '',
      agreeToRules: false
    }
  });

  const onSubmit = (data) => {
    setFormData(prev => ({ ...prev, team: data }));
    onNext();
  };

  // Helper for rendering error messages consistently
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <motion.p 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-destructive text-sm mt-1.5 font-medium flex items-center gap-1.5"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="w-4 h-4 shrink-0" />
        {error.message}
      </motion.p>
    );
  };

  return (
    <form id="team-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">Team Details</h2>
          <p className="text-muted-foreground text-sm">Provide your team's identity and primary department.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="teamName" className="text-sm font-semibold text-slate-700">Team Name <span className="text-destructive">*</span></label>
          <Input 
            id="teamName" 
            placeholder="Enter your unique team name"
            aria-invalid={!!errors.teamName}
            className={`h-11 ${errors.teamName ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
            {...register('teamName')}
          />
          <ErrorMessage error={errors.teamName} />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div>
          <h2 className="text-xl font-heading font-bold text-primary">Problem Statement</h2>
          <p className="text-muted-foreground text-sm">Select the SIH problem statement your team is targeting.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="problemStatementTitle" className="text-sm font-semibold text-slate-700">Problem Statement Title <span className="text-destructive">*</span></label>
          <Input 
            id="problemStatementTitle" 
            placeholder="E.g., AI-based Student Attendance System"
            aria-invalid={!!errors.problemStatementTitle}
            className={`h-11 ${errors.problemStatementTitle ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
            {...register('problemStatementTitle')}
          />
          <ErrorMessage error={errors.problemStatementTitle} />
        </div>
      </div>

      <div className="pt-4 pb-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-300 checked:border-primary checked:bg-primary transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20 cursor-pointer"
              {...register('agreeToRules')}
            />
            <svg 
              className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
              We agree to the Internal SIH 2026 Rules & Guidelines
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              By checking this, you confirm that your team meets all eligibility criteria and acknowledges the code of conduct.
            </span>
            <ErrorMessage error={errors.agreeToRules} />
          </div>
        </label>
      </div>

      {/* Hidden submit button triggered by the wizard NavigationButtons */}
      <button type="submit" id="team-step-submit" className="hidden">Submit</button>
    </form>
  );
}
