import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/seo/SEO';
import RegistrationLayout from '@/components/registration/common/RegistrationLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SearchX, Loader2, ArrowRight, Lock, Key } from 'lucide-react';
import { useRegistrationStatusQuery } from '@/hooks/registration/useRegistrationStatusQuery';
import { StatusTimeline } from '@/components/registration/status/StatusTimeline';
import { StatusBadge, LockBadge } from '@/components/registration/status/StatusBadge';
import { RegistrationDetailsPanel } from '@/components/registration/status/RegistrationDetailsPanel';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationStatusPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const navigate = useNavigate();

  const { data: responseData, isLoading, error, isError } = useRegistrationStatusQuery(activeSearch, {
    enabled: activeSearch.length > 5 // Only trigger if reasonable length
  });

  const registration = responseData?.data;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim().length > 5) {
      setActiveSearch(searchInput.trim());
    }
  };

  const handleEditClick = () => {
    if (registration?.editCode) {
      navigate('/edit-registration', { state: { editCode: registration.editCode } });
    } else {
      navigate('/edit-registration');
    }
  };

  return (
    <>
      <SEO title="Registration Status | Internal SIH 2026" />
      <RegistrationLayout 
        title="Registration Status" 
        subtitle="Track the status of your team's application using your Registration ID."
      >
        <div className="max-w-4xl mx-auto space-y-8 pb-16">
          
          {/* Lookup Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mt-10">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto relative z-10">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  placeholder="Enter your Registration ID (e.g. MRCE-SIH-...)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-11 h-12 text-base font-medium"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="h-12 px-8 shrink-0">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Status'}
              </Button>
            </form>
          </div>

          <AnimatePresence mode="wait">
            {/* Loading State */}
            {isLoading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">Fetching your details</h3>
                <p className="text-slate-500">Please wait while we retrieve your registration status.</p>
              </motion.div>
            )}

            {/* Error State */}
            {isError && activeSearch && !isLoading && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-sm border border-destructive/20 p-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Registration Not Found</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-6">
                  {error?.response?.data?.message || 'We could not find a registration matching that ID. Please check the ID and try again.'}
                </p>
                <Button variant="outline" onClick={() => setActiveSearch('')}>Clear Search</Button>
              </motion.div>
            )}

            {/* Success State (Dashboard) */}
            {registration && !isLoading && !isError && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                
                {/* Header & Badges */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                      {registration.teamName}
                    </h2>
                    <p className="text-slate-500 font-mono text-sm">ID: {registration.registrationId}</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={registration.status} />
                    <LockBadge isUnlocked={registration.isUnlocked} />
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Application Progress</h3>
                  <StatusTimeline status={registration.status} />
                </div>

                {/* Edit Registration Banner (If Unlocked) */}
                {registration.isUnlocked && registration.status !== 'APPROVED' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0 mt-0.5">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900">Action Required</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          Your registration has been unlocked by administrators for editing. You can now update your details using your secret Edit Code.
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleEditClick} className="shrink-0">
                      Edit Registration <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
                
                {/* Locked Banner */}
                {!registration.isUnlocked && registration.status !== 'APPROVED' && registration.status !== 'REJECTED' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="p-3 bg-white text-slate-500 rounded-full shrink-0 shadow-sm border border-slate-100">
                      <Lock className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-slate-600 flex-1">
                      Your registration is currently locked and under review. Editing is disabled until an administrator requests changes.
                    </p>
                  </div>
                )}

                {/* Detailed Information */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <RegistrationDetailsPanel registration={registration} />
                </div>
                
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </RegistrationLayout>
    </>
  );
}
