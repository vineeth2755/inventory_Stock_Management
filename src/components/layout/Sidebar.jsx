import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  X
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';
import logoImg from '../../assets/logo.png';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { currentScreen, navigateTo } = useInventory();

  // Enterprise navigation items
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'list', label: 'Inventory Catalog', icon: Package },
    { id: 'form', label: 'Add New Item', icon: PlusCircle, mode: 'add' }
  ];

  const handleNavClick = (id, mode) => {
    navigateTo(id, null, mode || 'add');
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#151D31] text-slate-300 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Area */}
        <div>
          <div className="h-20 flex items-center justify-between px-4 border-b border-slate-800 bg-[#111827]/40">
            <div className="flex items-center gap-2 overflow-hidden">
              <img 
                src={logoImg} 
                alt="InventoryPro Logo" 
                className="h-12 w-auto max-w-[200px] object-contain rounded"
              />
            </div>
            {/* Close Button on Mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Core Operations
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || (item.id === 'list' && currentScreen === 'details');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.mode)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#5145E5] text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="w-9 h-9 rounded-full bg-[#5145E5] border border-indigo-400/30 flex items-center justify-center text-xs font-bold text-white shadow-xs">
              VG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Vineeth Guntreddi</p>
              <p className="text-[11px] text-slate-400 truncate">Inventory Lead & UX Engineer</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
