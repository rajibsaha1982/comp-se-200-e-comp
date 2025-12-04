/**
 * isValidEmail - Custom Validator
 * Validates email format
 */

export function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default isValidEmail
