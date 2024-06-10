module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': [
      process.env.NODE_ENV === 'production' ? 'off' : 'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'arrow-parens': 'off',
    'no-extra-boolean-cast': 'off',
    'no-duplicate-case': 'off',
    'no-irregular-whitespace': 'off',
    'no-mixed-operators':
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-case-declarations': 'warn',
    'no-unsafe-finally': 'off',
    'no-unused-vars': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ], //will ignore any   args starting with underscore
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-class-assign': 'off',
    'no-extra-semi': 'error',
    'no-func-assign': 'off',
    'no-useless-escape': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-prototype-builtins': 'off',

    // React Rules:
    'jsx-a11y/alt-text': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'warn',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react-hooks/rules-of-hooks': 'warn', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/no-children-prop': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-duplicate-props': 'warn',
  },
};
