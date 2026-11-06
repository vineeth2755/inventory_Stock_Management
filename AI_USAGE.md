# AI Usage Documentation (AI_USAGE.md)

**Assessment:** UX/UI Engineer 24-Hour Design & Development Assessment  
**Project:** Inventory Management Web Application (StockMatrix / InventoryPro)  
**Author:** Candidate Submission  
**Date:** November 2026  

---

## 1. Overview & AI Tools Utilized

In accordance with Section 8 of the assessment brief, this document outlines how AI-assisted tools were utilized during development, the architectural and design decisions made independently, material modifications applied to generated code, and specific issues identified and corrected.

### AI Tool Stack:
- **Antigravity AI (Coding Assistant):** Used for scaffolding repetitive component boilerplate, generating realistic mock datasets, and drafting initial component layouts.
- **Vite & Tailwind v4 Compiler:** Used for real-time build verification, bundle analysis, and syntax validation.

---

## 2. Independent Human Design & Architectural Decisions

The following fundamental design and technical choices were established independently:

1. **Information Architecture & 4-Screen User Journey:**
   - Designed a clear user narrative: *Morning Snapshot (Overview) ➔ Search & Triage (Catalog) ➔ Deep Inspection (Details) ➔ Take Action (Add/Edit Form)*.
   - Decided to structure the persistent sidebar around core top-level destinations (Dashboard, Catalog, Add Item), keeping *Item Details* strictly contextual as required by standard enterprise UX patterns.
2. **Accessible Status Design (WCAG AA Compliance):**
   - Enforced that status indicators must never rely on color alone. Designed the `<StatusBadge />` component combining high-contrast background tints, clear text labels, and distinct SVG icons (`CheckCircle2`, `AlertTriangle`, `XCircle`).
3. **State Management & Dynamic Metric Calculations:**
   - Chose React Context with `useMemo` over heavy external state libraries (e.g., Redux) to maintain a zero-dependency architecture while ensuring that adding, editing, or adjusting an item immediately recalculates dashboard metrics and transaction logs across all screens.
4. **Browser History Navigation:**
   - Integrated native `window.history.pushState` and `popstate` listeners so browser Back (`←`) and Forward (`→`) buttons transition between screens naturally.

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
   - *Issue:* Initially, the AI scaffold placed "Item Details" directly as a static link in the sidebar, which is unnatural since no specific item is selected on page load.
   - *Correction:* Replaced it with clean top-level destinations and linked Item Details contextually via row selection and eye action buttons.
2. **Duplicate SKU Vulnerability:**
   - *Issue:* Initial form generation did not check if a newly created SKU already existed in the catalog.
   - *Correction:* Implemented an inline validation rule in `ItemFormScreen.jsx` verifying that `formData.id` is unique before committing to state.
3. **Negative Stock Edge Case:**
   - *Issue:* Adjusting stock downward could result in negative stock balances.
   - *Correction:* Wrapped decrement operations in `Math.max(0, item.availableQty - adjustmentQty)` and automatically transitioned status to "Out of Stock" at 0 units.

---

## 5. Major Responsive Design & Mobile Adaptations

During final review, significant enhancements were made to ensure the application delivers a first-class mobile experience on 375px viewports rather than a degraded desktop view:

1. **Table-to-Card Transformation (`InventoryMobileCards.jsx`):**
   - Completely replaced wide, scroll-heavy tables on small screens with rich, touch-optimized cards featuring status accent stripes, SKU chips, visual stock gauges, and dedicated touch buttons.
2. **Collapsible Mobile Filter Sheet (`InventoryFilters.jsx`):**
   - Replaced large, multi-column desktop filter dropdowns on mobile with a compact search bar and an expandable **"Filters" toggle button** with an active filter counter badge, keeping mobile screens clean.
3. **Dedicated Mobile Stock Summary (`ItemDetailsScreen.jsx`):**
   - Designed a mobile-specific top KPI summary block placed directly under navigation so operators on the warehouse floor see Available, Reserved, and Reorder levels instantly without scrolling.
4. **Touch Target Accessibility Standards:**
   - Upgraded all interactive buttons, selects, and navigation links across the mobile view to meet the minimum **44×44px** touch target standard with active tactile feedback (`active:scale-[0.98]`).
