const path = require("path");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsconfig: path.resolve(__dirname, "tsconfig.test.json"),
        },
    },
    rootDir: path.resolve(__dirname, ".."),
};
