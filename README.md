# Verdant Beauty — Growth Ecommerce Store Global Dashboard

**Job ID:** `1S8e1o2e284Ah70FxeUY`  
**Assignment Ref:** `1t5iv80pU5QGbJrtXf2i76BPu302_1S8e1o2e284Ah70FxeUY`  
**Client:** Growth Ecommerce Store Global  
**Brand:** Verdant Beauty (Organic Cosmetics & Wellness Storefront)  
**Live Site URL:** [https://polite-mermaid-0f58e3.netlify.app](https://polite-mermaid-0f58e3.netlify.app)  

---

## 🌿 Project Overview

A responsive, high-performance admin dashboard interface for **Verdant Beauty**, an organic cosmetics e-commerce brand. The dashboard enables merchandising and operations staff to track key performance indicators (KPIs), analyze sales channels, and inspect recent transaction records with dynamic search, multi-factor filtering, and sorting.

### Key Capabilities
- **Verified KPI Calculations:** Implements exact business logic from `metric_definitions.csv`:
  - **Net Sales:** Sum of `net_amount_inr` for `Paid` orders (`₹73,436`).
  - **Paid Orders:** Count of successful `Paid` orders (`86`).
  - **Average Order Value (AOV):** Net Sales divided by Paid Orders (`₹854`).
  - **Refunds:** Count of `Refunded` records (`29`).
- **Reusable Component Architecture:** Functional React components with hooks (`useState`, `useMemo`).
- **Zero-JavaScript Responsive Breakpoints:** 100% pure CSS media queries (`<=600px`, `601px–1023px`, `>=1024px`). Absolutely no `window.addEventListener('resize')`.
- **Zero Horizontal Scroll on Mobile:** Mobile view uses custom stacked transaction cards designed specifically for narrow viewports (390px iPhone reference).
- **Keyboard & Screen Reader Accessible:** Semantic HTML5, visible focus indicators (`:focus-visible` with 3px `#C8A76B` outline), and ARIA attributes.
- **Brand-Aligned Organic Aesthetic:** Deep Forest (`#244E3B`), Sage (`#DCE9D7`), Warm Paper (`#F8F7F0`), Ink (`#203329`), and Muted Gold (`#C8A76B`).

---

## 🌐 Live Deployment & Code Repository
- **Production URL:** [https://polite-mermaid-0f58e3.netlify.app](https://polite-mermaid-0f58e3.netlify.app)
- **GitHub Repository:** [https://github.com/HetalSavaliya/verdant_beauty](https://github.com/HetalSavaliya/verdant_beauty)

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ / v22+ recommended)
- **npm**: v9.0.0 or higher

### Installation & Setup

1. **Clone or navigate into the project directory:**
   ```bash
   cd SkillNexa_1S8e1o2e284Ah70FxeUY_Dashboard_Admin_Panels_v01
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Run a production build:**
   ```bash
   npm run build
   ```
   Generates optimized production assets in the `dist/` directory.

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```
   Serves the production build at `http://localhost:4173`.

---

## 📁 Component & Project Architecture

```
├── public/
│   ├── favicon.svg             # Verdant brand icon
│   └── verdant_logo.svg        # Brand logo asset
├── QA/
│   └── TEST_CASES.csv          # Completed QA test matrix with verification outcomes
├── src/
│   ├── assets/
│   │   └── verdant_logo.svg    # Brand emblem
│   ├── components/
│   │   ├── BannerCards.jsx     # Botanical brand highlight & quick insight cards
│   │   ├── FilterBar.jsx       # Search input, status/channel/region dropdowns & reset
│   │   ├── MetricCard.jsx      # Reusable KPI card component (title, value, hint, variant)
│   │   ├── Sidebar.jsx         # Responsive sidebar navigation & mobile off-canvas drawer
│   │   └── TransactionTable.jsx# Tabular transaction view, mobile card view, sorting, pagination
│   ├── data/
│   │   ├── filter_reference.json
│   │   └── transactions_144.json # 144 source transaction records
│   ├── styles/
│   │   └── base.css            # Modular design system, CSS tokens, and media queries
│   ├── App.jsx                 # Main application controller, KPI calculations & state
│   └── main.jsx                # React DOM entry point
├── COMPLETION_NOTE.txt         # Submission metadata and delivery details
├── index.html                  # HTML entry point with meta viewport & branding
├── package.json                # Project dependencies and Vite build scripts
├── vite.config.js              # Vite bundler configuration
└── README.md                   # Project documentation
```

### Component Details

- **`MetricCard.jsx`**: Reusable component for displaying top-level statistics. Accepts `title`, `value`, `hint`, and `variant` (`sage` or `refund`).
- **`TransactionTable.jsx`**: Receives an array of transaction objects via `transactions` prop. Features:
  - Column sorting by Order ID, Date, Product Name, Channel, and Net Amount.
  - Pagination controls (12 records per page) with record counters.
  - Responsive layout switching: Standard HTML `<table>` on desktop/tablet, switching to stacked card layout on mobile viewports (`<=600px`).
  - Meaningful empty state: Displays `"No transactions match your search."` with an organic leaf icon and a direct "Reset all filters" button when filters yield 0 records.
- **`Sidebar.jsx`**: Renders `verdant.` brand mark, `ADMIN WORKSPACE` label, and navigation links. On mobile, functions as an accessible off-canvas drawer with backdrop overlay and close trigger.
- **`FilterBar.jsx`**: Search filter by text (ID, customer, product, channel), dropdowns for Payment Status (`Paid`, `Pending`, `Refunded`), Channels (`Website`, `Marketplace`, `Mobile App`), and Regions (`North`, `South`, `East`, `West`).
- **`BannerCards.jsx`**: Brand value proposition card with botanical SVG illustration and quick operational telemetry metrics.

---

## 🎨 Color Palette & Design System

| Token Name | Hex Code | Purpose |
|------------|----------|---------|
| `--color-forest` | `#244E3B` | Primary brand color, sidebar background, mobile header |
| `--color-forest-active` | `#426B52` | Active navigation pill background |
| `--color-sage` | `#DCE9D7` | Brand accent, KPI sage indicator, botanical banner |
| `--color-warm-paper` | `#F8F7F0` | Body and dashboard canvas background |
| `--color-ink` | `#203329` | Primary text and headings |
| `--color-text-secondary`| `#657569` | Metric titles, subheadings, labels |
| `--color-gold` | `#C8A76B` | Focus rings (`:focus-visible`), accent trim |
| `--status-refund-bg` | `#F4DDD5` | Refund badge and warning accent |

---

## 📱 Responsive Breakpoints

All responsive adjustments are governed solely by CSS media queries in `src/styles/base.css`:

1. **Desktop (`>= 1024px`)**:
   - Fixed 246px left sidebar.
   - 4-column KPI grid (`repeat(4, 1fr)`).
   - 2-column banner cards.
   - Full 7-column transaction table (`Order`, `Date`, `Product`, `Channel`, `Amount`, `Status`, `Fulfillment`).
2. **Tablet (`601px - 1023px`)**:
   - Compact 200px sidebar.
   - 2-column KPI grid (`repeat(2, 1fr)`).
   - Stacked banner cards.
   - Fluid data table with fulfillment column conditionally hidden to preserve spacing.
3. **Mobile (`<= 600px`, tested at 390px)**:
   - Sticky top bar with `verdant.` logo and `Menu` toggle button.
   - Sidebar transforms into an off-canvas drawer with dimming backdrop.
   - 2x2 metric cards grid matching `mobile_390.svg`.
   - Desktop table hidden (`display: none`); mobile stacked card layout active (`display: flex`).
   - Zero horizontal overflow or scrollbar.

---

## 🧪 Quality Assurance & Acceptance Verification

| Test ID | Test Check | Target Criteria | Actual Outcome | Status |
|---------|------------|-----------------|----------------|--------|
| **T01** | `npm run build` | Zero build errors or warnings | Built production bundle in 731ms (`dist/index.html`, CSS, JS) | ✅ PASS |
| **T02** | Desktop 1440px | Sidebar and 4-card grid match SVG | 246px sidebar, 4-card KPI row, exact color tokens | ✅ PASS |
| **T03** | Tablet 768px | Responsive 2x2 card adaptation | 2-column KPI grid, stacked banner cards | ✅ PASS |
| **T04** | Mobile 390px | No horizontal overflow | Mobile stacked cards, 0 horizontal scrollbar, drawer nav | ✅ PASS |
| **T05** | MetricCard reuse | All 4 KPIs via 1 component | Net Sales, Paid Orders, Avg Order, Refunds via `MetricCard` | ✅ PASS |
| **T06** | Transaction array | Table driven by array props | `TransactionTable` receives array of 144 records | ✅ PASS |
| **T07** | Empty data state | Display no matches message | Displays `"No transactions match your search."` + reset CTA | ✅ PASS |
| **T08** | Keyboard navigation| Accessible focus indicators | `:focus-visible` with 3px solid `#C8A76B` on all controls | ✅ PASS |
| **T09** | CSS Breakpoints | Driven by CSS media queries | Pure CSS media queries; no window resize event listeners | ✅ PASS |
| **T10** | Live Deployment | HTTPS deployment active | Verified live at https://polite-mermaid-0f58e3.netlify.app | ✅ PASS |

---

## 📄 License & Attribution
Designed for **Growth Ecommerce Store Global** under assignment ref `1t5iv80pU5QGbJrtXf2i76BPu302_1S8e1o2e284Ah70FxeUY`.
