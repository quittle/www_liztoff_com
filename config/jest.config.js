const path = require("path");
const { createDefaultPreset } = require("ts-jest");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        ...createDefaultPreset({
            tsconfig: path.resolve(__dirname, "tsconfig.test.json"),
        }).transform,
    },
    rootDir: path.resolve(__dirname, ".."),
};
