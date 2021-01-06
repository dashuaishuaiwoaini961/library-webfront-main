module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/max-attributes-per-line': 'off',
    "semi": [2, "never"],
    "@typescript-eslint/semi": ["error", "never"],
    "comma-dangle": ["error", "never"]
  }
}