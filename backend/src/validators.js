/**
 * COMP.SE.200 Official Utility Functions
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
 * 
 * These production-grade utility functions are used for validation throughout
 * the e-commerce application
 */

// ============ CORE TYPE CHECKING FUNCTIONS ============

/**
 * Check if `value` is an empty object, collection, map, or set
 * Objects are considered empty if they have no own enumerable string keyed properties.
 * Array-like values are considered empty if they have a `length` of `0`.
 * From: isEmpty.js (COMP.SE.200)
 */
export function isEmpty(value) {
  if (value == null) {
    return true
  }
  
  const hasOwnProperty = Object.prototype.hasOwnProperty
  
  // Check for array-like objects (arrays, strings, etc)
  if (typeof value.length === 'number') {
    return value.length === 0
  }
  
  // Check for Map or Set
  if (typeof value.size === 'number') {
    return value.size === 0
  }
  
  // Check for object properties
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  
  return true
}

/**
 * Converts `string` to a string
 * From: toString.js (COMP.SE.200)
 */
export function toString(value) {
  if (typeof value === 'string') {
    return value
  }
  
  if (Array.isArray(value)) {
    return `${value.map((other) => other == null ? other : toString(other))}`
  }
  
  if (isSymbol(value)) {
    return value.toString()
  }
  
  const result = `${value}`
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result
}

/**
 * Converts the first character of `string` to upper case and remaining to lower case
 * From: capitalize.js (COMP.SE.200)
 */
export function capitalize(string) {
  if (typeof string !== 'string') {
    return string
  }
  
  const str = toString(string).toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}


/**
 * Converts `value` to a number
 * From: toNumber.js (COMP.SE.200)
 */
export function toNumber(value) {
  if (typeof value === 'number') {
    return value
  }
  
  if (isSymbol(value)) {
    return NaN
  }
  
  if (isObject(value)) {
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value
    value = isObject(other) ? `${other}` : other
  }
  
  if (typeof value !== 'string') {
    return value === 0 ? value : +value
  }
  
  const reTrim = /^\s+|\s+$/g
  const reIsBinary = /^0b[01]+$/i
  const reIsOctal = /^0o[0-7]+$/i
  const reIsBadHex = /^[-+]0x[0-9a-f]+$/i
  
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NaN : +value)
}

/**
 * Converts `string` to camel case
 * From: camelCase.js (COMP.SE.200)
 */
export function camelCase(string) {
  if (typeof string !== 'string') {
    return string
  }
  
  const str = toString(string).replace(/['\u2019]/g, '')
  return words(str).reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + (index ? capitalize(word) : word)
  }, '')
}

/**
 * Checks if `value` is classified as a boolean primitive or object
 * From: isBoolean.js (COMP.SE.200)
 */
export function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}

/**
 * Checks if `value` is the language type of `Object`
 * From: isObject.js (COMP.SE.200)
 */
export function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

// ============ HELPER FUNCTIONS ============

/**
 * Check if value is a Symbol
 */
function isSymbol(value) {
  return typeof value === 'symbol' || 
    (value != null && typeof value === 'object' && 
     Object.prototype.toString.call(value) === '[object Symbol]')
}

/**
 * Check if value is object-like (not null and is object type)
 */
function isObjectLike(value) {
  return value != null && typeof value === 'object'
}

/**
 * Get the tag of a value (for type checking)
 */
function getTag(value) {
  return Object.prototype.toString.call(value)
}

/**
 * Split string into words
 */
function words(string) {
  return string.match(/[a-z0-9]+/gi) || []
}

// ============ CUSTOM VALIDATION FUNCTIONS ============

/**
 * Check that the first letter of each sentence is uppercase
 * Uses official COMP.SE.200 utilities
 */
export function isValidSentenceCase(text) {
  if (!text || toString(text).length === 0) {
    return false
  }
  
  const str = toString(text)
  const sentences = str.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  return sentences.every(sentence => {
    const trimmed = sentence.trim()
    if (trimmed.length === 0) return true
    return /^[A-Z]/.test(trimmed)
  })
}

/**
 * Validate price format (must be a number with max 2 decimal places)
 */
export function isValidPrice(price) {
  if (typeof price !== 'number' || price < 0) {
    return false
  }
  
  if (!Number.isFinite(price)) {
    return false
  }
  
  const decimalPlaces = (price.toString().split('.')[1] || '').length
  return decimalPlaces <= 2
}

/**
 * Parse price to ensure 2 decimal places
 */
export function parsePriceToDecimals(price) {
  if (!isValidPrice(price)) {
    return null
  }
  
  return parseFloat(price.toFixed(2))
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate product description similarity (check if it's not just repeated characters)
 */
export function isValidProductDescription(description) {
  if (typeof description !== 'string' || description.length < 3) {
    return false
  }
  
  // Check for repeated single character (like "aaaa" or "1111")
  if (/^(.)\1+$/.test(description)) {
    return false
  }
  
  // Check if too many repeated characters (more than 50% of string)
  const chars = description.split('')
  const charCounts = {}
  
  chars.forEach(char => {
    charCounts[char] = (charCounts[char] || 0) + 1
  })
  
  const maxCount = Math.max(...Object.values(charCounts))
  const repeatedRatio = maxCount / chars.length
  
  return repeatedRatio < 0.5
}

/**
 * Validate quantity (must be positive integer)
 */
export function isValidQuantity(quantity) {
  if (typeof quantity !== 'number') {
    return false
  }
  
  return Number.isInteger(quantity) && quantity > 0
}

/**
 * Validate cart items (check that all items have valid product IDs and quantities)
 */
export function isValidCartItems(items) {
  if (!Array.isArray(items)) {
    return false
  }
  
  return items.every(item => {
    return (
      item.productId &&
      typeof item.productId === 'string' &&
      isValidQuantity(item.quantity)
    )
  })
}

/**
 * Sanitize product name (remove extra whitespace, capitalize first letter)
 */
export function sanitizeProductName(name) {
  if (typeof name !== 'string') {
    return null
  }
  
  const trimmed = name.trim()
  
  if (isEmpty(trimmed)) {
    return null
  }
  
  return capitalize(trimmed)
}

/**
 * Validate product object structure
 */
export function isValidProductStructure(product) {
  if (typeof product !== 'object' || product === null) {
    return false
  }
  
  return (
    typeof product.name === 'string' &&
    !isEmpty(product.name) &&
    typeof product.price === 'number' &&
    isValidPrice(product.price) &&
    (product.category === null || typeof product.category === 'string') &&
    (product.contents === null || typeof product.contents === 'string') &&
    (product.producer === null || typeof product.producer === 'string') &&
    (product.description === null || typeof product.description === 'string')
  )
}

export default {
  isEmpty,
  toString,
  toNumber,
  capitalize,
  camelCase,
  isBoolean,
  isObject,
  isValidSentenceCase,
  isValidPrice,
  parsePriceToDecimals,
  isValidEmail,
  isValidProductDescription,
  isValidQuantity,
  isValidCartItems,
  sanitizeProductName,
  isValidProductStructure
}
