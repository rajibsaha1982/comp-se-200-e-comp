/**
 * capitalize - COMP.SE.200 Official Utility
 * Converts the first character of `string` to upper case and remaining to lower case
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

export function capitalize(string) {
  if (typeof string !== 'string') {
    return string
  }
  
  const str = toString(string).toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default capitalize
