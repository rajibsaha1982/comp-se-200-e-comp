import { isValidProductDescription } from '../../src/validators/isValidProductDescription.js';

describe('isValidProductDescription (Custom Validator)', () => {
  // Test Cases: 5 total
  
  test('should accept valid descriptions', () => {
    expect(isValidProductDescription('Fresh organic tomatoes')).toBe(true);
    expect(isValidProductDescription('High quality beans')).toBe(true);
  });
  
  test('should reject descriptions with all same character', () => {
    expect(isValidProductDescription('aaaa')).toBe(false);
    expect(isValidProductDescription('1111')).toBe(false);
  });
  
  test('should reject descriptions that are too short', () => {
    expect(isValidProductDescription('ab')).toBe(false);
    expect(isValidProductDescription('')).toBe(false);
  });
  
  test('should reject descriptions with excessive repeated characters', () => {
    expect(isValidProductDescription('aaaaa bbb')).toBe(false); // 62.5% 'a's (exceeds 50% threshold)
  });
  
  test('should reject non-string input', () => {
    expect(isValidProductDescription(null)).toBe(false);
    expect(isValidProductDescription(123)).toBe(false);
  });
});
