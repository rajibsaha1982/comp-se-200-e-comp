import { isEmpty } from '../../src/validators/isEmpty.js';

describe('isEmpty (COMP.SE.200)', () => {
  // Test Cases: 9 total
  
  test('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });
  
  test('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });
  
  test('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });
  
  test('should return false for whitespace-only string', () => {
    // Official COMP.SE.200 isEmpty does not trim whitespace for strings
    expect(isEmpty('   ')).toBe(false);
  });
  
  test('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });
  
  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });
  
  test('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });
  
  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });
  
  test('should return false for non-empty object', () => {
    expect(isEmpty({ name: 'test' })).toBe(false);
  });
});
