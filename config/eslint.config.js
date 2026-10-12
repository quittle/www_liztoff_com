import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    js.configs.recommended,
    ...tsPlugin.configs["flat/strict-type-checked"],
    ...tsPlugin.configs["flat/stylistic-type-checked"],
    {
        languageOptions: {
            parserOptions: {
                project: "config/tsconfig.json",
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: "warn",
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
            // These rules require strictNullChecks, which the project
            // doesn't enable. They can't function correctly without it.
            "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
            "@typescript-eslint/no-unnecessary-condition": "off",
            "@typescript-eslint/no-useless-default-assignment": "off",
            "@typescript-eslint/prefer-nullish-coalescing": "off",
        },
    },
];
