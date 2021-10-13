/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/server'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'server'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/server/tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
