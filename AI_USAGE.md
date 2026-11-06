# AI Usage Documentation (AI_USAGE.md)

**Assessment:** UX/UI Engineer 24-Hour Design & Development Assessment  
**Project:** Inventory Management Web Application (StockMatrix)  
**Author:** Candidate Submission  
**Date:** November 2026  

---

## 1. Overview & AI Tools Utilized

In accordance with Section 8 of the assessment brief, this document outlines how AI-assisted tools were utilized, key human architectural decisions made independently, material modifications applied to generated code, and errors/edge cases identified and corrected.

### AI Tool Stack:
- **Antigravity AI (Coding Assistant):** Scaffolded repetitive boilerplate, generated baseline mock data catalogs, and drafted initial component layouts.
- **Vite & Tailwind v4 Compiler:** Verified build health, bundle sizes, and syntax compliance in real time.

---

## 2. Independent Human Design & Architectural Decisions

The following fundamental design and technical choices were established independently:

1. **Information Architecture & 4-Screen User Journey:**
   - Designed a clear user narrative: *Morning Snapshot (Overview) ➔ Search & Triage (Catalog) ➔ Deep Inspection (Details) ➔ Take Action (Add/Edit Form)*.
   - Decided to structure the persistent sidebar around core destinations (Dashboard, Catalog, Add Item), keeping *Item Details* strictly contextual as required by standard enterprise UX patterns.
2. **Accessible Status Design (WCAG AA Compliance):**
   - Mandated that status indicators must never rely on color alone. Designed the `<StatusBadge />` atom combining high-contrast background tints, localized text, and distinct SVG icons (`CheckCircle2`, `AlertTriangle`, `XCircle`).
3. **Responsive Mobile Adaptation Strategy:**
   - Rather than simply adding horizontal scrollbars to an 8-column table on mobile devices, explicitly designed `<InventoryMobileCards />` to transform tabular records into stacked, touch-friendly cards on viewports under 640px (including 375px mobile).
4. **State Architecture:**
   - Chose React Context with `useMemo` over external heavy state libraries (like Redux) to maintain zero-dependency lightness while ensuring that adding, editing, or adjusting an item instantly updates dashboard metrics and transaction logs across all screens.

---

## 3. Material Changes to AI-Generated Code

| Initial AI Suggestion | Human Decision / Modification | Reason for Change |
| :--- | :--- | :--- |
| Static KPI cards with hardcoded numbers. | Replaced with dynamic `useMemo` metric calculations in `InventoryContext.jsx`. | Real-time synchronization when users add or adjust inventory records. |
| Basic text fields for item status. | Replaced with automated status calculation based on `availableQty <= reorderLevel`. | Eliminates user error; stock health is derived directly from inventory math. |
| Wide table on all screens with horizontal overflow. | Created dual-rendering strategy (`InventoryTable` on desktop, `InventoryMobileCards` on mobile). | Fulfills the explicit assessment instruction: *"Do not simply shrink the desktop layout"*. |
| Standalone alert dialog for stock adjustments. | Designed an interactive modal (`AdjustStockModal.jsx`) that logs an audit movement entry with user, date, quantity, and reason. | Fulfills enterprise audit trail expectations for warehouse logistics. |

---

## 4. AI-Output Issues Identified and Corrected

1. **Navigation Structure Confusion:**
   - *Issue:* Initially, an AI scaffold placed "Item Details" directly as a static link in the sidebar, which is unnatural since no specific item is selected on page load.
   - *Correction:* Replaced it with clean top-level destinations and linked Item Details contextually via row selection and eye action buttons.
2. **Duplicate SKU Vulnerability:**
   - *Issue:* Initial form generation did not check if a newly created SKU already existed in the catalog.
   - *Correction:* Implemented an inline validation rule in `ItemFormScreen.jsx` verifying that `formData.id` is unique before committing to state.
3. **Negative Stock Edge Case:**
   - *Issue:* Adjusting stock downward could result in negative stock balances.
   - *Correction:* Wrapped decrement operations in `Math.max(0, item.availableQty - adjustmentQty)` and automatically transitioned status to "Out of Stock" at 0 units.

---

## 5. Summary & Verification

All code, styling, and design system tokens have been thoroughly reviewed, locally tested across the three target viewports (1440px, 768px, 375px), and verified for production build cleanliness (`npm run build` exits code 0).

