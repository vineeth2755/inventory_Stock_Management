import React from 'react';
import { 
  Menu, 
  Plus, 
  Package, 
  LayoutDashboard,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function Header({ setMobileOpen }) {
  const { currentScreen, navigateTo } = useInventory();

  const getPageInfo = () => {
    switch (currentScreen) {
      case 'overview':
        return {
          title: 'Inventory Overview',
          subtitle: 'Real-time stock status & health metrics',
          badge: 'Live Operations'
        };
      case 'list':
        return {
          title: 'Inventory Catalog',
          subtitle: 'Search, filter, and audit item records',
          badge: 'Master Catalog'
        };
      case 'details':
        return {
          title: 'Item Inspection',
          subtitle: 'Specifications, storage coordinates & movements',
          badge: 'Audit Trail'
        };
      case 'form':
        return {
          title: 'Add / Edit Item',
          subtitle: 'Register new stock or update specifications',
          badge: 'Data Entry'
        };
      default:
        return { title: 'Dashboard', subtitle: '', badge: '' };
    }
  };

  const info = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="flex items-center justify-between px-3.5 sm:px-8 py-3">
        {/* Left: Mobile Drawer Trigger + Page Titles */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 active:scale-95 border border-slate-200/80 transition-all shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                {info.title}
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-[#5145E5] border border-indigo-100">
                {info.badge}
              </span>
            </div>
            <p className="hidden md:block text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Touch Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {currentScreen !== 'form' && (
            <button
              onClick={() => navigateTo('form', null, 'add')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#5145E5] text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 active:scale-95 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline">Add Item</span>
              <span className="xs:hidden">Add</span>
            </button>
          )}

          {currentScreen === 'overview' && (
            <button
              onClick={() => navigateTo('list')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <Package className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Catalog</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
