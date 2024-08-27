module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "simple-import-sort",
    "@tanstack/query",
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": "error",

    "react-refresh/only-export-components": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "always"],
    "@typescript-eslint/ban-ts-comment": "off",
    quotes: ["error", "double"],
    "eol-last": ["error", "always"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-irregular-whitespace": "off",
  },
};
