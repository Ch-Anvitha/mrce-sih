import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full" role="status" aria-label="Loading">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <span className="text-sm font-medium text-slate-500 animate-pulse">Loading content...</span>
    </div>
  );
}
