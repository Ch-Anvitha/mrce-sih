import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationControls({ 
  page, 
  totalPages, 
  total, 
  limit, 
  onPageChange, 
  onLimitChange 
}) {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total || 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white border-t border-slate-200 rounded-b-xl">
      <div className="text-sm text-slate-500">
        Showing <span className="font-bold text-slate-900">{total > 0 ? startItem : 0}</span> to <span className="font-bold text-slate-900">{endItem}</span> of <span className="font-bold text-slate-900">{total || 0}</span> results
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <label htmlFor="perPage">Per page:</label>
          <select 
            id="perPage" 
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="border border-slate-200 rounded-md p-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="w-9 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          
          <div className="text-sm font-medium text-slate-700 min-w-[5rem] text-center">
            Page {page} of {totalPages || 1}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPageChange(page + 1)}
            disabled={page >= (totalPages || 1)}
            className="w-9 p-0"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
