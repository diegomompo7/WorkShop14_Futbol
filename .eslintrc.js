module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "semi": "off",
    "space-before-function-paren": "off",
    "quotes": [2, "double"],
    "quote-props": [2, "consistent"],
    "multiline-ternary": "off",
    "comma-dangle": "off",
  },
};
