import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '@/validation/registration/paymentSchema';
import { useRegistration } from '@/store/RegistrationContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentStep({ onNext }) {
  const { formData, setFormData } = useRegistration();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: formData.payment || {
      transactionId: '',
      paymentScreenshot: null
    }
  });

  const selectedFile = watch('paymentScreenshot');

  // Handle preview generation
  useEffect(() => {
    if (selectedFile && selectedFile instanceof File) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const onSubmit = (data) => {
    setFormData(prev => ({ ...prev, payment: data }));
    onNext();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue('paymentScreenshot', e.dataTransfer.files[0], { shouldValidate: true });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setValue('paymentScreenshot', e.target.files[0], { shouldValidate: true });
    }
  };

  const removeFile = () => {
    setValue('paymentScreenshot', null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <motion.p 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-destructive text-sm mt-1.5 font-medium flex items-center gap-1.5"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="w-4 h-4 shrink-0" />
        {error.message}
      </motion.p>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary">Payment Details</h2>
          <p className="text-muted-foreground text-sm">Please pay the registration fee via UPI and upload the receipt.</p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Registration Fee: <span className="text-primary">₹500</span></h3>
            <p className="text-sm text-slate-600">Scan the QR code or pay to the UPI ID provided below.</p>
            <p className="font-mono text-sm font-semibold bg-white px-3 py-1.5 rounded border border-slate-200 w-fit mt-2">sih.mrce@upi</p>
          </div>
          <div className="w-32 h-32 bg-white rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center text-primary/50 text-sm font-medium">
            QR Code
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <label htmlFor="transactionId" className="text-sm font-semibold text-slate-700">Transaction ID <span className="text-destructive">*</span></label>
          <Input 
            id="transactionId" 
            placeholder="e.g. 123456789012"
            aria-invalid={!!errors.transactionId}
            className={`h-11 md:w-1/2 ${errors.transactionId ? 'border-destructive focus-visible:ring-destructive/20' : ''}`}
            {...register('transactionId')}
          />
          <ErrorMessage error={errors.transactionId} />
        </div>

        <div className="space-y-2 pt-4 border-t border-border mt-6">
          <label className="text-sm font-semibold text-slate-700">Payment Screenshot <span className="text-destructive">*</span></label>
          
          {!previewUrl && selectedFile?.isExisting !== true ? (
            <div 
              tabIndex={0}
              role="button"
              aria-label="Upload Payment Screenshot"
              className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${dragActive ? 'border-primary bg-primary/5' : 'border-slate-300 hover:bg-slate-50'}
                ${errors.paymentScreenshot ? 'border-destructive bg-destructive/5' : ''}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className={`w-12 h-12 mb-4 ${errors.paymentScreenshot ? 'text-destructive' : 'text-slate-400'}`} />
              <p className="mb-2 text-sm text-slate-600 font-medium">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (Max 5MB)</p>
            </div>
          ) : (
            <div className="relative flex flex-col sm:flex-row gap-6 p-4 border border-slate-200 rounded-xl bg-slate-50">
              <div className="w-full sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-black/5 relative flex items-center justify-center group">
                {previewUrl ? (
                  <img src={previewUrl} alt="Payment Receipt" className="object-contain w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <span className="text-sm font-medium">Receipt on File</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button type="button" variant="destructive" size="sm" onClick={removeFile}>
                    <Trash2 className="w-4 h-4 mr-2" /> Replace
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-slate-800 break-all">{selectedFile?.name || 'Existing Receipt'}</span>
                </div>
                {selectedFile?.size > 0 && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.split('/')[1]?.toUpperCase()}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md w-fit mt-auto">
                  <CheckCircle2 className="w-4 h-4" /> Ready to submit
                </div>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-slate-400 hover:text-destructive"
                onClick={removeFile}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}
          <ErrorMessage error={errors.paymentScreenshot} />
        </div>
      </div>

      <button type="submit" id="payment-step-submit" className="hidden">Submit</button>
    </form>
  );
}

// Quick icons not imported from lucide above
function Trash2(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
}

function CheckCircle2(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
}
