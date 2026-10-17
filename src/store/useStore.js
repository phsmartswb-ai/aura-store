import { reactive, watch } from 'vue'
import { PRODUCTS } from '../data/products'
import { useToast } from '../composables/useToast'
import { useCurrency } from '../composables/useCurrency'
import { useWishlist } from '../composables/useWishlist'
import { useCompare } from '../composables/useCompare'
import { useCart } from '../composables/useCart'
import { useCatalog } from '../composables/useCatalog'

/**
 * Enterprise Unified Store Facade
 * 
 * Aggregates domain composables (Catalog, Cart, Wishlist, Compare, Currency, Toast)
 * and exposes a cohesive, reactive interface for views and modals.
 */

// Shared Modal & View Navigation State
const uiState = reactive({
  currentView: 'catalog', // 'catalog' | 'overview'
  overviewProduct: PRODUCTS[0],
  activeModal: null, // null | 'product' | 'cart' | 'checkout' | 'wishlist' | 'roomVisualizer' | 'compare'
  selectedProduct: null,
  quickViewProduct: null,
  checkoutStep: 1, // 1: Shipping, 2: Payment, 3: Confirmation
})

// Initialize Domain Modules
const toastModule = useToast()
const currencyModule = useCurrency()
const wishlistModule = useWishlist()
const catalogModule = useCatalog()

const openCartModal = () => {
  uiState.activeModal = 'cart'
}

const openModal = (modalName) => {
  uiState.activeModal = modalName
}

const cartModule = useCart(openCartModal)
const compareModule = useCompare(openModal)

// Synchronized reactive state facade for backward compatibility
const state = reactive({
  get products() { return catalogModule.products },
  get activeMode() { return catalogModule.activeMode.value },
  set activeMode(val) { catalogModule.activeMode.value = val },

  get cart() { return cartModule.cart.value },
  set cart(val) { cartModule.cart.value = val },

  get wishlist() { return wishlistModule.wishlist.value },
  set wishlist(val) { wishlistModule.wishlist.value = val },

  get compareList() { return compareModule.compareList.value },
  set compareList(val) { compareModule.compareList.value = val },

  // Filters & Search
  get searchQuery() { return catalogModule.searchQuery.value },
  set searchQuery(val) { catalogModule.searchQuery.value = val },

  get selectedCategory() { return catalogModule.selectedCategory.value },
  set selectedCategory(val) { catalogModule.selectedCategory.value = val },

  get selectedRoom() { return catalogModule.selectedRoom.value },
  set selectedRoom(val) { catalogModule.selectedRoom.value = val },

  get selectedMaterial() { return catalogModule.selectedMaterial.value },
  set selectedMaterial(val) { catalogModule.selectedMaterial.value = val },

  get maxPrice() { return catalogModule.maxPrice.value },
  set maxPrice(val) { catalogModule.maxPrice.value = val },

  get sortBy() { return catalogModule.sortBy.value },
  set sortBy(val) { catalogModule.sortBy.value = val },

  get inStockOnly() { return catalogModule.inStockOnly.value },
  set inStockOnly(val) { catalogModule.inStockOnly.value = val },

  // Navigation & Views
  get currentView() { return uiState.currentView },
  set currentView(val) { uiState.currentView = val },

  get overviewProduct() { return uiState.overviewProduct },
  set overviewProduct(val) { uiState.overviewProduct = val },

  // Modals & Panels
  get activeModal() { return uiState.activeModal },
  set activeModal(val) { uiState.activeModal = val },

  get selectedProduct() { return uiState.selectedProduct },
  set selectedProduct(val) { uiState.selectedProduct = val },

  get quickViewProduct() { return uiState.quickViewProduct },
  set quickViewProduct(val) { uiState.quickViewProduct = val },

  // Checkout flow
  get checkoutStep() { return uiState.checkoutStep },
  set checkoutStep(val) { uiState.checkoutStep = val },

  get deliveryOption() { return cartModule.deliveryOption.value },
  set deliveryOption(val) { cartModule.deliveryOption.value = val },

  get appliedPromo() { return cartModule.appliedPromo.value },
  set appliedPromo(val) { cartModule.appliedPromo.value = val },

  get promoDiscountPercent() { return cartModule.promoDiscountPercent.value },
  set promoDiscountPercent(val) { cartModule.promoDiscountPercent.value = val },

  // Currency
  get currency() { return currencyModule.currency.value },
  set currency(val) { currencyModule.setCurrency(val) },
  get currencyRates() { return currencyModule.currencyConfigs },

  // Toast notifications
  get toasts() { return toastModule.toasts.value },
  set toasts(val) { toastModule.toasts.value = val },
})

export function useStore() {
  // Modal Orchestration Actions
  const openProductModal = (product) => {
    uiState.selectedProduct = product
    uiState.activeModal = 'product'
  }

  const closeModals = () => {
    uiState.activeModal = null
  }

  const openCart = () => {
    uiState.activeModal = 'cart'
  }

  const openCheckout = () => {
    uiState.activeModal = 'checkout'
    uiState.checkoutStep = 1
  }

  const openWishlist = () => {
    uiState.activeModal = 'wishlist'
  }

  const openRoomVisualizer = (product = null) => {
    uiState.selectedProduct = product || state.overviewProduct || PRODUCTS[0]
    uiState.activeModal = 'roomVisualizer'
  }

  const openCompareModal = () => {
    uiState.activeModal = 'compare'
  }

  // Navigation
  const viewProductOverview = (product) => {
    uiState.overviewProduct = product
    uiState.currentView = 'overview'
    uiState.activeModal = null
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToCatalog = () => {
    uiState.currentView = 'catalog'
    uiState.activeModal = null
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog-section')
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  return {
    // State Facade
    state,

    // Catalog Domain
    currentCategories: catalogModule.currentCategories,
    currentMaterials: catalogModule.currentMaterials,
    currentRooms: catalogModule.currentRooms,
    filteredProducts: catalogModule.filteredProducts,
    setMode: catalogModule.setMode,
    resetFilters: catalogModule.resetFilters,

    // Cart Domain
    cartCount: cartModule.cartCount,
    cartSubtotal: cartModule.cartSubtotal,
    discountAmount: cartModule.discountAmount,
    shippingCost: cartModule.shippingCost,
    estimatedTax: cartModule.estimatedTax,
    cartTotal: cartModule.cartTotal,
    addToCart: cartModule.addToCart,
    removeFromCart: cartModule.removeFromCart,
    updateQuantity: cartModule.updateQuantity,
    applyPromo: cartModule.applyPromo,
    removePromo: cartModule.removePromo,

    // Wishlist Domain
    wishlistCount: wishlistModule.wishlistCount,
    toggleWishlist: wishlistModule.toggleWishlist,
    isInWishlist: wishlistModule.isInWishlist,

    // Compare Domain
    compareCount: compareModule.compareCount,
    compareProducts: compareModule.compareProducts,
    toggleCompare: compareModule.toggleCompare,
    removeFromCompare: compareModule.removeFromCompare,
    clearCompare: compareModule.clearCompare,
    isInCompare: compareModule.isInCompare,
    openCompareModal,

    // Currency Domain
    formatPrice: currencyModule.formatPrice,

    // Navigation & Modals
    openProductModal,
    closeModals,
    openCart,
    openCheckout,
    openWishlist,
    openRoomVisualizer,
    viewProductOverview,
    backToCatalog,

    // Toast Domain
    showToast: toastModule.showToast,
  }
}
