import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Layers, 
  BarChart3, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { currentScreen, navigateTo } = useInventory();

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'list', label: 'Inventory List', icon: Package },
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
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#5145E5] flex items-center justify-center text-white font-bold shadow-md shadow-indigo-900/40">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">StockMatrix</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Enterprise Inventory</p>
              </div>
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
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.mode)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#5145E5] text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/40">
            <div className="w-9 h-9 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-sm font-bold text-indigo-300">
              VK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Vikram Kumar</p>
              <p className="text-[11px] text-slate-400 truncate">Inventory Lead</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
