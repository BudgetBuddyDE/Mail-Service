module.exports = {
  // @ts-ignore
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  silent: true,
};
