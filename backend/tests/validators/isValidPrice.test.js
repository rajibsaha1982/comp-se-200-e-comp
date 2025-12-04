import { isValidPrice } from '../../src/validators/isValidPrice.js';
import { parsePriceToDecimals } from '../../src/validators/parsePriceToDecimals.js';

describe('isValidPrice (Custom Validator)', () => {
  // Test Cases: 6 total
  
  test('should accept valid prices with 2 decimal places', () => {
    expect(isValidPrice(9.99)).toBe(true);
    expect(isValidPrice(15.50)).toBe(true);
  });
  
  test('should accept whole numbers', () => {
    expect(isValidPrice(10)).toBe(true);
    expect(isValidPrice(0)).toBe(true);
  });
  
  test('should reject negative prices', () => {
    expect(isValidPrice(-5.99)).toBe(false);
  });
  
  test('should reject prices with more than 2 decimal places', () => {
    expect(isValidPrice(9.999)).toBe(false);
  });
  
  test('should reject non-numeric values', () => {
    expect(isValidPrice('9.99')).toBe(false);
    expect(isValidPrice(null)).toBe(false);
  });
  
  test('should reject NaN and Infinity', () => {
    expect(isValidPrice(NaN)).toBe(false);
    expect(isValidPrice(Infinity)).toBe(false);
  });
});

describe('parsePriceToDecimals (Custom Validator)', () => {
  // Test Cases: 2 total
  
  test('should parse price to 2 decimal places', () => {
    expect(parsePriceToDecimals(9.5)).toBe(9.50);
    expect(parsePriceToDecimals(10)).toBe(10.00);
  });
  
  test('should return null for invalid prices', () => {
    expect(parsePriceToDecimals(-5)).toBe(null);
    expect(parsePriceToDecimals('invalid')).toBe(null);
  });
});
