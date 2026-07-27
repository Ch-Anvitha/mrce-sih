import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, ShieldCheck, Lock, Unlock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ActionConfirmationModal({ 
  isOpen, 
  onClose, 
  actionType, 
  onConfirm, 
  isLoading 
}) {
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setRemarks('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (actionType === 'REJECT' && !remarks.trim()) {
      setError('Rejection reason is required.');
      return;
    }
    
    // Only pass remarks if it's APPROVE or REJECT
    if (actionType === 'APPROVE' || actionType === 'REJECT') {
      onConfirm({ remarks });
    } else {
      onConfirm();
    }
  };

  const getActionDetails = () => {
    switch (actionType) {
      case 'APPROVE':
        return {
          title: 'Approve Registration',
          icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
          bgColor: 'bg-emerald-100',
          confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          confirmText: 'Approve Registration',
          description: 'Are you sure you want to approve this registration? The team will be notified of their acceptance.',
          showRemarks: true,
          remarksOptional: true,
        };
      case 'REJECT':
        return {
          title: 'Reject Registration',
          icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
          bgColor: 'bg-red-100',
          confirmBtn: 'bg-red-600 hover:bg-red-700 text-white',
          confirmText: 'Reject Registration',
          description: 'Are you sure you want to reject this registration? You must provide a reason below.',
          showRemarks: true,
          remarksOptional: false,
        };
      case 'LOCK':
        return {
          title: 'Lock Registration',
          icon: <Lock className="w-6 h-6 text-slate-600" />,
          bgColor: 'bg-slate-200',
          confirmBtn: 'bg-slate-800 hover:bg-slate-900 text-white',
          confirmText: 'Lock Registration',
          description: 'Locking this registration will prevent the team from making any further edits to their submission.',
          showRemarks: false,
        };
      case 'UNLOCK':
        return {
          title: 'Unlock Registration',
          icon: <Unlock className="w-6 h-6 text-blue-600" />,
          bgColor: 'bg-blue-100',
          confirmBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
          confirmText: 'Unlock Registration',
          description: 'Unlocking this registration will allow the team to edit their submission again.',
          showRemarks: false,
        };
      default:
        return null;
    }
  };

  const details = getActionDetails();
  if (!details) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={!isLoading ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", details.bgColor)}>
                {details.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{details.title}</h2>
            </div>
            <button 
              onClick={onClose} 
              disabled={isLoading}
              className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-slate-600 font-medium">{details.description}</p>

            {details.showRemarks && (
              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-semibold text-slate-900 flex justify-between">
                  Remarks
                  {details.remarksOptional && <span className="text-slate-400 font-normal">(Optional)</span>}
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isLoading}
                  placeholder={details.remarksOptional ? "Add any optional comments here..." : "Provide a reason for rejection..."}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 transition-all",
                    error ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:border-primary focus:ring-primary/20",
                    isLoading && "opacity-50 bg-slate-50 cursor-not-allowed"
                  )}
                  maxLength={500}
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-500 font-medium">{error}</span>
                  <span className="text-slate-400">{remarks.length}/500</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isLoading}
              className="bg-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={isLoading}
              className={details.confirmBtn}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {details.confirmText}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
