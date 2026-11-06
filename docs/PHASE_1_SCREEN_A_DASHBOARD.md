# Phase 1 Specification: Screen A – Inventory Overview (Dashboard)

**Application:** StockMatrix (InventoryPro)  
**Screen:** Screen A (Landing View)  
**User Journey Role:** Morning Snapshot & Operational Triage  
**Target Viewports:** Desktop (1440px), Tablet (768px), Mobile (375px)  

---

## 1. Overview & Business Objective
Screen A provides warehouse operators and logistics managers with an instant high-level snapshot of total inventory volume, health distribution across categories, and high-priority items requiring emergency restocking.

---

## 2. Component Specifications

### 2.1 Summary KPI Indicators (`StatCardsGrid.jsx`)
Strictly adheres to the five indicators specified in the assessment brief:
1. **Total Items:** Real-time count of total registered SKUs across all warehouse facilities.
2. **In Stock:** Count of healthy items where available quantity exceeds safety reorder thresholds.
3. **Low Stock:** Count of items running at or below safety reorder thresholds (`availableQty <= reorderLevel`).
4. **Out of Stock:** Count of items with zero available units (`availableQty === 0`).
5. **Items Requiring Attention:** Combined count of low stock and out-of-stock items requiring immediate restock action.

### 2.2 Visual Category Breakdown (`CategoryChart.jsx`)
- Computes each category's volume share against the total catalog:
  $$\text{Category Volume \%} = \left(\frac{\text{Items in Category}}{\text{Total Items}}\right) \times 100$$
- Visualizes internal stock health via multi-segment horizontal progress bars:
  - **Emerald Green:** Healthy in-stock proportion.
  - **Amber Orange:** Low-stock threshold warning proportion.
  - **Rose Red:** Depleted out-of-stock proportion.

### 2.3 Attention Required Triage Widget (`UrgentItemsWidget.jsx`)
- Surfaces the top items requiring restocking.
- Displays SKU ID, warehouse location, available quantity, and safety threshold.
- Features dual row actions:
  - **Eye Icon (`👁️`):** Directly inspects the item in Screen C.
  - **Pencil Icon (`✏️`):** Opens Screen D in edit mode.

### 2.4 Navigation & Actions
- **Header Action:** Prominent `+ Add Item` CTA button.
- **Catalog Shortcut:** Direct navigation link to Screen B (Inventory Catalog).

---

## 3. Responsive Behavior
- **Desktop (1440px):** 5-column metric grid; 2-column analytics cards side-by-side.
- **Tablet (768px):** 2×2 metric grid + full-width attention card; stacked analytics cards.
- **Mobile (375px):** Touch-friendly cards, full-width `Total Items` header card, tap-to-inspect urgent rows with chevron indicators.
