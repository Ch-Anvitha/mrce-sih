import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Lock, Unlock, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRegistrationActions } from '@/hooks/registration/useRegistrationActions';
import ActionConfirmationModal from './ActionConfirmationModal';

export default function RegistrationActionsCard({ registration }) {
  const { approve, reject, lock, unlock, isApproving, isRejecting, isLocking, isUnlocking } = useRegistrationActions();
  
  const [modalState, setModalState] = useState({ isOpen: false, type: null });

  const openModal = (type) => setModalState({ isOpen: true, type });
  const closeModal = () => setModalState({ isOpen: false, type: null });

  // Backend Business Rules:
  // Approve/Reject/Lock/Unlock are ONLY valid if the registration is NOT Approved and NOT Rejected.
  const isFinalized = registration.status === 'APPROVED' || registration.status === 'REJECTED';
  
  const canApprove = !isFinalized;
  const canReject = !isFinalized;
  const canLock = !isFinalized && registration.isUnlocked;
  const canUnlock = !isFinalized && !registration.isUnlocked;

  const isLoading = isApproving || isRejecting || isLocking || isUnlocking;

  const handleConfirm = (data) => {
    const payload = { id: registration.registrationId };
    if (data?.remarks) {
      payload.remarks = data.remarks;
    }

    switch (modalState.type) {
      case 'APPROVE':
        approve(payload, { onSettled: closeModal });
        break;
      case 'REJECT':
        reject(payload, { onSettled: closeModal });
        break;
      case 'LOCK':
        lock(payload, { onSettled: closeModal });
        break;
      case 'UNLOCK':
        unlock(payload, { onSettled: closeModal });
        break;
      default:
        closeModal();
    }
  };

  if (isFinalized) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center shadow-sm">
        <Settings2 className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900 mb-1">Actions Unavailable</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          This registration has already been finalized ({registration.status.toLowerCase()}). 
          No further administrative actions can be taken.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
          <Settings2 className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Administrative Actions</h3>
        </div>
        
        <div className="space-y-4">
          {canApprove && (
            <Button 
              onClick={() => openModal('APPROVE')} 
              disabled={isLoading}
              className="w-full justify-start gap-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold"
            >
              <div className="w-6 h-6 rounded-md bg-emerald-200/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              Approve Registration
            </Button>
          )}

          {canReject && (
            <Button 
              onClick={() => openModal('REJECT')} 
              disabled={isLoading}
              className="w-full justify-start gap-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold"
            >
              <div className="w-6 h-6 rounded-md bg-red-200/50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              Reject Registration
            </Button>
          )}

          <div className="h-px bg-slate-100 w-full" />

          {canLock && (
            <Button 
              onClick={() => openModal('LOCK')} 
              disabled={isLoading}
              className="w-full justify-start gap-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold"
            >
              <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              Lock Editing
            </Button>
          )}

          {canUnlock && (
            <Button 
              onClick={() => openModal('UNLOCK')} 
              disabled={isLoading}
              className="w-full justify-start gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold"
            >
              <div className="w-6 h-6 rounded-md bg-blue-200/50 flex items-center justify-center shrink-0">
                <Unlock className="w-4 h-4" />
              </div>
              Unlock for Editing
            </Button>
          )}
        </div>
      </div>

      <ActionConfirmationModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        actionType={modalState.type}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </>
  );
}
