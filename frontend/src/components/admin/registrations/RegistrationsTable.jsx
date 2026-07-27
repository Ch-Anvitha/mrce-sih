import React from 'react';
import { format } from 'date-fns';
import { StatusBadge, LockBadge } from '@/components/registration/status/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Eye, Inbox, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistrationsTable({ registrations, isLoading, isError, onRetry }) {
  
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-t-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-lg font-bold text-red-900 mb-2">Failed to Load Registrations</h3>
        <p className="text-red-700 max-w-md mb-6">
          There was an error communicating with the server. Please check your network connection and try again.
        </p>
        <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100" onClick={onRetry}>
          Retry Connection
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white border-t border-x border-slate-200 rounded-t-xl p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!registrations || registrations.length === 0) {
    return (
      <div className="bg-white border-t border-x border-slate-200 rounded-t-xl flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
          <Inbox className="w-10 h-10" />
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-2">No Registrations Found</h4>
        <p className="text-slate-500 max-w-md">
          Try adjusting your search query or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-t border-x border-slate-200 rounded-t-xl overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-bold">Team Name & ID</th>
            <th className="px-6 py-4 font-bold">Leader Details</th>
            <th className="px-6 py-4 font-bold">Problem Statement</th>
            <th className="px-6 py-4 font-bold">Status</th>
            <th className="px-6 py-4 font-bold">Date Submitted</th>
            <th className="px-6 py-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {registrations.map((reg) => (
            <tr key={reg._id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-slate-900">{reg.teamName}</p>
                <p className="font-mono text-xs text-slate-500 mt-0.5">{reg.registrationId}</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-slate-900">{reg.leader?.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-mono">{reg.leader?.rollNumber}</span> • {reg.leader?.department}
                </p>
              </td>
              <td className="px-6 py-4 max-w-[200px] truncate">
                <p className="text-slate-700 truncate" title={reg.problemStatement}>
                  {reg.problemStatement}
                </p>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2 items-start">
                  <StatusBadge status={reg.status} />
                  {reg.isUnlocked && <LockBadge isUnlocked={reg.isUnlocked} />}
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium text-slate-700">
                  {format(new Date(reg.createdAt), 'MMM dd, yyyy')}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {format(new Date(reg.createdAt), 'hh:mm a')}
                </p>
              </td>
              <td className="px-6 py-4 text-right">
                <Link to={`/admin/registrations/${reg.registrationId}`}>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 font-medium">
                    <Eye className="w-4 h-4 mr-2" /> Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
