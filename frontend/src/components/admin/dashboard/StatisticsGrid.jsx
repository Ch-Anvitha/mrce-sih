import React from 'react';
import StatCard from './StatCard';
import { 
  Users, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Unlock, 
  Lock 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function StatisticsGrid({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl bg-slate-800/60 border border-slate-800" />
        ))}
      </div>
    );
  }

  const stats = data?.overview || {
    totalRegistrations: 0,
    paymentPending: 0,
    approved: 0,
    rejected: 0,
    unlocked: 0,
    locked: 0
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard 
        title="Total Teams" 
        value={stats.totalRegistrations} 
        icon={Users}
        colorClass="text-blue-400 bg-blue-950/60 border border-blue-500/20"
        borderColorClass="bg-blue-500"
        delay={0.1}
      />
      <StatCard 
        title="Payment Pending" 
        value={stats.paymentPending} 
        icon={CreditCard}
        colorClass="text-amber-400 bg-amber-950/60 border border-amber-500/20"
        borderColorClass="bg-amber-500"
        delay={0.15}
      />
      <StatCard 
        title="Approved" 
        value={stats.approved} 
        icon={CheckCircle2}
        colorClass="text-emerald-400 bg-emerald-950/60 border border-emerald-500/20"
        borderColorClass="bg-emerald-500"
        delay={0.2}
      />
      <StatCard 
        title="Rejected" 
        value={stats.rejected} 
        icon={XCircle}
        colorClass="text-red-400 bg-red-950/60 border border-red-500/20"
        borderColorClass="bg-red-500"
        delay={0.25}
      />
      <StatCard 
        title="Unlocked" 
        value={stats.unlocked} 
        icon={Unlock}
        colorClass="text-violet-400 bg-violet-950/60 border border-violet-500/20"
        borderColorClass="bg-violet-500"
        delay={0.3}
      />
      <StatCard 
        title="Locked" 
        value={stats.locked} 
        icon={Lock}
        colorClass="text-slate-300 bg-slate-900/80 border border-slate-700/60"
        borderColorClass="bg-slate-500"
        delay={0.35}
      />
    </div>
  );
}