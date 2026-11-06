import React from 'react';
import { 
  Eye, 
  Edit3, 
  MapPin, 
  Package, 
  Layers, 
  ChevronRight, 
  Building2,
  Calendar
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useInventory } from '../../context/InventoryContext';

export default function InventoryMobileCards({ items }) {
  const { navigateTo } = useInventory();

  return (
    <div className="p-3 space-y-3 bg-slate-50/50">
      {items.map((item) => {
        const isLow = item.status === 'Low Stock';
        const isOut = item.status === 'Out of Stock';

        // Ratio for visual progress bar
        const ratio = Math.min(100, Math.round((item.availableQty / (item.reorderLevel * 1.5 || 1)) * 100));

        return (
          <div
            key={item.id}
            onClick={() => navigateTo('details', item.id)}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 active:scale-[0.99] transition-all duration-150 cursor-pointer overflow-hidden relative group"
          >
            {/* Top Accent Stripe based on stock status */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1 ${
                isOut ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />

            {/* Header: SKU, Category & Status Badge */}
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/70">
                  {item.id}
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>
              <StatusBadge status={item.status} size="sm" />
            </div>

            {/* Item Title & Location */}
            <div className="mt-2.5">
              <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                {item.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#5145E5] shrink-0" />
                <span className="truncate font-medium">{item.location}</span>
              </div>
            </div>

            {/* Stock Quantities & Progress Metric Card */}
            <div className="mt-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Available Stock
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className={`text-xl font-extrabold ${
                      isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-900'
                    }`}>
                      {item.availableQty}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{item.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Safety Threshold
                  </span>
                  <span className="text-xs font-semibold text-slate-700 mt-0.5 block">
                    Reorder at {item.reorderLevel} {item.unit}
                  </span>
                </div>
              </div>

              {/* Visual Health Gauge Bar */}
              <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOut ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${ratio}%` }}
                />
              </div>
            </div>

            {/* Footer: Metadata & Quick Touch Actions */}
            <div 
              className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[11px] text-slate-400 font-mono">
                {item.lastUpdated}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('details', item.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#5145E5] bg-indigo-50/80 active:bg-indigo-100 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                  <ChevronRight className="w-3 h-3 ml-0.5 text-indigo-400" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('form', item.id, 'edit')}
                  className="inline-flex items-center gap-1 p-1.5 text-slate-600 bg-slate-100 active:bg-slate-200 rounded-lg transition-colors"
                  title="Edit item"
                  aria-label="Edit item"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
