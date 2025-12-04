/**
 * sanitizeProductName - Custom Validator
 * Sanitizes product name (remove extra whitespace, capitalize first letter)
 */

import { isEmpty } from './isEmpty.js'
import { capitalize } from './capitalize.js'

export function sanitizeProductName(name) {
  if (typeof name !== 'string') {
    return null
  }
  
  const trimmed = name.trim()
  
  if (isEmpty(trimmed)) {
    return null
  }
  
  return capitalize(trimmed)
}

export default sanitizeProductName
