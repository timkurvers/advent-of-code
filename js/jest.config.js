import { defaults } from 'jest-config';

export default {
  collectCoverageFrom: ['src/utils/**/*.js', '!src/utils/challenges/**'],
  coverageDirectory: './coverage/',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mjs'],
  testMatch: ['**/spec/**/*.spec.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  verbose: true,
};
