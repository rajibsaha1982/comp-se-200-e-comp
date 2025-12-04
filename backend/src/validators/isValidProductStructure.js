/**
 * isValidProductStructure - Custom Validator
 * Validates product object structure
 */

import { isEmpty } from './isEmpty.js'
import { isValidPrice } from './isValidPrice.js'

export function isValidProductStructure(product) {
  if (typeof product !== 'object' || product === null) {
    return false
  }
  
  return (
    typeof product.name === 'string' &&
    !isEmpty(product.name) &&
    typeof product.price === 'number' &&
    isValidPrice(product.price) &&
    (product.category === null || typeof product.category === 'string') &&
    (product.contents === null || typeof product.contents === 'string') &&
    (product.producer === null || typeof product.producer === 'string') &&
    (product.description === null || typeof product.description === 'string')
  )
}

export default isValidProductStructure
