import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { membersSchema } from '@/validation/registration/membersSchema';
import { useRegistration } from '@/store/RegistrationContext';
import { Input } from '@/components/ui/input';
import { Users, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MembersStep({ onNext }) {
  const { formData, setFormData } = useRegistration();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(membersSchema),
    defaultValues: formData.members || {
      members: Array.from({ length: 5 }, () => ({ name: '', rollNumber: '', email: '', phoneNumber: '', gender: '', department: '', year: '', section: '' }))
    }
  });

  const { fields } = useFieldArray({
    control,
    name: "members"
  });

  const onSubmit = (data) => {
    setFormData(prev => ({ ...prev, members: data }));
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

  const totalTeamSize = fields.length + 1; // +1 for the leader

  return (
    <form id="members-step-submit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Team Counter badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-amber-400 tracking-tight">Team Members</h2>
          <p className="text-slate-400 text-sm mt-1">Add your teammates. SIH rules require 6 members per team.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#030712] px-4 py-2 rounded-xl border border-slate-700/80 w-fit shadow-inner">
          <Users className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300">
            Total Size: <span className={totalTeamSize === 6 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>{totalTeamSize}/6</span>
          </span>
        </div>
      </div>

      {errors.members?.root && (
        <div className="p-3 bg-red-950/60 border border-red-500/30 text-red-400 text-sm rounded-xl font-medium">
          {errors.members.root.message}
        </div>
      )}

      {/* Member Cards container */}
      <div className="space-y-6">
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#030712] border border-slate-800 rounded-xl p-6 relative group hover:border-slate-700 transition-all shadow-md"
            >
              {/* Member card header */}
              <div className="flex items-center gap-3 mb-5 border-b border-slate-800/80 pb-3">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shadow-sm">
                  {index + 1}
                </span>
                <h3 className="font-bold text-sm tracking-wide text-slate-200">
                  Team Member {index + 1}
                </h3>
              </div>

              {/* Row 1: Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name <span className="text-amber-500">*</span></label>
                  <Input 
                    placeholder="Member's Name"
                    aria-invalid={!!errors.members?.[index]?.name}
                    className={`h-11 text-sm bg-[#0B1120] text-white placeholder-slate-500 transition-all ${errors.members?.[index]?.name ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
                    {...register(`members.${index}.name`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.name} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Roll Number <span className="text-amber-500">*</span></label>
                  <Input 
                    placeholder="e.g. 21X..."
                    aria-invalid={!!errors.members?.[index]?.rollNumber}
                    className={`h-11 text-sm bg-[#0B1120] text-white uppercase placeholder:normal-case placeholder-slate-500 transition-all ${errors.members?.[index]?.rollNumber ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
                    {...register(`members.${index}.rollNumber`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.rollNumber} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address <span className="text-amber-500">*</span></label>
                  <Input 
                    placeholder="Email address"
                    aria-invalid={!!errors.members?.[index]?.email}
                    className={`h-11 text-sm bg-[#0B1120] text-white placeholder-slate-500 transition-all ${errors.members?.[index]?.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
                    {...register(`members.${index}.email`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.email} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Phone Number <span className="text-amber-500">*</span></label>
                  <Input 
                    placeholder="Mobile number"
                    aria-invalid={!!errors.members?.[index]?.phoneNumber}
                    className={`h-11 text-sm bg-[#0B1120] text-white placeholder-slate-500 transition-all ${errors.members?.[index]?.phoneNumber ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
                    {...register(`members.${index}.phoneNumber`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.phoneNumber} />
                </div>
              </div>

              {/* Row 2: Selects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Gender <span className="text-amber-500">*</span></label>
                  <select 
                    className={`flex h-11 w-full rounded-xl border bg-[#0B1120] px-3 py-1 text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50
                      ${errors.members?.[index]?.gender ? 'border-red-500' : 'border-slate-700'}
                    `}
                    {...register(`members.${index}.gender`)}
                  >
                    <option value="" disabled className="bg-[#0B1120] text-slate-500">Select Gender</option>
                    <option value="Male" className="bg-[#0B1120] text-white">Male</option>
                    <option value="Female" className="bg-[#0B1120] text-white">Female</option>
                    <option value="Other" className="bg-[#0B1120] text-white">Other</option>
                  </select>
                  <ErrorMessage error={errors.members?.[index]?.gender} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Department <span className="text-amber-500">*</span></label>
                  <select 
                    className={`flex h-11 w-full rounded-xl border bg-[#0B1120] px-3 py-1 text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50
                      ${errors.members?.[index]?.department ? 'border-red-500' : 'border-slate-700'}
                    `}
                    {...register(`members.${index}.department`)}
                  >
                    <option value="" disabled className="bg-[#0B1120] text-slate-500">Select Department</option>
                    <option value="CSE" className="bg-[#0B1120] text-white">CSE</option>
                    <option value="CSE (AI)" className="bg-[#0B1120] text-white">CSE (AI)</option>
                    <option value="CSE (DS)" className="bg-[#0B1120] text-white">CSE (DS)</option>
                    <option value="CSM" className="bg-[#0B1120] text-white">CSM</option>
                    <option value="IT" className="bg-[#0B1120] text-white">IT</option>
                    <option value="ECE" className="bg-[#0B1120] text-white">ECE</option>
                    <option value="EEE" className="bg-[#0B1120] text-white">EEE</option>
                    <option value="MECH" className="bg-[#0B1120] text-white">MECH</option>
                    <option value="CIVIL" className="bg-[#0B1120] text-white">CIVIL</option>
                  </select>
                  <ErrorMessage error={errors.members?.[index]?.department} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Year & Section <span className="text-amber-500">*</span></label>
                  <div className="flex gap-2.5">
                    <select 
                      className={`flex h-11 w-1/2 rounded-xl border bg-[#0B1120] px-2.5 py-1 text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50
                        ${errors.members?.[index]?.year ? 'border-red-500' : 'border-slate-700'}
                      `}
                      {...register(`members.${index}.year`)}
                    >
                      <option value="" disabled className="bg-[#0B1120] text-slate-500">Year</option>
                      <option value="1" className="bg-[#0B1120] text-white">1st</option>
                      <option value="2" className="bg-[#0B1120] text-white">2nd</option>
                      <option value="3" className="bg-[#0B1120] text-white">3rd</option>
                      <option value="4" className="bg-[#0B1120] text-white">4th</option>
                    </select>
                    <Input 
                      placeholder="Sec"
                      aria-invalid={!!errors.members?.[index]?.section}
                      className={`h-11 w-1/2 text-sm bg-[#0B1120] text-white uppercase placeholder:normal-case placeholder-slate-500 transition-all ${errors.members?.[index]?.section ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
                      {...register(`members.${index}.section`)}
                      maxLength={2}
                    />
                  </div>
                  {(errors.members?.[index]?.year || errors.members?.[index]?.section) && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1.5"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Select Year & Section
                    </motion.p>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center pt-2">
        <p className="text-xs text-slate-400 font-medium text-center">
          As per SIH rules, teams must have exactly 6 members (1 Leader + 5 Team Members).
        </p>
      </div>

      <button type="submit" id="members-step-submit" className="hidden">Submit</button>
    </form>
  );
}