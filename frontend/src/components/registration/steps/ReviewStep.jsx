import React from 'react';
import { useRegistration } from '@/store/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Edit2, CheckCircle2, AlertCircle, FileImage } from 'lucide-react';

export default function ReviewStep({ backendError }) {
  const { formData, setCurrentStep } = useRegistration();

  const handleEdit = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  const { team, leader, members, payment } = formData;

  const ReviewCard = ({ title, stepIndex, children, isComplete }) => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          {isComplete ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500" />
          )}
          {title}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleEdit(stepIndex)}
          className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/10"
        >
          <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
        </Button>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );

  const DataRow = ({ label, value }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-2 border-b border-slate-100 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <span className="text-sm text-slate-800 font-semibold sm:col-span-2 break-words">
        {value || <span className="text-slate-400 italic">Not provided</span>}
      </span>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary">Review Registration</h2>
        <p className="text-muted-foreground text-sm">Please verify all details carefully before final submission. Click Edit to make changes.</p>
      </div>

      {backendError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl mb-6">
          <h4 className="font-bold flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5" /> Submission Failed
          </h4>
          <p className="text-sm font-medium">{backendError.response?.data?.message || backendError.message || 'An unknown error occurred.'}</p>
          {backendError.response?.data?.errors && (
            <ul className="list-disc pl-5 mt-2 text-xs">
              {backendError.response.data.errors.map((err, idx) => (
                <li key={idx}>{err.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        
        {/* Team Details */}
        <ReviewCard title="Team Details" stepIndex={1} isComplete={!!team}>
          {team ? (
            <div className="space-y-1">
              <DataRow label="Team Name" value={team.teamName} />
              <DataRow label="Department & Year" value={`${team.department} • Year ${team.year}`} />
              <DataRow label="Problem Statement Title" value={team.problemStatementTitle} />
              <DataRow label="PS ID" value={team.problemStatementId?.toUpperCase()} />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-200 w-fit">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Team details have not been completed.</span>
            </div>
          )}
        </ReviewCard>

        {/* Leader Details */}
        <ReviewCard title="Team Leader" stepIndex={2} isComplete={!!leader}>
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
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-200 w-fit">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Leader details have not been completed.</span>
            </div>
          )}
        </ReviewCard>

        {/* Members Details */}
        <ReviewCard title={`Team Members (${members?.members?.length || 0})`} stepIndex={3} isComplete={!!members?.members?.length}>
          {members?.members && members.members.length > 0 ? (
            <div className="space-y-4">
              {members.members.map((member, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Member {idx + 1}</h4>
                  <div className="space-y-1">
                    <DataRow label="Full Name" value={member.name} />
                    <DataRow label="Roll Number" value={member.rollNumber?.toUpperCase()} />
                    <DataRow label="Details" value={`${member.gender} • ${member.department} • Year ${member.year}`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-200 w-fit">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">No additional members have been added.</span>
            </div>
          )}
        </ReviewCard>

        {/* Payment Details */}
        <ReviewCard title="Payment Receipt" stepIndex={4} isComplete={!!payment}>
          {payment ? (
            <div className="space-y-1">
              <DataRow label="Transaction ID" value={payment.transactionId?.toUpperCase()} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
                <span className="text-sm text-slate-500 font-medium">Screenshot</span>
                <div className="sm:col-span-2">
                  {payment.paymentScreenshot ? (
                    <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md px-3 py-2 w-fit">
                      <FileImage className="w-4 h-4" />
                      <span className="text-sm font-semibold">{payment.paymentScreenshot.name} Attached</span>
                    </div>
                  ) : (
                    <span className="text-sm text-destructive font-medium">Missing File</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-200 w-fit">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Payment details have not been completed.</span>
            </div>
          )}
        </ReviewCard>

      </div>
    </div>
  );
}
