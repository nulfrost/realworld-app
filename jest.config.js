const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./server/tsconfig.json');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/server'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'server'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/server/tsconfig.json',
    },
  },
};
