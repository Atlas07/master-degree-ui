module.exports = {
  root: true,
  extends: ['airbnb', 'react-app', 'prettier'],
  plugins: [
    'react-hooks',
    'simple-import-sort',
    'prettier',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['*.d.ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 0,
    quotes: [2, 'single'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'simple-import-sort/imports': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  env: {
    es6: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
