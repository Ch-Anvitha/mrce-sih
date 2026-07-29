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
        className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1.5"
        role="alert"
        aria-live="polite"
      >
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {error.message}
      </motion.p>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-amber-400 tracking-tight">Payment Details</h2>
          <p className="text-slate-400 text-sm mt-1">Please pay the registration fee via UPI and upload the receipt.</p>
        </div>

        {/* Payment instructions and QR container */}
        <div className="bg-[#030712] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-200">Registration Fee: <span className="text-amber-400 font-extrabold">₹500</span></h3>
            <p className="text-xs text-slate-400">Scan the QR code or pay to the UPI ID provided below.</p>
            <div className="font-mono text-xs font-semibold bg-[#0B1120] text-amber-300 px-3.5 py-2 rounded-lg border border-slate-700 w-fit tracking-wide shadow-inner">
              sih.mrce@upi
            </div>
          </div>
          <div className="w-32 h-32 bg-[#0B1120] rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 text-xs font-medium shadow-inner shrink-0">
            QR Code
          </div>
        </div>

        {/* Transaction ID */}
        <div className="space-y-2 pt-2">
          <label htmlFor="transactionId" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Transaction ID <span className="text-amber-500">*</span>
          </label>
          <Input 
            id="transactionId" 
            placeholder="e.g. 123456789012"
            aria-invalid={!!errors.transactionId}
            className={`h-11 md:w-1/2 bg-[#030712] text-white placeholder-slate-500 transition-all ${errors.transactionId ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-700 focus-visible:border-amber-500 focus-visible:ring-amber-500'}`}
            {...register('transactionId')}
          />
          <ErrorMessage error={errors.transactionId} />
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 w-full my-6" />

        {/* Payment Screenshot Upload Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Payment Screenshot <span className="text-amber-500">*</span>
          </label>
          
          {!previewUrl && selectedFile?.isExisting !== true ? (
            <div 
              tabIndex={0}
              role="button"
              aria-label="Upload Payment Screenshot"
              className={`relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-xl transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500
                ${dragActive ? 'border-amber-500 bg-amber-950/10' : 'border-slate-700 hover:border-slate-600 bg-[#030712]'}
                ${errors.paymentScreenshot ? 'border-red-500 bg-red-950/10' : ''}
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
              <UploadCloud className={`w-10 h-10 mb-3 ${errors.paymentScreenshot ? 'text-red-400' : 'text-slate-400'}`} />
              <p className="mb-1 text-xs text-slate-300 font-medium">
                <span className="font-semibold text-amber-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-[11px] text-slate-500">PNG, JPG or JPEG (Max 5MB)</p>
            </div>
          ) : (
            <div className="relative flex flex-col sm:flex-row gap-5 p-4 border border-slate-700 rounded-xl bg-[#030712] shadow-inner">
              <div className="w-full sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden border border-slate-700 bg-black/40 relative flex items-center justify-center group">
                {previewUrl ? (
                  <img src={previewUrl} alt="Payment Receipt" className="object-contain w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="w-8 h-8 mb-1.5 text-slate-500" />
                    <span className="text-xs font-medium">Receipt on File</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button type="button" variant="destructive" size="sm" onClick={removeFile} className="bg-red-600 hover:bg-red-700 text-xs h-8">
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Replace
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-sm text-slate-200 break-all">{selectedFile?.name || 'Existing Receipt'}</span>
                </div>
                {selectedFile?.size > 0 && (
                  <p className="text-xs text-slate-400 mb-3">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.split('/')[1]?.toUpperCase()}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg w-fit mt-auto shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready to submit
                </div>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 h-8 w-8 rounded-lg"
                onClick={removeFile}
              >
                <X className="w-4 h-4" />
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

function Trash2(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
}

function CheckCircle2(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
}