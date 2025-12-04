export default {
  testEnvironment: 'node',
  transform: {},
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};
