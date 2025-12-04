/**
 * camelCase - COMP.SE.200 Official Utility
 * Converts `string` to camel case
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
 */

function isSymbol(value) {
  return typeof value === 'symbol' || 
    (value != null && typeof value === 'object' && 
     Object.prototype.toString.call(value) === '[object Symbol]')
}

function toString(value) {
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

function capitalize(string) {
  if (typeof string !== 'string') {
    return string
  }
  
  const str = toString(string).toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function words(string) {
  return string.match(/[a-z0-9]+/gi) || []
}

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

export default camelCase
