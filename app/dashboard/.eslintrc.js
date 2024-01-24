module.exports = {
  globals: {
    window: true,
    document: true,
    localStorage: true,
    module: true,
    HTMLDivElement: true,
    HTMLElement: true,
    SVGSVGElement: true,
    HTMLSelectElement: true,
    HTMLTextAreaElement: true,
    HTMLInputElement: true,
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-empty': 'warn',
  },
};
