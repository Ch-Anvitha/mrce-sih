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
        className="text-destructive text-sm mt-1.5 font-medium flex items-center gap-1.5"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="w-4 h-4 shrink-0" />
        {error.message}
      </motion.p>
    );
  };

  const totalTeamSize = fields.length + 1; // +1 for the leader

  return (
    <form id="members-step-submit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">Team Members</h2>
          <p className="text-muted-foreground text-sm mt-1">Add your teammates. SIH rules require 6 members per team.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 w-fit">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-slate-700">
            Total Size: <span className={totalTeamSize === 6 ? "text-green-600" : "text-primary"}>{totalTeamSize}/6</span>
          </span>
        </div>
      </div>

      {errors.members?.root && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
          {errors.members.root.message}
        </div>
      )}

      <div className="space-y-6">
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative group"
            >
              <div className="absolute top-4 right-4">
              </div>
              
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                Member {index + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <Input 
                    placeholder="Member's Name"
                    aria-invalid={!!errors.members?.[index]?.name}
                    className={`h-11 text-sm ${errors.members?.[index]?.name ? 'border-destructive' : 'bg-white'}`}
                    {...register(`members.${index}.name`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.name} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Roll Number</label>
                  <Input 
                    placeholder="e.g. 21X..."
                    aria-invalid={!!errors.members?.[index]?.rollNumber}
                    className={`h-11 text-sm uppercase placeholder:normal-case ${errors.members?.[index]?.rollNumber ? 'border-destructive' : 'bg-white'}`}
                    {...register(`members.${index}.rollNumber`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.rollNumber} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <Input 
                    placeholder="Email"
                    aria-invalid={!!errors.members?.[index]?.email}
                    className={`h-11 text-sm ${errors.members?.[index]?.email ? 'border-destructive' : 'bg-white'}`}
                    {...register(`members.${index}.email`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.email} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <Input 
                    placeholder="Phone"
                    aria-invalid={!!errors.members?.[index]?.phoneNumber}
                    className={`h-11 text-sm ${errors.members?.[index]?.phoneNumber ? 'border-destructive' : 'bg-white'}`}
                    {...register(`members.${index}.phoneNumber`)}
                  />
                  <ErrorMessage error={errors.members?.[index]?.phoneNumber} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Gender</label>
                  <select 
                    className={`flex h-11 w-full rounded-md border bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50
                      ${errors.members?.[index]?.gender ? 'border-destructive' : 'border-input hover:border-slate-300'}
                    `}
                    {...register(`members.${index}.gender`)}
                  >
                    <option value="" disabled>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ErrorMessage error={errors.members?.[index]?.gender} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Department</label>
                  <select 
                    className={`flex h-11 w-full rounded-md border bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50
                      ${errors.members?.[index]?.department ? 'border-destructive' : 'border-input hover:border-slate-300'}
                    `}
                    {...register(`members.${index}.department`)}
                  >
                    <option value="" disabled>Dept</option>
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
                  <ErrorMessage error={errors.members?.[index]?.department} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Year & Section</label>
                  <div className="flex gap-2">
                    <select 
                      className={`flex h-11 w-1/2 rounded-md border bg-white px-2 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50
                        ${errors.members?.[index]?.year ? 'border-destructive' : 'border-input'}
                      `}
                      {...register(`members.${index}.year`)}
                    >
                      <option value="" disabled>Yr</option>
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                      <option value="3">3rd</option>
                      <option value="4">4th</option>
                    </select>
                    <Input 
                      placeholder="Sec"
                      aria-invalid={!!errors.members?.[index]?.section}
                      className={`h-11 w-1/2 text-sm uppercase placeholder:normal-case ${errors.members?.[index]?.section ? 'border-destructive' : 'bg-white'}`}
                      {...register(`members.${index}.section`)}
                      maxLength={2}
                    />
                  </div>
                  {(errors.members?.[index]?.year || errors.members?.[index]?.section) && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1.5 font-medium flex items-center gap-1.5"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
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
        <p className="text-sm text-slate-500 font-medium text-center">
          As per SIH rules, teams must have exactly 6 members (1 Leader + 5 Team Members).
        </p>
      </div>

      <button type="submit" id="members-step-submit" className="hidden">Submit</button>
    </form>
  );
}
