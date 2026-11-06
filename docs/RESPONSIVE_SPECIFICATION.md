# Application Responsiveness Architecture & Viewport Specification

**Application Name:** StockMatrix (InventoryPro)  
**Primary Breakpoints Target:** Mobile (375px), Tablet (768px), Desktop (1440px)  
**Framework:** React 19 (JSX) with Tailwind CSS v4 Responsive Utilities  
**Accessibility Standard:** Touch target minimum 44×44px, WCAG AA Contrast, No horizontal overflow  

---

## 1. Global Responsive Strategy: "Adaptive, Not Just Scaled"

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

## 2. Screen-by-Screen Component Responsive Breakdown

### 2.1 Global Shell & Navigation
| Component | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **`Sidebar.jsx`** | Fixed `left-0 top-0 bottom-0 w-64`, persistent content canvas padding `lg:pl-64`. | Hidden off-canvas (`-translate-x-full`); slides in when hamburger clicked with backdrop blur. | Hidden off-canvas; full sliding drawer with large touch links and user profile at the base. |
| **`Header.jsx`** | Full breadcrumbs, subtitle, live status badge, and desktop CTA buttons. | Hamburger menu button visible; page title with compact action buttons. | Streamlined header: hamburger button, truncated title, and prominent `+ Add` button with high touch target. |

---

### 2.2 Screen A – Inventory Overview / Dashboard
| Component | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **`StatCardsGrid.jsx`** | 5 cards in a single row (`xl:grid-cols-5`) showing Total, In Stock, Low Stock, Out of Stock, and Action Required. | 2×2 grid + 1 full-width card (`grid-cols-2`). | 2×2 grid with `Total Items` given full prominence (`col-span-2`), color accent borders, and tap-to-review urgent action. |
| **`CategoryChart.jsx`** | 2-column layout side-by-side with urgent triage widget. | Full width card stacked vertically. | Card with multi-segment horizontal health bars, percentage labels, and wrapped touch legend. |
| **`UrgentItemsWidget.jsx`**| 2-column layout; table-like rows with desktop action icons (`Eye` and `Edit`). | Stacked card layout with direct row click. | Mobile list items with chevron navigation indicators (`ChevronRight`) and tap-anywhere item inspection. |

---

### 2.3 Screen B – Inventory Catalog & List
| Component | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **`InventoryFilters.jsx`**| Full width search bar + 4-column filter grid (Category, Location, Status, Reset) always visible. | 2×2 filter grid below search. | Search bar with instant **"Filters (X)" toggle button** to keep the screen uncluttered. Dropdowns expand on demand. |
| **`InventoryTable.jsx`** | Full 8 columns with hover states, sorting indicators, and inline action buttons. | Preserved with horizontal overflow guard and sticky table headers. | Automatically unmounted (`hidden sm:block`) to prevent horizontal pinch/zoom fatigue. |
| **`InventoryMobileCards.jsx`**| Unmounted on larger screens (`sm:hidden`). | Unmounted on tablet. | **Active View:** Renders rich inventory cards featuring status color stripes, SKU chips, prominent available vs safety gauges, and tap-friendly action buttons. |
| **`Pagination.jsx`** | Horizontal bar: Showing items 1–8 of 12 on left; page numbers and buttons on right. | Flex items balanced across tablet width. | Stacked layout: range text centered on top; large touch-friendly `Previous` and `Next` buttons side-by-side. |

---

### 2.4 Screen C – Item Details (Deep Inspection)
| Component | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **`ItemDetailsScreen.jsx`**| 3-Column Grid (`lg:grid-cols-3`): Left 2 columns hold identity, location, and movement logs; right column holds stock metrics & gauges. | 1-Column stacked layout: Identity ➔ Stock Gauges ➔ Location ➔ Movement Log. | 1-Column stacked layout with full-width alert banners, visual stock ratio meter, and sticky header actions. |
| **`AdjustStockModal.jsx`**| Centered modal dialog (`max-w-md`) with 2-column action toggle. | Centered modal dialog. | Bottom-sheet style modal with large touch inputs, numeric spinners, and full-width confirm button. |
| **`StockMovementHistory.jsx`**| Multi-column audit rows with user chips and timestamp metadata. | Rows adapt with wrapped timestamps. | Vertical transaction cards showing direction badge (green receipt vs amber dispatch), date, user, and quantity. |

---

### 2.5 Screen D – Add / Edit Item Form
| Component | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **`ItemFormScreen.jsx`** | 3-Section structured layout with 3-column input grids and side-by-side warehouse selectors. | 2-Column input grids. | Single-column form layout (`grid-cols-1`) with clear visual boundaries, large touch inputs, inline red error messages, and sticky bottom action bar. |

---

## 3. Touch Optimization Standards (Mobile POV)

1. **Touch Target Size:**  
   Every interactive button, filter select, and navigation link strictly respects a minimum height of **40px–44px** to prevent mistaps on small touchscreens.
2. **Active Tap Feedback:**  
   Components use Tailwind's `active:scale-[0.98]` and `active:bg-slate-100` classes, providing immediate visual feedback when tapped on physical mobile devices.
3. **Typography & Readability:**  
   Font sizes on mobile never fall below `11px` for metadata and `14px` for body text, ensuring readability under warehouse lighting conditions without zooming.
4. **Zero Horizontal Layout Shift (Zero Overflow):**  
   All root containers and wrappers use `min-w-0`, `max-w-full`, and `overflow-hidden` where appropriate, ensuring that no element causes accidental sideways scrolling on 375px screens.

---

## 4. Verification Checkpoints

The responsive system has been tested against the three assessment viewports:
- `375px × 667px` (iPhone SE / Standard Mobile)
- `768px × 1024px` (iPad Mini / Tablet)
- `1440px × 900px` (MacBook / Desktop Monitor)
