import { ref, computed, watch } from 'vue'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/storage'
import { useToast } from './useToast'

const wishlist = ref(safeStorage.get(STORAGE_KEYS.WISHLIST, [1, 101]))

watch(
  wishlist,
  (newVal) => {
    safeStorage.set(STORAGE_KEYS.WISHLIST, newVal)
  },
  { deep: true }
)

export function useWishlist() {
  const { showToast } = useToast()

  const wishlistCount = computed(() => wishlist.value.length)

  const isInWishlist = (productId) => wishlist.value.includes(productId)

  const toggleWishlist = (productId) => {
    const idx = wishlist.value.indexOf(productId)
    if (idx > -1) {
      wishlist.value.splice(idx, 1)
      showToast('Item removed from wishlist', 'info')
    } else {
      wishlist.value.push(productId)
      showToast('Item saved to your wishlist', 'success')
    }
  }

  const clearWishlist = () => {
    wishlist.value = []
    showToast('Wishlist cleared', 'info')
  }

  return {
    wishlist,
    wishlistCount,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  }
}

