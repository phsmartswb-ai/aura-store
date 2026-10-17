export * from './storageKeys'
export * from './currency'
export * from './promos'

export const DELIVERY_OPTIONS = {
  STANDARD: {
    id: 'standard',
    name: 'Curbside Freight Delivery',
    price: 49,
    eta: '5-7 business days',
    freeThreshold: 1500,
  },
  WHITE_GLOVE: {
    id: 'white-glove',
    name: 'White-Glove Placement & Unpacking',
    price: 149,
    eta: '3-5 business days',
    freeThreshold: 2500,
  },
}

export const MAX_COMPARE_ITEMS = 4

