// Copyright (c) 2018 Dustin Toff

/**
 * Updates state based on the URL fragment/hash.
 */
function handleUrlFragment() {
    const hasHash = !!window.location.hash;
    document.body.classList.toggle('js-on-home', !hasHash);
}

window.addEventListener('hashchange', e => handleUrlFragment());
handleUrlFragment();