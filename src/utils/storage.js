/**
 * Enterprise Safe LocalStorage Handler
 * Features:
 * - Graceful fallback to in-memory map if localStorage is disabled / throws SecurityError
 * - Corrupted JSON recovery with fallback value
 * - Automatic stringification and parsing
 */

const memoryFallback = new Map()

const isStorageAvailable = () => {
  try {
    const testKey = '__aura_storage_test__'
    window.localStorage.setItem(testKey, testKey)
    window.localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

const storageAvailable = typeof window !== 'undefined' && isStorageAvailable()

export const safeStorage = {
  get(key, fallback = null) {
    if (!storageAvailable) {
      return memoryFallback.has(key) ? memoryFallback.get(key) : fallback
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item === null || item === undefined) return fallback
      return JSON.parse(item)
    } catch (err) {
      console.warn(`[SafeStorage] Failed to parse key "${key}", using fallback:`, err)
      return fallback
    }
  },

  set(key, value) {
    if (!storageAvailable) {
      memoryFallback.set(key, value)
      return true
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (err) {
      console.error(`[SafeStorage] Quota exceeded or error writing key "${key}":`, err)
      memoryFallback.set(key, value)
      return false
    }
  },

  remove(key) {
    if (!storageAvailable) {
      memoryFallback.delete(key)
      return
    }

    try {
      window.localStorage.removeItem(key)
    } catch (err) {
      console.warn(`[SafeStorage] Failed removing key "${key}":`, err)
    }
  },

  clear() {
    if (!storageAvailable) {
      memoryFallback.clear()
      return
    }

    try {
      window.localStorage.clear()
    } catch (err) {
      console.warn('[SafeStorage] Failed to clear localStorage:', err)
    }
  }
}

