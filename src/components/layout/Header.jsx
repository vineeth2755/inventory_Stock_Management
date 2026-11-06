import React from 'react';
import { Menu, Search, Bell, Plus, Package } from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function Header({ setMobileOpen }) {
  const { currentScreen, navigateTo } = useInventory();

  const getPageInfo = () => {
    switch (currentScreen) {
      case 'overview':
        return {
          title: 'Inventory Overview',
          subtitle: 'Real-time stock status, health metrics, and attention-required items'
        };
      case 'list':
        return {
          title: 'Inventory Catalog',
          subtitle: 'Search, filter, and audit item records across all storage locations'
        };
      case 'details':
        return {
          title: 'Item Inspection',
          subtitle: 'Detailed specifications, storage locations, and movement logs'
        };
      case 'form':
        return {
          title: 'Add / Edit Item',
          subtitle: 'Register new inventory stock or update existing item specifications'
        };
      default:
        return { title: 'Dashboard', subtitle: '' };
    }
  };

  const info = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5">
        {/* Mobile menu button + Page titles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {info.title}
            </h1>
            <p className="hidden sm:block text-xs sm:text-sm text-slate-500 mt-0.5">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center gap-2.5">
          {currentScreen !== 'form' && (
            <button
              onClick={() => navigateTo('form', null, 'add')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#5145E5] text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Add New Item</span>
              <span className="xs:hidden">Add</span>
            </button>
          )}

          {currentScreen === 'overview' && (
            <button
              onClick={() => navigateTo('list')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">View Catalog</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
