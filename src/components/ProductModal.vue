<template>
  <div 
    v-if="state.activeModal === 'product' && product" 
    class="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
  >
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
      @click="closeModals"
    ></div>

    <!-- Modal Box (Bottom Sheet on mobile, centered modal on tablet/desktop) -->
    <div class="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-sand-200 z-10 overscroll-contain">
      
      <!-- Close Button -->
      <button 
        @click="closeModals"
        class="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-sand-100 hover:bg-sand-200 text-charcoal-700 transition-colors z-20 shadow-sm"
        aria-label="Close modal"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
        
        <!-- Left: Image Gallery & Previews -->
        <div class="space-y-3 sm:space-y-4">
          <!-- Main Selected Image -->
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-sand-100 border border-sand-200 relative group">
            <img 
              :src="activeGalleryImage" 
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex gap-2">
              <span class="bg-charcoal-900/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 sm:px-2.5 py-1 rounded-full">
                {{ product.material }}
              </span>
            </div>
            <button 
              @click="openRoomVisualizer(product)"
              class="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md text-charcoal-900 text-[11px] sm:text-xs font-semibold shadow hover:bg-white flex items-center gap-1.5"
            >
              <Eye class="w-3.5 h-3.5 text-terracotta-600" />
              <span>3D Room View</span>
            </button>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-1 touch-scroll">
            <button 
              v-for="(img, idx) in product.gallery" 
              :key="idx"
              @click="activeGalleryImage = img"
              class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
              :class="activeGalleryImage === img ? 'border-charcoal-900 shadow-md ring-2 ring-charcoal-900/20' : 'border-sand-200 opacity-70 hover:opacity-100'"
            >
              <img :src="img" :alt="`${product.name} view ${idx + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- Designer & Origin Footnote -->
          <div class="p-3 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-600 flex items-center justify-between">
            <div>
              <span class="text-charcoal-400 block text-[9px] uppercase tracking-wider font-semibold">Designer</span>
              <span class="font-medium text-charcoal-900 text-xs">{{ product.designer }}</span>
            </div>
            <div class="text-right">
              <span class="text-charcoal-400 block text-[9px] uppercase tracking-wider font-semibold">Origin</span>
              <span class="font-medium text-charcoal-900 text-xs">Handcrafted in Scandinavia</span>
            </div>
          </div>
        </div>

        <!-- Right: Information & Customizer -->
        <div class="flex flex-col justify-between space-y-5">
          <div class="space-y-3.5">
            
            <!-- Category & Ratings -->
            <div class="flex items-center justify-between text-xs pt-1 sm:pt-0">
              <span class="tracking-widest uppercase font-bold text-terracotta-700 text-[11px]">
                {{ product.category.toUpperCase() }}
              </span>
              <div class="flex items-center gap-1.5">
                <div class="flex text-amber-400">
                  <Star v-for="i in 5" :key="i" class="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                </div>
                <span class="font-bold text-charcoal-900 text-xs">{{ product.rating }}</span>
                <span class="text-charcoal-500 text-[11px]">({{ product.reviewsCount }})</span>
              </div>
            </div>

            <!-- Title & Price -->
            <div>
              <h2 class="font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal-900 font-normal leading-snug">
                {{ product.name }}
              </h2>
              <p class="text-xs sm:text-sm text-charcoal-500 mt-0.5 font-light">
                {{ product.subtitle }}
              </p>
            </div>

            <!-- Pricing Box -->
            <div class="flex items-baseline gap-2.5 pt-0.5">
              <span class="font-serif text-xl sm:text-3xl font-bold text-charcoal-900">
                {{ formatPrice(product.price) }}
              </span>
              <span v-if="product.originalPrice > product.price" class="text-xs sm:text-base text-charcoal-400 line-through">
                {{ formatPrice(product.originalPrice) }}
              </span>
              <span v-if="product.originalPrice > product.price" class="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save {{ formatPrice(product.originalPrice - product.price) }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              {{ product.description }}
            </p>

            <!-- Color Swatches Selector -->
            <div class="space-y-1.5 pt-2 border-t border-sand-100">
              <div class="flex justify-between text-xs">
                <span class="font-bold uppercase tracking-wider text-charcoal-800">Finish / Upholstery:</span>
                <span class="text-terracotta-700 font-medium">{{ selectedColor.name }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <button 
                  v-for="(c, idx) in product.colors" 
                  :key="idx"
                  @click="selectColor(c)"
                  class="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all p-0.5"
                  :class="selectedColor.name === c.name ? 'border-charcoal-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105'"
                >
                  <span class="block w-full h-full rounded-full" :style="{ backgroundColor: c.hex }"></span>
                </button>
              </div>
            </div>

            <!-- Specifications Table -->
            <div class="grid grid-cols-2 gap-2 text-xs pt-2 pb-1 border-t border-sand-100">
              <div class="p-2 sm:p-2.5 bg-sand-50 rounded-lg">
                <span class="text-charcoal-400 block text-[9px] uppercase font-bold">Dimensions</span>
                <span class="font-semibold text-charcoal-800 text-[11px] sm:text-xs truncate block">{{ product.dimensions }}</span>
              </div>
              <div class="p-2 sm:p-2.5 bg-sand-50 rounded-lg">
                <span class="text-charcoal-400 block text-[9px] uppercase font-bold">Weight</span>
                <span class="font-semibold text-charcoal-800 text-[11px] sm:text-xs truncate block">{{ product.weight }}</span>
              </div>
              <div class="p-2 sm:p-2.5 bg-sand-50 rounded-lg">
                <span class="text-charcoal-400 block text-[9px] uppercase font-bold">Assembly</span>
                <span class="font-semibold text-charcoal-800 text-[11px] sm:text-xs truncate block">{{ product.assemblyRequired ? 'Assembly Included' : 'Assembled' }}</span>
              </div>
              <div class="p-2 sm:p-2.5 bg-sand-50 rounded-lg">
                <span class="text-charcoal-400 block text-[9px] uppercase font-bold">Lead Time</span>
                <span class="font-semibold text-charcoal-800 text-[11px] sm:text-xs truncate block">{{ product.leadTime }}</span>
              </div>
            </div>

            <!-- Features Bullet Points -->
            <ul class="space-y-1 pt-1 text-xs text-charcoal-600 hidden sm:block">
              <li v-for="(feat, idx) in product.features" :key="idx" class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span class="text-xs">{{ feat }}</span>
              </li>
            </ul>

          </div>

          <!-- Bottom Sticky Actions: Quantity & Add to Cart -->
          <div class="sticky bottom-0 bg-white/95 backdrop-blur-md pt-3 sm:pt-4 border-t border-sand-200 space-y-2.5 pb-2 sm:pb-0">
            <div class="flex items-center gap-2 sm:gap-3">
              <!-- Quantity Stepper -->
              <div class="flex items-center border border-sand-300 rounded-xl bg-sand-50 px-1.5 py-1 sm:px-2 sm:py-1.5">
                <button 
                  @click="qty = Math.max(1, qty - 1)" 
                  class="p-1 hover:text-charcoal-900 text-charcoal-500 transition-colors"
                >
                  <Minus class="w-3.5 h-3.5" />
                </button>
                <span class="w-6 sm:w-8 text-center font-bold text-xs text-charcoal-900">{{ qty }}</span>
                <button 
                  @click="qty++" 
                  class="p-1 hover:text-charcoal-900 text-charcoal-500 transition-colors"
                >
                  <Plus class="w-3.5 h-3.5" />
                </button>
              </div>

              <!-- Main Add to Cart Button -->
              <button 
                @click="handleAddToCart"
                class="flex-1 py-3 px-4 sm:px-6 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <ShoppingBag class="w-4 h-4" />
                <span>Add To Bag — {{ formatPrice(product.price * qty) }}</span>
              </button>

              <!-- Wishlist Toggle -->
              <button 
                @click="toggleWishlist(product.id)"
                class="p-3 border border-sand-300 rounded-xl hover:bg-sand-100 text-charcoal-700 transition-colors"
                :aria-label="isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'"
              >
                <Heart 
                  class="w-4 h-4 sm:w-5 sm:h-5" 
                  :class="isInWishlist(product.id) ? 'fill-terracotta-500 text-terracotta-500' : ''" 
                />
              </button>
            </div>

            <!-- Full Overview Button -->
            <button 
              @click="openFullOverview"
              class="w-full py-2.5 rounded-xl border border-sand-300 hover:bg-sand-100 text-charcoal-800 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText class="w-3.5 h-3.5 text-terracotta-700" />
              <span>View Full Overview (Brochures, Specs & Guides)</span>
            </button>

            <!-- Free shipping banner -->
            <div class="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-charcoal-500">
              <Truck class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              <span>Complimentary White-Glove delivery & 100-night trial</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  X, 
  Star, 
  Check, 
  Heart, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Truck, 
  Eye,
  FileText
} from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  closeModals, 
  formatPrice, 
  addToCart, 
  toggleWishlist, 
  isInWishlist, 
  openRoomVisualizer,
  viewProductOverview 
} = useStore()

const product = computed(() => state.selectedProduct)
const qty = ref(1)

const openFullOverview = () => {
  if (product.value) {
    viewProductOverview(product.value)
  }
}
const selectedColor = ref(product.value?.colors?.[0] || { name: 'Standard', hex: '#ccc' })
const activeGalleryImage = ref('')

watch(
  () => product.value,
  (newVal) => {
    if (newVal) {
      qty.value = 1
      selectedColor.value = newVal.colors[0]
      activeGalleryImage.value = newVal.colors[0]?.image || newVal.gallery[0]
    }
  },
  { immediate: true }
)

const selectColor = (c) => {
  selectedColor.value = c
  if (c.image) {
    activeGalleryImage.value = c.image
  }
}

const handleAddToCart = () => {
  if (!product.value) return
  addToCart(product.value, selectedColor.value, qty.value)
  closeModals()
}
</script>
