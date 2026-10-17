import { ref, computed, watch } from 'vue'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { MAX_COMPARE_ITEMS } from '../constants'
import { safeStorage } from '../utils/storage'
import { PRODUCTS } from '../data/products'
import { useToast } from './useToast'

const compareList = ref(safeStorage.get(STORAGE_KEYS.COMPARE, [1, 2]))

watch(
  compareList,
  (newVal) => {
    safeStorage.set(STORAGE_KEYS.COMPARE, newVal)
  },
  { deep: true }
)

export function useCompare(openModalFn) {
  const { showToast } = useToast()

  const compareCount = computed(() => compareList.value.length)

  const compareProducts = computed(() => {
    return compareList.value
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean)
  })

  const isInCompare = (productId) => compareList.value.includes(productId)

  const toggleCompare = (product) => {
    const idx = compareList.value.indexOf(product.id)
    if (idx > -1) {
      compareList.value.splice(idx, 1)
      showToast(`Removed "${product.name}" from comparison`, 'info')
    } else {
      if (compareList.value.length >= MAX_COMPARE_ITEMS) {
        showToast(`Maximum ${MAX_COMPARE_ITEMS} items can be compared at once`, 'error')
        return
      }
      compareList.value.push(product.id)
      showToast(`Added "${product.name}" to comparison (${compareList.value.length}/${MAX_COMPARE_ITEMS})`, 'success')
    }
  }

  const removeFromCompare = (productId) => {
    const item = PRODUCTS.find(p => p.id === productId)
    compareList.value = compareList.value.filter(id => id !== productId)
    if (item) {
      showToast(`Removed "${item.name}" from comparison`, 'info')
    }
  }

  const clearCompare = () => {
    compareList.value = []
    showToast('Cleared comparison list', 'info')
  }

  const openCompareModal = () => {
    if (typeof openModalFn === 'function') {
      openModalFn('compare')
    }
  }

  return {
    compareList,
    compareCount,
    compareProducts,
    isInCompare,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    openCompareModal,
  }
}

