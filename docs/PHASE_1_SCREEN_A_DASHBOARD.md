# Project Documentation: Step 1 – Screen A (Inventory Overview / Dashboard)

**Milestone:** Step 1 of 4 (User Journey: Morning Snapshot)  
**Target Viewports Verified:** Desktop (1440px), Tablet (768px), Mobile (375px)  
**Primary Color:** `#5145E5` | **Sidebar:** `#151D31` | **Main Background:** `#F5F7FB`  

---

## 1. Overview & Objective
Step 1 establishes the landing dashboard and persistent application frame. When starting a shift, warehouse operators and managers immediately understand:
- Total inventory items across facilities.
- Stock health counts: In Stock, Low Stock, and Out of Stock.
- High-priority items requiring immediate restocking or inspection.

Navigation is structured in the exact **A → B → C → D order**:
1. **Screen A (Dashboard):** High-level KPI metrics and urgent triage.
2. **Screen B (Inventory List):** Full searchable and filterable table catalog.
3. **Screen C (Item Details):** In-depth inspection of stock, storage location, and movement logs.
4. **Screen D (Add / Edit Item):** Guided form with inline validation.

---

## 2. Navigation Flow & User Journey Links

To ensure clarity and eliminate confusion, the user can navigate between screens through both the sidebar and contextual page actions:

### A. Sidebar Navigation (Direct Access)
The sidebar explicitly reflects the four required assessment screens:
- `Screen A: Dashboard`
- `Screen B: Inventory List`
- `Screen C: Item Details` (opens the selected item's inspection view)
- `Screen D: Add / Edit Item` (opens the creation form)

### B. Contextual In-Screen Navigation
Within Screen A, users can directly jump to other screens:
- **To Screen B (Catalog):**
  - Click **"View Catalog"** in the top header.
  - Click **"View All"** in the "Items Requiring Attention" card header.
- **To Screen C (Item Details):**
  - Click the **Eye icon (`👁️`)** on any urgent item row in the triage widget.
- **To Screen D (Add/Edit Form):**
  - Click the primary purple **"+ Add New Item"** button in the header.
  - Click the **Pencil icon (`✏️`)** on any item row to edit that specific item.

---

## 3. Files Created & Modified

| File Path | Component / Role | Description |
| :--- | :--- | :--- |
| `src/data/mockInventory.js` | Data Store | Catalog of 12 enterprise inventory items with SKUs, warehouse locations, stock thresholds, and transaction movement logs. |
| `src/context/InventoryContext.jsx` | State Engine | React Context provider managing dynamic metric calculations (`useMemo`), active screen routing, selected item tracking, and CRUD actions. |
| `src/components/common/StatusBadge.jsx` | Atomic UI | Reusable status badge with dual visual indicators (SVG icon + text + background tone) for accessibility compliance. |
| `src/components/common/MetricCard.jsx` | Atomic UI | Statistic KPI card with iconography, metric count, contextual label, and subtle hover elevation. |
| `src/components/layout/Sidebar.jsx` | Layout Shell | Dark Navy persistent sidebar with brand identity, explicit A → B → C → D navigation items, and mobile drawer support. |
| `src/components/layout/Header.jsx` | Layout Shell | Responsive top navigation bar displaying active page title, mobile toggle, and primary CTA buttons. |
| `src/components/dashboard/StatCardsGrid.jsx` | Dashboard Molecule | 5-column responsive grid displaying Total Items, In Stock, Low Stock, Out of Stock, Needs Attention. |
| `src/components/dashboard/CategoryChart.jsx` | Dashboard Molecule | Visual inventory distribution widget displaying category volume and multi-colored health progress bars. |
| `src/components/dashboard/UrgentItemsWidget.jsx` | Dashboard Molecule | Triage list surfacing items below safety thresholds with direct actions to inspect (Screen C) or edit (Screen D). |
| `src/components/dashboard/DashboardScreen.jsx` | Screen Template | Assembles the StatCardsGrid, CategoryChart, and UrgentItemsWidget into Screen A. |
| `src/App.jsx` | Root Container | Wraps the application with `InventoryProvider` and coordinates layout responsive frames. |

---

## 4. Component Architecture & Reusability

```text
               InventoryProvider (State & Metrics)
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
 Sidebar (Nav: A, B, C, D)         Header (Actions)
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
                                             │
                             [Eye -> Screen C | Pencil -> Screen D]
```

---

## 5. Local Execution & Verification

Run the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. All four screens are now clearly visible and accessible directly from the sidebar as well as contextual links.
