# Project Documentation: Step 4 – Screen D (Add / Edit Item)

**Milestone:** Step 4 of 4 (User Journey: Take Action & Register Stock)  
**Target Viewports Verified:** Desktop (1440px), Tablet (768px), Mobile (375px)  
**Design Consistency:** Primary `#5145E5`, White Card Surface, Subtle Borders `#E4E7EC`, Inline Validation Errors  

---

## 1. Overview & Objective
Screen D provides the guarded data entry interface for:
1. Registering newly procured inventory SKUs.
2. Updating existing product specifications, safety thresholds, or storage coordinates.

It implements enterprise form UX principles: logical field grouping, clear required indicators (`*`), instant inline validation warnings, auto-generated unique IDs, and real-time state synchronization across the dashboard and inventory catalog.

---

## 2. Assessment Requirements Mapping

| Requirement from Brief | Implementation Details | Status |
| :--- | :--- | :--- |
| **Item Name** | Required text input with minimum 3-character validation | Verified |
| **Unique Item ID** | Required text input with duplicate-SKU check on Add mode; locked on Edit mode | Verified |
| **Category** | Required dropdown populated from central system categories | Verified |
| **Description** | Required multiline textarea for specifications and use cases | Verified |
| **Unit of Measure** | Required selector (`Units`, `Pieces`, `Boxes`, `Rolls`, `Cans`, `Packs`, `Tubes`) | Verified |
| **Storage Location** | Required Warehouse dropdown + Zone/Bay text input | Verified |
| **Available Quantity** | Required non-negative numeric input | Verified |
| **Reorder Level** | Required non-negative numeric threshold input | Verified |
| **Optional Supplier / Reference** | Optional text input for vendor names or PO numbers | Verified |
| **Validation & Error Messages** | Inline red error messages and red border highlights on invalid submit | Verified |
| **Clear Save & Cancel Actions** | Cancel button returns to catalog; Save button validates, commits to state, and redirects to details view | Verified |

---

## 3. Files Created & Modified

| File Path | Role | Description |
| :--- | :--- | :--- |
| `src/components/form/ItemFormScreen.jsx` | Screen Template | 3-section structured form with validation, error states, and dual Add/Edit modes. |
| `src/App.jsx` | Root Container | Renders `ItemFormScreen` when `currentScreen === 'form'`. |

---

## 4. Component Architecture & Data Flow

```text
                 ItemFormScreen (Screen D)
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
[1. Identity Section] [2. Stock Levels]    [3. Location & Vendor]
- SKU / Item ID *     - Available Qty *    - Warehouse *
- Item Name *         - Reserved Qty       - Zone / Bay *
- Category *          - Reorder Level *    - Supplier Reference
- Unit of Measure *
- Description *
       │
       ▼
 [validateForm()]  ───(Invalid)───► Inline Error Messages
       │
    (Valid)
       │
       ▼
[addItem() / updateItem()] ──► Updates Central InventoryContext
       │
       ▼
 [Success Toast] ──► Auto-redirect to Screen C (Item Inspection)
```

---

## 5. Local Execution & Verification

Run the local development server:
```bash
npm run dev
```
1. Open `http://localhost:5173`.
2. Click **"+ Add New Item"** in the top header (or sidebar).
3. Try clicking **"Create Inventory Item"** immediately with empty fields:
   - Notice the inline red validation errors and red input borders.
4. Fill out valid details:
   - Set Available Quantity to `5` and Reorder Level to `10`.
5. Click **"Create Inventory Item"**:
   - Notice the green success alert banner.
   - It redirects you automatically to **Screen C (Item Details)**.
   - Notice the item status automatically computes to **"Low Stock"** because `5 <= 10`!
   - Navigate back to **Screen A (Dashboard)** and notice the Total Items and Low Stock KPI counts have incremented!

