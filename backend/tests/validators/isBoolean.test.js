import { isBoolean } from '../../src/validators/isBoolean.js';

describe('isBoolean (COMP.SE.200)', () => {
  // Test Cases: 1 total
  
  test('should check if value is boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('true')).toBe(false);
  });
});
