# Application Responsiveness Specification (RESPONSIVE_SPECIFICATION.md)

**Application Name:** StockMatrix (InventoryPro)  
**Primary Breakpoints Target:** Mobile (375px), Tablet (768px), Desktop (1440px)  
**Framework:** React 19 (JSX) with Tailwind CSS v4 Responsive Utilities  
**Accessibility Standard:** Touch target minimum 44×44px, WCAG AA Contrast, Zero horizontal layout shift  

---

## 1. Global Responsive Architecture

In accordance with Section 5 of the Assessment Brief:
> *"Do not simply shrink the desktop layout. Choose appropriate responsive patterns—for example, a compact table, horizontally scrollable data region, or stacked item cards where that improves usability."*

StockMatrix does not scale down desktop elements. Instead, it alters **layout structures, component formats, and interaction models** per viewport:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Desktop (1440px): High-Density Operations Center                        │
│ • Fixed Dark Navy Sidebar (w-64)                                       │
│ • 5-Column KPI Metric Cards                                            │
│ • Side-by-Side Analytics & Urgent Triage Grid (2 Columns)              │
│ • Full 8-Column Data Table with Sortable Headers & Row Actions         │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Tablet (768px): Hybrid Touch & High-Density Tablet View               │
│ • Persistent Sidebar converts to off-canvas slide drawer (backdrop blur│
│ • 2-Column KPI Cards Grid                                              │
│ • Stacked Analytics widgets                                            │
│ • Table with horizontal touch scroll & protected column widths         │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Mobile (375px): Ground Floor Touch-First Warehouse Experience          │
│ • Off-canvas slide navigation drawer with 48px touch targets           │
│ • Collapsible Search & Filter sheet (Sliders icon toggle)              │
│ • 8-Column Table replaced with Modern Stacked Inventory Cards         │
│ • Status Accent Stripes, visual stock ratio gauges, tap-to-inspect     │
│ • Single-column forms with full-width primary touch buttons            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Screen-by-Screen Component Responsive Matrix

### 2.1 Global Shell & Navigation
- **`Sidebar.jsx`**:
  - *Desktop (1440px):* Fixed `w-64`, persistent content canvas padding `lg:pl-64`.
  - *Tablet & Mobile (768px & 375px):* Off-canvas drawer (`-translate-x-full`) with backdrop blur; opens via header hamburger button.
- **`Header.jsx`**:
  - *Desktop:* Breadcrumbs, live status pill, full title, and "+ Add New Item" CTA.
  - *Mobile:* 44px touch hamburger button, streamlined title, and compact primary `+ Add` button.

---

### 2.2 Screen A – Inventory Overview (Dashboard)
- **`StatCardsGrid.jsx`**:
  - *Desktop:* 5-column single row (`xl:grid-cols-5`).
  - *Mobile (375px):* Balanced 2×2 grid with `Total Items` given full top prominence (`col-span-2`), color accent borders, and tap-to-review urgent action.
- **`CategoryChart.jsx`**:
  - *Desktop:* 2-column side-by-side with urgent triage widget.
  - *Mobile:* Single column stacked with multi-segment health progress bars and wrapped touch-friendly legend.
- **`UrgentItemsWidget.jsx`**:
  - *Desktop:* Full row actions (`Eye` and `Edit`).
  - *Mobile:* Touch rows with `ChevronRight` indicators and tap-to-inspect interaction.

---

### 2.3 Screen B – Inventory Catalog (List)
- **`InventoryFilters.jsx`**:
  - *Desktop:* Search bar + 4-column filter grid always visible.
  - *Mobile:* Search bar with instant **"Filters (X)" toggle button** to keep the screen uncluttered. Dropdowns expand on demand.
- **`InventoryTable.jsx` & `InventoryMobileCards.jsx`**:
  - *Desktop:* High-density 8-column data table.
  - *Mobile (375px):* Automatically replaces table with rich touch cards featuring status color stripes, SKU chips, available vs reorder gauges, and thumb-friendly `Inspect` buttons.
- **`Pagination.jsx`**:
  - *Desktop:* Horizontal bar showing range on left and page buttons on right.
  - *Mobile:* Stacked layout with large touch-friendly `Previous` and `Next` buttons side-by-side.

---

### 2.4 Screen C – Item Details (Deep Inspection)
- **`ItemDetailsScreen.jsx`**:
  - *Desktop:* 3-Column Grid (`lg:grid-cols-3`): Left 2 columns hold identity, location, and movement logs; right column holds stock metrics & gauges.
  - *Mobile (375px):* Top stock summary banner placed immediately below navigation for instant glance at Available / Reserved / Reorder levels, followed by storage coordinates and transaction history.
- **`AdjustStockModal.jsx`**:
  - *Desktop & Mobile:* Bottom-sheet / centered modal dialog with large touch buttons for Receive (+ Stock) and Dispatch (- Stock), numeric spinners, and full-width confirm button.

---

### 2.5 Screen D – Add / Edit Item Form
- **`ItemFormScreen.jsx`**:
  - *Desktop:* 3-Section structured layout with 3-column input grids.
  - *Mobile (375px):* Single-column form layout (`grid-cols-1`) with clear visual boundaries, large touch inputs, inline red error messages, and sticky bottom action bar.

---

## 3. Mobile Touch & Usability Standards

1. **Touch Target Size:** Interactive buttons, selects, and links strictly respect a minimum hitbox of **44×44px**.
2. **Active Feedback:** `active:scale-[0.98]` and `active:bg-slate-100` classes provide instant tactile visual feedback on physical mobile devices.
3. **Zero Horizontal Layout Shift:** All containers use `min-w-0`, `max-w-full`, and `overflow-hidden` to eliminate horizontal page scrolling on 375px screens.

