function getPreviewElements(): {
    wrapper: HTMLElement;
    closeButton: HTMLButtonElement;
    header: HTMLHeadingElement;
    headerLink: HTMLAnchorElement;
    iframe: HTMLIFrameElement;
    tabStart: HTMLElement;
    tabEnd: HTMLElement;
} {
    const wrapper = document.getElementById("aila-emails-preview");
    const closeButton = wrapper.querySelector("button");
    const header = wrapper.querySelector("h2");
    const headerLink = header.querySelector("a");
    const iframe = wrapper.querySelector("iframe");
    const tabStart = document.getElementById("aila-emails-preview-start");
    const tabEnd = document.getElementById("aila-emails-preview-end");
    return {
        wrapper,
        closeButton,
        header,
        headerLink,
        iframe,
        tabStart,
        tabEnd,
    };
}

function showPreview(link: string, title: string): void {
    const { wrapper, header, headerLink, iframe } = getPreviewElements();

    wrapper.classList.add("show");

    headerLink.href = link;
    headerLink.innerText = title;

    header.focus();

    iframe.removeAttribute("srcdoc");
    iframe.src = link;

    document.body.classList.add("noscroll");
}

function hidePreview(): void {
    const { wrapper, iframe } = getPreviewElements();
    wrapper.classList.remove("show");

    const h1 = document.createElement("h1");
    h1.innerText = "Loading...";
    iframe.srcdoc = h1.outerHTML;
    iframe.removeAttribute("src");
    iframe.onload = null;

    document.body.classList.remove("noscroll");

    const curUrl = wrapper.dataset.url;
    const curLink = document.querySelector<HTMLAnchorElement | undefined>(`a[href="${curUrl}"]`);
    if (curLink) {
        curLink.focus();
    }
}

export function initAilaEmails(): void {
    const { wrapper, header, closeButton, iframe, tabStart, tabEnd } = getPreviewElements();

    const emailLinks = document.querySelectorAll<HTMLAnchorElement>("#aila-emails a");
    emailLinks.forEach((emailLink) => {
        emailLink.addEventListener("click", (e: MouseEvent) => {
            // Allow the user to open in a new tab or window
            if (e.ctrlKey || e.shiftKey || e.metaKey) {
                return;
            }

            const link = emailLink.href;
            wrapper.dataset.url = link;
            const caption = emailLink.querySelector("figcaption");
            const captionText = caption.innerText;
            showPreview(link, captionText);
            e.preventDefault();
        });
    });

    document.body.addEventListener("keydown", (e: KeyboardEvent) => {
        if (!wrapper.classList.contains("show")) {
            return;
        }

        if (e.key === "Escape") {
            hidePreview();
            e.stopPropagation();
        }
    });

    closeButton.addEventListener("click", () => {
        hidePreview();
    });

    // Set up focus traps
    tabStart.addEventListener("focus", () => {
        iframe.focus();
    });

    tabEnd.addEventListener("focus", () => {
        header.focus();
    });
}
