<template>
  <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
    <div class="grid grid-cols-5 h-16 items-center px-1 max-w-lg mx-auto">
      
      <!-- Catalog / Home -->
      <button 
        @click="scrollToCatalog"
        class="flex flex-col items-center justify-center py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors"
      >
        <Compass class="w-5 h-5" />
        <span class="text-[10px] font-medium mt-1">Catalog</span>
      </button>

      <!-- Search Trigger -->
      <button 
        @click="triggerSearch"
        class="flex flex-col items-center justify-center py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors"
      >
        <Search class="w-5 h-5" />
        <span class="text-[10px] font-medium mt-1">Search</span>
      </button>

      <!-- Center Switch / Lookbook Button -->
      <button 
        @click="toggleMode"
        class="flex flex-col items-center justify-center py-1 relative group"
      >
        <div 
          class="p-2 -mt-3 rounded-full text-sand-50 shadow-lg group-active:scale-95 transition-all"
          :class="state.activeMode === 'furniture' ? 'bg-charcoal-900' : 'bg-emerald-900'"
        >
          <span class="text-base leading-none">{{ state.activeMode === 'furniture' ? '🛋️' : '⚙️' }}</span>
        </div>
        <span class="text-[10px] font-semibold mt-0.5 text-charcoal-900">
          {{ state.activeMode === 'furniture' ? 'Furniture' : 'Instruments' }}
        </span>
      </button>

      <!-- Wishlist -->
      <button 
        @click="openWishlist"
        class="flex flex-col items-center justify-center py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors relative"
      >
        <div class="relative">
          <Heart class="w-5 h-5" :class="wishlistCount > 0 ? 'fill-terracotta-500 text-terracotta-500' : ''" />
          <span 
            v-if="wishlistCount > 0"
            class="absolute -top-1.5 -right-2 bg-terracotta-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
          >
            {{ wishlistCount }}
          </span>
        </div>
        <span class="text-[10px] font-medium mt-1">Saved</span>
      </button>

      <!-- Cart -->
      <button 
        @click="openCart"
        class="flex flex-col items-center justify-center py-1 text-charcoal-600 hover:text-charcoal-900 transition-colors relative"
      >
        <div class="relative">
          <ShoppingBag class="w-5 h-5" />
          <span 
            v-if="cartCount > 0"
            class="absolute -top-1.5 -right-2 bg-charcoal-900 text-sand-50 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
          >
            {{ cartCount }}
          </span>
        </div>
        <span class="text-[10px] font-medium mt-1">Bag</span>
      </button>

    </div>
  </nav>
</template>

<script setup>
import { 
  Compass, 
  Search, 
  Heart, 
  ShoppingBag 
} from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state,
  cartCount, 
  wishlistCount, 
  openCart, 
  openWishlist, 
  setMode 
} = useStore()

const scrollToCatalog = () => {
  state.currentView = 'catalog'
  setTimeout(() => {
    const el = document.getElementById('catalog-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, 50)
}

const toggleMode = () => {
  setMode(state.activeMode === 'furniture' ? 'instruments' : 'furniture')
}

const triggerSearch = () => {
  scrollToCatalog()
  setTimeout(() => {
    const input = document.querySelector('input[type="text"]')
    if (input) input.focus()
  }, 300)
}
</script>
