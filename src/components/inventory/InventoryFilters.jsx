import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function InventoryFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
  onReset
}) {
  const { categories, warehouses } = useInventory();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeFiltersCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedLocation !== 'All' ? 1 : 0) +
    (selectedStatus !== 'All' ? 1 : 0);

  const isFiltered = searchQuery || activeFiltersCount > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-2.5">
      {/* Top Search Bar + Mobile Filter Sheet Trigger */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKU or item name..."
            className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5145E5] focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle Button (Visible on screens < 640px) */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className={`sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
            activeFiltersCount > 0
              ? 'bg-indigo-50 border-indigo-200 text-[#5145E5]'
              : 'bg-slate-50 border-slate-200 text-slate-700 active:bg-slate-100'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#5145E5] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Options: Hidden on mobile unless toggled; Always visible on Tablet/Desktop */}
      <div className={`${mobileFilterOpen ? 'block' : 'hidden'} sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 sm:border-0`}>
        {/* Category Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 sm:bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Warehouse
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 sm:bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
          >
            <option value="All">All Facilities</option>
            {warehouses.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Stock Status Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 sm:bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="flex items-end">
          <button
            onClick={() => { onReset(); setMobileFilterOpen(false); }}
            disabled={!isFiltered}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
              isFiltered
                ? 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 cursor-pointer shadow-xs'
                : 'border-slate-200 text-slate-300 bg-slate-50/50 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
