module.exports = {
  extends: ['react-app', 'prettier', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser', // may be skipped but resolves the VSCode error
  ignorePatterns: ['**/public/scripts/*.js'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // TS
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-redeclare': 0,
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
  rules: {
    // General
    'comma-dangle': ['warn', 'always-multiline'],
    'import/no-named-as-default': 0,
    'global-require': 'warn',
    'key-spacing': 'off',
    'max-len': ['warn', 180, 4],
    'no-else-return': ['error', { allowElseIf: true }],
    'no-multi-spaces': 'off',
    'no-underscore-dangle': 'off',
    'no-var': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-redeclare': 'off',
    'import/no-unresolved': 'off',
    // React hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    'import/named': 'off',
    // JSX a11y
    'jsx-a11y/href-no-hash': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
