import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-white text-xs sm:text-sm text-slate-600">
      {/* Items Range Display */}
      <div>
        Showing <span className="font-semibold text-slate-900">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
        <span className="font-semibold text-slate-900">{Math.min(endIndex, totalItems)}</span> of{' '}
        <span className="font-semibold text-slate-900">{totalItems}</span> records
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            currentPage === 1
              ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed'
              : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <span className="px-3 py-1 text-xs font-semibold text-slate-700">
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            currentPage >= totalPages
              ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed'
              : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
