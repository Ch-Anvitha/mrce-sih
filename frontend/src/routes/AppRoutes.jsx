import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';

import { lazy } from 'react';

const Home = lazy(() => import('@/pages/public/Home'));
const About = lazy(() => import('@/pages/public/About'));
const Timeline = lazy(() => import('@/pages/public/Timeline'));
const Register = lazy(() => import('@/pages/registration/RegisterPage'));
const EditRegistration = lazy(() => import('@/pages/registration/EditRegistrationPage'));
const Success = lazy(() => import('@/pages/public/Success'));
const RegistrationStatus = lazy(() => import('@/pages/public/RegistrationStatusPage'));
const NotFound = lazy(() => import('@/pages/errors/NotFound'));

// Admin Pages
const AdminLoginPage = lazy(() => import('@/pages/admin/auth/AdminLoginPage'));
const AdminDashboard = lazy(() => import('@/pages/admin/dashboard/AdminDashboard'));
const AdminRegistrationsPage = lazy(() => import('@/pages/admin/registrations/AdminRegistrationsPage'));
const AdminRegistrationDetailsPage = lazy(() => import('@/pages/admin/registrations/AdminRegistrationDetailsPage'));
const AdminProtectedRoute = lazy(() => import('@/components/admin/auth/AdminProtectedRoute'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AuthProvider } from '@/store/AuthContext';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/register" element={<Register />} />
              <Route path="/edit-registration" element={<EditRegistration />} />
              <Route path="/status" element={<RegistrationStatus />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminProtectedRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="registrations" element={<AdminRegistrationsPage />} />
              <Route path="registrations/:id" element={<AdminRegistrationDetailsPage />} />
              {/* Other admin routes go here */}
            </Route>

          </Routes>
        </React.Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
