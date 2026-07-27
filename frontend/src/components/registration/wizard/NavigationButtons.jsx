import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save, Loader2 } from 'lucide-react';

export default function NavigationButtons({ onNext, onPrevious, onSave, isFirstStep, isLastStep, isLoading, isReadOnly }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={isFirstStep || isLoading}
        aria-disabled={isFirstStep || isLoading}
        className="h-11 w-full sm:w-[120px]"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {!isReadOnly && (
          <Button 
            variant="secondary"
            onClick={onSave}
            disabled={isLoading}
            aria-disabled={isLoading}
            className="h-11 w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Progress
          </Button>
        )}

        {!(isReadOnly && isLastStep) && (
          <Button 
            onClick={onNext} 
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-busy={isLoading}
            className="h-11 w-full sm:w-[140px] bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isLastStep ? 'Submit Update' : 'Continue'}
                {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
