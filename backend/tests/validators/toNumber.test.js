import { toNumber } from '../../src/validators/toNumber.js';

describe('toNumber (COMP.SE.200)', () => {
  // Test Cases: 1 total
  
  test('should convert values to numbers', () => {
    expect(toNumber('123')).toBe(123);
    expect(toNumber('123.45')).toBe(123.45);
    expect(toNumber(456)).toBe(456);
    expect(toNumber(null)).toBe(0);
    expect(toNumber('0xFF')).toBe(255);
    expect(toNumber('0b1010')).toBe(10);
  });
});
