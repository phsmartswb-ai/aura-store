<template>
  <section class="py-12 sm:py-16 bg-white border-y border-sand-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        
        <!-- Pillar 1 -->
        <div class="flex items-start gap-4">
          <div class="p-3 rounded-2xl bg-sand-100 text-charcoal-900 flex-shrink-0">
            <TreePine v-if="state.activeMode === 'furniture'" class="w-6 h-6 text-emerald-800" />
            <Award v-else class="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h4 class="font-serif font-bold text-base text-charcoal-900">
              {{ state.activeMode === 'furniture' ? 'FSC® Certified Timber' : 'ISO/IEC 17025 Accredited' }}
            </h4>
            <p class="text-xs text-charcoal-600 mt-1 font-light leading-relaxed">
              {{ state.activeMode === 'furniture' 
                ? 'Harvested exclusively from responsibly managed North American temperate forests.' 
                : 'Every measuring instrument includes factory accredited calibration data and certification.' 
              }}
            </p>
          </div>
        </div>

        <!-- Pillar 2 -->
        <div class="flex items-start gap-4">
          <div class="p-3 rounded-2xl bg-sand-100 text-charcoal-900 flex-shrink-0">
            <Truck class="w-6 h-6 text-terracotta-700" />
          </div>
          <div>
            <h4 class="font-serif font-bold text-base text-charcoal-900">
              {{ state.activeMode === 'furniture' ? 'White-Glove Setup' : 'Temperature-Controlled Freight' }}
            </h4>
            <p class="text-xs text-charcoal-600 mt-1 font-light leading-relaxed">
              {{ state.activeMode === 'furniture' 
                ? 'Delivered to your room of choice, professionally assembled, with all debris cleared.' 
                : 'Shock-isolated, temperature-monitored secure transit directly to your plant facility.' 
              }}
            </p>
          </div>
        </div>

        <!-- Pillar 3 -->
        <div class="flex items-start gap-4">
          <div class="p-3 rounded-2xl bg-sand-100 text-charcoal-900 flex-shrink-0">
            <Moon v-if="state.activeMode === 'furniture'" class="w-6 h-6 text-indigo-800" />
            <Gauge v-else class="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <h4 class="font-serif font-bold text-base text-charcoal-900">
              {{ state.activeMode === 'furniture' ? '100-Night In-Home Trial' : 'NIST & DKD Traceable' }}
            </h4>
            <p class="text-xs text-charcoal-600 mt-1 font-light leading-relaxed">
              {{ state.activeMode === 'furniture' 
                ? 'Experience the forms and fabrics in your own home’s morning and evening light.' 
                : 'Direct traceability to primary metrology standards with full uncertainty budgets.' 
              }}
            </p>
          </div>
        </div>

        <!-- Pillar 4 -->
        <div class="flex items-start gap-4">
          <div class="p-3 rounded-2xl bg-sand-100 text-charcoal-900 flex-shrink-0">
            <ShieldCheck class="w-6 h-6 text-charcoal-800" />
          </div>
          <div>
            <h4 class="font-serif font-bold text-base text-charcoal-900">
              {{ state.activeMode === 'furniture' ? '10-Year Heirloom Warranty' : '3-Year Industrial Warranty' }}
            </h4>
            <p class="text-xs text-charcoal-600 mt-1 font-light leading-relaxed">
              {{ state.activeMode === 'furniture' 
                ? 'Mortise-and-tenon structural integrity built to be passed down through generations.' 
                : 'Complete coverage including replacement loaner units during annual recalibrations.' 
              }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { TreePine, Truck, Moon, ShieldCheck, Award, Gauge } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { state } = useStore()
</script>
