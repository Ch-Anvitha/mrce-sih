import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

export default function NavigationButtons({
  onNext,
  onPrevious,
  onSave,
  isFirstStep,
  isLastStep,
  isLoading,
  isReadOnly
}) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-800 w-full mt-6">
      {/* Back Button */}
      {!isFirstStep ? (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="bg-[#0B1120] border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-amber-500/40 rounded-xl px-6 py-3 font-semibold transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      ) : (
        <div /> /* Empty spacer to keep layout balanced */
      )}

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {!isReadOnly && (
          <Button
            type="button"
            variant="outline"
            onClick={onSave}
            className="bg-[#0B1120] border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-amber-500/40 rounded-xl px-5 py-3 font-semibold transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Save Progress</span>
          </Button>
        )}

        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl px-7 py-3 transition-transform hover:scale-105 duration-200 shadow-lg shadow-amber-500/20 flex items-center gap-2"
        >
          {isLoading ? (
            <span>Processing...</span>
          ) : (
            <>
              {isLastStep ? 'Submit Registration' : 'Continue'}
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}