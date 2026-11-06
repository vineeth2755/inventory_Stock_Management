import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_INVENTORY, CATEGORIES, WAREHOUSES } from '../data/mockInventory';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [items, setItems] = useState(INITIAL_INVENTORY);
  const [currentScreen, setCurrentScreen] = useState('overview'); // 'overview' | 'list' | 'details' | 'form'
  const [selectedItemId, setSelectedItemId] = useState('INV-1001');
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'

  // Computed summary metrics dynamically calculated from current items state
  const metrics = useMemo(() => {
    const totalItems = items.length;
    const inStock = items.filter(item => item.status === 'In Stock').length;
    const lowStock = items.filter(item => item.status === 'Low Stock').length;
    const outOfStock = items.filter(item => item.status === 'Out of Stock').length;
    // Items requiring attention: low stock OR out of stock
    const requiringAttention = items.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

    // Category breakdown
    const categoryCounts = CATEGORIES.map(cat => {
      const catItems = items.filter(i => i.category === cat);
      const inStockCount = catItems.filter(i => i.status === 'In Stock').length;
      const lowStockCount = catItems.filter(i => i.status === 'Low Stock').length;
      const outStockCount = catItems.filter(i => i.status === 'Out of Stock').length;
      return {
        category: cat,
        total: catItems.length,
        inStock: inStockCount,
        lowStock: lowStockCount,
        outOfStock: outStockCount
      };
    });

    return {
      totalItems,
      inStock,
      lowStock,
      outOfStock,
      requiringAttentionCount: requiringAttention.length,
      requiringAttentionItems: requiringAttention,
      categoryCounts
    };
  }, [items]);

  // Selected item object for Screen C (Details) and Screen D (Edit)
  const selectedItem = useMemo(() => {
    return items.find(item => item.id === selectedItemId) || items[0];
  }, [items, selectedItemId]);

  // Navigation helpers
  const navigateTo = (screen, itemId = null, mode = 'add') => {
    if (itemId) setSelectedItemId(itemId);
    if (mode) setFormMode(mode);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Item
  const addItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);
  };

  // Update Item
  const updateItem = (updatedItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  // Adjust stock quantity with an audit movement entry
  const adjustStock = (itemId, adjustmentQty, reason = "Manual adjustment") => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;

      const newQty = Math.max(0, item.availableQty + adjustmentQty);
      let newStatus = 'In Stock';
      if (newQty === 0) {
        newStatus = 'Out of Stock';
      } else if (newQty <= item.reorderLevel) {
        newStatus = 'Low Stock';
      }

      const newMovement = {
        id: `MOV-${Date.now().toString().slice(-4)}`,
        type: adjustmentQty > 0 ? 'Receipt' : 'Dispatch',
        quantity: adjustmentQty,
        date: new Date().toISOString().split('T')[0],
        user: "Operations User",
        notes: reason
      };

      return {
        ...item,
        availableQty: newQty,
        status: newStatus,
        lastUpdated: new Date().toISOString().split('T')[0],
        movements: [newMovement, ...(item.movements || [])]
      };
    }));
  };

  return (
    <InventoryContext.Provider value={{
      items,
      metrics,
      currentScreen,
      selectedItem,
      selectedItemId,
      formMode,
      navigateTo,
      addItem,
      updateItem,
      adjustStock,
      categories: CATEGORIES,
      warehouses: WAREHOUSES
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
