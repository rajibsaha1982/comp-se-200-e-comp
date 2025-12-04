/**
 * isObject - COMP.SE.200 Official Utility
 * Checks if `value` is the language type of `Object`
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
 */

export function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

export default isObject
