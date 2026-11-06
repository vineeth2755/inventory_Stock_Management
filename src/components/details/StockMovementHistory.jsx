import React from 'react';
import { ArrowUpRight, ArrowDownLeft, FileText, User } from 'lucide-react';

export default function StockMovementHistory({ movements, unit = 'Units' }) {
  if (!movements || movements.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center text-slate-500 text-xs">
        No stock transaction history recorded yet for this item.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Stock Activity & Movement Log</h3>
          <p className="text-xs text-slate-500 mt-0.5">Audit trail of receipts, dispatches, and inventory adjustments</p>
        </div>
        <span className="text-xs font-mono text-slate-400">{movements.length} logged events</span>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {movements.map((mov) => {
          const isReceipt = mov.type === 'Receipt' || mov.quantity > 0;
          return (
            <div key={mov.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/60 px-2 rounded-lg transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isReceipt ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {isReceipt ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">{mov.type}</span>
                    <span className="text-xs text-slate-400 font-mono">({mov.id})</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{mov.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{mov.notes}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
                <div className="text-right">
                  <span className={`text-sm font-bold ${
                    isReceipt ? 'text-emerald-600' : 'text-slate-900'
                  }`}>
                    {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity} {unit}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{mov.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
