import { toString } from '../../src/validators/toString.js';

describe('toString (COMP.SE.200)', () => {
  // Test Cases: 1 total
  
  test('should convert values to strings', () => {
    expect(toString('hello')).toBe('hello');
    expect(toString(123)).toBe('123');
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString(null)).toBe('null');
    expect(toString(undefined)).toBe('undefined');
  });
});
