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
Features a 5-column responsive grid styled with consistent geometric parameters, uniform vertical alignment, standardized top-right icon containers (`w-9 h-9`), and purposeful status backgrounds:

| Metric Card | Background Treatment | Icon Treatment | Number Prominence |
| :--- | :--- | :--- | :--- |
| **Total Items** | Neutral white background (`bg-white`), subtle border | Indigo icon (`#5145E5`) in `bg-indigo-50` box | 32px (`text-3xl font-black text-slate-900`) |
| **In Stock** | Subtle green tint (`bg-emerald-50/40`), soft border | Emerald icon in `bg-emerald-100/70` box | 32px (`text-3xl font-black text-emerald-700`) |
| **Low Stock** | Subtle amber tint (`bg-amber-50/40`), soft border | Amber icon in `bg-amber-100/70` box | 32px (`text-3xl font-black text-amber-700`) |
| **Out of Stock** | Subtle red tint (`bg-rose-50/40`), soft border | Red icon in `bg-rose-100/70` box | 32px (`text-3xl font-black text-rose-700`) |
| **Items Requiring Attention** | Light rose tint (`bg-rose-50/60`), refined border | Bell icon with pulse animation | 32px with underlined `View urgent →` shortcut |

#### Unified Card Design Standards:
- **Consistent Height & Padding:** All 5 cards share `min-h-[136px]`, `p-4 sm:p-5`, and `rounded-2xl` (16px border radius).
- **Icon Placement:** Placed in the top-right corner of each card using uniform `w-9 h-9` (36px) rounded containers.
- **Vertical Alignment:** All 5 metric values align at the exact same vertical baseline across the grid.
- **Tasteful Emphasis:** The Attention card stands out with a balanced light rose background and refined border (`border-rose-200`) without heavy visual noise.

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
