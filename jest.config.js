module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: 'src/.+\\.test\\.js$',
  setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each'],
};
