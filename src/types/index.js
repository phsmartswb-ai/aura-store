/**
 * @typedef {'furniture' | 'instruments'} IndustryMode
 * 
 * @typedef {Object} ProductColor
 * @property {string} name
 * @property {string} hex
 * @property {string} [image]
 * 
 * @typedef {Object} Product
 * @property {number} id
 * @property {IndustryMode} type
 * @property {string} name
 * @property {string} subtitle
 * @property {string} category
 * @property {string} room
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} rating
 * @property {number} reviewsCount
 * @property {boolean} isNew
 * @property {boolean} isBestseller
 * @property {string} material
 * @property {string} dimensions
 * @property {string} weight
 * @property {boolean} assemblyRequired
 * @property {string} leadTime
 * @property {string} description
 * @property {string[]} features
 * @property {ProductColor[]} colors
 * @property {string[]} gallery
 * @property {boolean} inStock
 * @property {string} [designer]
 * 
 * @typedef {Object} CartItem
 * @property {string} cartId
 * @property {number} id
 * @property {IndustryMode} type
 * @property {string} name
 * @property {string} subtitle
 * @property {number} price
 * @property {ProductColor} selectedColor
 * @property {number} quantity
 * @property {string} dimensions
 * @property {string} leadTime
 * 
 * @typedef {Object} ToastNotification
 * @property {number} id
 * @property {string} message
 * @property {'success' | 'error' | 'info' | 'warning'} type
 * @property {number} [duration]
 */

export {}

