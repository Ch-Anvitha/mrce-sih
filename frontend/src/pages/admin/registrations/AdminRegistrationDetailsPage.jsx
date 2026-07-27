import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchRegistrationById } from '@/services/registration/registrationApi';
import { useQuery } from '@tanstack/react-query';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Users, GraduationCap, MapPin, 
  Briefcase, Mail, Phone, Calendar, FileText, 
  ChevronRight, Building, CreditCard
} from 'lucide-react';
import { StatusBadge, LockBadge } from '@/components/registration/status/StatusBadge';
import { StatusTimeline } from '@/components/registration/status/StatusTimeline';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import ImageLightbox from '@/components/ui/image-lightbox';
import RegistrationActionsCard from '@/components/admin/registrations/RegistrationActionsCard';

export default function AdminRegistrationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const { data: responseData, isLoading, isError } = useQuery({
    queryKey: ['admin', 'registration', id],
    queryFn: () => fetchRegistrationById(id),
    staleTime: 5 * 60 * 1000
  });

  const registration = responseData?.data;

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="h-32 col-span-1" />
          <Skeleton className="h-32 col-span-1" />
          <Skeleton className="h-32 col-span-1" />
          <Skeleton className="h-32 col-span-1" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !registration) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Registration Not Found</h2>
        <p className="text-slate-500 mb-6">The registration you are looking for does not exist or has been archived.</p>
        <Button onClick={() => navigate('/admin/registrations')}>Back to Registrations</Button>
      </div>
    );
  }

  const totalMembers = 1 + (registration.members?.length || 0);

  return (
    <>
      <SEO title={`Registration ${registration.registrationId} | Admin Portal`} />
      
      <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link to="/admin/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/admin/registrations" className="hover:text-primary transition-colors">Registration Management</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-semibold" aria-current="page">Registration Details</span>
          </nav>

          {/* Header Title with Back Button */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/registrations')} className="gap-2 shrink-0">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold text-slate-900 truncate">Registration View</h1>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Total Members</p>
                <p className="text-lg font-bold text-slate-900">{totalMembers} Students</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Department</p>
                <p className="text-lg font-bold text-slate-900">{registration.leader?.department}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Registration Date</p>
                <p className="text-base font-bold text-slate-900 whitespace-nowrap">
                  {format(new Date(registration.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Payment Status</p>
                <div className="mt-0.5">
                  <StatusBadge status={registration.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column (2/3 width on xl) */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Team Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Team Information
                  </h3>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={registration.status} />
                    {registration.isUnlocked && <LockBadge isUnlocked={true} />}
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Team Name</p>
                      <p className="text-xl font-bold text-slate-900">{registration.teamName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Registration ID</p>
                      <p className="text-lg font-mono text-slate-800">{registration.registrationId}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Problem Statement</p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 font-medium leading-relaxed">
                      {registration.problemStatement}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 px-1">Team Participants</h3>
                
                {/* Leader */}
                <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                          {registration.leader?.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            {registration.leader?.name}
                            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Team Leader</span>
                          </h4>
                          <p className="font-mono text-slate-500 mt-0.5">{registration.leader?.rollNumber}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                          {registration.leader?.gender}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5"/> Department</p>
                        <p className="font-medium text-slate-900">{registration.leader?.department}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Year & Section</p>
                        <p className="font-medium text-slate-900">Yr {registration.leader?.year} • Sec {registration.leader?.section}</p>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <p className="text-slate-500 mb-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email Address</p>
                        <p className="font-medium text-slate-900 truncate" title={registration.leader?.email}>{registration.leader?.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone Number</p>
                        <p className="font-medium text-slate-900">{registration.leader?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Members */}
                {registration.members?.map((member, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xl font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                            <p className="font-mono text-slate-500 mt-0.5">{member.rollNumber}</p>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                            {member.gender}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-sm">
                        <div>
                          <p className="text-slate-500 mb-1 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5"/> Department</p>
                          <p className="font-medium text-slate-900">{member.department}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Year & Section</p>
                          <p className="font-medium text-slate-900">Yr {member.year} • Sec {member.section}</p>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                          <p className="text-slate-500 mb-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email Address</p>
                          <p className="font-medium text-slate-900 truncate" title={member.email}>{member.email}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Phone Number</p>
                          <p className="font-medium text-slate-900">{member.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Right Column (1/3 width on xl) */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Actions Card */}
              <RegistrationActionsCard registration={registration} />
              
              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Status Timeline
                </h3>
                <StatusTimeline status={registration.status} />
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Payment Details
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">Amount Paid</p>
                      <p className="text-xl font-bold text-slate-900">₹{registration.payment?.amount || 500}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Transaction ID</p>
                      <p className="font-mono font-bold text-slate-900">{registration.payment?.transactionId}</p>
                    </div>
                  </div>

                  {registration.payment?.screenshotUrl ? (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Payment Screenshot</p>
                      <button 
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-full relative group overflow-hidden rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <img 
                          src={registration.payment.screenshotUrl} 
                          alt="Payment Screenshot" 
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="bg-white/90 text-slate-900 text-sm font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-200">
                            Click to View Full
                          </span>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="h-48 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                      <FileText className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No Screenshot Provided</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {registration.payment?.screenshotUrl && (
        <ImageLightbox 
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          imageUrl={registration.payment.screenshotUrl}
          altText={`Payment Screenshot for ${registration.teamName}`}
        />
      )}
    </>
  );
}
