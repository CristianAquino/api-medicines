module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testRegex: '.*\\.(spec|test)\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '.+\\.(t|j)s$': ['@swc/jest'],
  },
  collectCoverageFrom: [
    // '**/*.(t|j)s',
    // '!src/main.ts',
    // '!src/**/*.module.ts',
    // '!src/**/*.entity.ts',
    // '!src/**/*config.ts',
    // '!src/**/index.ts',
    // '!src/**/*.interface.ts',
    // '!src/**/*.service.ts',
    // '!src/**/migrations/*.ts',
    // '!src/**/usecases-proxy.ts',
    'src/**/*.usecase.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageDirectory: '../coverage',
};
