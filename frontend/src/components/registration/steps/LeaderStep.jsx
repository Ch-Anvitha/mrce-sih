import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leaderSchema } from '@/validation/registration/leaderSchema';
import { useRegistration } from '@/store/RegistrationContext';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function LeaderStep({ onNext }) {
  const { formData, setFormData } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaderSchema),
    defaultValues: formData.leader || {
      leaderName: '',
      rollNumber: '',
      email: '',
      phoneNumber: '',
      gender: '',
      branch: '',
      year: '',
      section: ''
    }
  });

  const onSubmit = (data) => {
    setFormData(prev => ({ ...prev, leader: data }));
    onNext();
  };

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
    <form id="leader-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">Team Leader Details</h2>
          <p className="text-muted-foreground text-sm">Enter the contact and academic details for the primary point of contact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="leaderName" className="text-sm font-semibold text-slate-700">Full Name <span className="text-destructive">*</span></label>
            <Input 
              id="leaderName" 
              placeholder="As per institutional records"
              aria-invalid={!!errors.leaderName}
              className={`h-11 ${errors.leaderName ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
              {...register('leaderName')}
            />
            <ErrorMessage error={errors.leaderName} />
          </div>

          <div className="space-y-2">
            <label htmlFor="rollNumber" className="text-sm font-semibold text-slate-700">Roll Number <span className="text-destructive">*</span></label>
            <Input 
              id="rollNumber" 
              placeholder="E.g., 20X41A0501"
              aria-invalid={!!errors.rollNumber}
              className={`h-11 uppercase placeholder:normal-case ${errors.rollNumber ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
              {...register('rollNumber')}
            />
            <ErrorMessage error={errors.rollNumber} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address <span className="text-destructive">*</span></label>
            <Input 
              id="email" 
              type="email"
              placeholder="Primary contact email"
              aria-invalid={!!errors.email}
              className={`h-11 ${errors.email ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
              {...register('email')}
            />
            <ErrorMessage error={errors.email} />
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-slate-700">Phone Number <span className="text-destructive">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">+91</span>
              <Input 
                id="phoneNumber" 
                type="tel"
                placeholder="10-digit mobile number"
                aria-invalid={!!errors.phoneNumber}
                className={`h-11 pl-10 ${errors.phoneNumber ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
                {...register('phoneNumber')}
                maxLength={10}
              />
            </div>
            <ErrorMessage error={errors.phoneNumber} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-semibold text-slate-700">Gender <span className="text-destructive">*</span></label>
            <select 
              id="gender" 
              aria-invalid={!!errors.gender}
              className={`flex h-11 w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50
                ${errors.gender ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input hover:border-slate-300'}
              `}
              {...register('gender')}
            >
              <option value="" disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ErrorMessage error={errors.gender} />
          </div>

          <div className="space-y-2">
            <label htmlFor="branch" className="text-sm font-semibold text-slate-700">Branch <span className="text-destructive">*</span></label>
            <select 
              id="branch" 
              aria-invalid={!!errors.branch}
              className={`flex h-11 w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50
                ${errors.branch ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input hover:border-slate-300'}
              `}
              {...register('branch')}
            >
              <option value="" disabled>Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CSE (AI)">CSE (AI)</option>
              <option value="CSE (DS)">CSE (DS)</option>
              <option value="CSM">CSM</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <ErrorMessage error={errors.branch} />
          </div>

          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-semibold text-slate-700">Year <span className="text-destructive">*</span></label>
            <select 
              id="year" 
              aria-invalid={!!errors.year}
              className={`flex h-11 w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50
                ${errors.year ? 'border-destructive focus-visible:ring-destructive/20' : 'border-input hover:border-slate-300'}
              `}
              {...register('year')}
            >
              <option value="" disabled>Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <ErrorMessage error={errors.year} />
          </div>

          <div className="space-y-2">
            <label htmlFor="section" className="text-sm font-semibold text-slate-700">Section <span className="text-destructive">*</span></label>
            <Input 
              id="section" 
              placeholder="E.g., A"
              aria-invalid={!!errors.section}
              className={`h-11 uppercase placeholder:normal-case ${errors.section ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
              {...register('section')}
              maxLength={2}
            />
            <ErrorMessage error={errors.section} />
          </div>
        </div>
      </div>

      <button type="submit" id="leader-step-submit" className="hidden">Submit</button>
    </form>
  );
}
