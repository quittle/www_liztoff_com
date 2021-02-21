import "./styles/index.scss";

let lastHash: string | null = null;

const doesUrlHaveHash = () => window.location.href.includes("#");

const onHashChange = () => {
    const hash = window.location.hash;
    const hashLocation = hash.substring(1);
    const pathLocation = window.location.pathname.substring(1);

    if (lastHash === pathLocation && !doesUrlHaveHash()) {
        return;
    }

    window.history.replaceState(null, "Liz Toff " + hashLocation, `/${hashLocation}`);
    document.body.dataset["location"] = hashLocation;
    lastHash = hashLocation;
};

window.location.hash = window.location.pathname.substring(1);

onHashChange();
window.addEventListener("hashchange", onHashChange);

window.addEventListener("popstate", () => {
    if (doesUrlHaveHash()) {
        return;
    }

    const pathLocation = document.location.pathname.substring(1);
    document.body.dataset["location"] = pathLocation;
});
