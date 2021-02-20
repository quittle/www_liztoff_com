const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
    },
    output: {
        publicPath: "/",
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js"],
    },

    optimization: {
        minimizer: [`...`, new CssMinimizerWebpackPlugin()],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: ["src/assets/.s3uploadconfig.json"],
        }),
        new MiniCssExtractPlugin(),
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
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `<link>`s injected into html from the JS modules
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff2)$/i,
                type: "asset/resource",
            },
        ],
    },
};
