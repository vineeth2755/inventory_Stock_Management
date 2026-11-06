import React from 'react';
import { AlertCircle, ArrowRight, Eye, Edit3 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useInventory } from '../../context/InventoryContext';

export default function UrgentItemsWidget() {
  const { metrics, navigateTo } = useInventory();
  const urgentItems = metrics.requiringAttentionItems;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Items Requiring Attention</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {urgentItems.length} items at or below safety reorder threshold
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('list')}
            className="text-xs font-semibold text-[#5145E5] hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Urgent Items */}
        <div className="mt-4 divide-y divide-slate-100">
          {urgentItems.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-700">All inventory levels are healthy</p>
              <p className="text-xs text-slate-400 mt-1">No items currently below reorder levels</p>
            </div>
          ) : (
            urgentItems.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-500">{item.id}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 truncate">{item.location}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 truncate mt-0.5">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Available: <strong className={item.availableQty === 0 ? "text-rose-600" : "text-amber-600"}>{item.availableQty} {item.unit}</strong> (Reorder at: {item.reorderLevel})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} size="sm" />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigateTo('details', item.id)}
                      className="p-1.5 text-slate-400 hover:text-[#5145E5] hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
                      title="Inspect Item"
                      aria-label="Inspect Item"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('form', item.id, 'edit')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
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
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <button
            onClick={() => navigateTo('list')}
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            + {urgentItems.length - 5} more items require restocking
          </button>
        </div>
      )}
    </div>
  );
}
