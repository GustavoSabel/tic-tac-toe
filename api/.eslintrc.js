module.exports = {
  env: {
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:mocha/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'mocha',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-expect': 'error',
    'node/no-unsupported-features/es-syntax': ['error', {
      'ignores': ['modules']
    }],
    'node/no-missing-import': 'off',
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': [
      'error',
    ],
    'no-console': ['error'],
    'indent': [
      'error', 2, {
        VariableDeclarator: 1,
        SwitchCase: 1,
        flatTernaryExpressions: false,
        ignoredNodes: [
          'TSTypeParameterInstantiation',
        ],
      },
    ],
    'brace-style': [
      'error',
      '1tbs',
    ],
    'curly': [
      'error',
      'multi-line',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
};
