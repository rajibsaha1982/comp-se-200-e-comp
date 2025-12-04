import { capitalize } from '../../src/validators/capitalize.js';

describe('capitalize (COMP.SE.200)', () => {
  // Test Cases: 6 total
  
  test('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  
  test('should not modify already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });
  
  test('should handle single character', () => {
    expect(capitalize('a')).toBe('A');
  });
  
  test('should return empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });
  
  test('should handle non-string input', () => {
    expect(capitalize(null)).toBe(null);
    expect(capitalize(123)).toBe(123);
  });
  
  test('should capitalize first letter and lowercase rest', () => {
    // Official COMP.SE.200 capitalize converts to lowercase first
    expect(capitalize('hELLO')).toBe('Hello');
  });
});
