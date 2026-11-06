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
  Calendar
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
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
        <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-sm">No item selected. Please choose an item from the inventory catalog.</p>
        <button
          onClick={() => navigateTo('list')}
          className="mt-4 px-4 py-2 bg-[#5145E5] text-white rounded-xl text-xs font-semibold"
        >
          Back to Inventory List
        </button>
      </div>
    );
  }

  const isLowStock = selectedItem.status === 'Low Stock';
  const isOutOfStock = selectedItem.status === 'Out of Stock';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Mobile & Desktop Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-0 border-slate-200/80 shadow-xs sm:shadow-none">
        <button
          onClick={() => navigateTo('list')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#5145E5] active:scale-95 transition-all w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>Back to Catalog</span>
        </button>

        {/* Action Buttons: Full width on mobile for easy one-thumb tapping */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
          <button
            onClick={() => setIsAdjustModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 sm:bg-white border border-slate-200 rounded-xl hover:bg-slate-100 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Adjust Stock</span>
          </button>

          <button
            onClick={() => navigateTo('form', selectedItem.id, 'edit')}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#5145E5] rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Item</span>
          </button>
        </div>
      </div>

      {/* 2. Stock Health Alert Banner (Mobile optimized) */}
      {isOutOfStock && (
        <div className="bg-rose-50 border border-rose-200/90 rounded-2xl p-3.5 sm:p-4 flex items-start gap-2.5 text-rose-800">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">Stock Depleted:</span> Current available balance is 0 {selectedItem.unit}. Immediate restock required.
          </div>
        </div>
      )}

      {isLowStock && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-3.5 sm:p-4 flex items-start gap-2.5 text-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">Low Stock Warning:</span> Available balance ({selectedItem.availableQty} {selectedItem.unit}) is below safety threshold ({selectedItem.reorderLevel} {selectedItem.unit}).
          </div>
        </div>
      )}

      {/* 3. Mobile First Stock KPI Banner (Visible first on mobile) */}
      <div className="lg:hidden bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Stock Summary
          </span>
          <StatusBadge status={selectedItem.status} size="sm" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Available</span>
            <span className={`text-xl font-extrabold ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-slate-900'}`}>
              {selectedItem.availableQty}
            </span>
            <span className="text-[10px] text-slate-400 block">{selectedItem.unit}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Reserved</span>
            <span className="text-xl font-extrabold text-slate-700">{selectedItem.reservedQty}</span>
            <span className="text-[10px] text-slate-400 block">{selectedItem.unit}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Reorder</span>
            <span className="text-xl font-extrabold text-slate-700">{selectedItem.reorderLevel}</span>
            <span className="text-[10px] text-slate-400 block">{selectedItem.unit}</span>
          </div>
        </div>

        {/* Health Ratio Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Safety ratio</span>
            <span className="font-bold text-slate-700">
              {Math.round((selectedItem.availableQty / (selectedItem.reorderLevel || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
      </div>

      {/* 4. Main Item Identity & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Identity, Description & Storage Location */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
                  {selectedItem.id}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">{selectedItem.category}</span>
              </div>
              <div className="hidden lg:block">
                <StatusBadge status={selectedItem.status} />
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {selectedItem.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            {/* Spec Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Supplier: <strong className="text-slate-800">{selectedItem.supplier || 'Unassigned'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">Updated: <strong className="text-slate-800 font-mono">{selectedItem.lastUpdated}</strong></span>
              </div>
            </div>
          </div>

          {/* Location & Warehouse Info */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#5145E5]" />
              <span>Storage Coordinates</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Facility</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">{selectedItem.warehouse}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Bay / Shelf</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">{selectedItem.zone}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Location Key</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 font-mono truncate">{selectedItem.location}</p>
              </div>
            </div>
          </div>

          {/* Stock Activity History Section */}
          <StockMovementHistory movements={selectedItem.movements} unit={selectedItem.unit} />
        </div>

        {/* Right Column (Desktop Only): Large Quantity Card */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5145E5]" />
              <span>Stock Quantities</span>
            </h3>

            {/* Available Qty Focus Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Available to Promise
              </span>
              <div className="text-4xl font-extrabold text-slate-900 mt-1">
                {selectedItem.availableQty}
              </div>
              <span className="text-xs text-slate-500 font-medium">{selectedItem.unit}</span>
            </div>

            {/* Sub-Metrics: Reserved & Reorder */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl border border-slate-100 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Reserved</span>
                <span className="text-lg font-bold text-slate-800">{selectedItem.reservedQty}</span>
                <span className="text-[10px] text-slate-400 block">{selectedItem.unit}</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-white">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Reorder Level</span>
                <span className="text-lg font-bold text-slate-800">{selectedItem.reorderLevel}</span>
                <span className="text-[10px] text-slate-400 block">{selectedItem.unit}</span>
              </div>
            </div>

            {/* Visual Stock Health Bar */}
            <div className="space-y-2 pt-1">
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

            {/* Visual SKU Placeholder */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Item Identity Asset
              </span>
              <div className="h-24 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <Package className="w-6 h-6 text-slate-300 mb-1" />
                <span className="text-[11px] font-mono">{selectedItem.id} placeholder</span>
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
