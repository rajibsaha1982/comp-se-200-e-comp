/**
 * parsePriceToDecimals - Custom Validator
 * Parses price to ensure 2 decimal places
 */

import { isValidPrice } from './isValidPrice.js'

export function parsePriceToDecimals(price) {
  if (!isValidPrice(price)) {
    return null
  }
  
  return parseFloat(price.toFixed(2))
}

export default parsePriceToDecimals
