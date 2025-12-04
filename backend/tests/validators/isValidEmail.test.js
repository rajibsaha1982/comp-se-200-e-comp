import { isValidEmail } from '../../src/validators/isValidEmail.js';

describe('isValidEmail (Custom Validator)', () => {
  // Test Cases: 3 total
  
  test('should accept valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.email+tag@domain.co.uk')).toBe(true);
  });
  
  test('should reject invalid email addresses', () => {
    expect(isValidEmail('invalid.email')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
  });
  
  test('should reject non-string input', () => {
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });
});
