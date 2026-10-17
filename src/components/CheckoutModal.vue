<template>
  <div 
    v-if="state.activeModal === 'checkout'"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
  >
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
      @click="step === 3 ? closeModals() : null"
    ></div>

    <!-- Modal Box -->
    <div class="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-sand-200 z-10 p-4 sm:p-8">
      
      <!-- Close Button -->
      <button 
        @click="closeModals"
        class="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-sand-100 hover:bg-sand-200 text-charcoal-700 transition-colors z-20 shadow-sm"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Step Indicator -->
      <div v-if="step < 3" class="mb-6 sm:mb-8">
        <div class="flex items-center justify-between text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-2">
          <span :class="step >= 1 ? 'text-charcoal-900 font-bold' : ''">1. Delivery</span>
          <span :class="step >= 2 ? 'text-charcoal-900 font-bold' : ''">2. Payment</span>
          <span :class="step === 3 ? 'text-charcoal-900 font-bold' : ''">3. Confirmation</span>
        </div>
        <div class="w-full bg-sand-200 h-1.5 rounded-full overflow-hidden">
          <div 
            class="h-full bg-charcoal-900 transition-all duration-300"
            :style="{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }"
          ></div>
        </div>
      </div>

      <!-- STEP 1: Shipping & Delivery -->
      <div v-if="step === 1" class="space-y-5 sm:space-y-6">
        <div>
          <h2 class="font-serif text-xl sm:text-2xl text-charcoal-900 font-normal">Delivery Details</h2>
          <p class="text-xs text-charcoal-500 mt-1">Where should we deliver your Scandinavian furniture?</p>
        </div>

        <form @submit.prevent="step = 2" class="space-y-3.5 sm:space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">First Name</label>
              <input 
                v-model="form.firstName" 
                required 
                type="text" 
                placeholder="Elena" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Last Name</label>
              <input 
                v-model="form.lastName" 
                required 
                type="text" 
                placeholder="Rostova" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Email (for updates)</label>
              <input 
                v-model="form.email" 
                required 
                type="email" 
                placeholder="elena@example.com" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Phone (for courier)</label>
              <input 
                v-model="form.phone" 
                required 
                type="tel" 
                placeholder="+1 (555) 234-5678" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Street Address</label>
            <input 
              v-model="form.address" 
              required 
              type="text" 
              placeholder="742 Evergreen Terrace, Apt 4B" 
              class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">City</label>
              <input 
                v-model="form.city" 
                required 
                type="text" 
                placeholder="New York" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">State / Prov</label>
              <input 
                v-model="form.state" 
                required 
                type="text" 
                placeholder="NY" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">ZIP / Postal</label>
              <input 
                v-model="form.zip" 
                required 
                type="text" 
                placeholder="10013" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
          </div>

          <!-- Delivery Service Options -->
          <div class="pt-2 space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700">Delivery Service Tier</label>
            
            <label 
              class="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all"
              :class="state.deliveryOption === 'white-glove' ? 'border-charcoal-900 bg-sand-100/70 ring-1 ring-charcoal-900' : 'border-sand-200 hover:bg-sand-50'"
            >
              <div class="flex items-center gap-3">
                <input 
                  type="radio" 
                  value="white-glove" 
                  v-model="state.deliveryOption"
                  class="accent-charcoal-900"
                />
                <div>
                  <div class="font-bold text-xs text-charcoal-900 flex items-center gap-1.5">
                    <span>White-Glove In-Home Setup</span>
                    <span class="text-[10px] bg-terracotta-100 text-terracotta-700 px-2 py-0.2 rounded-full font-semibold">Recommended</span>
                  </div>
                  <p class="text-[11px] text-charcoal-500">Placement in room of choice, assembly, and all packaging removal.</p>
                </div>
              </div>
              <span class="font-bold text-xs text-charcoal-900">
                {{ cartSubtotal > 1500 ? 'FREE' : formatPrice(149) }}
              </span>
            </label>

            <label 
              class="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all"
              :class="state.deliveryOption === 'standard' ? 'border-charcoal-900 bg-sand-100/70 ring-1 ring-charcoal-900' : 'border-sand-200 hover:bg-sand-50'"
            >
              <div class="flex items-center gap-3">
                <input 
                  type="radio" 
                  value="standard" 
                  v-model="state.deliveryOption"
                  class="accent-charcoal-900"
                />
                <div>
                  <div class="font-bold text-xs text-charcoal-900">Standard Threshold Delivery</div>
                  <p class="text-[11px] text-charcoal-500">Delivered directly to your front entryway or building lobby.</p>
                </div>
              </div>
              <span class="font-bold text-xs text-charcoal-900">
                {{ cartSubtotal > 1500 ? 'FREE' : formatPrice(49) }}
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            class="w-full py-3.5 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
          >
            <span>Continue to Payment</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </form>
      </div>

      <!-- STEP 2: Payment -->
      <div v-if="step === 2" class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-serif text-2xl text-charcoal-900 font-normal">Payment Method</h2>
            <p class="text-xs text-charcoal-500 mt-1">Encrypted 256-bit SSL transaction</p>
          </div>
          <button @click="step = 1" class="text-xs text-terracotta-700 hover:underline">
            ← Edit Delivery
          </button>
        </div>

        <!-- Quick 1-Click Pay Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button 
            @click="completeOrder('Apple Pay')" 
            class="py-3 bg-black text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-all"
          >
            <span> Pay</span>
          </button>
          <button 
            @click="completeOrder('Google Pay')" 
            class="py-3 bg-neutral-100 border border-sand-300 text-charcoal-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-all"
          >
            <span>G Pay</span>
          </button>
        </div>

        <div class="relative flex items-center justify-center my-2">
          <div class="border-t border-sand-200 w-full"></div>
          <span class="bg-white px-3 text-[10px] text-charcoal-400 uppercase tracking-widest absolute">Or pay with card</span>
        </div>

        <form @submit.prevent="completeOrder('Credit Card')" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Cardholder Name</label>
            <input 
              v-model="cardForm.name" 
              required 
              type="text" 
              placeholder="Elena Rostova" 
              class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Card Number</label>
            <div class="relative">
              <CreditCard class="w-4 h-4 text-charcoal-400 absolute left-3 top-3 pointer-events-none" />
              <input 
                v-model="cardForm.number" 
                required 
                type="text" 
                maxlength="19"
                placeholder="4242 •••• •••• 4242" 
                class="w-full pl-9 pr-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900 font-mono"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">Expiry (MM/YY)</label>
              <input 
                v-model="cardForm.expiry" 
                required 
                type="text" 
                maxlength="5"
                placeholder="08/28" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">CVV Security Code</label>
              <input 
                v-model="cardForm.cvv" 
                required 
                type="password" 
                maxlength="4"
                placeholder="•••" 
                class="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 rounded-xl text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
              />
            </div>
          </div>

          <!-- Order Summary mini box -->
          <div class="p-3.5 bg-sand-50 rounded-xl border border-sand-200 text-xs flex justify-between items-center">
            <span class="text-charcoal-600">Total Charged Today:</span>
            <span class="font-serif font-bold text-base text-charcoal-900">{{ formatPrice(cartTotal) }}</span>
          </div>

          <button 
            type="submit" 
            class="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <Lock class="w-4 h-4" />
            <span>Complete Order & Authorize {{ formatPrice(cartTotal) }}</span>
          </button>
        </form>
      </div>

      <!-- STEP 3: Order Confirmation -->
      <div v-if="step === 3" class="text-center py-6 space-y-6">
        <div class="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 class="w-10 h-10" />
        </div>

        <div>
          <span class="text-xs uppercase tracking-widest font-bold text-terracotta-700">Thank You For Your Order</span>
          <h2 class="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">
            Your Sanctuary Is On Its Way
          </h2>
          <p class="text-xs sm:text-sm text-charcoal-500 mt-2 max-w-md mx-auto">
            Order confirmed <strong class="text-charcoal-900">#{{ orderNumber }}</strong>. We've emailed your detailed tracking dossier to <span class="text-charcoal-800 font-medium">{{ form.email }}</span>.
          </p>
        </div>

        <!-- Order Summary Card -->
        <div class="bg-sand-50 border border-sand-200 rounded-2xl p-5 text-left text-xs space-y-3">
          <div class="flex justify-between border-b border-sand-200 pb-2">
            <span class="text-charcoal-500">Estimated Delivery</span>
            <span class="font-bold text-charcoal-900">Thursday, Oct 22 – Saturday, Oct 24</span>
          </div>
          <div class="flex justify-between border-b border-sand-200 pb-2">
            <span class="text-charcoal-500">Delivery Tier</span>
            <span class="font-bold text-charcoal-900">White-Glove Placement in Room of Choice</span>
          </div>
          <div class="flex justify-between">
            <span class="text-charcoal-500">Shipping To</span>
            <span class="font-bold text-charcoal-900">{{ form.firstName }} {{ form.lastName }}, {{ form.city }}, {{ form.state }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button 
            @click="closeModals"
            class="w-full sm:w-auto px-8 py-3.5 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl font-semibold text-xs uppercase tracking-wider"
          >
            Back to Living Gallery
          </button>
          <button 
            @click="printReceipt"
            class="w-full sm:w-auto px-6 py-3.5 border border-sand-300 hover:bg-sand-100 text-charcoal-800 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Printer class="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  X, 
  ArrowRight, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Printer 
} from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import { useStore } from '../store/useStore'

const { 
  state, 
  closeModals, 
  cartSubtotal, 
  cartTotal, 
  formatPrice 
} = useStore()

const step = ref(1)
const orderNumber = ref('AO-' + Math.floor(100000 + Math.random() * 900000))

const form = reactive({
  firstName: 'Elena',
  lastName: 'Rostova',
  email: 'elena.rostova@designstudio.com',
  phone: '+1 (212) 555-0199',
  address: '142 Franklin Street, Suite 4A',
  city: 'New York',
  state: 'NY',
  zip: '10013',
})

const cardForm = reactive({
  name: 'Elena Rostova',
  number: '4242 •••• •••• 4242',
  expiry: '08/28',
  cvv: '849',
})

const completeOrder = (method) => {
  step.value = 3
  // Clear cart after order
  state.cart = []
  
  // Confetti celebration
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    })
  } catch (e) {
    // ignore
  }
}

const printReceipt = () => {
  window.print()
}
</script>

