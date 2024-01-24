"use strict";
// Insert html content for first-time-info-box here
const content = "<h4>Hey!</h4><p>This is some random text that will eventually keep some valueable text.</p>";
// When all content on the page has loaded, do all the stuff
document.addEventListener("DOMContentLoaded", () => {
    const welcome_overlay = document.createElement("div");
    welcome_overlay.classList.add("welcome-overlay");
    const welcome_container = document.createElement("div");
    welcome_container.classList.add("welcome-container");
    const welcome_close = document.createElement("span");
    welcome_close.classList.add("welcome-close");
    welcome_close.innerHTML = "&#x2715;";
    const body = document.querySelector("body");
    /* If welcome variable does not already exist, append everything
    and show the info-modal to the user */
    if (!localStorage.getItem("welcome")) {
        welcome_container.innerHTML += content;
        welcome_container.append(welcome_close);
        welcome_overlay.append(welcome_container);
        // Append it to the beginning of body
        body.prepend(welcome_overlay);
        // Modal closable by clicking outside or by "X"
        welcome_overlay.addEventListener("click", () => {
            welcome_container.classList.remove("animate");
            setTimeout(() => welcome_overlay.remove(), 1500);
        });
        welcome_close.addEventListener("click", () => {
            welcome_container.classList.remove("animate");
            setTimeout(() => welcome_overlay.remove(), 1500);
        });
        // Add the localstorage variable so info-box can't show again
        localStorage.setItem("welcome", "true");
        // Start the transition with some delay to make it more visible
        setTimeout(() => {
            welcome_container.classList.add("animate");
        }, 500);
    }
});
