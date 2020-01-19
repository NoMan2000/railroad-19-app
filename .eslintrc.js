module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "plugin:flowtype/recommended",
    "plugin:cypress/recommended"
  ],
  plugins: [
    "flowtype",
    "react-hooks",
    "cypress"
  ],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
    "cypress/globals": true
  },
  globals: {
    RaleysSettings: "readonly",
  }
};
