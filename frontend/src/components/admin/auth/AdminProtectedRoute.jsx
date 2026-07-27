import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AdminProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Verifying Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the attempted URL for redirecting back later (optional)
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
