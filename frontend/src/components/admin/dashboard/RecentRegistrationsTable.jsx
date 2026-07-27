import React from 'react';
import { format } from 'date-fns';
import { StatusBadge, LockBadge } from '@/components/registration/status/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Eye, Inbox } from 'lucide-react';

export default function RecentRegistrationsTable({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Registrations</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // The backend might return data inside a pagination object or directly as an array.
  // Assuming the standard controller uses `data: registrations` where registrations is `{ docs: [...] }` if paginated, or just `[...]`.
  const registrations = Array.isArray(data) ? data : data?.docs || [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Recent Registrations</h3>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          View All
        </Button>
      </div>
      
      {registrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-1">No Registrations Yet</h4>
          <p className="text-slate-500 max-w-sm">
            When teams submit their applications, they will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">Team Name & ID</th>
                <th className="px-6 py-4 font-bold">Leader</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Date</th>
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
                    <p className="font-medium text-slate-900">{reg.leader.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{reg.leader.department}</p>
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
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                      <Eye className="w-4 h-4 mr-2" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {registrations.length > 0 && (
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center sm:hidden">
          <Button variant="outline" className="w-full">
            View All Registrations
          </Button>
        </div>
      )}
    </div>
  );
}
