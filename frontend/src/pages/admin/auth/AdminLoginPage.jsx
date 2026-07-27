import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/auth/authSchema';
import { useAuth } from '@/store/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, Loader2, ShieldCheck } from 'lucide-react';
import SEO from '@/components/seo/SEO';

export default function AdminLoginPage() {
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get('expired') === 'true') {
      toast.error('Session expired. Please log in again.');
      // Remove query param without triggering reload
      navigate('/admin/login', { replace: true });
    }
  }, [searchParams, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // If already authenticated, redirect immediately
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Prevent flash of login form while verifying session
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const result = await login(data);
    setIsSubmitting(false);
    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <>
      <SEO title="Admin Login | Internal SIH 2026" />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              MRCE Internal Smart India Hackathon 2026
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Input 
                    type="email"
                    placeholder="admin@mrce.ac.in"
                    {...register('email')}
                    className={`h-12 pl-4 bg-slate-50 border-slate-200 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs font-medium mt-1.5 ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register('password')}
                    className={`h-12 pl-10 pr-12 bg-slate-50 border-slate-200 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-destructive text-xs font-medium mt-1.5 ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Authenticating...
                  </>
                ) : 'Sign In'}
              </Button>

            </form>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-slate-400 font-medium">
              Secure Access Only. Unauthorized attempts are logged.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
