import { isObject } from '../../src/validators/isObject.js';

describe('isObject (COMP.SE.200)', () => {
  // Test Cases: 1 total
  
  test('should check if value is object or function', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(() => {})).toBe(true);
    expect(isObject(123)).toBe(false);
    expect(isObject('hello')).toBe(false);
    expect(isObject(null)).toBe(false);
  });
});
