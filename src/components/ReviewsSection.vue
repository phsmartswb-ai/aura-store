<template>
  <section class="py-20 bg-sand-50 border-b border-sand-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Press Quotes -->
      <div class="border-b border-sand-200 pb-12 mb-16">
        <span class="block text-center text-xs uppercase tracking-widest text-charcoal-400 font-semibold mb-6">
          Recognized by Global Design Authorities
        </span>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
          <div v-for="(press, idx) in quotes" :key="idx" class="space-y-2">
            <div class="font-serif font-bold text-sm sm:text-base tracking-widest text-charcoal-900">
              {{ press.source }}
            </div>
            <p class="text-xs text-charcoal-500 italic max-w-xs mx-auto">
              "{{ press.quote }}"
            </p>
          </div>
        </div>
      </div>

      <!-- Verified Customer Reviews Section -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <div class="inline-flex items-center gap-1.5 text-amber-500 mb-2">
          <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
          <span class="text-xs font-bold text-charcoal-800 ml-1">4.9 / 5.0 (over 3,800+ homes)</span>
        </div>
        <h2 class="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
          Designed for Living, Revered in Homes
        </h2>
        <p class="text-charcoal-600 text-sm mt-2 font-light">
          Real feedback from architects, interior designers, and discerning homeowners worldwide.
        </p>
      </div>

      <!-- Customer Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="rev in reviews" 
          :key="rev.id"
          class="bg-white p-7 rounded-2xl border border-sand-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-1 text-amber-400">
              <Star v-for="i in rev.rating" :key="i" class="w-4 h-4 fill-current" />
            </div>
            <h4 class="font-serif font-bold text-base text-charcoal-900">
              "{{ rev.title }}"
            </h4>
            <p class="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light">
              {{ rev.content }}
            </p>
          </div>

          <div class="pt-4 border-t border-sand-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img :src="rev.avatar" :alt="rev.author" class="w-10 h-10 rounded-full object-cover border border-sand-200" />
              <div>
                <div class="font-medium text-xs text-charcoal-900">{{ rev.author }}</div>
                <div class="text-[10px] text-charcoal-400">{{ rev.location }}</div>
              </div>
            </div>
            <span class="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              Verified Buyer
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { Star } from 'lucide-vue-next'
import { REVIEWS, PRESS_QUOTES } from '../data/products'

const reviews = REVIEWS
const quotes = PRESS_QUOTES
</script>

