/**
 * Frontend validation utilities
 */

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
}

/**
 * Validate product price
 */
export function isValidPrice(price) {
  if (typeof price !== 'number' || price < 0) {
    return false;
  }
  const decimalPlaces = (price.toString().split('.')[1] || '').length;
  return decimalPlaces <= 2;
}

/**
 * Format price with 2 decimal places
 */
export function formatPrice(price) {
  if (!isValidPrice(price)) return null;
  return price.toFixed(2);
}

/**
 * Validate product name
 */
export function isValidProductName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

/**
 * Validate product quantity
 */
export function isValidQuantity(quantity) {
  return Number.isInteger(quantity) && quantity > 0;
}

/**
 * Sanitize string input
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

const validators = {
  isValidEmail,
  isValidPrice,
  formatPrice,
  isValidProductName,
  isValidQuantity,
  sanitizeString
};

export default validators;
