import React from 'react';
import { 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  BellRing,
  TrendingDown,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function StatCardsGrid() {
  const { metrics, navigateTo } = useInventory();
  const total = metrics.totalItems || 1;

  const inStockPct = Math.round((metrics.inStock / total) * 100);
  const lowStockPct = Math.round((metrics.lowStock / total) * 100);
  const outStockPct = Math.round((metrics.outOfStock / total) * 100);

  return (
    <div className="space-y-3">
      {/* 1. Mobile Primary KPI Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Items (Full width on very small phones, or col-span-2 on mobile for emphasis) */}
        <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center justify-between sm:block">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Total Items
            </span>
            <div className="flex items-baseline gap-2 mt-1 sm:mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {metrics.totalItems}
              </span>
              <span className="text-[11px] font-medium text-slate-400">SKUs</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">Across all 3 warehouses</p>
          </div>
          <div className="p-2.5 sm:p-2 rounded-xl bg-indigo-50 text-[#5145E5] shrink-0">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* In Stock Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              In Stock
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-xl sm:text-3xl font-extrabold text-slate-900">
              {metrics.inStock}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-emerald-700 font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>{inStockPct}% health</span>
            </div>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between border-l-4 border-l-amber-400">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              Low Stock
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-xl sm:text-3xl font-extrabold text-slate-900">
              {metrics.lowStock}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-amber-700 font-semibold">
              <Activity className="w-3 h-3" />
              <span>{lowStockPct}% of catalog</span>
            </div>
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs flex flex-col justify-between border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              Out of Stock
            </span>
            <div className="p-1.5 sm:p-2 rounded-lg bg-rose-50 text-rose-600">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="text-xl sm:text-3xl font-extrabold text-rose-600">
              {metrics.outOfStock}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-rose-700 font-semibold">
              <TrendingDown className="w-3 h-3" />
              <span>{outStockPct}% depleted</span>
            </div>
          </div>
        </div>

        {/* Needs Attention Card */}
        <div 
          onClick={() => navigateTo('list')}
          className="col-span-2 sm:col-span-1 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border border-rose-200/80 p-3.5 sm:p-5 shadow-xs flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-800">
                Action Required
              </span>
            </div>
            <div className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {metrics.requiringAttentionCount} <span className="text-xs font-medium text-slate-600">items</span>
            </div>
            <p className="text-[10px] text-slate-600 mt-0.5 sm:block">Tap to review urgent list</p>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-white shadow-xs text-rose-600">
            <BellRing className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
