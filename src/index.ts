import { resetNavMenu, initMenu, PAGES } from "./scripts/nav";
import { initContact } from "./scripts/contact";
import "./styles/index.scss";
import { StringObject } from "./scripts/types";

let lastHash: string | null = null;

const trimSlashes = (path: string): string => {
    return path.replace(/^\/*|\/*$/g, "");
};

const doesUrlHaveHash = (): boolean => window.location.href.includes("#");

const onHashChange = (): void => {
    resetNavMenu();

    const hash = window.location.hash;
    const hashLocation = hash.substring(1);
    const pathLocation = trimSlashes(window.location.pathname);

    if (lastHash === pathLocation && !doesUrlHaveHash()) {
        return;
    }

    window.history.replaceState(null, "", `/${hashLocation}`);
    const pageName = (PAGES as StringObject)[hashLocation];
    document.title = pageName ? `Liz Toff | ${pageName}` : "Liz Toff";
    document.body.dataset["location"] = hashLocation;
    lastHash = hashLocation;
};

initMenu();
initContact();

window.location.hash = trimSlashes(window.location.pathname);

onHashChange();
window.addEventListener("hashchange", onHashChange);

window.addEventListener("popstate", () => {
    resetNavMenu();

    if (doesUrlHaveHash()) {
        return;
    }

    const pathLocation = trimSlashes(document.location.pathname);
    document.body.dataset["location"] = pathLocation;
});
