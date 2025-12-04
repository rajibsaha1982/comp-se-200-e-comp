/**
 * isBoolean - COMP.SE.200 Official Utility
 * Checks if `value` is classified as a boolean primitive or object
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
 */

function isObjectLike(value) {
  return value != null && typeof value === 'object'
}

function getTag(value) {
  return Object.prototype.toString.call(value)
}

export function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}

export default isBoolean
