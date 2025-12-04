import {
  isEmpty,
  toString,
  toNumber,
  capitalize,
  camelCase,
  isBoolean,
  isObject,
  isValidSentenceCase,
  isValidPrice,
  parsePriceToDecimals,
  isValidEmail,
  isValidProductDescription,
  isValidQuantity,
  isValidCartItems,
  sanitizeProductName,
  isValidProductStructure
} from '../src/validators.js';

describe('isEmpty', () => {
  test('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });
  
  test('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });
  
  test('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });
  
  test('should return false for whitespace-only string', () => {
    // Official COMP.SE.200 isEmpty does not trim whitespace for strings
    expect(isEmpty('   ')).toBe(false);
  });
  
  test('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });
  
  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });
  
  test('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });
  
  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });
  
  test('should return false for non-empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false);
  });
});

describe('capitalize', () => {
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

describe('isValidSentenceCase', () => {
  test('should return true for single sentence starting with uppercase', () => {
    expect(isValidSentenceCase('Hello world')).toBe(true);
  });
  
  test('should return false for sentence starting with lowercase', () => {
    expect(isValidSentenceCase('hello world')).toBe(false);
  });
  
  test('should return true for multiple sentences with uppercase starts', () => {
    expect(isValidSentenceCase('Hello world. This is good.')).toBe(true);
  });
  
  test('should return false if any sentence starts with lowercase', () => {
    expect(isValidSentenceCase('Hello world. this is bad.')).toBe(false);
  });
  
  test('should handle multiple sentence endings', () => {
    expect(isValidSentenceCase('Hello! How are you? I am fine.')).toBe(true);
  });
  
  test('should return false for empty string', () => {
    expect(isValidSentenceCase('')).toBe(false);
  });
  
  test('should return false for non-string input', () => {
    expect(isValidSentenceCase(123)).toBe(false);
  });
});

describe('isValidPrice', () => {
  test('should accept valid prices with 2 decimal places', () => {
    expect(isValidPrice(19.99)).toBe(true);
    expect(isValidPrice(10.50)).toBe(true);
    expect(isValidPrice(5.00)).toBe(true);
  });
  
  test('should accept whole numbers', () => {
    expect(isValidPrice(10)).toBe(true);
  });
  
  test('should reject negative prices', () => {
    expect(isValidPrice(-10)).toBe(false);
  });
  
  test('should reject prices with more than 2 decimal places', () => {
    expect(isValidPrice(19.999)).toBe(false);
    expect(isValidPrice(10.123)).toBe(false);
  });
  
  test('should reject non-numeric values', () => {
    expect(isValidPrice('10')).toBe(false);
    expect(isValidPrice(null)).toBe(false);
    expect(isValidPrice(undefined)).toBe(false);
  });
  
  test('should reject NaN and Infinity', () => {
    expect(isValidPrice(NaN)).toBe(false);
    expect(isValidPrice(Infinity)).toBe(false);
  });
});

describe('parsePriceToDecimals', () => {
  test('should parse price to 2 decimal places', () => {
    expect(parsePriceToDecimals(10.1)).toBe(10.10);
    expect(parsePriceToDecimals(5)).toBe(5.00);
  });
  
  test('should return null for invalid prices', () => {
    expect(parsePriceToDecimals('10')).toBe(null);
    expect(parsePriceToDecimals(-5)).toBe(null);
    expect(parsePriceToDecimals(10.999)).toBe(null);
  });
});

describe('isValidEmail', () => {
  test('should accept valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
  });
  
  test('should reject invalid email addresses', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('invalid@.com')).toBe(false);
  });
  
  test('should reject non-string input', () => {
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });
});

describe('isValidProductDescription', () => {
  test('should accept valid descriptions', () => {
    expect(isValidProductDescription('Organic fresh tomatoes')).toBe(true);
    expect(isValidProductDescription('Homemade pasta with natural ingredients')).toBe(true);
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
    expect(isValidProductDescription('aaaaabbbbc')).toBe(false);
  });
  
  test('should reject non-string input', () => {
    expect(isValidProductDescription(123)).toBe(false);
    expect(isValidProductDescription(null)).toBe(false);
  });
});

describe('isValidQuantity', () => {
  test('should accept positive integers', () => {
    expect(isValidQuantity(1)).toBe(true);
    expect(isValidQuantity(10)).toBe(true);
  });
  
  test('should reject zero', () => {
    expect(isValidQuantity(0)).toBe(false);
  });
  
  test('should reject negative numbers', () => {
    expect(isValidQuantity(-1)).toBe(false);
  });
  
  test('should reject decimal numbers', () => {
    expect(isValidQuantity(1.5)).toBe(false);
  });
  
  test('should reject non-numeric values', () => {
    expect(isValidQuantity('10')).toBe(false);
    expect(isValidQuantity(null)).toBe(false);
  });
});

