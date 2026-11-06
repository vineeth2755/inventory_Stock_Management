# Project Documentation: Step 3 – Screen C (Item Details)

**Milestone:** Step 3 of 4 (User Journey: Deep Inspection & Audit)  
**Target Viewports Verified:** Desktop (1440px), Tablet (768px), Mobile (375px)  
**Theme Compliance:** Indigo `#5145E5`, White Cards, Border `#E4E7EC`, Multi-attribute Stock Breakdown  

---

## 1. Overview & Objective
Screen C delivers the comprehensive inspection view for a single inventory record. It enables warehouse personnel and supply chain managers to understand:
- Exact item identity, category, and technical description.
- Granular quantity breakdown: **Available to promise**, **Reserved for active orders**, and **Safety reorder threshold**.
- Multi-tier location mapping (Warehouse facility, Bay/Aisle, and full location code).
- Real-time stock status alert banners (Low Stock warnings and Depleted alerts).
- Complete transaction movement audit trail (Receipts, Dispatches, and adjustments with dates, quantities, and authorized users).
- Fast interactive actions: **Adjust Stock** (live adjustment modal) and **Edit Item** (navigates to Screen D).

---

## 2. Assessment Requirements Mapping

| Requirement from Brief | Implementation Details | Status |
| :--- | :--- | :--- |
| **Item Identity** | ID (`INV-1001`), Name, Category, Description, and clean industrial placeholder asset | Verified |
| **Stock Information** | Available quantity, Reserved quantity, Reorder level, and Unit of measure | Verified |
| **Location Information** | Warehouse facility, zone/bay, and full location key | Verified |
| **Stock Status & Alerts** | Prominent status badge + conditional contextual warning banner (Low Stock / Out of Stock) | Verified |
| **Activity / History** | `StockMovementHistory` table detailing receipts/dispatches, dates, users, and audit notes | Verified |
| **Clear Actions** | `Adjust Stock` modal (interactive balance change + log update) & `Edit Item` action | Verified |
| **Responsive Layout** | 3-column desktop layout that cleanly collapses to a single stacked view on tablet & mobile | Verified |

---

## 3. Files Created & Modified

| File Path | Role | Description |
| :--- | :--- | :--- |
| `src/components/details/AdjustStockModal.jsx` | Molecule / Modal | Interactive dialog enabling users to add or deduct stock with live balance preview and audit reasons. |
| `src/components/details/StockMovementHistory.jsx` | Molecule | Chronological audit log showing transactions with direction indicators (green receipt vs amber dispatch). |
| `src/components/details/ItemDetailsScreen.jsx` | Screen Template | Connects identity, stock metrics, location cards, alert banners, and action controls for Screen C. |
| `src/App.jsx` | Root Container | Renders `ItemDetailsScreen` when `currentScreen === 'details'`. |

---

## 4. Component Architecture & Data Flow

```text
               ItemDetailsScreen (Screen C)
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
  [Item Identity]  [Location Card] [Stock Quantities]
  - ID & Name      - Warehouse     - Available Qty
  - Category       - Zone / Bay    - Reserved Qty
  - Description    - Location Key  - Reorder Threshold
  - Alert Banner                   - Health Ratio Bar
       │
       ├─────────────────────────────────┐
       ▼                                 ▼
StockMovementHistory             AdjustStockModal
(Receipts & Dispatches)          (Add / Deduct Units)
                                         │
                                [Calls adjustStock()]
                                         │
                                [Updates Global State]
```

---

## 5. Local Execution & Verification

Run the local development server:
```bash
npm run dev
```
1. Open `http://localhost:5173`.
2. From Screen A or Screen B, click any item row or the **Eye icon (`👁️`)**.
3. Verify the Item Details page:
   - Check the **Available**, **Reserved**, and **Reorder** level metrics.
   - Click the **"Adjust Stock"** button. Add `10` units with a note (e.g. `Emergency restock`).
   - Click **Confirm Adjustment** and watch the stock balance and movement history update immediately in real time!
   - Notice the status badge dynamically flip (e.g. from Low Stock to In Stock if stock rises above reorder level).

