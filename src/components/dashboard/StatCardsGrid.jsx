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

  // Consistent card geometry:
  // - Rounded: rounded-2xl (16px)
  // - Padding: p-4 sm:p-5
  // - Height: min-h-[136px] flex flex-col justify-between
  // - Icon box: w-9 h-9 (36px) rounded-xl flex items-center justify-center shrink-0
  // - Typography: number 32px (text-3xl) font-black tracking-tight

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-3.5 sm:gap-4">
      {/* 1. Total Items (Neutral background + Indigo icon) */}
      <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[136px] hover:shadow-md transition-all">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 leading-tight">
            Total Items
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#5145E5] border border-indigo-100/80 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-none">
            {metrics.totalItems}
          </div>
        </div>
      </div>

      {/* 2. In Stock (Subtle green background + Green icon) */}
      <div className="bg-emerald-50/40 rounded-2xl border border-emerald-200/70 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[136px] hover:shadow-md transition-all">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 leading-tight">
            In Stock
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-700 border border-emerald-200/70 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-700 leading-none">
            {metrics.inStock}
          </div>
        </div>
      </div>

      {/* 3. Low Stock (Subtle amber background + Amber icon) */}
      <div className="bg-amber-50/40 rounded-2xl border border-amber-200/70 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[136px] hover:shadow-md transition-all">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 leading-tight">
            Low Stock
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 border border-amber-200/70 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-700 leading-none">
            {metrics.lowStock}
          </div>
        </div>
      </div>

      {/* 4. Out of Stock (Pale washed-out red #FEE2E2 background + Red icon) */}
      <div className="bg-[#FEE2E2] rounded-2xl border border-red-300 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[136px] hover:shadow-md transition-all">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-red-800 leading-tight">
            Out of Stock
          </span>
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-red-700 leading-none">
            {metrics.outOfStock}
          </div>
        </div>
      </div>

      {/* 5. Items Requiring Attention (Light rose background with tasteful red accent) */}
      <div 
        onClick={() => navigateTo('list')}
        className="col-span-2 sm:col-span-1 bg-rose-50/60 rounded-2xl border border-rose-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[136px] cursor-pointer active:scale-[0.99] hover:shadow-md hover:border-rose-300 transition-all group"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-900 leading-tight">
            Items Requiring Attention
          </span>
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0">
            <BellRing className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-2">
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-rose-700 leading-none">
            {metrics.requiringAttentionCount}
          </div>
          {/* Subtle underlined navigation prompt */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-rose-700 underline underline-offset-2 decoration-rose-300 group-hover:decoration-rose-600 transition-colors">
            <span>View urgent</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