describe('isValidCartItems', () => {
  test('should accept valid cart items', () => {
    const items = [
      { productId: 'prod-1', quantity: 2 },
      { productId: 'prod-2', quantity: 1 }
    ];
    expect(isValidCartItems(items)).toBe(true);
  });
  
  test('should reject items with missing productId', () => {
    const items = [{ quantity: 2 }];
    expect(isValidCartItems(items)).toBe(false);
  });
  
  test('should reject items with invalid quantity', () => {
    const items = [{ productId: 'prod-1', quantity: 0 }];
    expect(isValidCartItems(items)).toBe(false);
  });
  
  test('should reject non-array input', () => {
    expect(isValidCartItems(null)).toBe(false);
    expect(isValidCartItems('not an array')).toBe(false);
  });
});

describe('camelCase (COMP.SE.200)', () => {
  test('should convert to camelCase', () => {
    expect(camelCase('hello world')).toBe('helloWorld');
    expect(camelCase('product name')).toBe('productName');
    expect(camelCase('hello-world')).toBe('helloWorld');
  });
  
  test('should handle non-string input', () => {
    expect(camelCase(null)).toBe(null);
    expect(camelCase(123)).toBe(123);
  });
});

describe('toString (COMP.SE.200)', () => {
  test('should convert values to strings', () => {
    expect(toString('hello')).toBe('hello');
    expect(toString(123)).toBe('123');
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString(null)).toBe('null');
    expect(toString(undefined)).toBe('undefined');
  });
});

describe('toNumber (COMP.SE.200)', () => {
  test('should convert values to numbers', () => {
    expect(toNumber('123')).toBe(123);
    expect(toNumber('123.45')).toBe(123.45);
    expect(toNumber(456)).toBe(456);
    expect(toNumber(null)).toBe(0);
    expect(toNumber('0xFF')).toBe(255);
    expect(toNumber('0b1010')).toBe(10);
  });
});

describe('isBoolean (COMP.SE.200)', () => {
  test('should check if value is boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('true')).toBe(false);
  });
});

describe('isObject (COMP.SE.200)', () => {
  test('should check if value is object or function', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(() => {})).toBe(true);
    expect(isObject(123)).toBe(false);
    expect(isObject('hello')).toBe(false);
    expect(isObject(null)).toBe(false);
  });
});

describe('sanitizeProductName', () => {
  test('should sanitize and capitalize product name', () => {
    expect(sanitizeProductName('  fresh tomatoes  ')).toBe('Fresh tomatoes');
  });
  
  test('should return null for empty string', () => {
    expect(sanitizeProductName('')).toBe(null);
    expect(sanitizeProductName('   ')).toBe(null);
  });
  
  test('should return null for non-string input', () => {
    expect(sanitizeProductName(null)).toBe(null);
    expect(sanitizeProductName(123)).toBe(null);
  });
});

describe('isValidProductStructure', () => {
  test('should accept valid product object', () => {
    const product = {
      name: 'Tomatoes',
      price: 5.99,
      category: 'Vegetables',
      contents: 'Fresh tomatoes',
      producer: 'Farm XYZ',
      description: 'Organic fresh tomatoes'
    };
    expect(isValidProductStructure(product)).toBe(true);
  });
  
  test('should accept product with null optional fields', () => {
    const product = {
      name: 'Tomatoes',
      price: 5.99,
      category: null,
      contents: null,
      producer: null,
      description: null
    };
    expect(isValidProductStructure(product)).toBe(true);
  });
  
  test('should reject product with missing name', () => {
    const product = {
      price: 5.99,
      category: 'Vegetables'
    };
    expect(isValidProductStructure(product)).toBe(false);
  });
  
  test('should reject product with empty name', () => {
    const product = {
      name: '',
      price: 5.99,
      category: 'Vegetables'
    };
    expect(isValidProductStructure(product)).toBe(false);
  });
  
  test('should reject product with invalid price', () => {
    const product = {
      name: 'Tomatoes',
      price: -5.99,
      category: 'Vegetables'
    };
    expect(isValidProductStructure(product)).toBe(false);
  });
  
  test('should reject null object', () => {
    expect(isValidProductStructure(null)).toBe(false);
  });
});
