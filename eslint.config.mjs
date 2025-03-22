import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,

  ...compat.config({
    extends: ["next/core-web-vitals"],
  }),

  ...compat.config({
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }),

  ...compat.config({
    plugins: ["react"],
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
    rules: {
      "react/no-unescaped-entities": "warn",
      "react/react-in-jsx-scope": "off",
    },
  }),

  {
    rules: {
      "no-console": "warn",
    },
  },
];
