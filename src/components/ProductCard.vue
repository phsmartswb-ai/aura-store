<template>
  <div class="group relative flex flex-col bg-white rounded-2xl border border-sand-200/90 overflow-hidden hover:shadow-xl transition-all duration-300">
    <!-- Image & Overlay Container -->
    <div class="relative aspect-[4/3] bg-sand-100 overflow-hidden cursor-pointer" @click="viewProductOverview(product)">
      <img 
        :src="currentImage" 
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
        <span 
          v-if="product.isBestseller" 
          class="bg-charcoal-900/90 backdrop-blur-sm text-sand-50 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm"
        >
          {{ product.type === 'furniture' ? 'Bestseller' : 'Top Choice' }}
        </span>
        <span 
          v-if="product.isNew" 
          class="bg-terracotta-600/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm"
        >
          2026 Release
        </span>
        <span 
          v-if="savingsPercent > 0" 
          class="bg-emerald-700/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full shadow-sm"
        >
          Save {{ savingsPercent }}%
        </span>
      </div>

      <!-- Top-right Action Buttons (Wishlist & Compare) -->
      <div class="absolute top-3 right-3 flex flex-col gap-2 z-20">
        <!-- Wishlist -->
        <button 
          @click.stop="toggleWishlist(product.id)"
          class="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-charcoal-700 hover:text-terracotta-600 hover:bg-white transition-all transform active:scale-90"
          :aria-label="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
          :title="isInWishlist(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'"
        >
          <Heart 
            class="w-4 h-4 transition-colors" 
            :class="isInWishlist(product.id) ? 'fill-terracotta-500 text-terracotta-500' : ''" 
          />
        </button>

        <!-- Compare Button -->
        <button 
          @click.stop="toggleCompare(product)"
          class="p-2 rounded-full backdrop-blur-md shadow-md transition-all transform active:scale-90"
          :class="isInCompare(product.id) 
            ? 'bg-terracotta-600 text-white hover:bg-terracotta-700 shadow-terracotta-600/30 ring-2 ring-terracotta-600/30' 
            : 'bg-white/90 text-charcoal-700 hover:text-terracotta-600 hover:bg-white'"
          :aria-label="isInCompare(product.id) ? 'Remove from comparison' : 'Compare product'"
          :title="isInCompare(product.id) ? 'In Comparison Matrix' : 'Compare Product'"
        >
          <Scale class="w-4 h-4" />
        </button>
      </div>

      <!-- Quick Actions Overlay on Hover (Desktop) -->
      <div class="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button 
          @click.stop="quickAdd"
          class="flex-1 py-2.5 bg-charcoal-900/95 hover:bg-charcoal-900 text-sand-50 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-1.5 active:scale-95"
        >
          <ShoppingBag class="w-3.5 h-3.5" />
          Quick Add
        </button>
        <button 
          @click.stop="toggleCompare(product)"
          class="p-2.5 rounded-xl shadow-lg transition-all"
          :class="isInCompare(product.id) ? 'bg-terracotta-600 text-white' : 'bg-white/95 hover:bg-white text-charcoal-900'"
          :title="isInCompare(product.id) ? 'Remove from Compare' : 'Add to Compare'"
        >
          <Scale class="w-4 h-4" />
        </button>
        <button 
          @click.stop="viewProductOverview(product)"
          class="p-2.5 bg-white/95 hover:bg-white text-charcoal-900 rounded-xl shadow-lg transition-all"
          title="Product Overview & Specifications"
        >
          <FileText class="w-4 h-4 text-terracotta-600" />
        </button>
      </div>
    </div>

    <!-- Details Content -->
    <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
      <div>
        <!-- Category & Rating -->
        <div class="flex items-center justify-between text-xs text-charcoal-500 mb-1.5">
          <span class="tracking-widest uppercase font-medium text-[11px] text-terracotta-700">
            {{ product.material }}
          </span>
          <div class="flex items-center gap-1 font-semibold text-charcoal-700">
            <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{{ product.rating }}</span>
            <span class="text-charcoal-400 font-normal">({{ product.reviewsCount }})</span>
          </div>
        </div>

        <!-- Product Name & Subtitle -->
        <h3 
          @click="viewProductOverview(product)"
          class="font-serif text-base sm:text-lg font-medium text-charcoal-900 cursor-pointer hover:text-terracotta-600 transition-colors line-clamp-1"
        >
          {{ product.name }}
        </h3>
        <p class="text-xs text-charcoal-500 mt-0.5 line-clamp-1 font-light">
          {{ product.subtitle }}
        </p>

        <!-- Color / Variant Swatches -->
        <div class="flex items-center gap-1.5 mt-3">
          <button 
            v-for="(c, idx) in product.colors" 
            :key="idx"
            @click.stop="selectedColor = c"
            class="w-4 h-4 rounded-full border-2 transition-transform"
            :class="selectedColor.name === c.name ? 'border-charcoal-900 scale-125' : 'border-transparent hover:scale-110'"
            :style="{ backgroundColor: c.hex }"
            :title="c.name"
          ></button>
          <span class="text-[11px] text-charcoal-400 ml-1.5 font-light truncate">
            {{ selectedColor.name }}
          </span>
        </div>
      </div>

      <!-- Price & Overview Trigger -->
      <div class="pt-3.5 mt-3 border-t border-sand-100 flex items-center justify-between">
        <div>
          <div class="flex items-baseline gap-2">
            <span class="font-serif text-base sm:text-lg font-bold text-charcoal-900">
              {{ formatPrice(product.price) }}
            </span>
            <span v-if="product.originalPrice > product.price" class="text-xs text-charcoal-400 line-through">
              {{ formatPrice(product.originalPrice) }}
            </span>
          </div>
          <button 
            @click.stop="viewProductOverview(product)"
            class="text-[11px] text-terracotta-700 hover:text-terracotta-900 font-semibold flex items-center gap-1 group/btn mt-0.5"
          >
            <span>Overview & Specs</span>
            <ArrowRight class="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        <!-- Quick Add Button -->
        <button 
          @click.stop="quickAdd"
          class="p-2 sm:p-2.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 shadow-md active:scale-95 transition-all"
          aria-label="Add to bag"
          title="Add to Bag"
        >
          <ShoppingBag class="w-4 h-4" />
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Heart, Star, ShoppingBag, FileText, ArrowRight, Scale } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { 
  formatPrice, 
  addToCart, 
  toggleWishlist, 
  isInWishlist, 
  toggleCompare,
  isInCompare,
  viewProductOverview 
} = useStore()

const selectedColor = ref(props.product.colors?.[0] || { name: 'Standard', hex: '#ccc' })

const currentImage = computed(() => {
  return selectedColor.value?.image || props.product.gallery[0]
})

const savingsPercent = computed(() => {
  if (!props.product.originalPrice || props.product.originalPrice <= props.product.price) return 0
  return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
})

const quickAdd = () => {
  addToCart(props.product, selectedColor.value, 1)
}
</script>
