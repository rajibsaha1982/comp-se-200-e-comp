import { isValidSentenceCase } from '../../src/validators/isValidSentenceCase.js';

describe('isValidSentenceCase (Custom Validator)', () => {
  // Test Cases: 7 total
  
  test('should return true for single sentence starting with uppercase', () => {
    expect(isValidSentenceCase('This is a valid sentence.')).toBe(true);
  });
  
  test('should return false for sentence starting with lowercase', () => {
    expect(isValidSentenceCase('this is invalid.')).toBe(false);
  });
  
  test('should return true for multiple sentences with uppercase starts', () => {
    expect(isValidSentenceCase('First sentence. Second sentence!')).toBe(true);
  });
  
  test('should return false if any sentence starts with lowercase', () => {
    expect(isValidSentenceCase('First sentence. second sentence.')).toBe(false);
  });
  
  test('should handle multiple sentence endings', () => {
    expect(isValidSentenceCase('Question? Answer! Statement.')).toBe(true);
  });
  
  test('should return false for empty string', () => {
    expect(isValidSentenceCase('')).toBe(false);
  });
  
  test('should return false for non-string input', () => {
    expect(isValidSentenceCase(null)).toBe(false);
    expect(isValidSentenceCase(123)).toBe(false);
  });
});
