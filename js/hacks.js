document.querySelectorAll('main section ul li a > div').forEach(div => {
    div.setAttribute('title', div.textContent);
});
