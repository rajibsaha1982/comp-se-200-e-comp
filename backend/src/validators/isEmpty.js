/**
 * isEmpty - COMP.SE.200 Official Utility
 * Check if `value` is an empty object, collection, map, or set
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
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

export default isEmpty
