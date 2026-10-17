# AURA & OAK / AURA METROLOGY — Dual-Catalog E-Commerce Platform

A high-performance, responsive e-commerce web application with an **interactive dual-industry toggle** in the header switching seamlessly between:
1. **🛋️ Artisan Scandinavian Furniture**: Living room lounge chairs, solid oak dining tables, platform beds, executive desks, lighting, and textiles.
2. **⚙️ Manufacturing Industry Instruments**: High-precision metrology optical CMMs, radiometric thermal cameras, Coriolis mass flow meters, multi-channel vibration analyzers, NDT ultrasonic flaw gauges, blue-laser profile scanners, and digital bore gauges.

Built with **Vue 3 (Composition API)**, **Tailwind CSS**, and **Vite**.

![Store Preview](https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features & Capabilities

- **Header Industry Switcher**:
  - Interactive segmented control pill in the header: **[ 🛋️ Furniture | ⚙️ Manufacturing Instruments ]**.
  - Dynamic adaptation of branding, announcement banners, hero editorial, categories, materials, and product inventory.
  - State persisted across page visits in `localStorage`.
- **Artisan Furniture Catalogue**:
  - Handcrafted solid white oak, Italian bouclé, Roman travertine stone, and full-grain leather.
  - Interactive 3D Room Lookbook & ambient lighting visualizer (*Stockholm Loft*, *Kyoto Sanctuary*, *Parisian Salon*).
  - Swatch changer with real-time photography updates.
- **Manufacturing Industry Instruments Catalogue**:
  - Sub-micron optical CMMs, continuous thermal process monitors, Coriolis density meters, vibration demodulators, and wireless torque sensors.
  - Detailed technical specifications: accuracy class, resolution, sensor type, weight, operating range, lead times, and certifications (ISO/IEC 17025, NIST Traceable, IP67).
- **Dedicated Product Overview Page (`ProductOverview.vue`)**:
  - **Brochures**: Downloadable PDF spec sheets, 3D BIM/CAD packages (Revit/DWG), and metrology/FSC certificates.
  - **Technical Specifications**: Exhaustive architectural and engineering parameters, ingress ratings, tolerances, and build dimensions.
  - **Guides**: Step-by-step unboxing blueprints, assembly manuals, calibration protocols, and preventive care handbooks.
  - **Related Products Link List**: Interactive cards and quick-navigation links to explore complementary pieces and systems.
- **Product Compare Feature (`CompareModal.vue` & `CompareTray.vue`)**:
  - Compare up to 4 furniture pieces or manufacturing instruments side-by-side.
  - **Highlight Differences Toggle**: Dynamically detects and highlights differing parameters across items.
  - Floating sticky comparison tray with live count, remove actions, and instant comparison trigger.
- **Enterprise-Level Architecture**:
  - **Modular Composables**: Separated domain logic (`useCatalog`, `useCart`, `useWishlist`, `useCompare`, `useCurrency`, `useToast`).
  - **Fault-Tolerant Storage**: `safeStorage` wrapper with in-memory fallback for private browsing.
  - **Code Splitting & Async Loading**: 65% initial bundle reduction (from 280kB down to 98kB, 29kB gzip).
  - **Multi-Currency (INR ₹, USD $, EUR €, GBP £, CAD CA$)**: Indian numbering system formatting and locale support.
  - Read [ARCHITECTURE.md](./ARCHITECTURE.md) for full architectural documentation.
- **Responsive Navigation**:
  - Desktop responsive navigation with live search, currency converter, wishlist, and cart drawer.
  - Mobile bottom navigation bar for one-thumb browsing.
  - Full mobile bottom-sheet modal with sticky "Add to Bag" bar.
- **Shopping Bag & Multi-Step Checkout**:
  - Mixed-basket support: add items from both catalogs to a single bag.
  - Free delivery milestone progress bar.
  - Promo code engine (`WELCOME10`, `SPRING20`, `LUXE15`).
  - Multi-step checkout (Address, Delivery Service Tier, Payment, and Confetti Confirmation).

---

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite 6
- **Effects**: Canvas Confetti

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.
