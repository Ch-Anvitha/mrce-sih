import React from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEPARTMENTS = [
  "CSE", "CSM", "CSD", "CSO", "CSC", "CSB", "IT", 
  "ECE", "EEE", "MECH", "CIVIL", "OTHER"
];

const STATUSES = [
  { value: "PAYMENT_PENDING", label: "Payment Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function RegistrationsFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  departmentFilter,
  onDepartmentChange,
  onRefresh,
  isFetching
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search Team, Roll Number, or Reg ID..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <div className="flex items-center gap-2 border-r border-slate-200 pr-3 shrink-0">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          
          <select 
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select 
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <Button 
          variant="outline" 
          onClick={onRefresh} 
          disabled={isFetching}
          className="shrink-0 gap-2 font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

    </div>
  );
}
