<template>
  <div class="bg-white rounded-2xl p-5 sm:p-6 border border-sand-200/90 shadow-sm space-y-6">
    <div class="flex items-center justify-between border-b border-sand-100 pb-4">
      <div class="flex items-center gap-2 font-serif text-base sm:text-lg text-charcoal-900">
        <SlidersHorizontal class="w-4 h-4 text-terracotta-600" />
        <span>Refine Results</span>
      </div>
      <button 
        @click="resetFilters" 
        class="text-xs text-charcoal-500 hover:text-terracotta-600 underline"
      >
        Reset All
      </button>
    </div>

    <!-- Room / Industry Sector Filter -->
    <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-wider text-charcoal-700">
        {{ state.activeMode === 'furniture' ? 'Space / Room' : 'Industry Sector' }}
      </label>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="room in currentRooms"
          :key="room.id"
          @click="state.selectedRoom = room.id"
          class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
          :class="state.selectedRoom === room.id ? 'bg-charcoal-900 text-sand-50 border-charcoal-900' : 'bg-sand-50 text-charcoal-700 border-sand-200 hover:bg-sand-100'"
        >
          {{ room.name }}
        </button>
      </div>
    </div>

    <!-- Material / Metallurgy Filter -->
    <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-wider text-charcoal-700">
        {{ state.activeMode === 'furniture' ? 'Material & Craft' : 'Metallurgy & Build' }}
      </label>
      <select 
        v-model="state.selectedMaterial"
        class="w-full text-xs font-medium text-charcoal-800 bg-sand-50 border border-sand-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
      >
        <option v-for="mat in currentMaterials" :key="mat" :value="mat">{{ mat }}</option>
      </select>
    </div>

    <!-- Price Range Slider -->
    <div class="space-y-3">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold uppercase tracking-wider text-charcoal-700">Max Budget</span>
        <span class="font-serif font-bold text-sm text-charcoal-900">{{ formatPrice(state.maxPrice) }}</span>
      </div>
      <input 
        type="range" 
        :min="state.activeMode === 'furniture' ? 400 : 500" 
        :max="state.activeMode === 'furniture' ? 4000 : 9000" 
        step="100"
        v-model.number="state.maxPrice"
        class="w-full accent-charcoal-900 bg-sand-200 h-1.5 rounded-lg cursor-pointer"
      />
      <div class="flex justify-between text-[11px] text-charcoal-400">
        <span>{{ formatPrice(state.activeMode === 'furniture' ? 400 : 500) }}</span>
        <span>{{ formatPrice(state.activeMode === 'furniture' ? 4000 : 9000) }}</span>
      </div>
    </div>

    <!-- Sort Selector -->
    <div class="space-y-2">
      <label class="text-xs font-bold uppercase tracking-wider text-charcoal-700">Sort By</label>
      <select 
        v-model="state.sortBy"
        class="w-full text-xs font-medium text-charcoal-800 bg-sand-50 border border-sand-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
      >
        <option value="featured">Featured Picks</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Industry Rating (Highest)</option>
        <option value="newest">Latest 2026 Releases</option>
      </select>
    </div>

    <!-- Stock Status Checkbox -->
    <div class="pt-2 border-t border-sand-100">
      <label class="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-charcoal-700">
        <input 
          type="checkbox" 
          v-model="state.inStockOnly" 
          class="w-4 h-4 rounded text-charcoal-900 accent-charcoal-900"
        />
        <span>In Stock & Ready to Ship</span>
      </label>
    </div>

    <!-- Mode Info Card -->
    <div class="p-4 rounded-xl bg-sand-100/70 border border-sand-200 text-xs space-y-1.5">
      <div class="font-semibold text-charcoal-900 flex items-center gap-1.5">
        <Truck class="w-4 h-4 text-terracotta-600" />
        <span>{{ state.activeMode === 'furniture' ? 'Complimentary Setup' : 'Calibration & Dispatch' }}</span>
      </div>
      <p class="text-charcoal-600 text-[11px] leading-relaxed">
        {{ state.activeMode === 'furniture' 
          ? 'Orders over $1,500 receive complimentary White-Glove in-home placement and assembly.' 
          : 'All instruments include NIST-traceable calibration dossiers and 3-year warranty.' 
        }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { SlidersHorizontal, Truck } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  currentMaterials, 
  currentRooms, 
  resetFilters, 
  formatPrice 
} = useStore()
</script>
