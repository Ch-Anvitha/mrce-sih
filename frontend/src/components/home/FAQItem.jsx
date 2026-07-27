import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border border-border rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-foreground text-base sm:text-lg pr-4">
          {question}
        </span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-primary flex-shrink-0 transition-transform duration-250 ease-in-out",
            isOpen ? "rotate-180" : "rotate-0"
          )} 
        />
      </button>
      <div 
        className="transition-all duration-250 ease-in-out overflow-hidden"
        style={{ height: `${height}px` }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="p-5 sm:p-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
