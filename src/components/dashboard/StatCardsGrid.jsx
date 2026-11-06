import React from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  BellRing
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function StatCardsGrid() {
  const { metrics, navigateTo } = useInventory();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
      {/* 1. Total Items */}
      <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center justify-between sm:block">
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Total Items
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1 sm:mt-2">
            {metrics.totalItems}
          </div>
        </div>
        <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50 text-[#5145E5] shrink-0">
          <Package className="w-5 h-5" />
        </div>
      </div>

      {/* 2. In Stock */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            In Stock
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics.inStock}
          </div>
        </div>
      </div>

      {/* 3. Low Stock */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            Low Stock
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50 text-amber-600">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics.lowStock}
          </div>
        </div>
      </div>

      {/* 4. Out of Stock */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            Out of Stock
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-rose-50 text-rose-600">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics.outOfStock}
          </div>
        </div>
      </div>

      {/* 5. Items Requiring Attention */}
      <div 
        onClick={() => navigateTo('list')}
        className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center justify-between cursor-pointer active:scale-[0.99] hover:border-slate-300 transition-all"
      >
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Items Requiring Attention
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">
            {metrics.requiringAttentionCount}
          </div>
        </div>
        <div className="p-2 sm:p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0">
          <BellRing className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
