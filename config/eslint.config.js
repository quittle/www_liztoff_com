// Flat-config equivalent of the former config/.eslintrc.json.
// ESLint 10 does not support eslintrc files. The rule set is unchanged.
const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
    js.configs.recommended,
    // Includes the old plugin:@typescript-eslint/eslint-recommended disables.
    ...tsPlugin.configs["flat/recommended"],
    // Replaces plugin:@typescript-eslint/recommended-requiring-type-checking.
    ...tsPlugin.configs["flat/recommended-type-checked"],
    {
        languageOptions: {
            parserOptions: {
                project: "config/tsconfig.json",
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                },
            ],
            "prefer-const": [
                "error",
                {
                    destructuring: "all",
                },
            ],
        },
    },
];
