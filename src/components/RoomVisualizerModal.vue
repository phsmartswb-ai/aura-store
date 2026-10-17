<template>
  <div 
    v-if="state.activeModal === 'roomVisualizer'"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6"
  >
    <!-- Dark Backdrop -->
    <div 
      class="fixed inset-0 bg-charcoal-900/80 backdrop-blur-md transition-opacity"
      @click="closeModals"
    ></div>

    <!-- Modal Box -->
    <div class="relative bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-sand-200 z-10 flex flex-col">
      
      <!-- Header -->
      <div class="p-4 sm:p-6 bg-sand-50 border-b border-sand-200 flex items-center justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-1 sm:p-1.5 rounded-lg bg-terracotta-100 text-terracotta-700">
              <Sparkles class="w-4 h-4" />
            </span>
            <h2 class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">
              Interactive Room Lookbook
            </h2>
          </div>
          <p class="text-[11px] sm:text-xs text-charcoal-500 mt-0.5">
            Stage Scandinavian furniture silhouettes against curated architectural spaces.
          </p>
        </div>
        <button 
          @click="closeModals"
          class="p-2 rounded-full hover:bg-sand-200 text-charcoal-500 hover:text-charcoal-900 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Main Visualizer Area -->
      <div class="p-3.5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 flex-1">
        
        <!-- Left: Interactive Canvas Viewport (8 Cols) -->
        <div class="lg:col-span-8 flex flex-col space-y-4">
          
          <!-- Environment Canvas Container -->
          <div 
            class="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-sand-200 transition-all duration-700 bg-cover bg-center"
            :style="{ backgroundImage: `url(${activeRoom.image})` }"
          >
            <!-- Ambient Lighting Filter Overlay -->
            <div 
              class="absolute inset-0 transition-all duration-500 pointer-events-none"
              :class="lightingOverlayClass"
            ></div>

            <!-- Placed Furniture Hotspots overlay -->
            <div class="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end">
              <div class="bg-charcoal-900/85 backdrop-blur-md p-3 sm:p-4 rounded-xl text-white max-w-sm flex items-center gap-2.5 sm:gap-3 border border-white/20">
                <img 
                  :src="activeFurniture.colors[0].image" 
                  :alt="activeFurniture.name"
                  class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover bg-sand-100 flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <span class="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-terracotta-300">Staged in {{ activeRoom.name }}</span>
                  <h4 class="font-medium text-xs text-white truncate">{{ activeFurniture.name }}</h4>
                  <div class="flex items-center justify-between mt-1">
                    <span class="font-bold text-xs">{{ formatPrice(activeFurniture.price) }}</span>
                    <button 
                      @click="addToCart(activeFurniture)"
                      class="px-2.5 py-1 bg-white text-charcoal-900 rounded-md text-[10px] font-bold uppercase hover:bg-sand-100 transition-colors"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lighting Badges Controls in Canvas -->
            <div class="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex gap-1 sm:gap-1.5 p-1 rounded-full bg-charcoal-900/60 backdrop-blur-md">
              <button 
                v-for="light in lightingModes" 
                :key="light.id"
                @click="activeLighting = light.id"
                class="px-2 sm:px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold transition-all"
                :class="activeLighting === light.id ? 'bg-white text-charcoal-900 shadow' : 'text-white/80 hover:text-white'"
              >
                {{ light.label }}
              </button>
            </div>

            <!-- Scene Switcher Pill -->
            <div class="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-charcoal-900/70 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[9px] sm:text-[11px] font-medium hidden sm:block">
              360° Studio Render
            </div>

          </div>

          <!-- Room Backdrops Selector -->
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-charcoal-700">Choose Room Setting:</span>
            <div class="grid grid-cols-3 gap-2 sm:gap-3">
              <button 
                v-for="room in roomScenes" 
                :key="room.id"
                @click="activeRoom = room"
                class="p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all"
                :class="activeRoom.id === room.id ? 'border-charcoal-900 bg-sand-100 ring-1 ring-charcoal-900' : 'border-sand-200 hover:bg-sand-50'"
              >
                <img :src="room.thumb" :alt="room.name" class="w-10 h-10 rounded-lg object-cover" />
                <div class="overflow-hidden">
                  <div class="font-bold text-xs text-charcoal-900 truncate">{{ room.name }}</div>
                  <div class="text-[10px] text-charcoal-500 truncate">{{ room.style }}</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        <!-- Right: Furniture Silhouettes Drawer (4 Cols) -->
        <div class="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-charcoal-700">Select Piece to Stage:</span>
            
            <div class="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              <div 
                v-for="item in state.products" 
                :key="item.id"
                @click="activeFurniture = item"
                class="p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all"
                :class="activeFurniture.id === item.id ? 'border-charcoal-900 bg-sand-100 ring-1 ring-charcoal-900' : 'border-sand-200 hover:bg-sand-50'"
              >
                <img 
                  :src="item.colors[0].image" 
                  :alt="item.name"
                  class="w-12 h-12 rounded-lg object-cover bg-sand-100 flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h5 class="text-xs font-medium text-charcoal-900 truncate">{{ item.name }}</h5>
                  <div class="flex items-center justify-between mt-0.5">
                    <span class="text-[11px] text-charcoal-500">{{ item.material }}</span>
                    <span class="font-serif font-bold text-xs text-charcoal-900">{{ formatPrice(item.price) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualizer Bottom CTA -->
          <div class="pt-4 border-t border-sand-200 space-y-2">
            <button 
              @click="addCurrentAndOpenCart"
              class="w-full py-3 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag class="w-4 h-4" />
              <span>Add "{{ activeFurniture.name }}" To Bag</span>
            </button>
            <p class="text-center text-[10px] text-charcoal-500">
              Scale calibrated based on actual room dimensional bounds.
            </p>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Sparkles, X, ShoppingBag } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { state, closeModals, addToCart, openCart, formatPrice } = useStore()

const roomScenes = [
  {
    id: 'nordic',
    name: 'Stockholm Loft',
    style: 'Limewash & High Ceilings',
    thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'japandi',
    name: 'Kyoto Sanctuary',
    style: 'Warm Oak Slats & Stone',
    thumb: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'haussmann',
    name: 'Parisian Salon',
    style: 'Herringbone & Molding',
    thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
  }
]

const lightingModes = [
  { id: 'morning', label: '☀️ Natural Daylight' },
  { id: 'golden', label: '🌅 Golden Hour' },
  { id: 'dusk', label: '🌙 Evening Ambient' },
]

const activeRoom = ref(roomScenes[0])
const activeLighting = ref('morning')
const activeFurniture = ref(state.selectedProduct || state.products[0])

const lightingOverlayClass = computed(() => {
  if (activeLighting.value === 'golden') return 'bg-amber-500/15 mix-blend-color-burn'
  if (activeLighting.value === 'dusk') return 'bg-slate-900/35 mix-blend-multiply'
  return 'bg-transparent'
})

const addCurrentAndOpenCart = () => {
  addToCart(activeFurniture.value)
  closeModals()
  openCart()
}
</script>

