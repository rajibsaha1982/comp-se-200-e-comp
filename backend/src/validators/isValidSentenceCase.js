/**
 * isValidSentenceCase - Custom Validator
 * Checks that the first letter of each sentence is uppercase
 */

import { toString } from './toString.js'

export function isValidSentenceCase(text) {
  if (!text || toString(text).length === 0) {
    return false
  }
  
  const str = toString(text)
  const sentences = str.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  return sentences.every(sentence => {
    const trimmed = sentence.trim()
    if (trimmed.length === 0) return true
    return /^[A-Z]/.test(trimmed)
  })
}

export default isValidSentenceCase
