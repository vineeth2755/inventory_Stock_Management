import React from 'react';
import { Eye, Edit3, MapPin } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useInventory } from '../../context/InventoryContext';

export default function InventoryMobileCards({ items }) {
  const { navigateTo } = useInventory();

  return (
    <div className="divide-y divide-slate-100">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 space-y-3 hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => navigateTo('details', item.id)}
        >
          {/* Header: ID, Category & Status Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-slate-500">{item.id}</span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500">{item.category}</span>
            </div>
            <StatusBadge status={item.status} size="sm" />
          </div>

          {/* Item Name */}
          <h3 className="text-sm font-semibold text-slate-900 leading-tight">
            {item.name}
          </h3>

          {/* Quantities & Location */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Available</span>
              <span className={`text-sm font-bold ${
                item.availableQty === 0 ? "text-rose-600" : item.availableQty <= item.reorderLevel ? "text-amber-600" : "text-slate-900"
              }`}>
                {item.availableQty} {item.unit}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-medium">Reorder Level</span>
              <span className="text-sm font-medium text-slate-700">
                {item.reorderLevel} {item.unit}
              </span>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div 
            className="flex items-center justify-between pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] text-slate-400 font-mono">
              Updated: {item.lastUpdated}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('details', item.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#5145E5] bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
              <button
                onClick={() => navigateTo('form', item.id, 'edit')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
