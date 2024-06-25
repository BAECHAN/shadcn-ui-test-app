module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "import"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    "no-restricted-imports": [
      "error",
      {
        paths: [],
        patterns: [
          {
            group: [
              "@/shared/lib/shadcn-ui/components/ui/*",
              "!@/shared/lib/shadcn-ui/components/ui/index.ts",
            ],
            message: "Please import from the index.ts file in the ui folder.",
          },
        ],
      },
    ],
  },
};
