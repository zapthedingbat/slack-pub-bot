module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'src/**/*.ts', load: true, instrument: true },
      { pattern: '**/*.json', load: true, instrument: false }
    ],
    tests: ['test/**/*.spec.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest',
    debug: false
  };
};
