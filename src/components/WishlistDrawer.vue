<template>
  <div 
    v-if="state.activeModal === 'wishlist'"
    class="fixed inset-0 z-50 overflow-hidden"
  >
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
      @click="closeModals"
    ></div>

    <div class="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
      <div class="w-screen max-w-full sm:max-w-md bg-[#FAF8F5] border-l border-sand-200 shadow-2xl flex flex-col">
        
        <!-- Header -->
        <div class="p-4 sm:p-6 bg-white border-b border-sand-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Heart class="w-5 h-5 text-terracotta-600 fill-terracotta-500" />
            <h2 class="font-serif text-lg font-bold text-charcoal-900 tracking-wide">
              Saved Pieces ({{ wishlistItems.length }})
            </h2>
          </div>
          <button 
            @click="closeModals"
            class="p-2 rounded-full hover:bg-sand-100 text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Wishlist Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="wishlistItems.length === 0" class="text-center py-16 space-y-4">
            <div class="w-16 h-16 rounded-full bg-sand-200 flex items-center justify-center mx-auto text-charcoal-400">
              <Heart class="w-8 h-8" />
            </div>
            <h3 class="font-serif text-lg text-charcoal-800">No saved pieces yet</h3>
            <p class="text-xs text-charcoal-500 max-w-xs mx-auto">
              Tap the heart icon on any furniture piece to save it to your wishlist.
            </p>
            <button 
              @click="closeModals"
              class="px-6 py-2.5 rounded-full bg-charcoal-900 text-sand-50 text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-800"
            >
              Explore Collection
            </button>
          </div>

          <!-- Items -->
          <div 
            v-for="item in wishlistItems" 
            :key="item.id"
            class="p-4 bg-white rounded-2xl border border-sand-200/80 shadow-sm flex gap-4"
          >
            <img 
              :src="item.colors[0].image" 
              :alt="item.name"
              class="w-20 h-20 rounded-xl object-cover bg-sand-100 flex-shrink-0 cursor-pointer"
              @click="openProductModal(item)"
            />

            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between">
                  <h4 
                    @click="openProductModal(item)"
                    class="font-serif text-sm font-medium text-charcoal-900 cursor-pointer hover:text-terracotta-600 line-clamp-1"
                  >
                    {{ item.name }}
                  </h4>
                  <button 
                    @click="toggleWishlist(item.id)"
                    class="text-charcoal-400 hover:text-red-500 p-0.5 ml-1"
                    title="Remove from saved"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div class="text-[11px] text-charcoal-500 mt-0.5">
                  {{ item.material }} • {{ item.dimensions }}
                </div>
              </div>

              <div class="flex items-center justify-between mt-3 pt-2 border-t border-sand-100">
                <span class="font-serif font-bold text-sm text-charcoal-900">
                  {{ formatPrice(item.price) }}
                </span>

                <button 
                  @click="moveToCart(item)"
                  class="px-3 py-1.5 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <ShoppingBag class="w-3 h-3" />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Move all to cart Footer -->
        <div v-if="wishlistItems.length > 0" class="p-4 sm:p-6 pb-safe bg-white border-t border-sand-200">
          <button 
            @click="moveAllToCart"
            class="w-full py-3.5 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag class="w-4 h-4" />
            <span>Move All To Bag ({{ wishlistItems.length }} items)</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Heart, X, Trash2, ShoppingBag } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  closeModals, 
  openProductModal, 
  openCart, 
  formatPrice, 
  toggleWishlist, 
  addToCart, 
  showToast 
} = useStore()

const wishlistItems = computed(() => {
  return state.products.filter(p => state.wishlist.includes(p.id))
})

const moveToCart = (item) => {
  addToCart(item)
  toggleWishlist(item.id)
}

const moveAllToCart = () => {
  wishlistItems.value.forEach(item => {
    addToCart(item)
  })
  state.wishlist = []
  showToast('Moved all saved items to your bag!', 'success')
  closeModals()
  openCart()
}
</script>

