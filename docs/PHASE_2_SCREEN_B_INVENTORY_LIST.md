# Phase 2 Specification: Screen B – Inventory Catalog & List

**Application:** StockMatrix (InventoryPro)  
**Screen:** Screen B (Catalog View)  
**User Journey Role:** Search, Filter, Sort & Triage  
**Target Viewports:** Desktop (1440px), Tablet (768px), Mobile (375px)  

---

## 1. Overview & Business Objective
Screen B delivers the central data-rich inventory catalog. Designed to maintain high readability, responsive performance, and fast lookups as inventory records grow into thousands of items.

---

## 2. Table Specifications (8 Required Fields)

Every record displays the exact eight fields specified in the assessment brief:
1. **Item ID:** Unique SKU key (e.g. `INV-1001`).
2. **Item Name:** Product display name (e.g. `Industrial Air Filter AF-90`).
3. **Category:** Product classification (`Consumables`, `Components`, `Electrical`, `Machinery & Tools`, `Safety & PPE`).
4. **Location:** Facility and storage coordinate (`Warehouse A - Bay 12`).
5. **Available Quantity:** Units on hand with unit of measure label.
6. **Reorder Level:** Minimum safety stock threshold.
7. **Last Updated:** ISO timestamp of the most recent stock movement or edit.
8. **Status:** Accessible badge (`In Stock`, `Low Stock`, `Out of Stock`) coupling SVG iconography with text.

---

## 3. Functionality & Controls

### 3.1 Search & Multi-Level Filtering (`InventoryFilters.jsx`)
- **Text Search:** Real-time matching against Item ID or Item Name.
- **Category Filter:** Dropdown populated from system categories.
- **Location Filter:** Dropdown filtering by warehouse facility.
- **Status Filter:** Dropdown filtering by stock status.
- **Reset Action:** Single-click clear button restoring default catalog state.

### 3.2 Sorting & Pagination
- **Sorting:** Interactive table headers supporting ascending/descending order on `Item Name`, `Available Qty`, and `Last Updated`.
- **Pagination:** Clean 8-records-per-page pagination with range feedback (`Showing 1 to 8 of 12 records`) and boundary-disabled controls.

### 3.3 Row-Level Actions
- Clicking any row or the **Eye Icon (`👁️`)** opens Screen C (Item Details).
- Clicking the **Pencil Icon (`✏️`)** opens Screen D (Edit Item Form).

---

## 4. Responsive Adaptation
- **Desktop (1440px):** High-density 8-column data table with hover row highlights.
- **Tablet (768px):** Preserved table layout with scroll boundary protection.
- **Mobile (375px):** Table dynamically transforms into stacked inventory cards (`InventoryMobileCards.jsx`) featuring top status color stripes, SKU chips, visual stock gauges, and thumb-friendly `Inspect` buttons.
