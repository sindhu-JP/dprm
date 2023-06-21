var restrictedGlobals = require('eslint-restricted-globals');
module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    jest: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  plugins: [
    'filenames',
    'import',
    'jsx-a11y',
    'react',
    'prettier',
    'unused-imports'
  ],
  rules: {
    'array-callback-return': 'warn',
    'default-case': ['warn', { commentPattern: '^no default$' }], //Include `// no default` when no default case
    'dot-location': ['error', 'property'],
    eqeqeq: ['error', 'smart'],
    'no-throw-literal': 0,
    'no-undef': 0,
    'no-use-before-define': 0,
    'array-callback-return': 0,
    'no-prototype-builtins': 0,
    'no-param-reassign': 0,
    'no-fallthrough': 0,
    'no-shadow': 0,
    'no-case-declarations': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 0,
    'vars-on-top': 0,
    'no-await-in-loop': 0,
    // 'no-console': 2,
    'no-useless-escape': 0,
    'no-nested-ternary': 0,
    'no-useless-constructor': 0,
    'no-sequences': 0,
    'guard-for-in': 0,
    'no-dupe-keys': 0,
    'prefer-spread': 0,
    'no-unreachable': 0,
    'class-methods-use-this': 0,
    'no-cond-assign': 0,
    'no-lone-blocks': 0,
    // 'no-inline-comments': 2,
    radix: 0,
    'no-unused-vars': [
      'off',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.js'] }],
    'react/no-access-state-in-setstate': 0,
    'react/sort-comp': 0,
    'react/button-has-type': 0,
    // 'react/no-unused-prop-types': 1,
    // 'react/no-unused-state': 1,
    'react/no-unused-prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/prefer-stateless-function': 0,
    'react/no-find-dom-node': 0,
    'react/jsx-no-duplicate-props': 0,
    'react/display-name': 0,
    'no-unexpected-multiline': 0,
    'react/jsx-key': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: 'babel-eslint'
};
