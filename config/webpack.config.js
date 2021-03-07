const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { IMAGE_REGEX, SASS_REGEX } = require("./webpack-utils");

module.exports = {
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
    },
    // Generate identical files for each subfile
    entry: Object.fromEntries(
        [
            ".",
            "about-me",
            "resume",
            "contact",
            "recommendations",
            "product-copy",
            "editorial-and-brand-copy",
            "projects",
            "conversational-and-relatable",
            "vivid-and-descriptive",
            "out-of-the-box-and-creative",
            "elevated-and-knowledgeable",
        ].map((name) => [`${name}/index`, "./src/index.ts"])
    ),
    output: {
        publicPath: "/",
        // Only ever generate a single js file
        filename: "index-[contenthash].js",
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            favicon: "src/images/favicon.png",
            template: "src/index.html",
            filename: "[name].html",
        }),
        new CopyWebpackPlugin({
            patterns: ["src/assets/.s3uploadconfig.json"],
        }),
    ],

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "config/tsconfig.json",
                        },
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: SASS_REGEX,
                use: [
                    // Creates loads the CSS via JS
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["postcss-preset-env"],
                            },
                        },
                    },
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /src\/html\/.*\.html$/,
                loader: "html-loader",
                options: {
                    esModule: false,
                    sources: {
                        list: [
                            // All default supported tags and attributes
                            "...",
                            {
                                tag: "a",
                                attribute: "href",
                                type: "src",
                            },
                        ],
                    },
                },
            },
            {
                test: IMAGE_REGEX,
                type: "asset/resource",
            },
            {
                test: /\.pdf$/,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                },
            },
        ],
    },
};
