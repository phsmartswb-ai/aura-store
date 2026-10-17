<template>
  <header class="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-sand-200 transition-all duration-300">
    <!-- Announcement Bar (Adapts to Active Mode) -->
    <div 
      class="text-sand-100 text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 text-center font-medium tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-colors duration-300"
      :class="state.activeMode === 'furniture' ? 'bg-charcoal-800' : 'bg-emerald-950'"
    >
      <span class="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" :class="state.activeMode === 'furniture' ? 'bg-emerald-400' : 'bg-amber-400'"></span>
      
      <span v-if="state.activeMode === 'furniture'" class="truncate">
        FREE WHITE-GLOVE DELIVERY OVER $1,500
      </span>
      <span v-else class="truncate">
        ISO/IEC 17025 ACCREDITED CALIBRATION CERTIFICATES INCLUDED WITH EVERY INSTRUMENT
      </span>

      <span class="hidden md:inline text-sand-400">|</span>
      <span class="hidden md:inline">
        {{ state.activeMode === 'furniture' ? 'USE CODE WELCOME10 FOR 10% OFF' : 'INDUSTRIAL LEASING & TRADE DISCOUNTS AVAILABLE' }}
      </span>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Mobile Hamburger Menu Button & Search Toggle -->
        <div class="flex items-center gap-1 sm:gap-2 lg:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 -ml-1 text-charcoal-800 hover:text-charcoal-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-5 h-5 sm:w-6 sm:h-6" />
            <X v-else class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button 
            @click="isSearchOpen = !isSearchOpen"
            class="p-2 text-charcoal-800 hover:text-charcoal-900"
            aria-label="Toggle search"
          >
            <Search class="w-5 h-5" />
          </button>
        </div>

        <!-- Left Desktop Category Links -->
        <nav class="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium tracking-wide">
          <button 
            v-for="cat in currentCategories.slice(1, 5)" 
            :key="cat.id"
            @click="selectCategory(cat.id)"
            class="transition-colors hover:text-terracotta-600 relative py-1"
            :class="state.selectedCategory === cat.id ? 'text-charcoal-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-charcoal-900' : 'text-charcoal-600'"
          >
            {{ cat.name }}
          </button>
          
          <button 
            v-if="state.activeMode === 'furniture'"
            @click="openRoomVisualizer()"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200/70 hover:bg-sand-300 text-charcoal-800 text-xs font-semibold tracking-wider uppercase transition-all"
          >
            <Sparkles class="w-3.5 h-3.5 text-terracotta-600" />
            Room 3D Lookbook
          </button>
          <span 
            v-else
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wider uppercase"
          >
            <Cpu class="w-3.5 h-3.5 text-emerald-700" />
            Industry 4.0 Ready
          </span>
        </nav>

        <!-- Brand Center Logo -->
        <div class="flex flex-col items-center cursor-pointer select-none px-2" @click="resetToHome">
          <span class="font-serif text-lg sm:text-2xl lg:text-3xl tracking-[0.16em] sm:tracking-[0.25em] text-charcoal-900 font-normal whitespace-nowrap">
            {{ state.activeMode === 'furniture' ? 'AURA & OAK' : 'AURA METROLOGY' }}
          </span>
          <span class="text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em] text-charcoal-500 uppercase font-light">
            {{ state.activeMode === 'furniture' ? 'Copenhagen • New York' : 'Industrial Precision Instruments' }}
          </span>
        </div>

        <!-- Right Action Icons & Search -->
        <div class="flex items-center gap-1.5 sm:gap-3">
          <!-- Desktop Search Bar -->
          <div class="hidden md:flex items-center relative w-36 lg:w-48 xl:w-56">
            <Search class="w-3.5 h-3.5 text-charcoal-400 absolute left-3 pointer-events-none" />
            <input 
              v-model="state.searchQuery"
              type="text"
              :placeholder="state.activeMode === 'furniture' ? 'Search furniture...' : 'Search instruments...'"
              class="w-full pl-8 pr-7 py-1.5 bg-sand-100 border border-sand-300/80 rounded-full text-xs text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-1 focus:ring-charcoal-800 focus:bg-white transition-all"
            />
            <button 
              v-if="state.searchQuery" 
              @click="state.searchQuery = ''"
              class="absolute right-2 text-charcoal-400 hover:text-charcoal-600"
            >
              <X class="w-3 h-3" />
            </button>
          </div>

          <!-- Currency Selector -->
          <select 
            v-model="state.currency"
            class="bg-transparent text-[11px] sm:text-xs font-semibold text-charcoal-700 py-1 px-1 sm:px-1.5 border border-sand-300 rounded cursor-pointer hover:border-charcoal-700 focus:outline-none"
          >
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
            <option value="GBP">GBP £</option>
            <option value="CAD">CAD CA$</option>
            <option value="INR">INR ₹</option>
          </select>

          <!-- Desktop Compare Trigger -->
          <button 
            @click="openCompareModal"
            class="hidden sm:inline-flex relative p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
            aria-label="Compare Products"
            title="Compare Products"
          >
            <Scale class="w-5 h-5" :class="compareCount > 0 ? 'text-terracotta-600' : ''" />
            <span 
              v-if="compareCount > 0"
              class="absolute top-1 right-1 bg-terracotta-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {{ compareCount }}
            </span>
          </button>

          <!-- Desktop Wishlist Trigger -->
          <button 
            @click="openWishlist"
            class="hidden sm:inline-flex relative p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
            aria-label="Wishlist"
          >
            <Heart class="w-5 h-5" :class="wishlistCount > 0 ? 'fill-terracotta-500 text-terracotta-500' : ''" />
            <span 
              v-if="wishlistCount > 0"
              class="absolute top-1 right-1 bg-terracotta-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {{ wishlistCount }}
            </span>
          </button>

          <!-- Cart Trigger -->
          <button 
            @click="openCart"
            class="relative flex items-center gap-1.5 sm:gap-2 p-1.5 px-2.5 sm:p-2 sm:px-3 rounded-full transition-all duration-200 text-sand-50"
            :class="state.activeMode === 'furniture' ? 'bg-charcoal-900 hover:bg-charcoal-800' : 'bg-emerald-900 hover:bg-emerald-800'"
            aria-label="Shopping Cart"
          >
            <ShoppingBag class="w-4 h-4" />
            <span class="text-xs font-semibold tracking-wider">
              {{ cartCount }}
            </span>
          </button>
        </div>

      </div>

      <!-- Segmented Control Mode Toggle Strip (Furniture vs Manufacturing Instruments) -->
      <div class="py-2.5 border-t border-sand-200/80 flex items-center justify-center">
        <div class="inline-flex p-1 bg-sand-200/80 rounded-full border border-sand-300 shadow-inner max-w-full">
          <!-- Furniture Option -->
          <button 
            @click="setMode('furniture')"
            class="flex items-center gap-1.5 px-3.5 sm:px-6 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200"
            :class="state.activeMode === 'furniture' 
              ? 'bg-charcoal-900 text-sand-50 shadow-md' 
              : 'text-charcoal-600 hover:text-charcoal-900'"
          >
            <span class="text-sm">🛋️</span>
            <span class="truncate">Furniture</span>
          </button>

          <!-- Manufacturing Instruments Option -->
          <button 
            @click="setMode('instruments')"
            class="flex items-center gap-1.5 px-3.5 sm:px-6 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200"
            :class="state.activeMode === 'instruments' 
              ? 'bg-emerald-900 text-sand-50 shadow-md' 
              : 'text-charcoal-600 hover:text-charcoal-900'"
          >
            <span class="text-sm">⚙️</span>
            <span class="truncate">Manufacturing Instruments</span>
          </button>
        </div>
      </div>

      <!-- Mobile Search Field Expandable -->
      <div v-if="isSearchOpen" class="py-2.5 px-1 md:hidden border-t border-sand-200 animate-fadeIn">
        <div class="relative">
          <Search class="w-4 h-4 text-charcoal-400 absolute left-3 top-3 pointer-events-none" />
          <input 
            v-model="state.searchQuery"
            type="text"
            :placeholder="state.activeMode === 'furniture' ? 'Search chairs, tables, beds...' : 'Search sensors, CMM, gauges...'"
            class="w-full pl-9 pr-9 py-2.5 bg-sand-100 border border-sand-300 rounded-xl text-sm text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
            @keyup.enter="scrollToCatalog"
          />
          <button 
            v-if="state.searchQuery" 
            @click="state.searchQuery = ''"
            class="absolute right-3 top-3 text-charcoal-400"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Menu Dropdown -->
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-sand-200 py-4 px-2 space-y-2 bg-[#FAF8F5] animate-fadeIn">
        <div class="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-charcoal-400">
          {{ state.activeMode === 'furniture' ? 'Furniture Categories' : 'Instrument Categories' }}
        </div>
        <button 
          v-for="cat in currentCategories" 
          :key="cat.id"
          @click="selectCategory(cat.id); isMobileMenuOpen = false"
          class="block w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors"
          :class="state.selectedCategory === cat.id ? 'bg-sand-200 text-charcoal-900 font-bold' : 'text-charcoal-700 hover:bg-sand-100'"
        >
          {{ cat.name }} ({{ cat.count }})
        </button>

        <div class="pt-2 border-t border-sand-200">
          <button 
            v-if="state.activeMode === 'furniture'"
            @click="openRoomVisualizer(); isMobileMenuOpen = false"
            class="w-full text-left py-3 px-3.5 rounded-xl bg-terracotta-50 text-terracotta-700 font-semibold text-sm flex items-center justify-between"
          >
            <span class="flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-terracotta-600" />
              Room 3D Lookbook Visualizer
            </span>
            <span class="text-xs bg-terracotta-500 text-white px-2 py-0.5 rounded-full font-bold">Try</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  Cpu,
  Scale
} from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  currentCategories,
  cartCount, 
  wishlistCount, 
  compareCount,
  openCompareModal,
  openCart, 
  openWishlist, 
  openRoomVisualizer,
  setMode,
  resetFilters 
} = useStore()

const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)

const scrollToCatalog = () => {
  state.currentView = 'catalog'
  setTimeout(() => {
    const catalogEl = document.getElementById('catalog-section')
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' })
    }
  }, 50)
}

const selectCategory = (catId) => {
  state.selectedCategory = catId
  state.currentView = 'catalog'
  scrollToCatalog()
}

const resetToHome = () => {
  resetFilters()
  state.currentView = 'catalog'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
