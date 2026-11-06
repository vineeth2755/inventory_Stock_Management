import React from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  Edit3, 
  MapPin,
  ChevronRight
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useInventory } from '../../context/InventoryContext';

export default function UrgentItemsWidget() {
  const { metrics, navigateTo } = useInventory();
  const urgentItems = metrics.requiringAttentionItems;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Widget Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Attention Required
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {urgentItems.length} items at or below safety reorder threshold
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('list')}
            className="text-xs font-bold text-[#5145E5] hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-indigo-50 active:scale-95"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Urgent Items */}
        <div className="mt-3 divide-y divide-slate-100/90">
          {urgentItems.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-semibold text-slate-700">All inventory levels are healthy</p>
              <p className="text-xs text-slate-400 mt-1">No items currently below reorder levels</p>
            </div>
          ) : (
            urgentItems.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo('details', item.id)}
                className="py-3 flex items-center justify-between hover:bg-slate-50/80 active:bg-slate-100/70 px-2 rounded-xl transition-all cursor-pointer"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                      {item.id}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      {item.location.split('-')[1]?.trim() || item.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-1">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Available: <strong className={item.availableQty === 0 ? "text-rose-600 font-extrabold" : "text-amber-600 font-extrabold"}>
                      {item.availableQty} {item.unit}
                    </strong> (Reorder at: {item.reorderLevel})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={item.status} size="sm" />
                  <ChevronRight className="w-4 h-4 text-slate-300 sm:hidden" />
                  <div className="hidden sm:flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => navigateTo('details', item.id)}
                      className="p-1.5 text-slate-400 hover:text-[#5145E5] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      title="Inspect Item"
                      aria-label="Inspect Item"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('form', item.id, 'edit')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Item"
                      aria-label="Edit Item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {urgentItems.length > 5 && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-center">
          <button
            onClick={() => navigateTo('list')}
            className="text-xs font-semibold text-slate-600 hover:text-[#5145E5] active:scale-95 transition-all"
          >
            + {urgentItems.length - 5} more items requiring restock ➔
          </button>
        </div>
      )}
    </div>
  );
}
