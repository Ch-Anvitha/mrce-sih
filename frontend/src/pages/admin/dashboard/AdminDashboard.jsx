import React from 'react';
import { useAuth } from '@/store/AuthContext';
import { useDashboardStatisticsQuery } from '@/hooks/dashboard/useDashboardStatisticsQuery';
import { useAdminRegistrationsQuery } from '@/hooks/registration/useAdminRegistrationsQuery';
import { Button } from '@/components/ui/button';
import { LogOut, ShieldAlert, LayoutDashboard } from 'lucide-react';
import { format } from 'date-fns';
import SEO from '@/components/seo/SEO';

import StatisticsGrid from '@/components/admin/dashboard/StatisticsGrid';
import RecentRegistrationsTable from '@/components/admin/dashboard/RecentRegistrationsTable';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import { DepartmentChart, DailyTrendChart, StatusDistributionChart, ChartSkeleton } from '@/components/admin/dashboard/AnalyticsCharts';
import { exportRegistrations } from '@/services/registration/registrationApi';
import { toast } from 'sonner';
import { Download, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  
  const { 
    data: statsData, 
    isLoading: isStatsLoading,
    isError: isStatsError 
  } = useDashboardStatisticsQuery();

  const { 
    data: recentRegData, 
    isLoading: isRecentLoading,
    isError: isRecentError 
  } = useAdminRegistrationsQuery({ limit: 5 });

  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await exportRegistrations();
      
      // Determine filename from content-disposition header if available
      let filename = `MRCE-SIH-Registrations-${new Date().toISOString().split("T")[0]}.xlsx`;
      const disposition = response.headers['content-disposition'];
      if (disposition && disposition.indexOf('filename=') !== -1) {
        const matches = /filename="([^"]+)"/.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1];
        }
      }

      // Trigger download
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Export downloaded successfully.');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export registrations.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Dashboard | Internal SIH 2026" />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-slate-900 leading-tight">Admin Portal</h1>
              <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">MRCE SIH 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right mr-2 border-r border-slate-200 pr-6">
              <p className="text-sm font-bold text-slate-900">{admin?.name}</p>
              <p className="text-xs text-slate-500">{admin?.email}</p>
            </div>
            <Button variant="outline" onClick={logout} className="gap-2 border-slate-200 hover:bg-slate-100 font-semibold">
              <LogOut className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-8">
          
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-primary" />
                Dashboard Overview
              </h2>
              <p className="text-slate-500 mt-1 font-medium">
                Welcome back, {admin?.name?.split(' ')[0]}. Here is what is happening today.
              </p>
            </div>
            <div className="flex items-center gap-4 self-start sm:self-auto">
              <div className="hidden sm:block text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                {format(new Date(), 'EEEE, MMMM do, yyyy')}
              </div>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-semibold shadow-sm"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Export to Excel
              </Button>
            </div>
          </div>

          {/* Statistics Grid */}
          <section>
            {isStatsError ? (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-center font-medium">
                Failed to load dashboard statistics. Please refresh the page.
              </div>
            ) : (
              <StatisticsGrid data={statsData?.data} isLoading={isStatsLoading} />
            )}
          </section>

          {/* Charts Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {isStatsLoading ? (
                <ChartSkeleton />
              ) : isStatsError ? (
                <div className="bg-white border border-slate-200 rounded-xl p-6 h-[350px] flex items-center justify-center text-slate-400">Failed to load chart</div>
              ) : (
                <StatusDistributionChart overview={statsData?.data?.overview} />
              )}
            </div>
            <div className="lg:col-span-2">
              {isStatsLoading ? (
                <ChartSkeleton />
              ) : isStatsError ? (
                <div className="bg-white border border-slate-200 rounded-xl p-6 h-[350px] flex items-center justify-center text-slate-400">Failed to load chart</div>
              ) : (
                <DepartmentChart data={statsData?.data?.departments} />
              )}
            </div>
            <div className="lg:col-span-3">
              {isStatsLoading ? (
                <ChartSkeleton />
              ) : isStatsError ? (
                <div className="bg-white border border-slate-200 rounded-xl p-6 h-[350px] flex items-center justify-center text-slate-400">Failed to load chart</div>
              ) : (
                <DailyTrendChart data={statsData?.data?.dailyRegistrations} />
              )}
            </div>
          </section>

          {/* Lower Grid: Registrations & Quick Actions */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {isRecentError ? (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-center font-medium">
                  Failed to load recent registrations.
                </div>
              ) : (
                <RecentRegistrationsTable data={recentRegData?.data} isLoading={isRecentLoading} />
              )}
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
