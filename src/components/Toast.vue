<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
    <transition-group
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="toast in state.toasts" 
        :key="toast.id"
        class="pointer-events-auto bg-charcoal-900/95 backdrop-blur-md text-sand-50 p-4 rounded-2xl shadow-xl border border-sand-500/20 flex items-center justify-between gap-3 text-xs"
      >
        <div class="flex items-center gap-2.5">
          <span 
            class="w-2 h-2 rounded-full flex-shrink-0"
            :class="toast.type === 'error' ? 'bg-red-400' : toast.type === 'info' ? 'bg-sky-400' : 'bg-emerald-400'"
          ></span>
          <span class="font-medium">{{ toast.message }}</span>
        </div>
        <button 
          @click="removeToast(toast.id)"
          class="text-charcoal-400 hover:text-sand-100 p-1"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
import { useStore } from '../store/useStore'

const { state } = useStore()

const removeToast = (id) => {
  state.toasts = state.toasts.filter(t => t.id !== id)
}
</script>

