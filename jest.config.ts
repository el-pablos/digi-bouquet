import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^uuid$': '<rootDir>/__mocks__/uuid.ts',
  },
  testMatch: ['**/__tests__/unit/**/*.test.ts', '**/__tests__/unit/**/*.test.tsx'],
  collectCoverageFrom: [
    'lib/**/*.ts',
    'components/**/*.tsx',
    '!**/*.d.ts',
  ],
};

export default createJestConfig(config);
