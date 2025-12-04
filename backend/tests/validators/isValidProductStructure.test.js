import { sanitizeProductName } from '../../src/validators/sanitizeProductName.js';
import { isValidProductStructure } from '../../src/validators/isValidProductStructure.js';

describe('sanitizeProductName (Custom Validator)', () => {
  // Test Cases: 3 total
  
  test('should sanitize and capitalize product name', () => {
    expect(sanitizeProductName('  fresh tomatoes  ')).toBe('Fresh tomatoes');
  });
  
  test('should return null for empty string', () => {
    expect(sanitizeProductName('   ')).toBe(null);
    expect(sanitizeProductName('')).toBe(null);
  });
  
  test('should return null for non-string input', () => {
    expect(sanitizeProductName(null)).toBe(null);
    expect(sanitizeProductName(123)).toBe(null);
  });
});

describe('isValidProductStructure (Custom Validator)', () => {
  // Test Cases: 6 total
  
  test('should accept valid product object', () => {
    const product = {
      name: 'Tomato',
      price: 5.99,
      category: 'Vegetables',
      contents: 'Organic',
      producer: 'Farm ABC',
      description: 'Fresh red tomatoes'
    };
    expect(isValidProductStructure(product)).toBe(true);
  });
  
  test('should accept product with null optional fields', () => {
    const product = {
      name: 'Apple',
      price: 2.50,
      category: null,
      contents: null,
      producer: null,
      description: null
    };
    expect(isValidProductStructure(product)).toBe(true);
  });
  
  test('should reject product with missing name', () => {
    const product = { price: 5.99 };
    expect(isValidProductStructure(product)).toBe(false);
  });
  
  test('should reject product with empty name', () => {
    const product = {
      name: '',
      price: 5.99
    };
    expect(isValidProductStructure(product)).toBe(false);
  });
  
  test('should reject product with invalid price', () => {
    const product = {
      name: 'Product',
      price: 5.999 // more than 2 decimals
    };
    expect(isValidProductStructure(product)).toBe(false);
  });
  
  test('should reject null object', () => {
    expect(isValidProductStructure(null)).toBe(false);
    expect(isValidProductStructure(undefined)).toBe(false);
  });
});
