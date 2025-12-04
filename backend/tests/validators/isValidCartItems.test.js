import { isValidQuantity } from '../../src/validators/isValidQuantity.js';
import { isValidCartItems } from '../../src/validators/isValidCartItems.js';

describe('isValidQuantity (Custom Validator)', () => {
  // Test Cases: 5 total
  
  test('should accept positive integers', () => {
    expect(isValidQuantity(1)).toBe(true);
    expect(isValidQuantity(100)).toBe(true);
  });
  
  test('should reject zero', () => {
    expect(isValidQuantity(0)).toBe(false);
  });
  
  test('should reject negative numbers', () => {
    expect(isValidQuantity(-5)).toBe(false);
  });
  
  test('should reject decimal numbers', () => {
    expect(isValidQuantity(1.5)).toBe(false);
  });
  
  test('should reject non-numeric values', () => {
    expect(isValidQuantity('5')).toBe(false);
    expect(isValidQuantity(null)).toBe(false);
  });
});

describe('isValidCartItems (Custom Validator)', () => {
  // Test Cases: 4 total
  
  test('should accept valid cart items', () => {
    const items = [
      { productId: 'prod-1', quantity: 2 },
      { productId: 'prod-2', quantity: 1 }
    ];
    expect(isValidCartItems(items)).toBe(true);
  });
  
  test('should reject items with missing productId', () => {
    const items = [{ quantity: 2 }];
    expect(isValidCartItems(items)).toBe(false);
  });
  
  test('should reject items with invalid quantity', () => {
    const items = [{ productId: 'prod-1', quantity: 0 }];
    expect(isValidCartItems(items)).toBe(false);
  });
  
  test('should reject non-array input', () => {
    expect(isValidCartItems('not an array')).toBe(false);
    expect(isValidCartItems(null)).toBe(false);
  });
});
