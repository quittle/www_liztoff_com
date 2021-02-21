const { merge, mergeWithRules } = require("webpack-merge");
const common = require("./webpack.config.js");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { IMAGE_REGEX, SASS_REGEX } = require("./webpack-utils");

// Enable minification on HtmlWebpackPlugin plugin
common.plugins.find(
    (plugin) => plugin.constructor && plugin.constructor.name === "HtmlWebpackPlugin"
).userOptions.minify = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    keepClosingSlash: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeScriptTypeAttributes: true,
    sortAttributes: true,
};

let config = merge(common, {
    mode: "production",
    devtool: "source-map",
    optimization: {
        minimizer: [`...`, new CssMinimizerWebpackPlugin()],
    },
    devServer: {
        hot: false,
        inline: false,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index-[contenthash].css",
        }),
        new PreloadWebpackPlugin({
            include: "all",
            as(entry) {
                if (IMAGE_REGEX.test(entry)) return "image";
                if (/\.css$/.test(entry)) return "style";
                if (/\.js$/.test(entry)) return "script";
                throw new Error("Unknown entry type: " + entry);
            },
        }),
    ],
});

config = mergeWithRules({
    module: {
        rules: {
            test: "match",
            use: "replace",
        },
    },
})(config, {
    module: {
        rules: [
            {
                test: SASS_REGEX,
                use: [
                    // Creates `<link>`s injected into html from the JS modules
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
});

module.exports = config;
