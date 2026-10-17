<template>
  <div class="min-h-screen bg-[#FAF8F5] text-charcoal-900 flex flex-col font-sans overflow-x-hidden">
    
    <!-- Top Navigation Header -->
    <Navbar />

    <!-- VIEW 1: DEDICATED PRODUCT OVERVIEW PAGE -->
    <div v-if="state.currentView === 'overview'">
      <ProductOverview :product="state.overviewProduct" />
    </div>

    <!-- VIEW 2: MAIN CATALOG VIEW -->
    <div v-else class="flex flex-col flex-1">
      <!-- Hero Showcase Section -->
      <HeroBanner />

      <!-- Visual Category Selector Pills -->
      <CategoryPills />

      <!-- Furniture / Instruments Catalog Section -->
      <main id="catalog-section" class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-sand-200 gap-3 sm:gap-4">
          <div>
            <span class="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-terracotta-700">
              {{ state.activeMode === 'furniture' ? 'Nordic Furniture Collection' : 'Manufacturing Instruments Catalogue' }}
            </span>
            <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal-900 font-normal mt-0.5 sm:mt-1">
              {{ state.activeMode === 'furniture' ? 'Handcrafted Living' : 'Industrial Precision & Metrology' }}
            </h2>
            <p class="text-xs sm:text-sm text-charcoal-500 mt-1 font-light">
              Showing <strong class="text-charcoal-900 font-semibold">{{ filteredProducts.length }}</strong> 
              {{ state.activeMode === 'furniture' 
                ? 'pieces sculpted from certified hardwoods and tactile textiles.' 
                : 'accredited instruments calibrated for manufacturing quality assurance.' 
              }}
            </p>
          </div>

          <!-- Mobile Filter Toggle Button -->
          <div class="flex items-center gap-2 lg:hidden">
            <button 
              @click="isMobileFiltersOpen = !isMobileFiltersOpen"
              class="px-4 py-2 bg-white border border-sand-300 rounded-full text-xs font-semibold text-charcoal-800 flex items-center gap-2 shadow-sm active:scale-95 transition-all"
            >
              <SlidersHorizontal class="w-3.5 h-3.5 text-terracotta-600" />
              <span>{{ isMobileFiltersOpen ? 'Close Filters' : 'Filter & Sort' }}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Filters Slide Down with Quick Apply -->
        <div v-if="isMobileFiltersOpen" class="lg:hidden mb-6 space-y-3 animate-fadeIn">
          <FilterSidebar />
          <button 
            @click="isMobileFiltersOpen = false"
            class="w-full py-3 bg-charcoal-900 text-sand-50 rounded-xl text-xs font-semibold uppercase tracking-wider shadow"
          >
            View {{ filteredProducts.length }} Results
          </button>
        </div>

        <!-- Main Layout: Sidebar + Product Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          <!-- Left Desktop Filters (3 Cols) -->
          <aside class="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar />
          </aside>

          <!-- Right Products Grid (9 Cols) -->
          <div class="lg:col-span-9">
            
            <!-- Empty State -->
            <div 
              v-if="filteredProducts.length === 0" 
              class="text-center py-16 sm:py-20 bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 space-y-4"
            >
              <div class="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-charcoal-400">
                <SearchX class="w-8 h-8 text-charcoal-500" />
              </div>
              <h3 class="font-serif text-xl sm:text-2xl text-charcoal-800">
                {{ state.activeMode === 'furniture' ? 'No matching furniture pieces' : 'No matching manufacturing instruments' }}
              </h3>
              <p class="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto font-light">
                {{ state.activeMode === 'furniture' 
                  ? 'We couldn\'t find any furniture matching your current filters. Try relaxing your budget slider or clearing filters.' 
                  : 'We couldn\'t find any instruments matching your current filters. Try relaxing your budget slider or clearing filters.' 
                }}
              </p>
              <button 
                @click="resetFilters"
                class="px-6 py-3 bg-charcoal-900 text-sand-50 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-800 transition-all shadow"
              >
                Reset All Filters
              </button>
            </div>

            <!-- Product Grid -->
            <div 
              v-else 
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              <ProductCard 
                v-for="item in filteredProducts" 
                :key="item.id" 
                :product="item" 
              />
            </div>

          </div>

        </div>

      </main>

      <!-- Brand Value Pillars -->
      <FeaturesBanner />

      <!-- Press Mentions & Customer Reviews -->
      <ReviewsSection />

      <!-- VIP Newsletter & 10% Coupon Box -->
      <Newsletter />
    </div>

    <!-- Site Footer -->
    <Footer />

    <!-- Mobile Fixed Bottom Navigation Bar -->
    <BottomNav />

    <!-- Floating Compare Tray -->
    <CompareTray />

    <!-- Modals & Drawers -->
    <ProductModal />
    <CompareModal />
    <CartDrawer />
    <CheckoutModal />
    <RoomVisualizerModal />
    <WishlistDrawer />

    <!-- Toast Notifications -->
    <Toast />

  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { SlidersHorizontal, SearchX } from 'lucide-vue-next'
import Navbar from './components/Navbar.vue'
import BottomNav from './components/BottomNav.vue'
import HeroBanner from './components/HeroBanner.vue'
import CategoryPills from './components/CategoryPills.vue'
import FilterSidebar from './components/FilterSidebar.vue'
import ProductCard from './components/ProductCard.vue'
import CompareTray from './components/CompareTray.vue'
import FeaturesBanner from './components/FeaturesBanner.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import Newsletter from './components/Newsletter.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'
import { useStore } from './store/useStore'

// Enterprise Code-Splitting: Lazy-load heavy views & interactive overlays on demand
const ProductOverview = defineAsyncComponent(() => import('./components/ProductOverview.vue'))
const ProductModal = defineAsyncComponent(() => import('./components/ProductModal.vue'))
const CompareModal = defineAsyncComponent(() => import('./components/CompareModal.vue'))
const CartDrawer = defineAsyncComponent(() => import('./components/CartDrawer.vue'))
const CheckoutModal = defineAsyncComponent(() => import('./components/CheckoutModal.vue'))
const RoomVisualizerModal = defineAsyncComponent(() => import('./components/RoomVisualizerModal.vue'))
const WishlistDrawer = defineAsyncComponent(() => import('./components/WishlistDrawer.vue'))

const { state, filteredProducts, resetFilters } = useStore()
const isMobileFiltersOpen = ref(false)
</script>
