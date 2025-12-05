export default {
  testEnvironment: 'node',
  transform: {},
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
    '!src/validators/isEmpty.js',
    '!src/validators/toString.js',
    '!src/validators/toNumber.js',
    '!src/validators/capitalize.js',
    '!src/validators/camelCase.js',
    '!src/validators/isBoolean.js',
    '!src/validators/isObject.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};
