/**
 * toNumber - COMP.SE.200 Official Utility
 * Converts `value` to a number
 * https://github.com/otula/COMP.SE.200-2024-2025-1/tree/main/src
 */

function isSymbol(value) {
  return typeof value === 'symbol' || 
    (value != null && typeof value === 'object' && 
     Object.prototype.toString.call(value) === '[object Symbol]')
}

function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

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

export default toNumber
