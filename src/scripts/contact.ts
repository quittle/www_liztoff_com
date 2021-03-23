import { StringObject } from "./types";

const CLASS_SUBMITTING = "submitting";

interface ContactResponse {
    result?: string;
}

function formUrlEncode(formData: StringObject): string {
    return Object.entries(formData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&")
        .replace("%20", "+");
}

function getFormData(form: HTMLFormElement): StringObject {
    const inputs = form.querySelectorAll<HTMLTextAreaElement | HTMLInputElement>(
        "input[name], textarea[name]"
    );
    const ret: StringObject = {};
    for (const input of inputs) {
        ret[input.name] = input.value;
    }
    return ret;
}

function initContact(): void {
    const contactForm = document.querySelector<HTMLFormElement>("#contact form");
    const formInputs = document.querySelectorAll<HTMLInputElement>(
        "#contact input, #contact textarea"
    );
    const contactError = document.getElementById("contact-error");
    const submitButton = document.querySelector<HTMLInputElement>("#contact input[type=submit]");

    contactForm.addEventListener("submit", (e) => {
        submitButton.classList.add(CLASS_SUBMITTING);
        formInputs.forEach((input) => (input.disabled = true));

        let requestSucceeded = false;
        const formData = getFormData(contactForm);
        fetch(contactForm.action, {
            method: "POST",
            body: formUrlEncode(formData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    submitButton.value = "✔️";
                    contactError.innerText = "";
                    requestSucceeded = true;
                } else {
                    const errorMessage = ((await response.json()) as ContactResponse).result;
                    contactError.innerText = `Error: ${errorMessage}`;
                }
            })
            .catch((e) => {
                console.error("Unable to submit form", e);
                contactError.innerText = `Error: ${(e as Error).message}`;
            })
            .finally(() => {
                submitButton.classList.remove(CLASS_SUBMITTING);
                if (!requestSucceeded) {
                    formInputs.forEach((input) => (input.disabled = false));
                }
            });
        e.preventDefault();
    });
}

export { initContact };
