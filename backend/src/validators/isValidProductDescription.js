/**
 * isValidProductDescription - Custom Validator
 * Validates product description (not spam-like, checks for repeated characters)
 */

export function isValidProductDescription(description) {
  if (typeof description !== 'string' || description.length < 3) {
    return false
  }
  
  // Check for repeated single character (like "aaaa" or "1111")
  if (/^(.)\1+$/.test(description)) {
    return false
  }
  
  // Check if too many repeated characters (more than 50% of string)
  const chars = description.split('')
  const charCounts = {}
  
  chars.forEach(char => {
    charCounts[char] = (charCounts[char] || 0) + 1
  })
  
  const maxCount = Math.max(...Object.values(charCounts))
  const repeatedRatio = maxCount / chars.length
  
  return repeatedRatio < 0.5
}

export default isValidProductDescription
