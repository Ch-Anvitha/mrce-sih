import React from 'react';
import { CheckCircle2, Clock, XCircle, Lock, Unlock, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StatusBadge = ({ status, className }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'PAYMENT_PENDING':
        return {
          label: 'Payment Pending',
          icon: <CreditCard className="w-4 h-4" />,
          classes: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      case 'APPROVED':
        return {
          label: 'Approved',
          icon: <CheckCircle2 className="w-4 h-4" />,
          classes: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
      case 'REJECTED':
        return {
          label: 'Rejected',
          icon: <XCircle className="w-4 h-4" />,
          classes: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          label: status,
          icon: <Clock className="w-4 h-4" />,
          classes: 'bg-slate-100 text-slate-800 border-slate-200'
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border',
      config.classes,
      className
    )}>
      {config.icon}
      {config.label}
    </span>
  );
};

export const LockBadge = ({ isUnlocked, className }) => {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border',
      isUnlocked ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200',
      className
    )}>
      {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      {isUnlocked ? 'Editable' : 'Locked'}
    </span>
  );
};
