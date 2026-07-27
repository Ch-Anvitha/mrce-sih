import React from 'react';
import SEO from '@/components/seo/SEO';
import RegistrationLayout from '@/components/registration/common/RegistrationLayout';
import RegistrationStepper from '@/components/registration/wizard/RegistrationStepper';
import NavigationButtons from '@/components/registration/wizard/NavigationButtons';
import { RegistrationProvider, useRegistration } from '@/store/RegistrationContext';
import TeamStep from '@/components/registration/steps/TeamStep';
import LeaderStep from '@/components/registration/steps/LeaderStep';
import MembersStep from '@/components/registration/steps/MembersStep';
import PaymentStep from '@/components/registration/steps/PaymentStep';
import ReviewStep from '@/components/registration/steps/ReviewStep';

const steps = [
  { id: 'team', label: 'Team' },
  { id: 'leader', label: 'Leader' },
  { id: 'members', label: 'Members' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

import { useNavigate } from 'react-router-dom';
import { useRegistrationMutation } from '@/hooks/registration/useRegistrationMutation';
import { useEditRegistrationMutation } from '@/hooks/registration/useEditRegistrationMutation';
import { toast } from 'sonner';

import { CheckCircle2, Lock, AlertCircle, XCircle } from 'lucide-react';

export function RegisterWizard() {
  const { currentStep, setCurrentStep, formData, editSession } = useRegistration();
  const navigate = useNavigate();
  
  // Use both mutations, decide which to call based on editSession
  const { mutate: createMutate, isPending: isCreatePending, error: createError, isError: isCreateError } = useRegistrationMutation();
  const { mutate: updateMutate, isPending: isUpdatePending, error: updateError, isError: isUpdateError } = useEditRegistrationMutation();

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleSave = () => toast.info('Progress saved locally');

  const triggerStepSubmit = () => {
    if (currentStep === 1) document.getElementById('team-step-submit')?.click();
    else if (currentStep === 2) document.getElementById('leader-step-submit')?.click();
    else if (currentStep === 3) document.getElementById('members-step-submit')?.click();
    else if (currentStep === 4) document.getElementById('payment-step-submit')?.click();
    else if (currentStep === 5) {
      
      // Perform cross-step validation before submission
      const { leader, members } = formData;
      if (leader && members?.members) {
        const allParticipants = [leader, ...members.members];
        
        const hasFemale = allParticipants.some(p => p.gender?.toUpperCase() === 'FEMALE');
        if (!hasFemale) {
          toast.error('SIH Rules: At least one female participant is required (Leader or Member).');
          return;
        }

        const rolls = allParticipants.map(p => p.rollNumber?.toUpperCase()).filter(Boolean);
        if (new Set(rolls).size !== rolls.length) {
          toast.error('Validation Error: Duplicate roll numbers found among participants.');
          return;
        }

        const emails = allParticipants.map(p => p.email?.toLowerCase()).filter(Boolean);
        if (new Set(emails).size !== emails.length) {
          toast.error('Validation Error: Duplicate emails found among participants.');
          return;
        }
      }

      if (editSession.isEditMode) {
        updateMutate(
          { registrationId: editSession.registrationId, editCode: editSession.editCode, formDataState: formData },
          {
            onSuccess: (response) => {
              toast.success('Registration updated successfully!');
              navigate('/success', { state: { registration: response.data } });
            },
            onError: (err) => toast.error(err.response?.data?.message || err.message || 'Failed to update registration')
          }
        );
      } else {
        createMutate(formData, {
          onSuccess: (response) => {
            toast.success('Registration submitted successfully!');
            navigate('/success', { state: { registration: response.data } });
          },
          onError: (err) => toast.error(err.response?.data?.message || err.message || 'Failed to submit registration')
        });
      }
    } else handleNext();
  };

  const getStatusBadge = () => {
    if (!editSession.status) return null;
    const { status, isLocked } = editSession;
    if (status === 'APPROVED') return <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-semibold mb-6"><CheckCircle2 className="w-5 h-5"/> Approved - Read Only</div>;
    if (status === 'REJECTED') return <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold mb-6"><XCircle className="w-5 h-5"/> Rejected - Read Only</div>;
    if (isLocked) return <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-semibold mb-6"><Lock className="w-5 h-5"/> Locked - Read Only</div>;
    return <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold mb-6"><AlertCircle className="w-5 h-5"/> Edit Mode Active</div>;
  };

  const backendError = editSession.isEditMode ? (isUpdateError ? updateError : null) : (isCreateError ? createError : null);

  return (
    <RegistrationLayout title={editSession.isEditMode ? "Edit Registration" : "Register Your Team"} subtitle={editSession.isEditMode ? "Update your details below." : "Complete the form below to register for the Internal Smart India Hackathon 2026."}>
      {getStatusBadge()}
      <RegistrationStepper steps={steps} />
      
      <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mt-10 mb-8 min-h-[450px] transition-all relative
        ${editSession.isReadOnly ? 'opacity-90' : ''}`}
      >
        {editSession.isReadOnly && (
          <div className="absolute inset-0 z-50 rounded-xl" style={{ pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} onClick={() => toast.warning('This registration is read-only and cannot be modified.')} />
        )}
        
        <div className={editSession.isReadOnly ? 'pointer-events-none' : ''}>
          {currentStep === 1 && <TeamStep onNext={handleNext} />}
          {currentStep === 2 && <LeaderStep onNext={handleNext} />}
          {currentStep === 3 && <MembersStep onNext={handleNext} />}
          {currentStep === 4 && <PaymentStep onNext={handleNext} />}
          {currentStep === 5 && <ReviewStep backendError={backendError} />}
        </div>
      </div>

      <NavigationButtons 
        onNext={triggerStepSubmit}
        onPrevious={handlePrev}
        onSave={handleSave}
        isFirstStep={currentStep === 1}
        isLastStep={currentStep === steps.length}
        isLoading={isCreatePending || isUpdatePending}
        isReadOnly={editSession.isReadOnly}
      />
    </RegistrationLayout>
  );
}

export default function RegisterPage() {
  return (
    <>
      <SEO title="Register | Internal SIH 2026" />
      <RegistrationProvider>
        <RegisterWizard />
      </RegistrationProvider>
    </>
  );
}
