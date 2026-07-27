import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Copy, Home, Download, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SEO from '@/components/seo/SEO';
import { toast } from 'sonner';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const registrationData = location.state?.registration;

  const [copiedId, setCopiedId] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Fallback if accessed without registration state
  useEffect(() => {
    if (!registrationData) {
      navigate('/');
    }
  }, [registrationData, navigate]);

  if (!registrationData) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
    if (type === 'Registration ID') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <>
      <SEO title="Registration Successful | Internal SIH 2026" />
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="max-w-xl w-full space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100"
        >
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
              className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 mb-6"
            >
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </motion.div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
              Registration Successful!
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Your team <span className="font-semibold text-slate-900">{registrationData.teamName}</span> has been successfully registered for the Internal Smart India Hackathon 2026.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Registration ID
                </label>
                <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3">
                  <code className="text-lg font-mono font-bold text-primary truncate mr-4">
                    {registrationData.registrationId}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopy(registrationData.registrationId, 'Registration ID')}
                    className="shrink-0 text-slate-500 hover:text-primary hover:bg-primary/10"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Edit Code (Keep Secret)
                </label>
                <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3">
                  <code className="text-lg font-mono font-bold text-amber-600 truncate mr-4">
                    {registrationData.editCode}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopy(registrationData.editCode, 'Edit Code')}
                    className="shrink-0 text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  You will need this code to make any changes to your registration. Do not share it!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              className="w-full sm:w-auto h-12 px-8"
              onClick={() => toast.info('Acknowledgement download will be available soon.')}
            >
              <Download className="w-4 h-4 mr-2" /> Download Acknowledgement
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-12 px-8"
              asChild
            >
              <Link to="/status">
                <Home className="w-4 h-4 mr-2" /> Track Status
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
