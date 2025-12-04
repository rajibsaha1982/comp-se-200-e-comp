/**
 * isValidCartItems - Custom Validator
 * Validates cart items array
 */

import { isValidQuantity } from './isValidQuantity.js'

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

export default isValidCartItems
