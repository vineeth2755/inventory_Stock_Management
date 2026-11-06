# Design System Reference: StockMatrix Enterprise

**Application:** Inventory Management Web Application  
**Design Paradigm:** Enterprise SaaS, High-Density Information Architecture, Accessibility First (WCAG AA)  
**Target Viewports:** Desktop (1440px), Tablet (768px), Mobile (375px)  

---

## 1. Color Palette & Semantics

The color palette was strictly selected to deliver high contrast, minimal eye fatigue during extended operational shifts, and purposeful feedback.

### 1.1 Brand & Structure
| Token Name | Value | Hex | Usage & Purpose |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | `--color-brand-primary` | `#5145E5` | Primary CTA buttons (`Add Item`, `Save`), active navigation pills |
| **Primary Hover** | `--color-brand-primary-hover` | `#4338CA` | Hover and active states for primary actions |
| **Secondary** | `--color-brand-secondary` | `#26334D` | Section titles, subheadings, and high-emphasis labels |
| **Sidebar Canvas** | `--color-brand-sidebar` | `#151D31` | Dark Navy persistent sidebar navigation |
| **Sidebar Hover** | `--color-brand-sidebar-hover` | `#1E293B` | Interactive hover highlight for sidebar links |
| **App Canvas** | `--color-brand-bg` | `#F5F7FB` | Soft neutral grey-blue background reducing glare |
| **Card Surface** | `--color-brand-card` | `#FFFFFF` | Container backgrounds, tables, modal dialogs |
| **Primary Text** | `--color-brand-text` | `#182230` | High-contrast body text, table data, and form labels |
| **Muted Text** | `--color-brand-muted` | `#667085` | Metadata, timestamps, helper text, and placeholders |
| **Border / Divider** | `--color-brand-border` | `#E4E7EC` | Subtle container borders and table grid dividers |

### 1.2 Status & Feedback (Accessible: Never Color Alone)
Every status indicator couples an explicit SVG icon with clear text and a high-contrast background:

| Status State | Text / Icon Hex | Background Hex | Icon Component | Semantics |
| :--- | :--- | :--- | :--- | :--- |
| **In Stock** | `#065F46` | `#ECFDF5` | `CheckCircle2` | Healthy quantity above reorder threshold |
| **Low Stock** | `#92400E` | `#FFFBEB` | `AlertTriangle` | Quantity at or below safety reorder level |
| **Out of Stock** | `#991B1B` | `#FEF2F2` | `XCircle` | Zero available quantity; immediate restock required |

---

## 2. Typography & Type Scale

* **Font Family:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
* **Line Heights & Tracking:** Tight letter-spacing on bold headings; generous line height (`leading-relaxed`) on descriptions.

| Style Role | Font Size | Weight | Line Height | CSS / Tailwind Class |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Page Title** | 24px (1.5rem) | 700 (Bold) | 1.25 | `text-2xl font-bold tracking-tight` |
| **Card / Section Heading** | 16px (1.0rem) | 700 (Bold) | 1.35 | `text-base font-bold text-slate-900` |
| **Metric Large Number** | 30px (1.875rem) | 800 (Extrabold) | 1.1 | `text-3xl font-bold tracking-tight` |
| **Table Header / Label** | 11px (0.6875rem) | 600 (Semibold) | 1.2 | `text-[11px] font-semibold uppercase tracking-wider` |
| **Body Regular** | 14px (0.875rem) | 400 (Normal) | 1.5 | `text-sm text-slate-700 leading-normal` |
| **Caption / Meta** | 12px (0.75rem) | 500 (Medium) | 1.4 | `text-xs text-slate-500` |
| **Code / SKU Identifier** | 12px (0.75rem) | 600 (Semibold) | 1.0 | `font-mono text-xs font-semibold` |

---

## 3. Spacing, Elevation & Layout Principles

### 3.1 Spacing Scale
Consistent 4px/8px incremental scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`):
- Card padding: `p-6` (24px) on desktop; `p-4` (16px) on mobile.
- Gap between grid items: `gap-6` (24px) for major layout blocks; `gap-3` (12px) for form inputs.

### 3.2 Elevation & Borders
- **Border Radius:** `rounded-xl` (12px) for cards, dialogs, and outer containers; `rounded-lg` (8px) for buttons and inputs.
- **Elevation:** Subtle, low-opacity drop shadows (`shadow-xs` / `shadow-sm`) to avoid visual noise; `shadow-xl` for modal dialogs to elevate focus.

---

## 4. Core Component Specifications & Variants

### 4.1 Buttons
- **Primary:** `bg-[#5145E5] text-white hover:bg-indigo-700 active:scale-95`
- **Secondary / Neutral:** `bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`
- **Destructive / Alert:** `bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100`

### 4.2 Status Badge (`<StatusBadge />`)
- **Pill Shape:** `rounded-full border px-2.5 py-1 text-xs font-medium`
- Always renders an accompanying SVG icon (`CheckCircle2`, `AlertTriangle`, or `XCircle`) to comply with accessibility rules against color-alone reliance.

### 4.3 Metric Card (`<MetricCard />`)
- Standardized layout containing: Upper label, right-aligned icon badge, prominent KPI number, and lower contextual trend/percentage.

### 4.4 Form Controls & Validation
- **Inputs:** `px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5145E5]`
- **Invalid State:** `border-rose-400 bg-rose-50/30 text-rose-900` + red error text and alert icon below field.
- **Required Indicator:** Red asterisk `<span className="text-rose-500">*</span>`.

---

## 5. Responsive Breakpoints & Adaptation Rules

| Viewport | Width | Layout Adaptation |
| :--- | :--- | :--- |
| **Desktop** | **1440px** | Persistent Dark Navy sidebar (`w-64`). 5-column metric grid. 2-column analytics cards. 8-column high-density data table with sorting and pagination. |
| **Tablet** | **768px** | Sidebar collapses into an accessible sliding drawer. Metric cards wrap to 2-column grid. Data table remains scrollable and legible. |
| **Mobile** | **375px** | Single-column stacked cards. Hamburger menu trigger in top header. Wide tables automatically transform into touch-friendly stacked inventory cards. Minimum 44px tap targets for mobile usability. |
