module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended', // integrates prettier with eslint
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',

    // Common team rules (customize if needed)
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',

    // 🔽 change unused vars from error → warning
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
