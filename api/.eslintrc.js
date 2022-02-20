module.exports = {
  env: {
    es2021: true,
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
    'node/no-unsupported-features/es-syntax': ['error', {
      'ignores': ['modules'],
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
    "node/no-unpublished-import": ["error", {
      "convertPath": [
        {
          "include": ["src/src/**/*"],
          "exclude": ["src/tests/**/*"],
        },
      ],
    }],
  },
};
