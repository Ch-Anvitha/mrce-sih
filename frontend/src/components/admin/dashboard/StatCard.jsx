import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function StatCard({ title, value, icon: Icon, colorClass, borderColorClass, delay = 0, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <Skeleton className="w-10 h-10 rounded-lg mb-4" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-16" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 left-0 w-1 h-full transition-all group-hover:w-1.5", borderColorClass)} />
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110", colorClass)}>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <p className="text-sm font-semibold text-slate-500 tracking-wide uppercase mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </motion.div>
  );
}
