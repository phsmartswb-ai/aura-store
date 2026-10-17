import { ref } from 'vue'

const toasts = ref([])
let toastCounter = 0

/**
 * Enterprise Toast Notification Composable
 */
export function useToast() {
  const showToast = (message, type = 'info', duration = 3500) => {
    const id = ++toastCounter
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,
  }
}

