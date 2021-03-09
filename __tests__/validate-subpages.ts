import * as webpackConfig from "../config/webpack.config";
const sass = require("sass");

describe("subpages", () => {
    test("all subpage lists are in sync", () => {
        const result = sass.renderSync({
            data: `
            @use "${__dirname + "/../src/styles/locations.scss"}";

            a {
                b: "#{locations.$locations}";
            }
            `,
        });
        const resultCss = result.css.toString();
        // Extract the contents of quotes, then split on commas
        const cssLocations = new Set(resultCss.split('"')[1].split(", "));

        // Webpack contains an extra "." representing home.
        const webpackLocations = new Set(
            Object.keys(webpackConfig.entry)
                .map((path) => path.split("/")[0])
                .filter((path) => path !== ".")
        );

        expect(cssLocations).toStrictEqual(webpackLocations);
    });
});
