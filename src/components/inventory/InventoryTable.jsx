import React from 'react';
import { ArrowUpDown, Eye, Edit3 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useInventory } from '../../context/InventoryContext';

export default function InventoryTable({ items, sortConfig, onSort }) {
  const { navigateTo } = useInventory();

  const getSortIcon = (key) => {
    return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 inline ml-1" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <th className="py-3 px-4">Item ID</th>
            <th 
              className="py-3 px-4 cursor-pointer hover:bg-slate-100 group select-none"
              onClick={() => onSort('name')}
            >
              <span className="flex items-center">
                Item Name {getSortIcon('name')}
              </span>
            </th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Location</th>
            <th 
              className="py-3 px-4 cursor-pointer hover:bg-slate-100 group select-none"
              onClick={() => onSort('availableQty')}
            >
              <span className="flex items-center">
                Available Qty {getSortIcon('availableQty')}
              </span>
            </th>
            <th className="py-3 px-4">Reorder Level</th>
            <th 
              className="py-3 px-4 cursor-pointer hover:bg-slate-100 group select-none"
              onClick={() => onSort('lastUpdated')}
            >
              <span className="flex items-center">
                Last Updated {getSortIcon('lastUpdated')}
              </span>
            </th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
          {items.map((item) => (
            <tr 
              key={item.id} 
              className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
              onClick={() => navigateTo('details', item.id)}
            >
              {/* 1. Item ID */}
              <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                {item.id}
              </td>

              {/* 2. Item Name */}
              <td className="py-3.5 px-4 font-semibold text-slate-900">
                {item.name}
              </td>

              {/* 3. Category */}
              <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                {item.category}
              </td>

              {/* 4. Location */}
              <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                {item.location}
              </td>

              {/* 5. Available Quantity */}
              <td className="py-3.5 px-4 whitespace-nowrap font-medium">
                <span className={item.availableQty === 0 ? "text-rose-600 font-bold" : item.availableQty <= item.reorderLevel ? "text-amber-600 font-bold" : "text-slate-900"}>
                  {item.availableQty}
                </span>{' '}
                <span className="text-slate-400 text-xs">{item.unit}</span>
              </td>

              {/* 6. Reorder Level */}
              <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                {item.reorderLevel} {item.unit}
              </td>

              {/* 7. Last Updated */}
              <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono text-xs">
                {item.lastUpdated}
              </td>

              {/* 8. Status Badge */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                <StatusBadge status={item.status} size="sm" />
              </td>

              {/* Row-Level Actions */}
              <td 
                className="py-3.5 px-4 text-right whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => navigateTo('details', item.id)}
                    className="p-1.5 text-slate-400 hover:text-[#5145E5] hover:bg-indigo-50 rounded-md transition-colors"
                    title="View Details"
                    aria-label="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateTo('form', item.id, 'edit')}
                    className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                    title="Edit Item"
                    aria-label="Edit Item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

