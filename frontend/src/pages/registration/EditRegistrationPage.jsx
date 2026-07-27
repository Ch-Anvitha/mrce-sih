import React, { useState, useEffect } from 'react';
import SEO from '@/components/seo/SEO';
import RegistrationLayout from '@/components/registration/common/RegistrationLayout';
import { RegistrationProvider, useRegistration } from '@/store/RegistrationContext';
import { RegisterWizard } from '@/pages/registration/RegisterPage';
import { fetchRegistrationByEditCode } from '@/services/registration/registrationApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Search, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function EditRegistrationFlow() {
  const { editSession, setEditSession, setFormData, setCurrentStep } = useRegistration();
  
  const location = useLocation();
  const [editCode, setEditCode] = useState(location.state?.editCode || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!editCode) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchRegistrationByEditCode(editCode);
      const { raw, formData } = response;
      
      const isReadOnly = raw.status === 'APPROVED' || raw.status === 'REJECTED' || raw.isLocked;
      
      setFormData(formData);
      setEditSession({
        isEditMode: true,
        registrationId: raw.registrationId,
        editCode: editCode,
        status: raw.status,
        isLocked: raw.isLocked,
        isReadOnly: isReadOnly
      });
      setCurrentStep(1);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch registration. Check your code.');
    } finally {
      setIsLoading(false);
    }
  };

  if (editSession.isEditMode) {
    return <RegisterWizard />;
  }

  return (
    <RegistrationLayout title="Edit Registration" subtitle="Enter your secret Edit Code to update your team's details.">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 mt-10 mb-8">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-center text-slate-800 mb-6">Access Your Application</h3>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-start gap-2 mb-6 text-sm font-medium">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleFetch} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Edit Code <span className="text-destructive">*</span></label>
            <Input 
              placeholder="Enter your 16-character code"
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
              required
              className="h-11 font-mono text-center tracking-widest text-lg"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-11">
            {isLoading ? 'Verifying...' : (
              <>
                <Search className="w-4 h-4 mr-2" /> Retrieve Registration
              </>
            )}
          </Button>
        </form>
        
        <p className="text-center text-xs text-muted-foreground mt-6">
          If your registration is already approved or locked by admins, you will only be able to view your details in read-only mode.
        </p>
      </div>
    </RegistrationLayout>
  );
}

export default function EditRegistrationPage() {
  return (
    <>
      <SEO title="Edit Registration | Internal SIH 2026" />
      <RegistrationProvider>
        <EditRegistrationFlow />
      </RegistrationProvider>
    </>
  );
}
