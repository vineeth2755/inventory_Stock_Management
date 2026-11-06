import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  SlidersHorizontal, 
  MapPin, 
  Building2, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Package,
  Calendar,
  Truck
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import AdjustStockModal from './AdjustStockModal';
import StockMovementHistory from './StockMovementHistory';
import { useInventory } from '../../context/InventoryContext';

export default function ItemDetailsScreen() {
  const { selectedItem, navigateTo } = useInventory();
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  if (!selectedItem) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-sm">No item selected. Please choose an item from the inventory catalog.</p>
        <button
          onClick={() => navigateTo('list')}
          className="mt-4 px-4 py-2 bg-[#5145E5] text-white rounded-lg text-xs font-semibold"
        >
          Back to Inventory List
        </button>
      </div>
    );
  }

  const isLowStock = selectedItem.status === 'Low Stock';
  const isOutOfStock = selectedItem.status === 'Out of Stock';

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumbs & Top Navigation Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigateTo('list')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#5145E5] transition-colors w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inventory Catalog</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAdjustModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Adjust Stock</span>
          </button>

          <button
            onClick={() => navigateTo('form', selectedItem.id, 'edit')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#5145E5] rounded-lg hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Item</span>
          </button>
        </div>
      </div>

      {/* 2. Stock Health Alert Banner (if Low or Out of Stock) */}
      {isOutOfStock && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-rose-800">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Stock Depleted Alert:</span> Current available balance is 0 {selectedItem.unit}. Immediate procurement or transfer required.
          </div>
        </div>
      )}

      {isLowStock && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Low Stock Warning:</span> Available quantity ({selectedItem.availableQty} {selectedItem.unit}) has fallen below the safety reorder threshold ({selectedItem.reorderLevel} {selectedItem.unit}).
          </div>
        </div>
      )}

      {/* 3. Main Item Identity & Metric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Identity, Description & Storage Location (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
                  {selectedItem.id}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-600">{selectedItem.category}</span>
              </div>
              <StatusBadge status={selectedItem.status} />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {selectedItem.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Spec Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Primary Supplier: <strong className="text-slate-800">{selectedItem.supplier || 'N/A'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Last Updated: <strong className="text-slate-800 font-mono">{selectedItem.lastUpdated}</strong></span>
              </div>
            </div>
          </div>

          {/* Location & Warehouse Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5145E5]" />
              <span>Storage & Location Architecture</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase block">Warehouse Facility</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{selectedItem.warehouse}</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase block">Zone / Aisle / Bay</span>
                <p className="text-sm font-bold text-slate-900 mt-1">{selectedItem.zone}</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 uppercase block">Full Location Key</span>
                <p className="text-sm font-bold text-slate-900 mt-1 font-mono">{selectedItem.location}</p>
              </div>
            </div>
          </div>

          {/* Stock Activity History Section */}
          <StockMovementHistory movements={selectedItem.movements} unit={selectedItem.unit} />
        </div>

        {/* Right Column: Key Stock Quantities & Visual Gauge */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5145E5]" />
              <span>Stock Quantities</span>
            </h3>

            {/* Available Qty Focus Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                Available to Promise
              </span>
              <div className="text-4xl font-extrabold text-slate-900 mt-1">
                {selectedItem.availableQty}
              </div>
              <span className="text-xs text-slate-500 font-medium">{selectedItem.unit}</span>
            </div>

            {/* Sub-Metrics: Reserved & Reorder */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Reserved</span>
                <span className="text-lg font-bold text-slate-800">{selectedItem.reservedQty}</span>
                <span className="text-[11px] text-slate-400 block">{selectedItem.unit}</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-white">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Reorder Level</span>
                <span className="text-lg font-bold text-slate-800">{selectedItem.reorderLevel}</span>
                <span className="text-[11px] text-slate-400 block">{selectedItem.unit}</span>
              </div>
            </div>

            {/* Visual Stock Health Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Stock Ratio vs Safety Level</span>
                <span className="font-bold">
                  {Math.round((selectedItem.availableQty / (selectedItem.reorderLevel || 1)) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (selectedItem.availableQty / (selectedItem.reorderLevel * 1.5 || 1)) * 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Visual Placeholder / SKU Thumbnail */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Item Identity Asset
              </span>
              <div className="h-28 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <Package className="w-8 h-8 text-slate-300 mb-1" />
                <span className="text-xs font-mono">{selectedItem.id} placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Adjust Stock Modal */}
      <AdjustStockModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
