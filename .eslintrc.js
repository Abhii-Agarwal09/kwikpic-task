module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "unused-imports"],
  rules: {
    "react/jsx-pascal-case": 2,
    "unused-imports/no-unused-imports": 2,
    "no-console": 2,
    "react/prop-types": 0,
    "react/jsx-key": 2,
    "object-shorthand": 2,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
