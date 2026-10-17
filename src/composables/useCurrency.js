import { ref, watch } from 'vue'
import { CURRENCY_CONFIGS, DEFAULT_CURRENCY } from '../constants/currency'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/storage'
import { formatPrice as formatPriceUtil } from '../utils/formatters'

const currency = ref(safeStorage.get(STORAGE_KEYS.CURRENCY, DEFAULT_CURRENCY))

watch(currency, (newVal) => {
  safeStorage.set(STORAGE_KEYS.CURRENCY, newVal)
})

/**
 * Enterprise Currency Composable
 */
export function useCurrency() {
  const setCurrency = (code) => {
    if (CURRENCY_CONFIGS[code]) {
      currency.value = code
    }
  }

  const formatPrice = (amountInUSD) => {
    return formatPriceUtil(amountInUSD, currency.value)
  }

  return {
    currency,
    currencyConfigs: CURRENCY_CONFIGS,
    setCurrency,
    formatPrice,
  }
}

