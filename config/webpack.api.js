const process = require("process");
const webpack = require("webpack");

module.exports = {
    mode: "production",
    entry: [`${__dirname}/../lambda/contact/index.ts`],
    target: "node",
    output: {
        path: `${__dirname}/../dist-contact`,
        filename: "index.js",
        libraryTarget: "commonjs2",
    },
    externals: {
        "aws-lambda": "aws-lambda",
        "aws-sdk": "aws-sdk",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new webpack.DefinePlugin({
            RECAPTCHA_SECRET: JSON.stringify(process.env.RECAPTCHA_SECRET),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
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
        ],
    },
};
