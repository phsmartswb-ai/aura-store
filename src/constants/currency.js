/**
 * Enterprise multi-currency configuration & real-time exchange rate constants
 */
export const DEFAULT_CURRENCY = 'USD'

export const CURRENCY_CONFIGS = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
    locale: 'en-US',
    fractionDigits: 0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92,
    locale: 'de-DE',
    fractionDigits: 0,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.79,
    locale: 'en-GB',
    fractionDigits: 0,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rate: 1.35,
    locale: 'en-CA',
    fractionDigits: 0,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rate: 84.5,
    locale: 'en-IN',
    fractionDigits: 0,
  },
}

