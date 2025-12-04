/**
 * isValidPrice - Custom Validator
 * Validates price format (must be a number with max 2 decimal places)
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

export default isValidPrice
