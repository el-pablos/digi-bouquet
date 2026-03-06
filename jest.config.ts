import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathPattern: '__tests__/unit/',
  testMatch: ['**/__tests__/unit/**/*.test.ts', '**/__tests__/unit/**/*.test.tsx'],
  collectCoverageFrom: [
    'lib/**/*.ts',
    'components/**/*.tsx',
    '!**/*.d.ts',
  ],
};

export default createJestConfig(config);
