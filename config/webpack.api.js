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
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
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
