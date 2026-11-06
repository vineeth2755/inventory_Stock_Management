import React, { useState, useMemo } from 'react';
import { PackageX, Plus } from 'lucide-react';
import InventoryFilters from './InventoryFilters';
import InventoryTable from './InventoryTable';
import InventoryMobileCards from './InventoryMobileCards';
import Pagination from './Pagination';
import { useInventory } from '../../context/InventoryContext';

export default function InventoryListScreen() {
  const { items, navigateTo } = useInventory();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter + Search + Sort logic
  const processedItems = useMemo(() => {
    return items
      .filter((item) => {
        // Search by ID or Name
        const matchesSearch =
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;

        // Location filter
        const matchesLocation =
          selectedLocation === 'All' || item.warehouse === selectedLocation;

        // Status filter
        const matchesStatus =
          selectedStatus === 'All' || item.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
      })
      .sort((a, b) => {
        const { key, direction } = sortConfig;
        let aVal = a[key];
        let bVal = b[key];

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [items, searchQuery, selectedCategory, selectedLocation, selectedStatus, sortConfig]);

  // Pagination calculation
  const totalItems = processedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = processedItems.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* 1. Filters & Search Controls */}
      <InventoryFilters
        searchQuery={searchQuery}
        setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1); }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(c) => { setSelectedCategory(c); setCurrentPage(1); }}
        selectedLocation={selectedLocation}
        setSelectedLocation={(l) => { setSelectedLocation(l); setCurrentPage(1); }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(s) => { setSelectedStatus(s); setCurrentPage(1); }}
        onReset={handleResetFilters}
      />

      {/* 2. Inventory Records Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {totalItems === 0 ? (
          /* Empty State when no items match filters */
          <div className="py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <PackageX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No inventory records found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
              No items match your active search and filter criteria. Try resetting filters or adding a new record.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2 text-xs font-medium border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Clear all filters
              </button>
              <button
                onClick={() => navigateTo('form', null, 'add')}
                className="px-3.5 py-2 text-xs font-semibold bg-[#5145E5] text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Item</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet: Data Table */}
            <div className="hidden sm:block">
              <InventoryTable
                items={currentItems}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>

            {/* Mobile (375px): Responsive Card List */}
            <div className="sm:hidden">
              <InventoryMobileCards items={currentItems} />
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        )}
      </div>
    </div>
  );
}
