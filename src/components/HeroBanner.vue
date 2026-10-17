<template>
  <section class="relative overflow-hidden bg-sand-100 border-b border-sand-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Content -->
        <div class="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200/90 border border-sand-300 text-charcoal-700 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" :class="state.activeMode === 'furniture' ? 'bg-terracotta-500' : 'bg-emerald-600'"></span>
            <span>
              {{ state.activeMode === 'furniture' ? 'Spring / Summer 2026 Release' : 'Advanced Manufacturing & Metrology 2026' }}
            </span>
          </div>

          <!-- Headline -->
          <h1 v-if="state.activeMode === 'furniture'" class="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 leading-[1.12] font-normal">
            Sculptural Calm. <br/>
            <span class="italic font-light text-terracotta-700">Heirloom Timber.</span>
          </h1>
          <h1 v-else class="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-900 leading-[1.12] font-normal">
            Sub-Micron Precision. <br/>
            <span class="italic font-light text-emerald-800">Industrial Metrology.</span>
          </h1>

          <!-- Description -->
          <p class="text-charcoal-600 text-sm sm:text-lg max-w-xl font-light leading-relaxed">
            <template v-if="state.activeMode === 'furniture'">
              Crafted with certified North American white oak, Italian bouclé, and honed Roman travertine stone. Designed for modern life, built to endure for generations.
            </template>
            <template v-else>
              Accredited optical coordinate measuring systems, radiometric thermal process sensors, Coriolis mass flow meters, and vibration analyzers engineered for zero-defect manufacturing.
            </template>
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a 
              href="#catalog-section"
              class="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sand-50"
              :class="state.activeMode === 'furniture' ? 'bg-charcoal-900 hover:bg-charcoal-800' : 'bg-emerald-950 hover:bg-emerald-900'"
            >
              <span>{{ state.activeMode === 'furniture' ? 'Explore Furniture' : 'Explore Instruments' }}</span>
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button 
              v-if="state.activeMode === 'furniture'"
              @click="openRoomVisualizer()"
              class="px-6 sm:px-7 py-3.5 sm:py-4 bg-white/90 hover:bg-white text-charcoal-900 border border-sand-300 rounded-full font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <Eye class="w-4 h-4 text-terracotta-600" />
              <span>Room 3D Visualizer</span>
            </button>
            <a 
              v-else
              href="#catalog-section"
              class="px-6 sm:px-7 py-3.5 sm:py-4 bg-white/90 hover:bg-white text-charcoal-900 border border-sand-300 rounded-full font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <CheckCircle2 class="w-4 h-4 text-emerald-700" />
              <span>ISO 17025 Calibrated</span>
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-sand-200/80 max-w-lg">
            <template v-if="state.activeMode === 'furniture'">
              <div>
                <div class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">100-Night</div>
                <div class="text-[9px] sm:text-xs text-charcoal-500 uppercase tracking-wider mt-0.5">In-Home Trial</div>
              </div>
              <div>
                <div class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">FSC®</div>
                <div class="text-[9px] sm:text-xs text-charcoal-500 uppercase tracking-wider mt-0.5">Certified Timber</div>
              </div>
              <div>
                <div class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">White-Glove</div>
                <div class="text-[9px] sm:text-xs text-charcoal-500 uppercase tracking-wider mt-0.5">Setup Included</div>
              </div>
            </template>
            <template v-else>
              <div>
                <div class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">ISO 17025</div>
                <div class="text-[9px] sm:text-xs text-charcoal-500 uppercase tracking-wider mt-0.5">Accredited Lab</div>
              </div>
              <div>
                <div class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">0.0005mm</div>
                <div class="text-[9px] sm:text-xs text-charcoal-500 uppercase tracking-wider mt-0.5">Sub-Micron Res</div>
              </div>
              <div>
                <div class="font-serif text-lg sm:text-2xl font-bold text-charcoal-900">3-Year</div>
                <div class="text-[9px] sm:text-xs text-charcoal-500 uppercase tracking-wider mt-0.5">Factory Warranty</div>
              </div>
            </template>
          </div>
        </div>

        <!-- Right Visual Showcase -->
        <div class="lg:col-span-6 relative mt-4 lg:mt-0">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Main Hero Image Frame -->
            <div class="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-sand-200 border-2 sm:border-4 border-white">
              <img 
                :src="activeHeroImage" 
                :alt="state.activeMode === 'furniture' ? 'Scandinavian furniture' : 'Industrial manufacturing instruments'"
                class="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105"
              />
            </div>

            <!-- Floating Product Spot Card -->
            <div class="absolute -bottom-4 left-3 sm:-bottom-6 sm:left-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-sand-200 max-w-[250px] sm:max-w-xs flex items-center gap-2.5 sm:gap-4">
              <img 
                :src="featuredSpotImage" 
                alt="Featured Product"
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover bg-sand-100 flex-shrink-0"
              />
              <div class="overflow-hidden">
                <span class="inline-block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-terracotta-600">
                  {{ state.activeMode === 'furniture' ? 'Featured Chair' : 'Top Metrology' }}
                </span>
                <h4 class="font-medium text-xs sm:text-sm text-charcoal-900 truncate">
                  {{ state.activeMode === 'furniture' ? 'Sora Bouclé Chair' : 'OptiScan Pro CMM' }}
                </h4>
                <div class="flex items-center gap-1.5 mt-0.5 sm:mt-1">
                  <span class="font-bold text-xs sm:text-sm text-charcoal-900">
                    {{ formatPrice(state.activeMode === 'furniture' ? 890 : 6450) }}
                  </span>
                  <span class="text-[10px] sm:text-xs text-charcoal-400 line-through">
                    {{ formatPrice(state.activeMode === 'furniture' ? 1150 : 7800) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Image Switcher Pill -->
            <div class="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 p-1 sm:p-1.5 rounded-full bg-charcoal-900/60 backdrop-blur-md">
              <button 
                v-for="(img, idx) in currentHeroImages" 
                :key="idx"
                @click="activeHeroIndex = idx"
                class="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all"
                :class="activeHeroIndex === idx ? 'bg-white w-5 sm:w-6' : 'bg-white/50 hover:bg-white/80'"
                :aria-label="`Slide ${idx + 1}`"
              ></button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ArrowRight, Eye, CheckCircle2 } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { state, formatPrice, openRoomVisualizer } = useStore()

const furnitureHeroImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
]

const instrumentHeroImages = [
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
]

const activeHeroIndex = ref(0)

const currentHeroImages = computed(() => {
  return state.activeMode === 'furniture' ? furnitureHeroImages : instrumentHeroImages
})

watch(
  () => state.activeMode,
  () => {
    activeHeroIndex.value = 0
  }
)

const activeHeroImage = computed(() => currentHeroImages.value[activeHeroIndex.value])

const featuredSpotImage = computed(() => {
  return state.activeMode === 'furniture'
    ? 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80'
    : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80'
})
</script>
