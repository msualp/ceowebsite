// jest.config.js

const { pathsToModuleNameMapper } = require('ts-jest/utils'); // for older versions
// OR for ts-jest >= 28.0.0 use:
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  moduleDirectories: ['node_modules', '<rootDir>'],
};