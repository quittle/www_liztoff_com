import * as ejs from "ejs";
import * as fs from "fs";
import * as xml2js from "xml2js";

describe("head", () => {
    let headXml: any;

    beforeAll(async () => {
        const tovContents = fs.readFileSync(`${__dirname}/../src/html/head.html`).toString();
        const headHtml = await ejs.render(
            tovContents,
            { require: () => "/require/path" },
            {
                root: `${__dirname}/../src`,
                client: true,
            }
        );
        headXml = await xml2js.parseStringPromise(headHtml, {
            trim: true,
            strict: false,
            normalizeTags: true,
            normalize: true,
        });
    });

    const findMetaValue = (
        findAttrName: string,
        findAttrValue: string,
        resultAttrName: string
    ): string => {
        return headXml.head.meta
            .map((meta: any) => meta["$"])
            .find((metaAttr: any) => metaAttr[findAttrName.toUpperCase()] === findAttrValue)[
            resultAttrName.toUpperCase()
        ];
    };

    test("description length", () => {
        const description = findMetaValue("name", "description", "content");
        expect(description.length).toBeLessThan(200);
    });

    test("title length", () => {
        const title = findMetaValue("property", "og:title", "content");
        expect(title.length).toBeLessThan(70);
    });

    test("site name length", () => {
        const title = findMetaValue("property", "og:site_name", "content");
        expect(title.length).toBeLessThan(70);
    });
});
