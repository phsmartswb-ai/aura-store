<template>
  <div 
    v-if="state.activeModal === 'compare'" 
    class="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    @click.self="closeModals"
  >
    <div class="bg-[#FAF8F5] w-full max-w-6xl rounded-3xl shadow-2xl border border-sand-300 overflow-hidden flex flex-col max-h-[92vh]">
      
      <!-- Modal Header -->
      <div class="px-5 sm:px-8 py-4 sm:py-5 bg-white border-b border-sand-200 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="p-2.5 rounded-2xl bg-sand-100 text-charcoal-900">
            <Scale class="w-5 h-5 text-terracotta-600" />
          </div>
          <div>
            <h2 class="font-serif text-lg sm:text-2xl text-charcoal-900 font-medium">
              Product Comparison Matrix
            </h2>
            <p class="text-xs text-charcoal-500 font-light mt-0.5">
              Comparing <span class="font-semibold text-charcoal-900">{{ compareProducts.length }}</span> of 4 items side-by-side
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Highlight Differences Toggle -->
          <label 
            v-if="compareProducts.length > 1"
            class="hidden sm:inline-flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-charcoal-700 bg-sand-100 px-3 py-1.5 rounded-full hover:bg-sand-200 transition-colors"
          >
            <input 
              type="checkbox" 
              v-model="highlightDifferences" 
              class="w-3.5 h-3.5 text-terracotta-600 rounded border-sand-300 focus:ring-terracotta-500 cursor-pointer"
            />
            <span>Highlight Differences</span>
          </label>

          <!-- Clear List -->
          <button 
            v-if="compareProducts.length > 0"
            @click="clearCompare"
            class="text-xs text-charcoal-500 hover:text-terracotta-600 transition-colors font-medium underline hidden sm:inline"
          >
            Clear All
          </button>

          <!-- Close Modal -->
          <button 
            @click="closeModals"
            class="p-2 rounded-full hover:bg-sand-100 text-charcoal-600 transition-colors"
            aria-label="Close modal"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="compareProducts.length === 0" 
        class="p-12 sm:p-16 text-center space-y-4 my-auto"
      >
        <div class="w-16 h-16 rounded-full bg-sand-100 text-charcoal-400 flex items-center justify-center mx-auto">
          <Scale class="w-8 h-8 text-charcoal-400" />
        </div>
        <h3 class="font-serif text-xl sm:text-2xl text-charcoal-900">
          No Products Selected for Comparison
        </h3>
        <p class="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto font-light leading-relaxed">
          Select the compare icon (⚖️) on any furniture piece or industrial instrument to review specifications, tolerances, dimensions, and prices side-by-side.
        </p>
        <button 
          @click="closeModals"
          class="px-6 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-full text-xs font-semibold uppercase tracking-wider shadow transition-all"
        >
          Browse Catalogue
        </button>
      </div>

      <!-- Comparison Matrix Table (Scrollable Body) -->
      <div v-else class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        <!-- Mobile Highlight differences toggle -->
        <div class="sm:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-sand-200">
          <label class="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-charcoal-700">
            <input 
              type="checkbox" 
              v-model="highlightDifferences" 
              class="w-3.5 h-3.5 text-terracotta-600 rounded border-sand-300"
            />
            <span>Highlight Differences</span>
          </label>
          <button @click="clearCompare" class="text-xs text-terracotta-600 underline">
            Clear All
          </button>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-sand-200 bg-white shadow-sm">
          <table class="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
            
            <!-- Sticky Product Cards Header Row -->
            <thead>
              <tr class="border-b border-sand-200 bg-sand-50/70">
                <th class="p-4 sm:p-5 w-44 sm:w-56 font-serif font-bold text-charcoal-900 align-top">
                  <span class="text-xs uppercase tracking-widest text-terracotta-700 font-sans block mb-1">
                    Features & Specs
                  </span>
                  Product Overview
                </th>

                <th 
                  v-for="item in compareProducts" 
                  :key="'hdr-' + item.id"
                  class="p-4 sm:p-5 align-top border-l border-sand-200 w-64 min-w-[200px]"
                >
                  <div class="space-y-3 relative group">
                    <!-- Remove Button -->
                    <button 
                      @click="removeFromCompare(item.id)"
                      class="absolute -top-1 -right-1 p-1 rounded-full bg-sand-200 hover:bg-terracotta-600 hover:text-white text-charcoal-600 transition-colors shadow-sm"
                      title="Remove product"
                    >
                      <X class="w-3.5 h-3.5" />
                    </button>

                    <!-- Product Image -->
                    <div 
                      @click="goToOverview(item)"
                      class="aspect-[4/3] rounded-xl overflow-hidden bg-sand-100 cursor-pointer border border-sand-200"
                    >
                      <img 
                        :src="item.colors?.[0]?.image || item.gallery[0]" 
                        :alt="item.name" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <!-- Category / Type Badge -->
                    <span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      :class="item.type === 'furniture' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'"
                    >
                      {{ item.type === 'furniture' ? 'Artisan Furniture' : 'Metrology Instrument' }}
                    </span>

                    <!-- Product Name -->
                    <h3 
                      @click="goToOverview(item)"
                      class="font-serif font-semibold text-charcoal-900 hover:text-terracotta-600 cursor-pointer line-clamp-2 text-sm leading-snug"
                    >
                      {{ item.name }}
                    </h3>

                    <!-- Rating -->
                    <div class="flex items-center gap-1 text-xs text-charcoal-600">
                      <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span class="font-bold">{{ item.rating }}</span>
                      <span class="text-charcoal-400">({{ item.reviewsCount }})</span>
                    </div>

                    <!-- Price -->
                    <div class="flex items-baseline gap-1.5 pt-1">
                      <span class="font-serif text-base sm:text-lg font-bold text-charcoal-900">
                        {{ formatPrice(item.price) }}
                      </span>
                      <span v-if="item.originalPrice > item.price" class="text-xs text-charcoal-400 line-through">
                        {{ formatPrice(item.originalPrice) }}
                      </span>
                    </div>

                    <!-- Add to Bag CTA -->
                    <button 
                      @click="handleAddToCart(item)"
                      class="w-full py-2 px-3 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow active:scale-95 transition-all"
                    >
                      <ShoppingBag class="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <!-- Overview Link -->
                    <button 
                      @click="goToOverview(item)"
                      class="w-full text-center text-[11px] text-terracotta-700 hover:text-terracotta-900 font-semibold"
                    >
                      View Full Dossier & Guides →
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            <!-- Specs Rows -->
            <tbody class="divide-y divide-sand-200">
              
              <!-- Section: Core Details -->
              <tr class="bg-sand-100/70 font-semibold text-charcoal-800 text-[11px] uppercase tracking-wider">
                <td colspan="5" class="py-2.5 px-4 sm:px-5">
                  1. Classification & Specifications
                </td>
              </tr>

              <!-- Category Row -->
              <tr :class="getRowClass('category')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Category / Sector
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'cat-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200 text-charcoal-800 capitalize font-medium"
                >
                  {{ item.category }}
                </td>
              </tr>

              <!-- Primary Material Row -->
              <tr :class="getRowClass('material')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Primary Material / Metallurgy
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'mat-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200 text-charcoal-800 font-medium"
                >
                  {{ item.material }}
                </td>
              </tr>

              <!-- Dimensions Row -->
              <tr :class="getRowClass('dimensions')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Physical Dimensions
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'dim-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200 text-charcoal-800"
                >
                  {{ item.dimensions }}
                </td>
              </tr>

              <!-- Weight Row -->
              <tr :class="getRowClass('weight')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Unit Weight / Mass
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'wt-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200 text-charcoal-800"
                >
                  {{ item.weight }}
                </td>
              </tr>

              <!-- Section: Assembly & Operations -->
              <tr class="bg-sand-100/70 font-semibold text-charcoal-800 text-[11px] uppercase tracking-wider">
                <td colspan="5" class="py-2.5 px-4 sm:px-5">
                  2. Operations & Fulfillment
                </td>
              </tr>

              <!-- Assembly / Calibration -->
              <tr :class="getRowClass('assemblyRequired')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Assembly / Calibration
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'asb-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200 text-charcoal-800"
                >
                  <span v-if="item.type === 'furniture'">
                    {{ item.assemblyRequired ? 'Assembly required (tools & guide included)' : 'Arrives fully assembled' }}
                  </span>
                  <span v-else>
                    {{ item.assemblyRequired ? 'Factory bench setup & ISO calibration included' : 'Pre-calibrated plug & play' }}
                  </span>
                </td>
              </tr>

              <!-- Lead Time / Dispatch -->
              <tr :class="getRowClass('leadTime')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Lead Time & Dispatch
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'lead-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200 text-charcoal-800"
                >
                  {{ item.leadTime }}
                </td>
              </tr>

              <!-- Stock Availability -->
              <tr :class="getRowClass('inStock')">
                <th class="py-3 px-4 sm:px-5 font-semibold text-charcoal-700">
                  Availability
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'stk-' + item.id"
                  class="py-3 px-4 sm:px-5 border-l border-sand-200"
                >
                  <span 
                    v-if="item.inStock" 
                    class="inline-flex items-center gap-1.5 text-emerald-800 font-semibold"
                  >
                    <Check class="w-4 h-4 text-emerald-600" />
                    In Stock & Ready to Ship
                  </span>
                  <span v-else class="text-rose-600 font-semibold">
                    Backordered (Est. 2-3 weeks)
                  </span>
                </td>
              </tr>

              <!-- Section: Distinct Features -->
              <tr class="bg-sand-100/70 font-semibold text-charcoal-800 text-[11px] uppercase tracking-wider">
                <td colspan="5" class="py-2.5 px-4 sm:px-5">
                  3. Key Features & Architectural Highlights
                </td>
              </tr>

              <!-- Features Highlights List -->
              <tr>
                <th class="py-4 px-4 sm:px-5 font-semibold text-charcoal-700 align-top">
                  Key Capabilities
                </th>
                <td 
                  v-for="item in compareProducts" 
                  :key="'feat-' + item.id"
                  class="py-4 px-4 sm:px-5 border-l border-sand-200 align-top text-xs text-charcoal-700 space-y-2"
                >
                  <ul class="space-y-1.5 list-disc pl-4 text-[11px] sm:text-xs text-charcoal-600">
                    <li v-for="(feat, fIdx) in item.features" :key="fIdx">
                      {{ feat }}
                    </li>
                  </ul>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="px-5 sm:px-8 py-4 bg-white border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
        <span class="text-xs text-charcoal-500 font-light">
          Tip: You can compare up to 4 items across furniture and instruments.
        </span>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button 
            @click="closeModals"
            class="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-sand-300 hover:bg-sand-100 text-charcoal-800 text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Scale, X, Star, ShoppingBag, Check } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { 
  state, 
  compareProducts, 
  removeFromCompare, 
  clearCompare, 
  closeModals, 
  addToCart, 
  viewProductOverview,
  formatPrice 
} = useStore()

const highlightDifferences = ref(false)

const getRowClass = (fieldKey) => {
  if (!highlightDifferences.value || compareProducts.value.length < 2) {
    return 'hover:bg-sand-50/50 transition-colors'
  }

  const values = compareProducts.value.map(p => String(p[fieldKey] ?? ''))
  const isDifferent = values.some(v => v !== values[0])

  if (isDifferent) {
    return 'bg-amber-50/70 border-l-4 border-amber-500 font-medium'
  }
  return 'hover:bg-sand-50/50 transition-colors'
}

const goToOverview = (item) => {
  closeModals()
  viewProductOverview(item)
}

const handleAddToCart = (item) => {
  const defaultColor = item.colors?.[0] || { name: 'Standard' }
  addToCart(item, defaultColor, 1)
}
</script>

