import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Enterprise Global Error Handler
app.config.errorHandler = (err, instance, info) => {
  console.error('[Enterprise App Error]:', {
    error: err,
    component: instance?.$options?.name || 'AnonymousComponent',
    lifecycleHook: info,
  })
}

// Enterprise Performance Tracking Hook
if (import.meta.env.DEV) {
  app.config.performance = true
}

app.mount('#app')
