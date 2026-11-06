import React from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  BellRing,
  ArrowRight
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function StatCardsGrid() {
  const { metrics, navigateTo } = useInventory();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
      {/* 1. Total Items (Indigo Brand Accent) */}
      <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border border-indigo-100 p-4 sm:p-5 shadow-xs flex items-center justify-between sm:block relative overflow-hidden group hover:shadow-md transition-all">
        <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Total Items
          </span>
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1 sm:mt-2">
            {metrics.totalItems}
          </div>
        </div>
        <div className="p-2.5 sm:p-2.5 rounded-xl bg-indigo-50 text-[#5145E5] border border-indigo-100 shadow-2xs shrink-0 sm:mt-3 sm:inline-flex">
          <Package className="w-5 h-5" />
        </div>
      </div>

      {/* 2. In Stock (Emerald Green Tint) */}
      <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl border border-emerald-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-all">
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
            In Stock
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-100/70 text-emerald-700 border border-emerald-200/70">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {metrics.inStock}
          </div>
        </div>
      </div>

      {/* 3. Low Stock (Amber Orange Tint) */}
      <div className="bg-gradient-to-br from-white to-amber-50/60 rounded-2xl border border-amber-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-all">
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800">
            Low Stock
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100/70 text-amber-700 border border-amber-200/70">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-black text-amber-700">
            {metrics.lowStock}
          </div>
        </div>
      </div>

      {/* 4. Out of Stock (Rose Red Tint) */}
      <div className="bg-gradient-to-br from-white to-rose-50/60 rounded-2xl border border-rose-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between relative overflow-hidden hover:shadow-md transition-all">
        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-800">
            Out of Stock
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-rose-100/70 text-rose-700 border border-rose-200/70">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-black text-rose-700">
            {metrics.outOfStock}
          </div>
        </div>
      </div>

      {/* 5. Items Requiring Attention (Interactive with Underlined Link) */}
      <div 
        onClick={() => navigateTo('list')}
        className="col-span-2 sm:col-span-1 bg-gradient-to-br from-white to-rose-50/80 rounded-2xl border-2 border-rose-300/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between cursor-pointer active:scale-[0.99] hover:shadow-md hover:border-rose-400 transition-all relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-rose-900 block">
            Items Requiring Attention
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200">
            <BellRing className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
        </div>

        <div className="mt-2 sm:mt-3">
          <div className="text-2xl sm:text-3xl font-black text-rose-700">
            {metrics.requiringAttentionCount}
          </div>
          {/* Requested Underlined "tap to view" action */}
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-rose-700 underline underline-offset-2 decoration-rose-400 group-hover:text-rose-900 group-hover:decoration-rose-600 transition-colors">
            <span>Tap to view urgent items</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
