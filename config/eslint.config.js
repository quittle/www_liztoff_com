import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    js.configs.recommended,
    tsPlugin.configs["flat/eslint-recommended"],
    ...tsPlugin.configs["flat/recommended"],
    ...tsPlugin.configs["flat/recommended-type-checked"],
    {
        languageOptions: {
            parserOptions: {
                project: "config/tsconfig.json",
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error",
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
