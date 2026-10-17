import { ref, computed, watch } from 'vue'
import { 
  PRODUCTS, 
  FURNITURE_CATEGORIES, 
  FURNITURE_MATERIALS, 
  FURNITURE_ROOMS,
  INSTRUMENT_CATEGORIES,
  INSTRUMENT_MATERIALS,
  INSTRUMENT_SECTORS
} from '../data/products'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/storage'
import { useToast } from './useToast'

const activeMode = ref(safeStorage.get(STORAGE_KEYS.MODE, 'furniture'))
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedRoom = ref('all')
const selectedMaterial = ref('All Materials')
const maxPrice = ref(8000)
const sortBy = ref('featured')
const inStockOnly = ref(false)

watch(activeMode, (newMode) => {
  safeStorage.set(STORAGE_KEYS.MODE, newMode)
})

export function useCatalog() {
  const { showToast } = useToast()

  const currentCategories = computed(() => {
    return activeMode.value === 'furniture' ? FURNITURE_CATEGORIES : INSTRUMENT_CATEGORIES
  })

  const currentMaterials = computed(() => {
    return activeMode.value === 'furniture' ? FURNITURE_MATERIALS : INSTRUMENT_MATERIALS
  })

  const currentRooms = computed(() => {
    return activeMode.value === 'furniture' ? FURNITURE_ROOMS : INSTRUMENT_SECTORS
  })

  const filteredProducts = computed(() => {
    const rawMode = activeMode.value
    const normalizedMode = (rawMode === 'instrument' || rawMode === 'instruments') ? 'instruments' : 'furniture'

    return PRODUCTS.filter(item => {
      const normalizedItemType = (item.type === 'instrument' || item.type === 'instruments') ? 'instruments' : 'furniture'
      if (normalizedItemType !== normalizedMode) {
        return false
      }

      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase()
        const match = 
          item.name.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.material.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        if (!match) return false
      }

      if (selectedCategory.value !== 'all' && item.category !== selectedCategory.value) {
        return false
      }

      if (selectedRoom.value !== 'all' && item.room !== selectedRoom.value) {
        return false
      }

      if (selectedMaterial.value !== 'All Materials' && item.material !== selectedMaterial.value) {
        return false
      }

      if (item.price > maxPrice.value) {
        return false
      }

      if (inStockOnly.value && !item.inStock) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price
      if (sortBy.value === 'price-desc') return b.price - a.price
      if (sortBy.value === 'rating') return b.rating - a.rating
      if (sortBy.value === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return b.isBestseller ? 1 : -1
    })
  })

  const setMode = (mode) => {
    if (activeMode.value === mode) return
    activeMode.value = mode
    selectedCategory.value = 'all'
    selectedRoom.value = 'all'
    selectedMaterial.value = 'All Materials'
    searchQuery.value = ''
    maxPrice.value = mode === 'furniture' ? 4000 : 9000

    const label = mode === 'furniture' 
      ? 'Switched to Artisan Furniture Collection 🛋️' 
      : 'Switched to Manufacturing Instruments ⚙️'
    showToast(label, 'info')

    const catalogEl = document.getElementById('catalog-section')
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    selectedRoom.value = 'all'
    selectedMaterial.value = 'All Materials'
    maxPrice.value = activeMode.value === 'furniture' ? 4000 : 9000
    sortBy.value = 'featured'
    inStockOnly.value = false
  }

  return {
    products: PRODUCTS,
    activeMode,
    searchQuery,
    selectedCategory,
    selectedRoom,
    selectedMaterial,
    maxPrice,
    sortBy,
    inStockOnly,
    currentCategories,
    currentMaterials,
    currentRooms,
    filteredProducts,
    setMode,
    resetFilters,
  }
}

