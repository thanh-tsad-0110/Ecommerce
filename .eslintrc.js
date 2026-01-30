module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.config.js', '*.config.cjs', '*.config.ts', 'jest.config.js'],
      parserOptions: {
        // Allow linting config files without requiring a Babel config lookup
        requireConfigFile: false,
      },
      env: {
        node: true,
      },
    },
  ],
};
