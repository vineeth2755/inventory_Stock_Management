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
Features a 5-column responsive grid styled with status-matched background gradients and iconography without distracting top borders:

1. **Total Items:** Soft Indigo gradient (`from-white to-indigo-50/50`) displaying total SKU volume.
2. **In Stock:** Soft Emerald Green gradient (`from-white to-emerald-50/60`) displaying healthy inventory count in green (`#047857`).
3. **Low Stock:** Soft Amber gradient (`from-white to-amber-50/60`) displaying low inventory count in amber (`#B45309`).
4. **Out of Stock:** Soft Red gradient (`from-white to-red-50/80`) displaying depleted stock count in pure red (`#DC2626`).
5. **Items Requiring Attention:** High-emphasis alert card with pulse notification badge and an underlined interaction link:  
   `Tap to view urgent items →` which routes directly to the catalog triage.

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
- **Browser History Integration:** Integrated with native `window.history.pushState` and `popstate` so browser Back (`←`) and Forward (`→`) buttons transition between screens naturally.

---

## 3. Responsive Behavior
- **Desktop (1440px):** 5-column metric grid; 2-column analytics cards side-by-side.
- **Tablet (768px):** 2×2 metric grid + full-width attention card; stacked analytics cards.
- **Mobile (375px):** Touch-friendly cards, full-width `Total Items` header card, tap-to-inspect urgent rows with chevron indicators.
