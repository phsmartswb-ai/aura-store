<template>
  <div 
    v-if="state.activeModal === 'cart'"
    class="fixed inset-0 z-50 overflow-hidden"
  >
    <!-- Dark Backdrop -->
    <div 
      class="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
      @click="closeModals"
    ></div>

    <div class="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
      <div class="w-screen max-w-full sm:max-w-md bg-[#FAF8F5] border-l border-sand-200 shadow-2xl flex flex-col">
        
        <!-- Drawer Header -->
        <div class="p-4 sm:p-6 bg-white border-b border-sand-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ShoppingBag class="w-5 h-5 text-charcoal-900" />
            <h2 class="font-serif text-lg font-bold text-charcoal-900 tracking-wide">
              Your Curated Bag ({{ cartCount }})
            </h2>
          </div>
          <button 
            @click="closeModals"
            class="p-2 rounded-full hover:bg-sand-100 text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Free White-Glove Progress Bar -->
        <div class="bg-sand-100 px-6 py-3 border-b border-sand-200">
          <div class="flex items-center justify-between text-xs font-medium text-charcoal-700 mb-1.5">
            <span v-if="freeShippingRemaining > 0">
              Add <strong class="text-terracotta-700">{{ formatPrice(freeShippingRemaining) }}</strong> more for <strong>FREE White-Glove Setup</strong>
            </span>
            <span v-else class="text-emerald-700 font-bold flex items-center gap-1">
              <Sparkles class="w-3.5 h-3.5 text-emerald-600" />
              You've unlocked Free White-Glove Setup!
            </span>
            <span>{{ freeShippingPercent }}%</span>
          </div>
          <div class="w-full bg-sand-200 h-1.5 rounded-full overflow-hidden">
            <div 
              class="h-full bg-emerald-600 transition-all duration-500" 
              :style="{ width: `${freeShippingPercent}%` }"
            ></div>
          </div>
        </div>

        <!-- Cart Item List / Empty State -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="state.cart.length === 0" class="text-center py-16 space-y-4">
            <div class="w-16 h-16 rounded-full bg-sand-200 flex items-center justify-center mx-auto text-charcoal-400">
              <ShoppingBag class="w-8 h-8" />
            </div>
            <h3 class="font-serif text-lg text-charcoal-800">Your bag is empty</h3>
            <p class="text-xs text-charcoal-500 max-w-xs mx-auto">
              Explore our Scandinavian handcrafted pieces to start designing your calm living space.
            </p>
            <button 
              @click="closeModals"
              class="px-6 py-2.5 rounded-full bg-charcoal-900 text-sand-50 text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-800"
            >
              Continue Browsing
            </button>
          </div>

          <!-- Items -->
          <div 
            v-for="item in state.cart" 
            :key="item.cartId"
            class="flex gap-4 p-3 bg-white rounded-2xl border border-sand-200/80 shadow-sm"
          >
            <!-- Thumbnail -->
            <img 
              :src="item.selectedColor.image" 
              :alt="item.name"
              class="w-20 h-20 rounded-xl object-cover bg-sand-100 flex-shrink-0"
            />

            <!-- Item Info -->
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between">
                  <h4 class="font-serif text-sm font-medium text-charcoal-900 leading-snug line-clamp-1">
                    {{ item.name }}
                  </h4>
                  <button 
                    @click="removeFromCart(item.cartId)"
                    class="text-charcoal-400 hover:text-red-500 p-0.5 ml-1"
                    title="Remove item"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div class="text-[11px] text-charcoal-500 mt-0.5 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full border border-sand-300" :style="{ backgroundColor: item.selectedColor.hex }"></span>
                  <span>{{ item.selectedColor.name }}</span>
                  <span>•</span>
                  <span>{{ item.dimensions }}</span>
                </div>
              </div>

              <!-- Price & Quantity Stepper -->
              <div class="flex items-center justify-between mt-2 pt-2 border-t border-sand-100">
                <div class="flex items-center border border-sand-200 rounded-lg bg-sand-50">
                  <button 
                    @click="updateQuantity(item.cartId, -1)"
                    class="px-2 py-0.5 text-charcoal-500 hover:text-charcoal-900"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="text-xs font-bold text-charcoal-800 px-1">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.cartId, 1)"
                    class="px-2 py-0.5 text-charcoal-500 hover:text-charcoal-900"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
                <span class="font-serif font-bold text-sm text-charcoal-900">
                  {{ formatPrice(item.price * item.quantity) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Promo Code Input & Summary Footer -->
        <div v-if="state.cart.length > 0" class="p-4 sm:p-6 pb-safe bg-white border-t border-sand-200 space-y-3 sm:space-y-4">
          <!-- Promo Code -->
          <div class="flex gap-2">
            <div class="relative flex-1">
              <Tag class="w-3.5 h-3.5 text-charcoal-400 absolute left-3 top-3 pointer-events-none" />
              <input 
                v-model="promoInput"
                type="text"
                placeholder="Promo code (e.g. WELCOME10)"
                class="w-full pl-9 pr-3 py-2 bg-sand-50 border border-sand-300 rounded-xl text-xs uppercase font-medium focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                @keyup.enter="handlePromoApply"
              />
            </div>
            <button 
              @click="handlePromoApply"
              class="px-4 py-2 bg-sand-200 hover:bg-sand-300 text-charcoal-900 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Apply
            </button>
          </div>

          <!-- Applied Promo Tag -->
          <div v-if="state.appliedPromo" class="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
            <span class="font-medium">Applied: <strong>{{ state.appliedPromo }}</strong> ({{ state.promoDiscountPercent }}% OFF)</span>
            <button @click="removePromo" class="text-emerald-900 hover:underline text-[11px]">Remove</button>
          </div>

          <!-- Price Calculations -->
          <div class="space-y-1.5 text-xs text-charcoal-600">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="font-medium text-charcoal-900">{{ formatPrice(cartSubtotal) }}</span>
            </div>
            <div v-if="discountAmount > 0" class="flex justify-between text-emerald-700">
              <span>Promotional Savings</span>
              <span>-{{ formatPrice(discountAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Delivery & In-Home Placement</span>
              <span v-if="shippingCost === 0" class="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
              <span v-else class="font-medium text-charcoal-900">{{ formatPrice(shippingCost) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span>{{ formatPrice(estimatedTax) }}</span>
            </div>
            <div class="flex justify-between text-base font-serif font-bold text-charcoal-900 pt-2 border-t border-sand-100">
              <span>Total</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
          </div>

          <!-- Checkout Trigger Button -->
          <button 
            @click="proceedToCheckout"
            class="w-full py-4 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight class="w-4 h-4" />
          </button>

          <p class="text-center text-[10px] text-charcoal-400">
            100-Night in-home trial • 10-Year structural timber warranty
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Sparkles 
} from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  closeModals, 
  openCheckout, 
  cartCount, 
  cartSubtotal, 
  discountAmount, 
  shippingCost, 
  estimatedTax, 
  cartTotal, 
  formatPrice, 
  updateQuantity, 
  removeFromCart, 
  applyPromo, 
  removePromo 
} = useStore()

const promoInput = ref('')

const freeShippingThreshold = 1500
const freeShippingRemaining = computed(() => {
  return Math.max(0, freeShippingThreshold - cartSubtotal.value)
})
const freeShippingPercent = computed(() => {
  if (cartSubtotal.value >= freeShippingThreshold) return 100
  return Math.min(100, Math.round((cartSubtotal.value / freeShippingThreshold) * 100))
})

const handlePromoApply = () => {
  if (promoInput.value) {
    applyPromo(promoInput.value)
    promoInput.value = ''
  }
}

const proceedToCheckout = () => {
  closeModals()
  openCheckout()
}
</script>

