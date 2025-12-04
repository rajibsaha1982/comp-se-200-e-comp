/**
 * toString - COMP.SE.200 Official Utility
 * Converts `value` to a string
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
 */

function isSymbol(value) {
  return typeof value === 'symbol' || 
    (value != null && typeof value === 'object' && 
     Object.prototype.toString.call(value) === '[object Symbol]')
}

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

export default toString
