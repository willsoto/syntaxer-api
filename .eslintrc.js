const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: '2017',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:node/recommended'],
  plugins: ['import', 'node'],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    quotes: ['error', 'single'],
    semi: 2,
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never'
      }
    ],
    'no-console': 1,
    // allow debugger during development
    'no-debugger': isProduction ? 2 : 1,
    'no-unused-vars': isProduction ? 2 : 1
  }
};
