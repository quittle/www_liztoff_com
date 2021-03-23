import * as webpackConfig from "../config/webpack.config";
import { PAGES as navPages } from "../src/scripts/nav";
const sass = require("sass");
import * as ejs from "ejs";
import * as fs from "fs";
import * as xml2js from "xml2js";

describe("subpages", () => {
    test("all subpage lists are in sync", () => {
        const jsLocations = new Set(Object.keys(navPages).filter((page) => page !== ""));

        const sassRenderResult = sass.renderSync({
            data: `
            @use "${__dirname + "/../src/styles/locations.scss"}";

            a {
                b: "#{locations.$locations}";
            }
            `,
        });
        const resultCss = sassRenderResult.css.toString();
        // Extract the contents of quotes, then split on commas
        const cssLocations = new Set(resultCss.split('"')[1].split(", "));

        // Webpack contains an extra "." representing home.
        const webpackLocations = new Set(
            Object.keys(webpackConfig.entry)
                .map((path) => path.split("/")[0])
                .filter((path) => path !== ".")
        );

        expect(cssLocations).toStrictEqual(webpackLocations);
        expect(jsLocations).toStrictEqual(cssLocations);
    });

    test("tov.ejs page titles match js", async () => {
        const tovContents = fs.readFileSync(`${__dirname}/../src/html/tov.ejs`).toString();
        const ejsTemplate = ejs.compile(tovContents);
        let successfulParsings = 0;
        await Object.entries(navPages).map(async ([page, name]) => {
            let htmlPartial;
            try {
                htmlPartial = ejsTemplate({ page });
            } catch (e) {
                if (e.message.includes("Cannot read property '1' of undefined")) {
                    // Not all nav pages are supported by tov and fail with this exception
                    return;
                } else {
                    throw e;
                }
            }
            const result = await xml2js.parseStringPromise(htmlPartial, { trim: true });
            const pageTitle = result.ul.li[1]["_"]; // The text contents of the second li

            expect(pageTitle).toBe(name);

            successfulParsings++;
        });
        expect(successfulParsings).toBe(4);
    });
});
