/**
 * isValidQuantity - Custom Validator
 * Validates quantity (must be positive integer)
 */

export function isValidQuantity(quantity) {
  if (typeof quantity !== 'number') {
    return false
  }
  
  return Number.isInteger(quantity) && quantity > 0
}

export default isValidQuantity
