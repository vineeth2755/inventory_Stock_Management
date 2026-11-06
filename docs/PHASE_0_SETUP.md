# Project Documentation: Initial Setup & Architecture Foundation

**Project Name:** Inventory Management Web Application  
**Repository:** [https://github.com/vineeth2755/inventory_Stock_Management.git](https://github.com/vineeth2755/inventory_Stock_Management.git)  
**Branch:** `main`  
**Tech Stack:** React 19 (JSX), Vite, Tailwind CSS v4, Lucide React  

---

## 1. Overview of Work Completed

This phase established the project environment, repository synchronization, styling tokens, and modular folder structure required for an enterprise-grade inventory management system.

### 1.1 Version Control & Remote Repository Integration
- Local Git repository was initialized using `git init`.
- Connected to the remote GitHub origin: `https://github.com/vineeth2755/inventory_Stock_Management.git`.
- Default branch was set to `main`.
- Remote commits were integrated via rebase to reconcile initial repository files.
- All starter assets, configs, and documentation were staged, committed, and pushed upstream.

### 1.2 Frontend Tooling & Dependencies
- Scaffolded using Vite with the React (JSX) template for fast Hot Module Replacement (HMR) and optimized build performance.
- Installed production and developer dependencies:
  - `react` & `react-dom`: Core application library.
  - `tailwindcss` & `@tailwindcss/vite`: Utility-first CSS framework configured via the official Vite plugin.
  - `lucide-react`: Accessible, lightweight SVG icon package for enterprise dashboard metrics, status indicators, and navigation.
  - `clsx` & `tailwind-merge`: Utility functions to construct conditional class names without style conflicts.

### 1.3 Design System Tokens Configuration
Defined custom design tokens within `src/index.css` using the `@theme` directive to enforce visual consistency across all upcoming screens:

| Token Name | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--color-brand-primary` | `#5145E5` | Primary action buttons, active navigation indicator |
| `--color-brand-primary-hover` | `#4338CA` | Hover state for primary interactions |
| `--color-brand-secondary` | `#26334D` | Secondary buttons and heading elements |
| `--color-brand-sidebar` | `#151D31` | Dark Navy persistent sidebar navigation |
| `--color-brand-sidebar-hover` | `#1E293B` | Sidebar item hover state |
| `--color-brand-bg` | `#F5F7FB` | Main application canvas background |
| `--color-brand-card` | `#FFFFFF` | Card surfaces and table containers |
| `--color-brand-text` | `#182230` | High-contrast primary body text |
| `--color-brand-muted` | `#667085` | Subtitles, labels, and helper text |
| `--color-brand-border` | `#E4E7EC` | Container borders and divider lines |
| `--color-status-in-stock` | `#10B981` | Green status accent (In Stock) |
| `--color-status-in-stock-bg` | `#ECFDF5` | Soft green background badge |
| `--color-status-low-stock` | `#F59E0B` | Amber status accent (Low Stock) |
| `--color-status-low-stock-bg` | `#FFFBEB` | Soft amber background badge |
| `--color-status-out-of-stock` | `#EF4444` | Red status accent (Out of Stock) |
| `--color-status-out-of-stock-bg` | `#FEF2F2` | Soft red background badge |

Typography defaults to `Inter`, with fallbacks to system sans-serif fonts.

---

## 2. Directory Architecture

The application adopts a feature-and-concern separated structure inside `src/`:

```text
inventory-management/
├── public/                     # Static files (SVG icons, favicon)
├── src/
│   ├── assets/                 # Local images and graphic assets
│   ├── components/             # UI Components
│   │   ├── common/             # Reusable atomic UI (Badges, Buttons, Cards)
│   │   ├── layout/             # Persistent frame (Sidebar, Header, Shell)
│   │   └── dashboard/          # Screen A specific views and widgets
│   ├── context/                # Global state provider (InventoryContext)
│   ├── data/                   # Mock dataset (Items, categories, movement history)
│   ├── styles/                 # Additional style utilities and token definitions
│   ├── utils/                  # Filtering, sorting, and calculation helper functions
│   ├── App.jsx                 # Application entry point and layout shell
│   ├── index.css               # Design tokens and global CSS declarations
│   └── main.jsx                # DOM root initialization
├── .gitignore                  # Git untracked pattern definitions
├── package.json                # Dependencies, scripts, and package metadata
├── README.md                   # Setup instructions and run commands
└── vite.config.js              # Vite compiler and plugin configuration
```

---

## 3. Configuration Files Description

### `vite.config.js`
Registers `@vitejs/plugin-react` and `@tailwindcss/vite`. This setup enables native compilation of Tailwind v4 inside Vite without needing manual PostCSS configuration files.

### `src/index.css`
Declares the `@import "tailwindcss";` directive and specifies design token CSS custom properties under `@theme`. Ensures zero hard-coded arbitrary color values in component JSX.

### `package.json`
Contains npm scripts:
- `npm run dev`: Starts local development server on port 5173.
- `npm run build`: Executes production build and bundles assets to `/dist`.
- `npm run preview`: Locally previews the production build.

### `.gitignore`
Excludes temporary files, local environment configurations, build outputs (`dist/`), and third-party modules (`node_modules/`) from Git tracking.

---

## 4. Current State & Verification

- Repository branch `main` is in sync with GitHub remote `origin/main`.
- Application builds cleanly with zero errors (`npm run build` confirmed).
- Styling tokens are initialized and ready for component development.
