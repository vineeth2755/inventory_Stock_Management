# Project Documentation: Step 2 – Screen B (Inventory List)

**Milestone:** Step 2 of 4 (User Journey: Search & Triage)  
**Target Viewports Verified:** Desktop (1440px), Tablet (768px), Mobile (375px)  
**Design Consistency:** Primary `#5145E5`, Border `#E4E7EC`, Background `#F5F7FB`, Badges with Icons + Text  

---

## 1. Overview & Objective
Screen B delivers the central data-rich inventory catalog. It is designed to remain clear, searchable, and responsive as the number of warehouse records grows into hundreds or thousands of SKUs.

---

## 2. Assessment Requirements Mapping

| Requirement from Brief | Implementation Details | Status |
| :--- | :--- | :--- |
| **8 Required Columns** | `Item ID`, `Item Name`, `Category`, `Location`, `Available Quantity`, `Reorder Level`, `Last Updated`, `Status` | Verified |
| **Search Functionality** | Real-time search matching either `Item ID` (e.g. INV-1001) or `Item Name` | Verified |
| **Category Filter** | Dropdown with All + 5 distinct categories | Verified |
| **Location Filter** | Dropdown with All + 3 distinct warehouse facilities | Verified |
| **Stock Status Filter** | Dropdown with All + `In Stock`, `Low Stock`, `Out of Stock` | Verified |
| **Sortable Columns** | Interactive header sorting for `Item Name`, `Available Qty`, and `Last Updated` | Verified |
| **Pagination** | Controlled 8-items-per-page with range indicator and prev/next page buttons | Verified |
| **Row-Level Actions** | Direct click on row or Eye icon (`👁️`) opens Screen C (Item Details); Edit icon (`✏️`) opens Screen D | Verified |
| **Empty State** | User-friendly empty state with "Clear all filters" and "Add New Item" actions | Verified |
| **Mobile Responsiveness** | Switches from wide table on desktop/tablet to vertical stacked cards on mobile (375px) | Verified |

---

## 3. Files Created & Modified

| File Path | Role | Description |
| :--- | :--- | :--- |
| `src/components/inventory/InventoryFilters.jsx` | Molecule | Search bar + 3 dropdown filters (Category, Location, Status) + Reset action. |
| `src/components/inventory/InventoryTable.jsx` | Organism | High-density desktop & tablet table with sorting headers, status badges, and hover states. |
| `src/components/inventory/InventoryMobileCards.jsx` | Organism | Mobile-optimized cards (375px) displaying item attributes without horizontal scroll fatigue. |
| `src/components/inventory/Pagination.jsx` | Molecule | Accessible page controls with dynamic item count calculations. |
| `src/components/inventory/InventoryListScreen.jsx` | Screen Template | Connects filters, sorting, pagination, and data views for Screen B. |
| `src/App.jsx` | Root Container | Injects `InventoryListScreen` when `currentScreen === 'list'`. |

---

## 4. Component Architecture & Data Flow

```text
              InventoryListScreen (Screen B)
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
InventoryFilters                  processedItems (useMemo)
  - Search Text                     - Filter by search
  - Category Dropdown               - Filter by category
  - Location Dropdown               - Filter by location
  - Status Dropdown                 - Filter by status
  - Reset Action                    - Sort by column key
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
          [Screen >= 640px]                           [Screen < 640px]
          InventoryTable                              InventoryMobileCards
         (8-column table)                            (Stacked item cards)
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                                     Pagination
                              (Page 1 of N, Prev / Next)
```

---

## 5. Local Execution & Verification

Run the local development server:
```bash
npm run dev
```
1. Open `http://localhost:5173`.
2. Click **"Screen B: Inventory List"** in the sidebar (or **"View Catalog"** in the header).
3. Test search (e.g. type `Filter` or `INV-1003`).
4. Test filtering by Category (`Consumables`), Location (`Warehouse A`), or Status (`Low Stock`).
5. Click on column headers (`Available Qty`) to toggle ascending/descending sort.
6. Resize your browser to 375px mobile width to verify the responsive card layout.
