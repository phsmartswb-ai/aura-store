<template>
  <section class="py-20 bg-charcoal-900 text-sand-50 relative overflow-hidden">
    <!-- Subtle background accent circle -->
    <div class="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-sand-700/10 pointer-events-none blur-3xl"></div>
    <div class="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-terracotta-700/10 pointer-events-none blur-3xl"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
      <span class="inline-block text-[11px] uppercase tracking-[0.25em] font-semibold text-sand-300">
        The Studio Dossier
      </span>

      <h2 class="font-serif text-3xl sm:text-5xl font-normal leading-tight">
        Join the Inner Circle. <br/>
        <span class="italic font-light text-sand-300">Enjoy 10% Off Your First Piece.</span>
      </h2>

      <p class="text-sand-300 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
        Subscribers receive private access to limited timber harvests, interior design consultation notes, and bespoke capsule invitations.
      </p>

      <div v-if="!subscribed" class="max-w-md mx-auto pt-2">
        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-2">
          <input 
            v-model="email" 
            required 
            type="email" 
            placeholder="Enter your email address..." 
            class="flex-1 px-4 py-3.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-sand-100 placeholder-charcoal-500 text-xs focus:outline-none focus:ring-1 focus:ring-sand-300"
          />
          <button 
            type="submit" 
            class="px-7 py-3.5 bg-sand-100 hover:bg-white text-charcoal-900 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Claim 10% Off
          </button>
        </form>
        <p class="text-[10px] text-charcoal-500 mt-2">
          We respect your peace. Unsubscribe with 1-click anytime.
        </p>
      </div>

      <!-- Success State -->
      <div v-else class="max-w-md mx-auto p-6 rounded-2xl bg-charcoal-800/90 border border-sand-500/20 text-center space-y-2">
        <div class="inline-block p-2 rounded-full bg-emerald-900/60 text-emerald-400">
          <Check class="w-5 h-5" />
        </div>
        <h4 class="font-serif text-lg text-sand-100">Welcome to Aura & Oak</h4>
        <p class="text-xs text-sand-300">
          Use promotional code <strong class="text-white underline tracking-wider font-mono">WELCOME10</strong> at checkout for 10% off your purchase.
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { showToast, applyPromo } = useStore()
const email = ref('')
const subscribed = ref(false)

const handleSubscribe = () => {
  if (email.value) {
    subscribed.value = true
    applyPromo('WELCOME10')
    showToast('Subscribed! Promo code WELCOME10 has been automatically applied to your cart', 'success')
  }
}
</script>

