import { ref, computed, watch } from 'vue'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { VALID_PROMO_CODES, DELIVERY_OPTIONS } from '../constants'
import { safeStorage } from '../utils/storage'
import { PRODUCTS } from '../data/products'
import { useToast } from './useToast'

const defaultInitialCart = [
  {
    cartId: 'item-1-0',
    id: 1,
    type: 'furniture',
    name: PRODUCTS[0].name,
    subtitle: PRODUCTS[0].subtitle,
    price: PRODUCTS[0].price,
    selectedColor: PRODUCTS[0].colors[0],
    quantity: 1,
    dimensions: PRODUCTS[0].dimensions,
    leadTime: PRODUCTS[0].leadTime,
  }
]

const cart = ref(safeStorage.get(STORAGE_KEYS.CART, defaultInitialCart))
const deliveryOption = ref('white-glove')
const appliedPromo = ref('WELCOME10')
const promoDiscountPercent = ref(10)

watch(
  cart,
  (newCart) => {
    safeStorage.set(STORAGE_KEYS.CART, newCart)
  },
  { deep: true }
)

export function useCart(openCartModalFn) {
  const { showToast } = useToast()

  const cartCount = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const cartSubtotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const discountAmount = computed(() => {
    if (!appliedPromo.value || promoDiscountPercent.value <= 0) return 0
    return Math.round((cartSubtotal.value * promoDiscountPercent.value) / 100)
  })

  const shippingCost = computed(() => {
    if (cart.value.length === 0) return 0
    if (cartSubtotal.value > 1500) return 0
    return deliveryOption.value === 'white-glove' ? DELIVERY_OPTIONS.WHITE_GLOVE.price : DELIVERY_OPTIONS.STANDARD.price
  })

  const estimatedTax = computed(() => {
    return Math.round((cartSubtotal.value - discountAmount.value) * 0.08)
  })

  const cartTotal = computed(() => {
    return Math.max(0, cartSubtotal.value - discountAmount.value + shippingCost.value + estimatedTax.value)
  })

  const addToCart = (product, selectedColor, quantity = 1) => {
    const colorObj = selectedColor || product.colors?.[0] || { name: 'Standard', hex: '#ccc' }
    const cartId = `item-${product.id}-${colorObj.name.toLowerCase().replace(/\s+/g, '-')}`

    const existingIndex = cart.value.findIndex(item => item.cartId === cartId)
    if (existingIndex > -1) {
      cart.value[existingIndex].quantity += quantity
    } else {
      cart.value.push({
        cartId,
        id: product.id,
        type: product.type,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        selectedColor: colorObj,
        quantity,
        dimensions: product.dimensions,
        leadTime: product.leadTime,
      })
    }

    showToast(`Added ${quantity}× "${product.name}" to your bag`, 'success')
    if (typeof openCartModalFn === 'function') {
      openCartModalFn()
    }
  }

  const removeFromCart = (cartId) => {
    const item = cart.value.find(i => i.cartId === cartId)
    cart.value = cart.value.filter(i => i.cartId !== cartId)
    if (item) {
      showToast(`Removed "${item.name}" from bag`, 'info')
    }
  }

  const updateQuantity = (cartId, change) => {
    const item = cart.value.find(i => i.cartId === cartId)
    if (!item) return
    const newQty = item.quantity + change
    if (newQty <= 0) {
      removeFromCart(cartId)
    } else {
      item.quantity = newQty
    }
  }

  const applyPromo = (code) => {
    const clean = (code || '').trim().toUpperCase()
    const promo = VALID_PROMO_CODES[clean]

    if (promo) {
      if (cartSubtotal.value < promo.minSubtotal) {
        showToast(`Promo ${promo.code} requires minimum purchase of $${promo.minSubtotal}`, 'error')
        return false
      }
      appliedPromo.value = promo.code
      promoDiscountPercent.value = promo.discountPercent
      showToast(`Promo code ${promo.code} applied! (${promo.discountPercent}% off)`, 'success')
      return true
    } else {
      showToast('Invalid promo code. Try WELCOME10, SPRING20, or LUXE15', 'error')
      return false
    }
  }

  const removePromo = () => {
    appliedPromo.value = ''
    promoDiscountPercent.value = 0
    showToast('Promo code removed', 'info')
  }

  const clearCart = () => {
    cart.value = []
  }

  return {
    cart,
    cartCount,
    cartSubtotal,
    deliveryOption,
    shippingCost,
    appliedPromo,
    promoDiscountPercent,
    discountAmount,
    estimatedTax,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromo,
    removePromo,
    clearCart,
  }
}

