import "./styles/index.scss";

const setHash = () => {
    const hashLocation = window.location.hash.substring(1);
    document.body.dataset["location"] = hashLocation;
};

setHash();
window.addEventListener("hashchange", setHash);
