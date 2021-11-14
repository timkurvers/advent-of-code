const { defaults } = require('jest-config');

module.exports = {
  collectCoverageFrom: [
    'src/utils/**/*.mjs',
    '!src/utils/challenges/**',
  ],
  coverageDirectory: './coverage/',
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'mjs',
  ],
  testMatch: [
    '**/spec/**/*.spec.mjs',
  ],
  transform: {
    '^.+\\.mjs$': 'babel-jest',
  },
  verbose: true,
};
