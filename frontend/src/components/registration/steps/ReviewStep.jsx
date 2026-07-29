import React from 'react';
import { useRegistration } from '@/store/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Edit2, CheckCircle2, AlertCircle, FileImage, ShieldCheck, UserCheck, Users, CreditCard } from 'lucide-react';

export default function ReviewStep({ backendError }) {
  const { formData, setCurrentStep } = useRegistration();

  const handleEdit = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const { team, leader, members, payment } = formData;

  const ReviewCard = ({ title, stepIndex, icon: Icon, children, isComplete }) => (
    <div className="bg-[#030712] border border-slate-800 rounded-xl overflow-hidden shadow-md hover:border-slate-700 transition-all group">
      <div className="bg-[#0B1120] px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide text-slate-200 flex items-center gap-2">
              {title}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              {isComplete ? (
                <span className="text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> Action Required
                </span>
              )}
            </span>
          </div>
        </div>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={() => handleEdit(stepIndex)}
          className="h-8 px-3 text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg border border-transparent hover:border-amber-500/20 transition-all"
        >
          <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
        </Button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const DataRow = ({ label, value }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-2.5 border-b border-slate-800/60 last:border-0 last:pb-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-200 font-medium sm:col-span-2 break-words">
        {value || <span className="text-slate-500 italic">Not provided</span>}
      </span>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-xl font-bold text-amber-400 tracking-tight">Review Registration</h2>
        <p className="text-slate-400 text-sm mt-1">Please verify all details carefully before final submission. Click Edit to make changes.</p>
      </div>

      {/* Backend Error Banner */}
      {backendError && (
        <div className="bg-red-950/60 border border-red-500/30 text-red-400 p-4 rounded-xl space-y-2 shadow-lg">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> Submission Failed
          </h4>
          <p className="text-xs font-medium text-red-300">
            {backendError.response?.data?.message || backendError.message || 'An unknown error occurred.'}
          </p>
          {backendError.response?.data?.errors && (
            <ul className="list-disc pl-5 pt-1 text-xs text-red-300/90 space-y-1">
              {backendError.response.data.errors.map((err, idx) => (
                <li key={idx}>{err.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Team Details */}
        <ReviewCard title="Team Details" stepIndex={1} icon={ShieldCheck} isComplete={!!team}>
          {team ? (
            <div className="space-y-1">
              <DataRow label="Team Name" value={team.teamName} />
              <DataRow label="Department & Year" value={`${team.department} • Year ${team.year}`} />
              <DataRow label="Problem Statement Title" value={team.problemStatementTitle} />
              <DataRow label="PS ID" value={team.problemStatementId?.toUpperCase()} />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400 bg-amber-950/20 border border-amber-500/20 px-3.5 py-2.5 rounded-xl w-fit text-xs font-medium shadow-inner">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Team details have not been completed.</span>
            </div>
          )}
        </ReviewCard>

        {/* Leader Details */}
        <ReviewCard title="Team Leader" stepIndex={2} icon={UserCheck} isComplete={!!leader}>
          {leader ? (
            <div className="space-y-1">
              <DataRow label="Full Name" value={leader.leaderName} />
              <DataRow label="Roll Number" value={leader.rollNumber?.toUpperCase()} />
              <DataRow label="Email Address" value={leader.email} />
              <DataRow label="Phone Number" value={leader.phoneNumber} />
              <DataRow label="Gender" value={leader.gender} />
              <DataRow label="Branch & Year" value={`${leader.branch} • Year ${leader.year}`} />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400 bg-amber-950/20 border border-amber-500/20 px-3.5 py-2.5 rounded-xl w-fit text-xs font-medium shadow-inner">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Leader details have not been completed.</span>
            </div>
          )}
        </ReviewCard>

        {/* Members Details */}
        <ReviewCard title={`Team Members (${members?.members?.length || 0})`} stepIndex={3} icon={Users} isComplete={!!members?.members?.length}>
          {members?.members && members.members.length > 0 ? (
            <div className="space-y-4">
              {members.members.map((member, idx) => (
                <div key={idx} className="bg-[#0B1120] border border-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-2.5 py-1 rounded-md">
                      Member {idx + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{member.rollNumber?.toUpperCase()}</span>
                  </div>
                  <div className="space-y-1">
                    <DataRow label="Full Name" value={member.name} />
                    <DataRow label="Contact" value={`${member.email} • ${member.phoneNumber}`} />
                    <DataRow label="Academic Info" value={`${member.gender} • ${member.department} • Year ${member.year} (Sec: ${member.section})`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400 bg-amber-950/20 border border-amber-500/20 px-3.5 py-2.5 rounded-xl w-fit text-xs font-medium shadow-inner">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>No additional members have been added.</span>
            </div>
          )}
        </ReviewCard>

        {/* Payment Details */}
        <ReviewCard title="Payment Receipt" stepIndex={4} icon={CreditCard} isComplete={!!payment}>
          {payment ? (
            <div className="space-y-1">
              <DataRow label="Transaction ID" value={payment.transactionId?.toUpperCase()} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 pt-2.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Screenshot</span>
                <div className="sm:col-span-2">
                  {payment.paymentScreenshot ? (
                    <div className="flex items-center gap-3 bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 rounded-xl px-3.5 py-2.5 w-fit shadow-inner">
                      <FileImage className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold">{payment.paymentScreenshot.name} Attached</span>
                    </div>
                  ) : (
                    <span className="text-xs text-red-400 font-medium">Missing File</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400 bg-amber-950/20 border border-amber-500/20 px-3.5 py-2.5 rounded-xl w-fit text-xs font-medium shadow-inner">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Payment details have not been completed.</span>
            </div>
          )}
        </ReviewCard>

      </div>
    </div>
  );
}