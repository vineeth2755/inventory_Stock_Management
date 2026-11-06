# StockMatrix – Enterprise Inventory Management Web Application

A responsive, high-density React web application designed for operations staff, warehouse coordinators, and supply chain managers to maintain accurate inventory, monitor stock health, audit transactions, and adjust stock levels across multiple warehouse facilities.

Built as part of the **UX/UI Engineer Assessment** following the 4-layer design architecture and the specified enterprise visual theme.

---

## 1. Key Features & Screens

### Screen A — Inventory Overview (Morning Snapshot)
- **5 Dynamic KPI Metrics:** Total Items, In Stock, Low Stock, Out of Stock, and Items Requiring Attention.
- **Visual Stock Health Distribution:** Multi-segment progress bars showing distribution across categories (`Consumables`, `Components`, `Electrical`, `Machinery & Tools`, `Safety & PPE`).
- **Urgent Triage Widget:** Instant table listing items at or below safety reorder levels with direct 1-click inspection and edit actions.
- **Prominent Header CTA:** Quick-action `+ Add New Item` button.

### Screen B — Inventory Catalog (Search & Triage)
- **8 Required Data Columns:** `Item ID`, `Item Name`, `Category`, `Location`, `Available Qty`, `Reorder Level`, `Last Updated`, `Status`.
- **Search & Multi-Filtering:** Real-time search by ID/Name, plus dropdown filters for Category, Warehouse Location, and Stock Status.
- **Column Sorting:** Interactive sorting on Item Name, Available Qty, and Last Updated.
- **Pagination:** Controlled items-per-page with range indicators.
- **Mobile Responsive Cards:** Automatically switches from wide table to stacked touch-friendly cards on mobile viewports (375px).

### Screen C — Item Details (Deep Inspection & Audit)
- **Item Identity & Specifications:** SKU badge, name, category, and technical description.
- **Stock Gauges:** Available to Promise, Reserved for active orders, and Safety Reorder thresholds.
- **Location Breakdown:** Warehouse facility, Zone/Bay, and exact bin codes.
- **Interactive Stock Adjustment Modal:** Allows operators to receive (+ Stock) or dispatch (- Stock) with audit notes, updating stock balances in real time.
- **Audit Activity Log:** Chronological transaction timeline detailing dates, quantities, transaction types, and authorized personnel.

### Screen D — Add / Edit Item (Guarded Data Entry)
- **Structured 3-Section Form:** Item Identity, Stock Levels, and Location/Vendor Reference.
- **Inline Validation:** Instant feedback on empty fields, negative numbers, and duplicate SKUs with red visual boundaries.
- **Real-Time State Sync:** Submitting an item immediately updates the catalog and recalculates overview metrics across all screens.

---

## 2. Technology Stack & Architecture

- **Frontend Framework:** React 19 with JavaScript (JSX)
- **Build Tool:** Vite (Instant HMR & optimized production bundling)
- **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom `@theme` tokens
- **Iconography:** Lucide React (Accessible, lightweight SVG icons)
- **State Management:** React Context (`InventoryContext.jsx`) with dynamic `useMemo` metric calculations
- **Design Tokens:** Strict custom palette (`#5145E5` Indigo, `#151D31` Dark Navy sidebar, `#F5F7FB` app canvas)

---

## 3. Responsive Design Viewports

The application is engineered and tested for the three target viewports:

| Device Viewport | Width | Key Adaptation Behavior |
| :--- | :--- | :--- |
| **Desktop** | **1440px** | Persistent Dark Navy sidebar (`w-64`), 5-column metric grid, side-by-side analytics widgets, and 8-column data table. |
| **Tablet** | **768px** | Collapsible navigation drawer, 2-column metric card grid, scroll-protected table. |
| **Mobile** | **375px** | Touch-friendly controls (minimum 44px tap targets), hamburger menu, and automatic transformation from table to stacked inventory cards. |

---

## 4. Local Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vineeth2755/inventory_Stock_Management.git
   cd inventory_Stock_Management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build
To test the production build:
```bash
npm run build
npm run preview
```

---

## 5. Submission Documentation Links

- [Design System Reference](file:///C:/Users/rn018/Desktop/inventory-management/docs/DESIGN_SYSTEM.md)
- [AI Usage Documentation](file:///C:/Users/rn018/Desktop/inventory-management/AI_USAGE.md)
- [Phase 0 Setup Documentation](file:///C:/Users/rn018/Desktop/inventory-management/docs/PHASE_0_SETUP.md)
- [Phase 1 (Screen A) Documentation](file:///C:/Users/rn018/Desktop/inventory-management/docs/PHASE_1_SCREEN_A_DASHBOARD.md)
- [Phase 2 (Screen B) Documentation](file:///C:/Users/rn018/Desktop/inventory-management/docs/PHASE_2_SCREEN_B_INVENTORY_LIST.md)
- [Phase 3 (Screen C) Documentation](file:///C:/Users/rn018/Desktop/inventory-management/docs/PHASE_3_SCREEN_C_ITEM_DETAILS.md)
- [Phase 4 (Screen D) Documentation](file:///C:/Users/rn018/Desktop/inventory-management/docs/PHASE_4_SCREEN_D_ADD_EDIT_ITEM.md)
