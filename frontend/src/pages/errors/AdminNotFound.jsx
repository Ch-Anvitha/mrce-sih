import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home } from 'lucide-react';
import SEO from '@/components/seo/SEO';

export default function AdminNotFound() {
  return (
    <>
      <SEO title="Page Not Found | Admin Portal" />
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg shadow-slate-200/50">
          <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-slate-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Admin Page Not Found</h2>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">
            The page you are looking for does not exist or has been moved within the admin portal.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/admin/dashboard" className="w-full">
              <Button className="w-full h-11 text-base font-semibold shadow-sm gap-2">
                <Home className="w-4 h-4" /> Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
