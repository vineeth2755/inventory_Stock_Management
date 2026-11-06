import React from 'react';
import { PieChart, Layers } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function CategoryChart() {
  const { metrics } = useInventory();
  const { categoryCounts, totalItems } = metrics;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Inventory by Category</h2>
          <p className="text-xs text-slate-500 mt-0.5">Distribution and stock health breakdown</p>
        </div>
        <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
          <PieChart className="w-4 h-4" />
        </div>
      </div>

      {/* Progress Bars for Categories */}
      <div className="mt-5 space-y-4">
        {categoryCounts.map((cat) => {
          const percentage = Math.round((cat.total / (totalItems || 1)) * 100);
          return (
            <div key={cat.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{cat.category}</span>
                <span className="text-slate-500">
                  <strong className="text-slate-900">{cat.total} items</strong> ({percentage}%)
                </span>
              </div>

              {/* Multi-segment health bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                {/* In stock segment */}
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(cat.inStock / (cat.total || 1)) * 100}%` }}
                  title={`${cat.inStock} In Stock`}
                />
                {/* Low stock segment */}
                <div
                  className="bg-amber-400 h-full"
                  style={{ width: `${(cat.lowStock / (cat.total || 1)) * 100}%` }}
                  title={`${cat.lowStock} Low Stock`}
                />
                {/* Out of stock segment */}
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${(cat.outOfStock / (cat.total || 1)) * 100}%` }}
                  title={`${cat.outOfStock} Out of Stock`}
                />
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {cat.inStock} Healthy
                </span>
                {cat.lowStock > 0 && (
                  <span className="flex items-center gap-1 text-amber-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {cat.lowStock} Low
                  </span>
                )}
                {cat.outOfStock > 0 && (
                  <span className="flex items-center gap-1 text-rose-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {cat.outOfStock} Out
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-700">Health Key:</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> In Stock
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Low Stock
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Out of Stock
          </span>
        </div>
      </div>
    </div>
  );
}
