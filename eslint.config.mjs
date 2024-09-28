import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/node_modules/", ".dist/"],
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": "warn",
      "no-undef": "error",
    },
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
