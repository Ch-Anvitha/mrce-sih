import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamSchema } from '@/validation/registration/teamSchema';
import { useRegistration } from '@/store/RegistrationContext';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
      department: '',
      year: '',
      problemStatementTitle: '',
      problemStatementId: '',
      agreeToRules: false
    }
  });

  const onSubmit = (data) => {
    setFormData(prev => ({ ...prev, team: data }));
    onNext();
  };

  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <motion.p 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1.5"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {error.message}
      </motion.p>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Team Details Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 tracking-tight">Team Details</h3>
          <p className="text-slate-400 text-sm mt-1">Provide your team name and academic department background.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="teamName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Team Name <span className="text-amber-500">*</span>
            </label>
            <Input 
              id="teamName"
              placeholder="Enter your unique team name"
              aria-invalid={!!errors.teamName}
              className={`h-11 bg-[#030712] text-white placeholder-slate-500 transition-all ${errors.teamName ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
              {...register('teamName')}
            />
            <ErrorMessage error={errors.teamName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="department" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Department <span className="text-amber-500">*</span>
            </label>
            <Input 
              id="department"
              placeholder="e.g., Computer Science & Engineering"
              aria-invalid={!!errors.department}
              className={`h-11 bg-[#030712] text-white placeholder-slate-500 transition-all ${errors.department ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
              {...register('department')}
            />
            <ErrorMessage error={errors.department} />
          </div>
        </div>

        <div className="space-y-2 md:w-1/2">
          <label htmlFor="year" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Year of Study <span className="text-amber-500">*</span>
          </label>
          <Input 
            id="year"
            placeholder="e.g., 3rd Year"
            aria-invalid={!!errors.year}
            className={`h-11 bg-[#030712] text-white placeholder-slate-500 transition-all ${errors.year ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
            {...register('year')}
          />
          <ErrorMessage error={errors.year} />
        </div>
      </div>

      {/* Subtle Dark Divider */}
      <div className="h-px bg-slate-800 w-full my-6" />

      {/* Problem Statement Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 tracking-tight">Problem Statement</h3>
          <p className="text-slate-400 text-sm mt-1">Specify the problem statement title and unique ID you are addressing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="problemStatementTitle" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Problem Statement Title <span className="text-amber-500">*</span>
            </label>
            <Input 
              id="problemStatementTitle"
              placeholder="E.g., AI-based Student Attendance System"
              aria-invalid={!!errors.problemStatementTitle}
              className={`h-11 bg-[#030712] text-white placeholder-slate-500 transition-all ${errors.problemStatementTitle ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
              {...register('problemStatementTitle')}
            />
            <ErrorMessage error={errors.problemStatementTitle} />
          </div>

          <div className="space-y-2">
            <label htmlFor="problemStatementId" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Problem Statement ID <span className="text-amber-500">*</span>
            </label>
            <Input 
              id="problemStatementId"
              placeholder="e.g., SIH1234"
              aria-invalid={!!errors.problemStatementId}
              className={`h-11 bg-[#030712] text-white placeholder-slate-500 transition-all uppercase ${errors.problemStatementId ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
              {...register('problemStatementId')}
            />
            <ErrorMessage error={errors.problemStatementId} />
          </div>
        </div>
      </div>

      {/* Subtle Dark Divider */}
      <div className="h-px bg-slate-800 w-full my-6" />

      {/* Terms and Guidelines Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            className="mt-1 w-4 h-4 rounded bg-[#030712] border-slate-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-[#0B1120] cursor-pointer"
            {...register('agreeToRules')}
          />
          <div className="text-sm">
            <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
              We agree to the Internal SIH 2026 Rules & Guidelines <span className="text-amber-500">*</span>
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              By checking this, you confirm that your team meets all eligibility criteria and acknowledges the code of conduct.
            </p>
          </div>
        </label>
        <ErrorMessage error={errors.agreeToRules} />
      </div>

      {/* Hidden submit button triggered by the wizard footer */}
      <button type="submit" id="team-step-submit" className="hidden" />
    </form>
  );
}