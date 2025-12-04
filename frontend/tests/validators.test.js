import {
  isValidEmail,
  isValidPrice,
  formatPrice,
  isValidProductName,
  isValidQuantity,
  sanitizeString
} from '../src/utils/validators';

describe('Frontend Validators', () => {
  describe('isValidEmail', () => {
    test('should accept valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
    });

    test('should reject invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });

    test('should reject non-string input', () => {
      expect(isValidEmail(123)).toBe(false);
      expect(isValidEmail(null)).toBe(false);
    });
  });

  describe('isValidPrice', () => {
    test('should accept valid prices', () => {
      expect(isValidPrice(19.99)).toBe(true);
      expect(isValidPrice(10)).toBe(true);
      expect(isValidPrice(0.50)).toBe(true);
    });

    test('should reject invalid prices', () => {
      expect(isValidPrice(-10)).toBe(false);
      expect(isValidPrice(10.999)).toBe(false);
      expect(isValidPrice('10')).toBe(false);
    });
  });

  describe('formatPrice', () => {
    test('should format price to 2 decimal places', () => {
      expect(formatPrice(10.1)).toBe('10.10');
      expect(formatPrice(5)).toBe('5.00');
      expect(formatPrice(19.99)).toBe('19.99');
    });

    test('should return null for invalid price', () => {
      expect(formatPrice(-10)).toBe(null);
      expect(formatPrice('10')).toBe(null);
    });
  });

  describe('isValidProductName', () => {
    test('should accept non-empty strings', () => {
      expect(isValidProductName('Tomatoes')).toBe(true);
      expect(isValidProductName('Organic Fresh Vegetables')).toBe(true);
    });

    test('should reject empty or whitespace-only strings', () => {
      expect(isValidProductName('')).toBe(false);
      expect(isValidProductName('   ')).toBe(false);
    });

    test('should reject non-string input', () => {
      expect(isValidProductName(null)).toBe(false);
      expect(isValidProductName(123)).toBe(false);
    });
  });

  describe('isValidQuantity', () => {
    test('should accept positive integers', () => {
      expect(isValidQuantity(1)).toBe(true);
      expect(isValidQuantity(100)).toBe(true);
    });

    test('should reject zero and negative numbers', () => {
      expect(isValidQuantity(0)).toBe(false);
      expect(isValidQuantity(-1)).toBe(false);
    });

    test('should reject non-integers', () => {
      expect(isValidQuantity(1.5)).toBe(false);
      expect(isValidQuantity('1')).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    test('should trim whitespace and remove HTML tags', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
      expect(sanitizeString('hello <b>world</b>')).toBe('hello world');
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('alert("xss")');
    });

    test('should handle non-string input', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
    });
  });
});
