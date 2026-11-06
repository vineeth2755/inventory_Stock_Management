import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
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

  const isFiltered = searchQuery || selectedCategory !== 'All' || selectedLocation !== 'All' || selectedStatus !== 'All';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
      {/* Top Row: Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Item ID (e.g., INV-1001) or Item Name..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5145E5] focus:bg-white text-slate-900 placeholder-slate-400 transition-all"
        />
      </div>

      {/* Bottom Row: 3 Dropdown Filters + Reset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
        {/* 1. Category Filter */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* 2. Location Filter */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Location
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
          >
            <option value="All">All Locations</option>
            {warehouses.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* 3. Status Filter */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Stock Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
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
            onClick={onReset}
            disabled={!isFiltered}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
              isFiltered
                ? 'border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer'
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
