import "./styles/index.scss";

let lastHash: string | null = null;

const trimSlashes = (path: string): string => {
    return path.replace(/^\/*|\/*$/g, "");
};

const doesUrlHaveHash = (): boolean => window.location.href.includes("#");

const resetNavMenu = (): void => {
    const menuCheckbox = document.querySelector<HTMLInputElement>(
        "nav input[type=checkbox]:checked"
    );
    if (menuCheckbox) {
        menuCheckbox.checked = false;
    }
};

const onHashChange = (): void => {
    resetNavMenu();

    const hash = window.location.hash;
    const hashLocation = hash.substring(1);
    const pathLocation = trimSlashes(window.location.pathname);

    if (lastHash === pathLocation && !doesUrlHaveHash()) {
        return;
    }

    window.history.replaceState(null, "Liz Toff", `/${hashLocation}`);
    document.body.dataset["location"] = hashLocation;
    lastHash = hashLocation;
};

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
