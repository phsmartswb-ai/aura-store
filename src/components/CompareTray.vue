<template>
  <Transition
    enter-active-class="transform transition-all duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div 
      v-if="compareCount > 0 && state.activeModal !== 'compare'"
      class="fixed bottom-16 lg:bottom-6 inset-x-3 sm:inset-x-6 md:inset-x-auto md:right-8 md:max-w-2xl z-30"
    >
      <div class="bg-charcoal-900/95 backdrop-blur-md text-sand-50 rounded-2xl shadow-2xl border border-sand-700/50 p-3 sm:p-4">
        
        <div class="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-sand-700/50 text-xs">
          <div class="flex items-center gap-2">
            <span class="p-1 rounded-md bg-terracotta-600 text-white">
              <Scale class="w-3.5 h-3.5" />
            </span>
            <span class="font-semibold tracking-wide">
              Compare Tray <span class="text-terracotta-400">({{ compareCount }}/4)</span>
            </span>
          </div>

          <div class="flex items-center gap-3">
            <button 
              @click="clearCompare"
              class="text-[11px] text-sand-400 hover:text-white transition-colors underline"
            >
              Clear All
            </button>
            <button 
              @click="openCompareModal"
              class="px-3.5 py-1.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Compare Now</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Product Thumbnails Row -->
        <div class="grid grid-cols-4 gap-2">
          <!-- Active compared products -->
          <div 
            v-for="item in compareProducts" 
            :key="item.id"
            class="relative group bg-charcoal-800/80 rounded-xl p-1.5 flex items-center gap-2 border border-sand-700/40"
          >
            <img 
              :src="item.colors?.[0]?.image || item.gallery[0]" 
              :alt="item.name" 
              class="w-10 h-10 object-cover rounded-lg flex-shrink-0 bg-sand-200"
            />
            
            <div class="hidden sm:block min-w-0 flex-1">
              <p class="text-[11px] font-medium text-sand-100 truncate">
                {{ item.name }}
              </p>
              <p class="text-[10px] text-sand-400 font-serif">
                {{ formatPrice(item.price) }}
              </p>
            </div>

            <!-- Remove Button -->
            <button 
              @click.stop="removeFromCompare(item.id)"
              class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-charcoal-700 hover:bg-terracotta-600 text-sand-200 hover:text-white flex items-center justify-center text-xs shadow-md transition-colors"
              title="Remove from comparison"
            >
              <X class="w-3 h-3" />
            </button>
          </div>

          <!-- Empty Slots to encourage adding up to 4 -->
          <div 
            v-for="i in (4 - compareCount)" 
            :key="'empty-' + i"
            class="hidden sm:flex border border-dashed border-sand-700/60 rounded-xl p-2 items-center justify-center text-center text-sand-500 text-[10px]"
          >
            <span>+ Add item</span>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Scale, ArrowRight, X } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  compareCount, 
  compareProducts, 
  removeFromCompare, 
  clearCompare, 
  openCompareModal,
  formatPrice 
} = useStore()
</script>

