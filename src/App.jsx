import React, { useState } from 'react';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardScreen from './components/dashboard/DashboardScreen';
import InventoryListScreen from './components/inventory/InventoryListScreen';
import ItemDetailsScreen from './components/details/ItemDetailsScreen';
import ItemFormScreen from './components/form/ItemFormScreen';

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentScreen } = useInventory();

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex">
      {/* 1. Dark Navy Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header setMobileOpen={setMobileOpen} />

        {/* Dynamic Screen View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentScreen === 'overview' && <DashboardScreen />}
          {currentScreen === 'list' && <InventoryListScreen />}
          {currentScreen === 'details' && <ItemDetailsScreen />}
          {currentScreen === 'form' && <ItemFormScreen />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <AppContent />
    </InventoryProvider>
  );
}
