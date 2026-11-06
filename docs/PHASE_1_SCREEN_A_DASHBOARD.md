# Project Documentation: Step 1 – Screen A (Inventory Overview / Dashboard)

**Milestone:** Step 1 of 4 (User Journey: Morning Snapshot)  
**Target Viewports Verified:** Desktop (1440px), Tablet (768px), Mobile (375px)  
**Primary Color:** `#5145E5` | **Sidebar:** `#151D31` | **Main Background:** `#F5F7FB`  

---

## 1. Overview & Objective
Step 1 delivers the operational landing dashboard for warehouse managers and logistics leads. When starting a shift, users require an instant high-level snapshot answering:
- What is our total inventory volume across warehouses?
- How many items are healthy vs. low or depleted?
- Which specific items require emergency restocking or attention?

All visual elements strictly match the enterprise reference theme (Dark Navy sidebar, white cards with subtle borders, and accessible colored badges combining icons, text, and colors).

---

## 2. Files Created & Modified

| File Path | Component / Role | Description |
| :--- | :--- | :--- |
| `src/data/mockInventory.js` | Data Store | Realistic catalog of 12 enterprise inventory items with SKUs, warehouse locations, stock thresholds, and transaction movement logs. |
| `src/context/InventoryContext.jsx` | State Engine | React Context provider managing dynamic metric calculations (`useMemo`), active screen navigation, and CRUD actions. |
| `src/components/common/StatusBadge.jsx` | Atomic UI | Reusable status badge with dual visual indicators (SVG icon + text + background tone) for accessibility compliance. |
| `src/components/common/MetricCard.jsx` | Atomic UI | Statistic KPI card with iconography, metric count, contextual label, and subtle hover elevation. |
| `src/components/layout/Sidebar.jsx` | Layout Shell | Dark Navy persistent desktop sidebar (`w-64`) with brand identity, nav items, and mobile drawer support. |
| `src/components/layout/Header.jsx` | Layout Shell | Responsive top navigation bar displaying active page title, mobile toggle, and primary CTA buttons. |
| `src/components/dashboard/StatCardsGrid.jsx` | Dashboard Molecule | 5-column responsive grid displaying the required metrics: Total Items, In Stock, Low Stock, Out of Stock, Needs Attention. |
| `src/components/dashboard/CategoryChart.jsx` | Dashboard Molecule | Visual inventory distribution widget displaying category volume and multi-colored health progress bars. |
| `src/components/dashboard/UrgentItemsWidget.jsx` | Dashboard Molecule | Triage list surfacing items below safety thresholds with direct actions to inspect or edit. |
| `src/components/dashboard/DashboardScreen.jsx` | Screen Template | Assembles the StatCardsGrid, CategoryChart, and UrgentItemsWidget into Screen A. |
| `src/App.jsx` | Root Container | Wraps the application with `InventoryProvider` and coordinates layout responsive frames. |

---

## 3. Component Architecture & Reusability

```text
               InventoryProvider (State & Metrics)
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
 Sidebar (Nav)                    Header (Actions)
       │                                 │
       └────────────────┬────────────────┘
                        ▼
               DashboardScreen (Screen A)
                        │
   ┌────────────────────┼────────────────────┐
   ▼                    ▼                    ▼
StatCardsGrid     CategoryChart      UrgentItemsWidget
   │                                         │
MetricCard (x5)                       StatusBadge (Reusable)
```

### Key Architectural Strengths:
1. **Dynamic Metric Calculation:**
   Metrics are not static. In `InventoryContext.jsx`, `useMemo` dynamically recalculates Total Items, In Stock, Low Stock, and Out of Stock whenever items are added or edited.
2. **Accessible Status Treatment:**
   Per the assessment PDF rule (*"Status must not rely on colour alone"*), `StatusBadge` couples specific SVG icons (`CheckCircle2`, `AlertTriangle`, `XCircle`) with text labels and high-contrast color backgrounds.
3. **Responsive Adaptation:**
   - **Desktop (1440px):** Full 5-column metric display with 2-column side-by-side analytics widgets.
   - **Tablet (768px):** Adapts to 2-column metric cards; collapsible navigation.
   - **Mobile (375px):** Single-column stacked cards with touch-friendly button targets (minimum 44px) and off-canvas sliding drawer navigation.

---

## 4. Local Execution & Verification

Run the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to inspect the complete Screen A experience.
