import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import requireAnalytics from "./eslint-rules/require-analytics.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Block direct posthog-js imports in app code
  {
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "posthog-js",
              message: 'Import { capture } from "@/lib/analytics" instead.',
            },
          ],
        },
      ],
    },
  },
  // Require analytics in page components
  {
    files: ["src/app/**/page.tsx"],
    plugins: {
      local: {
        rules: {
          "require-analytics": requireAnalytics,
        },
      },
    },
    rules: {
      "local/require-analytics": "warn",
    },
  },
]);

export default eslintConfig;
