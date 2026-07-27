import React, { useState } from 'react';
import { useAuth } from '@/store/AuthContext';
import { useAdminRegistrationsQuery } from '@/hooks/registration/useAdminRegistrationsQuery';
import { useDebounce } from '@/hooks/useDebounce';
import SEO from '@/components/seo/SEO';
import { ShieldAlert, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

import RegistrationsFilterBar from '@/components/admin/registrations/RegistrationsFilterBar';
import RegistrationsTable from '@/components/admin/registrations/RegistrationsTable';
import PaginationControls from '@/components/admin/registrations/PaginationControls';

export default function AdminRegistrationsPage() {
  const { admin, logout } = useAuth();

  // Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Debounced search (500ms) to prevent excessive API calls
  const debouncedSearch = useDebounce(search, 500);

  // When filters change, we should reset to page 1
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };
  
  const handleStatusChange = (val) => {
    setStatusFilter(val);
    setPage(1);
  };
  
  const handleDepartmentChange = (val) => {
    setDepartmentFilter(val);
    setPage(1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  // Construct Query Params
  const queryParams = {
    page,
    limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(statusFilter && { status: statusFilter }),
    ...(departmentFilter && { department: departmentFilter })
  };

  // Fetch Data
  const { 
    data: responseData, 
    isLoading, 
    isFetching,
    isError, 
    refetch 
  } = useAdminRegistrationsQuery(queryParams, { keepPreviousData: true });

  const registrations = responseData?.data?.registrations || [];
  const pagination = responseData?.data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <>
      <SEO title="Registration Management | Admin Portal" />
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
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col h-full">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Registration Management
            </h2>
            <p className="text-slate-500 mt-1 font-medium">
              Browse, search, and filter all team registrations.
            </p>
          </div>

          {/* Filter Bar */}
          <RegistrationsFilterBar 
            search={search}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
            departmentFilter={departmentFilter}
            onDepartmentChange={handleDepartmentChange}
            onRefresh={refetch}
            isFetching={isFetching && !isLoading} 
          />

          {/* Data Table & Pagination wrapper */}
          <div className="flex-1 flex flex-col shadow-sm rounded-xl overflow-hidden">
            <RegistrationsTable 
              registrations={registrations} 
              isLoading={isLoading} 
              isError={isError}
              onRetry={refetch}
            />
            
            {(!isLoading && !isError && registrations.length > 0) && (
              <PaginationControls 
                page={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                limit={pagination.limit}
                onPageChange={setPage}
                onLimitChange={handleLimitChange}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
