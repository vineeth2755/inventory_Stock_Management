import React, { useState } from 'react';
import { X, Plus, Minus, AlertCircle } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function AdjustStockModal({ isOpen, onClose, item }) {
  const { adjustStock } = useInventory();
  const [adjustmentType, setAdjustmentType] = useState('add'); // 'add' | 'remove'
  const [quantity, setQuantity] = useState(5);
  const [reason, setReason] = useState('Standard restock intake');

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyValue = parseInt(quantity, 10) || 0;
    if (qtyValue <= 0) return;

    const finalAdjustment = adjustmentType === 'add' ? qtyValue : -qtyValue;
    adjustStock(item.id, finalAdjustment, reason);
    onClose();
  };

  const resultingQty = adjustmentType === 'add' 
    ? item.availableQty + (parseInt(quantity, 10) || 0)
    : Math.max(0, item.availableQty - (parseInt(quantity, 10) || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Adjust Stock Quantity</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{item.id} • {item.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Action Type Toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Action Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setAdjustmentType('add'); setReason('Standard restock intake'); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  adjustmentType === 'add'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Receive / Add (+ Stock)</span>
              </button>

              <button
                type="button"
                onClick={() => { setAdjustmentType('remove'); setReason('Dispatched for assembly run'); }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  adjustmentType === 'remove'
                    ? 'border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-500'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Minus className="w-4 h-4 text-amber-600" />
                <span>Dispatch / Remove (- Stock)</span>
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Quantity to {adjustmentType === 'add' ? 'Add' : 'Deduct'} ({item.unit})
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5]"
              required
            />
          </div>

          {/* Reason / Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Audit Reason / Transaction Note
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. PO Receipt, Damaged goods, Factory floor request"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5]"
              required
            />
          </div>

          {/* Live Preview Banner */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between text-slate-600">
            <span>Current: <strong>{item.availableQty} {item.unit}</strong></span>
            <span>➔</span>
            <span>New Balance: <strong className={resultingQty === 0 ? "text-rose-600 font-bold" : "text-[#5145E5] font-bold"}>{resultingQty} {item.unit}</strong></span>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-[#5145E5] text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
            >
              Confirm Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
