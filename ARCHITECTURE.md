# Enterprise Architecture Documentation

## 1. Architectural Overview

```
                      +-------------------------------------------+
                      |                 App.vue                   |
                      +-------------------------------------------+
                                            |
         +------------------+---------------+------------------+
         |                  |                                  |
+----------------+  +-----------------+               +-----------------+
|   Layout/Nav   |  | Primary Views   |               | Modals/Drawers  |
| - Navbar       |  | - HeroBanner    |               | (Code-Split)    |
| - BottomNav    |  | - ProductCard   |               | - ProductModal  |
| - Footer       |  | - FilterSidebar |               | - CompareModal  |
+----------------+  | - Overview      |               | - CartDrawer    |
                    +-----------------+               | - CheckoutModal |
                                                      +-----------------+
                                    |
+-----------------------------------------------------------------------+
|                    Unified Store Facade (useStore.js)                 |
+-----------------------------------------------------------------------+
         |              |             |            |            |
+----------------+ +----------+ +-----------+ +----------+ +------------+
|   useCatalog   | |  useCart | |useWishlist| |useCompare| |useCurrency |
+----------------+ +----------+ +-----------+ +----------+ +------------+
         |              |             |            |            |
+-----------------------------------------------------------------------+
|              Safe Storage & Pure Formatting Utilities                 |
|       (safeStorage with Memory Fallback, formatPrice with INR)        |
+-----------------------------------------------------------------------+
```

---

## 2. Directory Hierarchy & Separation of Concerns

```
src/
├── composables/          # Domain business logic (Single Responsibility Principle)
│   ├── useCatalog.js     # Search, filter, sort, dual-mode toggle
│   ├── useCart.js        # Cart items, promo engine, tax & shipping logic
│   ├── useWishlist.js    # Wishlist operations & persistence
│   ├── useCompare.js     # 4-item comparison matrix & difference highlighting
│   ├── useCurrency.js    # Multi-currency rates & INR formatting
│   └── useToast.js       # Global toast messaging queue
├── constants/            # Immutable domain configurations & business rules
│   ├── currency.js       # Currencies, exchange rates, locales
│   ├── promos.js         # Valid promo codes & discount rules
│   ├── storageKeys.js    # Versioned localStorage keys
│   └── index.js          # Barrel re-export
├── data/                 # Raw catalog seeds
│   └── products.js       # Furniture (12 items) & Instruments (10 items)
├── store/
│   └── useStore.js       # Enterprise Facade Pattern connecting domain modules
├── types/
│   └── index.js          # JSDoc TypeScript-compatible contract schemas
├── utils/                # Pure, side-effect-free helper utilities
│   ├── debounce.js       # Debounce utility for search/filtering
│   ├── formatters.js     # Currency & number formatting with Indian conventions
│   └── storage.js        # Fault-tolerant LocalStorage with in-memory fallback
├── components/           # Vue SFC visual presentations
└── App.vue               # Main orchestrator with lazy code-split components
```

---

## 3. Enterprise Performance Optimizations

### A. Code Splitting & Async Component Loading
Heavy overlays, modals, and the comprehensive Product Overview page are split using `defineAsyncComponent`.
- **Initial Catalog Bundle**: Reduced from **280.56 kB** to **98.37 kB** (just **29.12 kB gzipped**).
- **On-Demand Chunks**:
  - `ProductOverview.vue`: 24.71 kB
  - `CheckoutModal.vue`: 14.85 kB
  - `CompareModal.vue`: 11.64 kB
  - `vendor-confetti`: 10.67 kB
  - `CartDrawer.vue`: 7.76 kB
  - `RoomVisualizerModal.vue`: 7.30 kB
  - `WishlistDrawer.vue`: 4.07 kB

### B. Vendor Chunking in Vite (`vite.config.js`)
External dependencies are partitioned into distinct cached bundles:
- `vendor-vue`: Vue core reactivity and runtime DOM
- `vendor-icons`: Lucide icon assets
- `vendor-confetti`: Post-checkout celebration animation

### C. Off-Thread Image Rendering
All catalog and overview images use:
- `loading="lazy"` for deferred loading below the fold
- `decoding="async"` for decoding off the browser's main thread to prevent frame drops during scrolling

---

## 4. Fault-Tolerant State & Storage (`safeStorage`)

In corporate and enterprise environments, `localStorage` can fail due to:
1. Safari / iOS private browsing mode throwing `SecurityError`
2. `QuotaExceededError` when browser storage is exhausted
3. Corrupted or malformed JSON from previous application versions

The `safeStorage` utility provides:
- Automatic in-memory `Map` fallback if `localStorage` throws or is disabled
- Corrupted JSON recovery with configurable default fallbacks
- Versioned storage keys (`aura_v2_*`) to avoid collisions

---

## 5. Multi-Currency Engine (including INR ₹)

The currency module converts base USD prices with locale-aware formatters:
- **INR (₹)**: Employs Indian numbering conventions (lakhs/crores, e.g. `₹1,25,000`).
- **USD ($)**, **EUR (€)**, **GBP (£)**, **CAD (CA$)**: Standard international Intl formatters.
- Currency choice persists automatically across page visits.

---

## 6. Global Error Handling & Telemetry

- Global Vue runtime error interceptor configured in `src/main.js` via `app.config.errorHandler`.
- Captures component lifecycle errors without white-screening the application.
- Performance marks enabled in developer mode.

