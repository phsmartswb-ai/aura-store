<template>
  <div class="py-4 sm:py-6 border-b border-sand-200 bg-[#FAF8F5]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0 touch-scroll">
        <button
          v-for="cat in currentCategories"
          :key="cat.id"
          @click="state.selectedCategory = cat.id"
          class="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border"
          :class="state.selectedCategory === cat.id 
            ? 'bg-charcoal-900 text-sand-50 border-charcoal-900 shadow-sm' 
            : 'bg-white text-charcoal-700 border-sand-300 hover:border-charcoal-400 hover:bg-sand-50'"
        >
          <span>{{ cat.name }}</span>
          <span 
            class="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full transition-colors"
            :class="state.selectedCategory === cat.id ? 'bg-charcoal-700 text-sand-200' : 'bg-sand-100 text-charcoal-500'"
          >
            {{ cat.count }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store/useStore'

const { state, currentCategories } = useStore()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
