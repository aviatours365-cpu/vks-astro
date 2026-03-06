import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";

/**
 * VKS-site ESLint Configuration (Flat Config — ESLint 9+)
 *
 * Anti-Monolith rules:
 * - max-lines: 300 (error) / 150 (warn)
 * - max-lines-per-function: 50 (warn)
 * - no-duplicate-imports
 *
 * See ARCHITECTURE.md for full guidelines.
 */
export default [
  // ── Global ignores ──
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "temp/**",
      "scripts/**",
    ],
  },

  // ── Base JS/TS rules ──
  {
    files: ["**/*.{js,mjs,ts}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // ── Anti-Monolith ──
      "max-lines": [
        "warn",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "warn",
        { max: 50, skipBlankLines: true, skipComments: true },
      ],

      // ── Code Quality ──
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",

      // ── Import hygiene ──
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../**/components/*", "../../**/lib/*", "../../../**"],
              message:
                "Используйте алиасы: @/, @components/, @assets/. См. ARCHITECTURE.md §8.",
            },
          ],
        },
      ],
    },
  },

  // ── Astro components ──
  ...astroPlugin.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // Anti-monolith: .astro files have a stricter limit since they contain template too
      "max-lines": [
        "warn",
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
    },
  },
];
