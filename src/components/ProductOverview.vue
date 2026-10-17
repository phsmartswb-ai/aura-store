<template>
  <div v-if="product" class="min-h-screen bg-[#FAF8F5] pb-24 text-charcoal-900 font-sans">
    
    <!-- Top Breadcrumbs & Back Navigation Bar -->
    <div class="border-b border-sand-200 bg-white/70 backdrop-blur-md sticky top-16 sm:top-20 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <!-- Breadcrumb links -->
        <nav class="flex items-center gap-2 text-xs text-charcoal-500 overflow-x-auto whitespace-nowrap">
          <button @click="backToCatalog" class="hover:text-charcoal-900 transition-colors flex items-center gap-1 font-medium">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>Catalogue</span>
          </button>
          <span>/</span>
          <span class="capitalize text-charcoal-600 font-medium">
            {{ product.type === 'furniture' ? 'Artisan Furniture' : 'Manufacturing Instruments' }}
          </span>
          <span>/</span>
          <span class="text-charcoal-900 font-bold truncate max-w-[180px] sm:max-w-xs">
            {{ product.name }}
          </span>
        </nav>

        <!-- Quick actions -->
        <div class="flex items-center gap-2">
          <!-- Compare Button -->
          <button 
            @click="toggleCompare(product)" 
            class="px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-colors"
            :class="isInCompare(product.id) 
              ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-sm' 
              : 'border-sand-300 hover:bg-sand-100 text-charcoal-700 bg-white'"
            :title="isInCompare(product.id) ? 'Remove from comparison' : 'Add to comparison'"
          >
            <Scale class="w-3.5 h-3.5" />
            <span>{{ isInCompare(product.id) ? 'In Compare' : 'Compare' }}</span>
          </button>

          <!-- Wishlist -->
          <button 
            @click="toggleWishlist(product.id)" 
            class="p-2 rounded-full border border-sand-300 hover:bg-sand-100 text-charcoal-700 transition-colors bg-white"
            :aria-label="isInWishlist(product.id) ? 'Remove from wishlist' : 'Save piece'"
            :title="isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'"
          >
            <Heart 
              class="w-4 h-4" 
              :class="isInWishlist(product.id) ? 'fill-terracotta-500 text-terracotta-500' : ''" 
            />
          </button>

          <!-- Add to Bag -->
          <button 
            @click="handleAddToCart"
            class="px-4 py-1.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <ShoppingBag class="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Hero & Primary Overview Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Left: Image Gallery & Previews (7 cols) -->
        <div class="lg:col-span-7 space-y-4">
          <!-- Main Display Image -->
          <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-sand-100 border border-sand-200/90 shadow-md relative group">
            <img 
              :src="activeImage" 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              decoding="async"
            />
            
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              <span 
                v-if="product.isBestseller"
                class="bg-charcoal-900/90 backdrop-blur-md text-sand-50 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow"
              >
                {{ product.type === 'furniture' ? 'Bestseller' : 'Top Industry Standard' }}
              </span>
              <span 
                v-if="product.isNew"
                class="bg-emerald-800/90 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow"
              >
                2026 Release
              </span>
            </div>

            <!-- AR / Room Lookbook trigger if furniture -->
            <button 
              v-if="product.type === 'furniture'"
              @click="openRoomVisualizer(product)"
              class="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md text-charcoal-900 text-xs font-semibold shadow hover:bg-white flex items-center gap-2"
            >
              <Eye class="w-4 h-4 text-terracotta-600" />
              <span>Preview in 3D Room</span>
            </button>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-3 overflow-x-auto pb-2 touch-scroll">
            <button 
              v-for="(img, idx) in product.gallery" 
              :key="idx"
              @click="activeImage = img"
              class="w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0"
              :class="activeImage === img ? 'border-charcoal-900 shadow-md ring-2 ring-charcoal-900/20' : 'border-sand-200 opacity-70 hover:opacity-100'"
            >
              <img :src="img" :alt="`${product.name} angle ${idx + 1}`" class="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>

        <!-- Right: Primary Metadata, Price & Add to Bag (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Tag & Category -->
          <div class="flex items-center justify-between text-xs">
            <span class="tracking-widest uppercase font-bold text-terracotta-700">
              {{ product.material }}
            </span>
            <div class="flex items-center gap-1 font-semibold text-charcoal-800">
              <Star class="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{{ product.rating }}</span>
              <span class="text-charcoal-400 font-normal">({{ product.reviewsCount }} verified reviews)</span>
            </div>
          </div>

          <!-- Title & Subtitle -->
          <div>
            <h1 class="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-tight">
              {{ product.name }}
            </h1>
            <p class="text-sm text-charcoal-500 mt-1 font-light leading-relaxed">
              {{ product.subtitle }}
            </p>
          </div>

          <!-- Price Display -->
          <div class="flex items-baseline gap-3 pt-1 border-y border-sand-200/80 py-4">
            <span class="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              {{ formatPrice(product.price) }}
            </span>
            <span v-if="product.originalPrice > product.price" class="text-lg text-charcoal-400 line-through">
              {{ formatPrice(product.originalPrice) }}
            </span>
            <span v-if="product.originalPrice > product.price" class="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              Save {{ formatPrice(product.originalPrice - product.price) }}
            </span>
          </div>

          <!-- Narrative description snippet -->
          <p class="text-sm text-charcoal-600 leading-relaxed font-light">
            {{ product.description }}
          </p>

          <!-- Color / Variant Swatches -->
          <div v-if="product.colors && product.colors.length" class="space-y-2">
            <div class="flex justify-between text-xs font-semibold">
              <span class="uppercase tracking-wider text-charcoal-700">Select Variant / Finish:</span>
              <span class="text-terracotta-700">{{ selectedColor.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <button 
                v-for="(c, idx) in product.colors" 
                :key="idx"
                @click="selectVariant(c)"
                class="w-8 h-8 rounded-full border-2 transition-all p-0.5"
                :class="selectedColor.name === c.name ? 'border-charcoal-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105'"
              >
                <span class="block w-full h-full rounded-full" :style="{ backgroundColor: c.hex }"></span>
              </button>
            </div>
          </div>

          <!-- Purchase Controls -->
          <div class="space-y-3 pt-2">
            <div class="flex items-center gap-3">
              <!-- Quantity Stepper -->
              <div class="flex items-center border border-sand-300 rounded-2xl bg-sand-50 px-3 py-2.5">
                <button @click="quantity = Math.max(1, quantity - 1)" class="p-1 text-charcoal-500 hover:text-charcoal-900">
                  <Minus class="w-4 h-4" />
                </button>
                <span class="w-8 text-center font-bold text-sm text-charcoal-900">{{ quantity }}</span>
                <button @click="quantity++" class="p-1 text-charcoal-500 hover:text-charcoal-900">
                  <Plus class="w-4 h-4" />
                </button>
              </div>

              <!-- Main Add to Bag Button -->
              <button 
                @click="handleAddToCart"
                class="flex-1 py-4 px-6 bg-charcoal-900 hover:bg-charcoal-800 text-sand-50 rounded-2xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
              >
                <ShoppingBag class="w-4 h-4" />
                <span>Add to Bag — {{ formatPrice(product.price * quantity) }}</span>
              </button>
            </div>

            <!-- Compare CTA Bar -->
            <div class="flex items-center gap-2 pt-1">
              <button 
                @click="toggleCompare(product)"
                class="flex-1 py-3 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                :class="isInCompare(product.id) 
                  ? 'bg-terracotta-50 border-terracotta-500 text-terracotta-700 font-bold' 
                  : 'border-sand-300 hover:bg-sand-50 text-charcoal-800'"
              >
                <Scale class="w-4 h-4" />
                <span>{{ isInCompare(product.id) ? 'In Comparison Matrix (Remove)' : 'Add to Side-by-Side Compare' }}</span>
              </button>

              <button 
                v-if="compareCount > 0"
                @click="openCompareModal"
                class="py-3 px-4 rounded-xl bg-sand-200 hover:bg-sand-300 text-charcoal-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                title="Open Comparison Table"
              >
                <span>View ({{ compareCount }})</span>
              </button>
            </div>

            <!-- Lead time & Shipping disclaimer -->
            <div class="p-4 bg-sand-100/70 border border-sand-200/90 rounded-2xl text-xs space-y-1.5">
              <div class="flex items-center gap-2 font-semibold text-charcoal-900">
                <Truck class="w-4 h-4 text-emerald-700" />
                <span>{{ product.leadTime }}</span>
              </div>
              <p class="text-charcoal-600 text-[11px] leading-relaxed">
                {{ product.type === 'furniture' 
                  ? 'Includes complimentary White-Glove delivery and 100-night home trial on orders over $1,500.' 
                  : 'Includes ISO/IEC 17025 accredited calibration certificate and 3-year factory warranty.' 
                }}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- Navigation Tabs for Detailed Overview Content -->
    <div class="border-y border-sand-200 bg-white sticky top-[60px] sm:top-[72px] z-20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap transition-colors relative"
            :class="activeTab === tab.id 
              ? 'text-charcoal-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-charcoal-900 font-bold' 
              : 'text-charcoal-500 hover:text-charcoal-800'"
          >
            <span class="flex items-center gap-2">
              <component :is="tab.icon" class="w-4 h-4" />
              <span>{{ tab.label }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Contents Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- ==================== TAB 1: BROCHURES ==================== -->
      <div v-if="activeTab === 'brochures'" class="space-y-8 animate-fadeIn">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-terracotta-700">Official Downloads</span>
          <h2 class="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
            Product Brochures & Engineering Dossiers
          </h2>
          <p class="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl font-light">
            Download high-resolution architectural brochures, 3D BIM/CAD models, and certified test certificates for {{ product.name }}.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(doc, idx) in brochuresList" 
            :key="idx"
            class="bg-white p-6 rounded-3xl border border-sand-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-1 rounded-md bg-sand-100 text-charcoal-800 font-mono text-[10px] font-bold uppercase">
                  {{ doc.format }}
                </span>
                <span class="text-[11px] text-charcoal-400 font-medium">{{ doc.size }}</span>
              </div>
              <h3 class="font-serif text-base font-bold text-charcoal-900 leading-snug">
                {{ doc.title }}
              </h3>
              <p class="text-xs text-charcoal-500 leading-relaxed font-light">
                {{ doc.description }}
              </p>
            </div>

            <div class="pt-4 border-t border-sand-100 flex items-center justify-between">
              <span class="text-[11px] text-charcoal-400">{{ doc.pages }}</span>
              <button 
                @click="downloadDocument(doc.title)"
                class="px-4 py-2 rounded-xl bg-sand-100 hover:bg-charcoal-900 hover:text-sand-50 text-charcoal-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Download class="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 2: TECHNICAL SPECIFICATIONS ==================== -->
      <div v-if="activeTab === 'specs'" class="space-y-8 animate-fadeIn">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-terracotta-700">Detailed Specs</span>
          <h2 class="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
            Technical Specifications & Build Architecture
          </h2>
          <p class="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl font-light">
            Exact tolerances, dimensions, material compositions, and compliance ratings.
          </p>
        </div>

        <!-- Specifications Table -->
        <div class="bg-white rounded-3xl border border-sand-200/90 overflow-hidden shadow-sm">
          <table class="w-full text-left text-xs sm:text-sm">
            <tbody class="divide-y divide-sand-100">
              <tr 
                v-for="(spec, idx) in technicalSpecsList" 
                :key="idx" 
                :class="idx % 2 === 0 ? 'bg-sand-50/50' : 'bg-white'"
                class="transition-colors hover:bg-sand-100/40"
              >
                <th class="py-4 px-5 sm:px-8 font-semibold text-charcoal-700 w-1/3 sm:w-1/4">
                  {{ spec.label }}
                </th>
                <td class="py-4 px-5 sm:px-8 text-charcoal-900 font-medium">
                  {{ spec.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Extra Highlights Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div v-for="(feat, idx) in product.features" :key="idx" class="p-4 rounded-2xl bg-white border border-sand-200 flex items-start gap-3">
            <CheckCircle2 class="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            <span class="text-xs text-charcoal-700 font-medium leading-relaxed">{{ feat }}</span>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 3: GUIDES & MANUALS ==================== -->
      <div v-if="activeTab === 'guides'" class="space-y-8 animate-fadeIn">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-terracotta-700">Operational Documentation</span>
          <h2 class="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
            User Guides & Maintenance Handbooks
          </h2>
          <p class="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl font-light">
            Step-by-step unboxing, precision setup, routine care, and calibration safety procedures.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(guide, idx) in guidesList" 
            :key="idx"
            class="bg-white p-6 sm:p-8 rounded-3xl border border-sand-200/90 shadow-sm space-y-5"
          >
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-100 text-charcoal-800 text-[10px] font-bold uppercase">
                <BookOpen class="w-3.5 h-3.5 text-terracotta-700" />
                {{ guide.category }}
              </span>
              <span class="text-xs text-charcoal-400">{{ guide.readTime }}</span>
            </div>

            <div>
              <h3 class="font-serif text-xl font-bold text-charcoal-900 leading-snug">
                {{ guide.title }}
              </h3>
              <p class="text-xs sm:text-sm text-charcoal-600 mt-1 font-light leading-relaxed">
                {{ guide.summary }}
              </p>
            </div>

            <!-- Steps checklist -->
            <div class="space-y-2.5 pt-2 border-t border-sand-100">
              <div v-for="(step, sIdx) in guide.steps" :key="sIdx" class="flex items-start gap-3 text-xs text-charcoal-700">
                <span class="w-5 h-5 rounded-full bg-sand-200 text-charcoal-900 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {{ sIdx + 1 }}
                </span>
                <span class="leading-relaxed">{{ step }}</span>
              </div>
            </div>

            <button 
              @click="downloadDocument(guide.title)"
              class="w-full py-2.5 bg-sand-100 hover:bg-charcoal-900 hover:text-sand-50 text-charcoal-900 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText class="w-3.5 h-3.5" />
              <span>Read Complete PDF Guide</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 4: RELATED PRODUCTS LINK LIST ==================== -->
      <div v-if="activeTab === 'related'" class="space-y-8 animate-fadeIn">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-terracotta-700">Curated Complements</span>
          <h2 class="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
            Related Products Link List
          </h2>
          <p class="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl font-light">
            Pieces and systems designed to pair seamlessly with {{ product.name }}.
          </p>
        </div>

        <!-- Related Items List / Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="rel in relatedProducts" 
            :key="rel.id"
            @click="navigateToProduct(rel)"
            class="bg-white rounded-2xl border border-sand-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div class="relative aspect-[4/3] bg-sand-100 overflow-hidden">
              <img 
                :src="rel.colors[0]?.image || rel.gallery[0]" 
                :alt="rel.name" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span class="absolute top-3 left-3 bg-charcoal-900/80 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                {{ rel.material }}
              </span>
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mb-1">
                  <Star class="w-3 h-3 fill-current" />
                  <span>{{ rel.rating }}</span>
                </div>
                <h4 class="font-serif text-sm font-bold text-charcoal-900 group-hover:text-terracotta-600 transition-colors line-clamp-1">
                  {{ rel.name }}
                </h4>
                <p class="text-xs text-charcoal-500 line-clamp-1 font-light mt-0.5">
                  {{ rel.subtitle }}
                </p>
              </div>

              <div class="pt-2 border-t border-sand-100 flex items-center justify-between">
                <span class="font-serif font-bold text-sm text-charcoal-900">
                  {{ formatPrice(rel.price) }}
                </span>
                <span class="text-xs text-terracotta-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Overview</span>
                  <ArrowRight class="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Link List for Quick Navigation -->
        <div class="bg-white p-6 rounded-3xl border border-sand-200/90 space-y-4">
          <h4 class="font-serif text-lg font-bold text-charcoal-900">
            Quick Index: Complementary Products
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <button 
              v-for="rel in relatedProducts" 
              :key="'link-' + rel.id"
              @click="navigateToProduct(rel)"
              class="p-3 rounded-xl border border-sand-200 hover:border-charcoal-800 hover:bg-sand-50 text-left flex items-center justify-between group transition-all"
            >
              <div>
                <span class="font-semibold text-charcoal-900 group-hover:text-terracotta-700 block">
                  {{ rel.name }}
                </span>
                <span class="text-charcoal-500 text-[11px]">{{ rel.subtitle }}</span>
              </div>
              <span class="font-bold font-serif text-charcoal-900 ml-2">
                {{ formatPrice(rel.price) }}
              </span>
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  ArrowLeft, 
  ArrowRight, 
  ShoppingBag, 
  Heart, 
  Star, 
  Plus, 
  Minus, 
  Eye, 
  Truck, 
  Download, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  Sliders, 
  Layers,
  Scale 
} from 'lucide-vue-next'
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
  openCompareModal,
  compareCount,
  openRoomVisualizer,
  viewProductOverview,
  backToCatalog,
  state,
  showToast 
} = useStore()

const quantity = ref(1)
const selectedColor = ref(props.product.colors?.[0] || { name: 'Standard', hex: '#ccc' })
const activeImage = ref(props.product.colors?.[0]?.image || props.product.gallery[0])

const activeTab = ref('brochures')

const tabs = [
  { id: 'brochures', label: 'Brochures & Dossiers', icon: Download },
  { id: 'specs', label: 'Technical Specifications', icon: Sliders },
  { id: 'guides', label: 'Guides & Manuals', icon: BookOpen },
  { id: 'related', label: 'Related Products Link List', icon: Layers },
]

watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      quantity.value = 1
      selectedColor.value = newVal.colors?.[0] || { name: 'Standard', hex: '#ccc' }
      activeImage.value = newVal.colors?.[0]?.image || newVal.gallery[0]
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  { immediate: true }
)

const selectVariant = (c) => {
  selectedColor.value = c
  if (c.image) {
    activeImage.value = c.image
  }
}

const handleAddToCart = () => {
  addToCart(props.product, selectedColor.value, quantity.value)
}

const downloadDocument = (title) => {
  showToast(`Downloading "${title}"...`, 'success')
}

const navigateToProduct = (item) => {
  viewProductOverview(item)
}

// ==================== BROCHURES LIST ====================
const brochuresList = computed(() => {
  const isFurniture = props.product.type === 'furniture'
  if (isFurniture) {
    return [
      {
        title: `${props.product.name} — Architectural Spec Sheet`,
        format: 'PDF',
        size: '3.4 MB',
        pages: '12 Pages',
        description: 'Complete dimensional blueprints, timber grading certifications, Martindale rub ratings, and finish options.'
      },
      {
        title: `${props.product.name} — 3D BIM & CAD File Package`,
        format: 'DWG / BIM',
        size: '14.2 MB',
        pages: 'Revit 2026',
        description: 'Native Autodesk Revit, SketchUp, and AutoCAD 2D/3D blocks for interior architectural layout planning.'
      },
      {
        title: 'Sustainable Forestry & FSC® Provenance Dossier',
        format: 'PDF',
        size: '2.1 MB',
        pages: '6 Pages',
        description: 'Certified Chain of Custody documentation confirming zero-deforestation European and North American timber origins.'
      }
    ]
  } else {
    return [
      {
        title: `${props.product.name} — Technical Data & Metrology Sheet`,
        format: 'PDF',
        size: '4.8 MB',
        pages: '24 Pages',
        description: 'Exhaustive sensor specifications, uncertainty budgets, electrical pinout diagrams, and GenICam driver documentation.'
      },
      {
        title: 'ISO/IEC 17025 Accredited Calibration Protocol',
        format: 'PDF',
        size: '1.8 MB',
        pages: '8 Pages',
        description: 'Primary NIST/DKD metrology traceability certificates, calibration uncertainty equations, and temperature compensation curves.'
      },
      {
        title: 'Robotic & PLC Integration Software Package (SDK)',
        format: 'ZIP / C++',
        size: '42.6 MB',
        pages: 'SDK v3.4',
        description: 'C++, Python, LabVIEW, and ROS2 drivers for continuous automated industrial manufacturing inspection lines.'
      }
    ]
  }
})

// ==================== TECHNICAL SPECIFICATIONS ====================
const technicalSpecsList = computed(() => {
  const isFurniture = props.product.type === 'furniture'
  if (isFurniture) {
    return [
      { label: 'Overall Dimensions', value: props.product.dimensions },
      { label: 'Product Net Weight', value: props.product.weight },
      { label: 'Primary Material', value: props.product.material },
      { label: 'Structural Frame', value: 'Kiln-dried solid North American hardwood with mortise-and-tenon joinery' },
      { label: 'Upholstery Abrasion', value: '65,000+ Martindale cycles (Heavy Commercial Grade)' },
      { label: 'Foam & Cushioning', value: 'High-resilience CertiPUR-US® memory foam with hypoallergenic feather wrap' },
      { label: 'Assembly Required', value: props.product.assemblyRequired ? 'Assembly Included with White-Glove delivery' : 'Fully assembled at factory' },
      { label: 'Country of Origin', value: 'Handcrafted in Scandinavian Workshops (Stockholm & Copenhagen)' },
      { label: 'Warranty Coverage', value: '10-Year structural heirloom timber warranty' },
    ]
  } else {
    return [
      { label: 'Measuring Envelope / Span', value: props.product.dimensions },
      { label: 'Total Unit Weight', value: props.product.weight },
      { label: 'Housing Metallurgy', value: props.product.material },
      { label: 'Resolution / Accuracy', value: 'Sub-micron 0.0005 mm / ±0.04% Full Scale Calibrated' },
      { label: 'Communication Interfaces', value: 'Gigabit Ethernet (GigE Vision), Modbus RS485, USB-C 3.2, Bluetooth 5.2' },
      { label: 'Environmental Rating', value: 'IP67 Ingress Protection (Dust-tight and protected against water immersion)' },
      { label: 'Operating Temperature', value: '-10°C to +65°C with active Peltier thermal stabilization' },
      { label: 'Compliance Standards', value: 'ISO/IEC 17025:2017, CE, RoHS, ATEX Zone 1/21 certified' },
      { label: 'Calibration & Warranty', value: 'Factory NIST Traceable certificate included • 3-Year Industrial Warranty' },
    ]
  }
})

// ==================== GUIDES & MANUALS ====================
const guidesList = computed(() => {
  const isFurniture = props.product.type === 'furniture'
  if (isFurniture) {
    return [
      {
        title: 'Unboxing & White-Glove In-Home Placement Guide',
        category: 'Setup & Unboxing',
        readTime: '6 min read',
        summary: 'Step-by-step procedures for room leveling, protective glide installation, and modular interlocking connections.',
        steps: [
          'Inspect packaging exterior prior to unboxing in your room of choice.',
          'Position individual module pedestals and engage concealed steel locking mechanisms.',
          'Verify level positioning with included felt scratch guards.'
        ]
      },
      {
        title: 'Timber, Bouclé & Natural Stone Care Guide',
        category: 'Preventive Care',
        readTime: '4 min read',
        summary: 'Maintain natural wood grain luster and fabric longevity using our Scandinavian organic care methods.',
        steps: [
          'Dust timber surfaces weekly along the grain line using a dry microfiber cloth.',
          'Blot liquid spills immediately with clean warm water; avoid chemical solvent detergents.',
          'Reapply natural protective Danish beeswax once annually to maintain moisture barrier.'
        ]
      }
    ]
  } else {
    return [
      {
        title: 'Industrial Commissioning & Alignment Manual',
        category: 'Quick-Start & Setup',
        readTime: '12 min read',
        summary: 'Complete engineering guide for mechanical fixture mounting, laser bore alignment, and PLC trigger synchronization.',
        steps: [
          'Verify ambient temperature stabilization between 18°C and 22°C before initial power cycle.',
          'Mount unit to industrial optical breadboard or robot end-effector with specified 8.5 N·m torque.',
          'Connect shielded Cat6A Ethernet cable to your factory host network and run zero-offset self test.'
        ]
      },
      {
        title: 'Annual Recalibration & Preventive Maintenance Protocol',
        category: 'Metrology QA',
        readTime: '8 min read',
        summary: 'Standard Operating Procedure (SOP) for periodic sensor audit, lens cleaning, and ISO 17025 verification.',
        steps: [
          'Clean front sapphire optical element using anhydrous isopropyl alcohol and lens tissue.',
          'Run automated multi-point reference calibration using included ceramic gauge block artifacts.',
          'Export calibration log dossier and verify residual uncertainty remains within ±0.8 µm threshold.'
        ]
      }
    ]
  }
})

// ==================== RELATED PRODUCTS LINK LIST ====================
const relatedProducts = computed(() => {
  return state.products
    .filter(p => p.id !== props.product.id && p.type === props.product.type)
    .slice(0, 4)
})
</script>

