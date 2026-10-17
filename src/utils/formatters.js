import { CURRENCY_CONFIGS, DEFAULT_CURRENCY } from '../constants/currency'

/**
 * Enterprise Price Formatter with currency conversion and locale-aware number formatting
 * Supports Indian numbering system for INR (e.g. ₹1,25,000)
 * 
 * @param {number} amountInUSD - Base price in USD
 * @param {string} currencyCode - Target currency (USD, EUR, GBP, CAD, INR)
 * @returns {string} Formatted price string
 */
export const formatPrice = (amountInUSD, currencyCode = DEFAULT_CURRENCY) => {
  const config = CURRENCY_CONFIGS[currencyCode] || CURRENCY_CONFIGS.USD
  const converted = Math.round(Number(amountInUSD || 0) * config.rate)

  if (currencyCode === 'INR') {
    return `₹${converted.toLocaleString('en-IN')}`
  }

  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      maximumFractionDigits: config.fractionDigits,
      minimumFractionDigits: config.fractionDigits,
    }).format(converted)
  } catch (e) {
    return `${config.symbol}${converted.toLocaleString()}`
  }
}

/**
 * Formats review counts e.g. 1200 -> "1.2k"
 */
export const formatCompactNumber = (num, locale = 'en-US') => {
  try {
    return new Intl.NumberFormat(locale, { notation: 'compact' }).format(num)
  } catch (e) {
    return String(num)
  }
}

/**
 * Formats percentages e.g. 0.15 -> "15%"
 */
export const formatPercent = (percent) => {
  return `${Math.round(percent)}%`
}

