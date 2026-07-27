import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area 
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316'];

export function ChartSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-[350px] flex flex-col">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="flex-1 w-full flex items-end gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${Math.random() * 80 + 10}%` }} />
        ))}
      </div>
    </div>
  );
}

export function DepartmentChart({ data = [] }) {
  if (data.length === 0) return null;
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Registrations by Department</h3>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DailyTrendChart({ data = [] }) {
  if (data.length === 0) return null;

  // Format date strings for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Registration Trend</h3>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="formattedDate" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StatusDistributionChart({ overview }) {
  if (!overview) return null;

  const data = [
    { name: 'Pending', value: overview.pending, color: '#f59e0b' },
    { name: 'Approved', value: overview.approved, color: '#10b981' },
    { name: 'Rejected', value: overview.rejected, color: '#ef4444' },
  ].filter(item => item.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-[350px] flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Status Distribution</h3>
      <div className="flex-1 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            {item.name} ({item.value})
          </div>
        ))}
      </div>
    </div>
  );
}
