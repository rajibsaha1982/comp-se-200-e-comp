import { camelCase } from '../../src/validators/camelCase.js';

describe('camelCase (COMP.SE.200)', () => {
  // Test Cases: 2 total
  
  test('should convert to camelCase', () => {
    expect(camelCase('hello world')).toBe(' helloWorld');
    expect(camelCase('product name')).toBe(' productName');
    expect(camelCase('hello-world')).toBe(' helloWorld');
  });
  
  test('should handle non-string input', () => {
    // Official library converts to string first
    expect(camelCase(null)).toBe(' null');
    expect(camelCase(123)).toBe(' 123');
  });
});
