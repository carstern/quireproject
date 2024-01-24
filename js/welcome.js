"use strict";
// Insert html content for first-time-info-box here
const content = "<h4>Hey!</h4><p>This is some random text that will eventually keep some valueable text.</p>";
// When all content on the page has loaded, do all the stuff
document.addEventListener("DOMContentLoaded", () => {
    const welcome_overlay = document.createElement("div");
    welcome_overlay.classList.add("welcome-overlay");
    const welcome_container = document.createElement("div");
    welcome_container.classList.add("welcome-container");
    const body = document.querySelector("body");
    // If welcome variable does not already exist, append everything
    if (!localStorage.getItem("welcome")) {
        welcome_container.innerHTML += content;
        welcome_overlay.append(welcome_container);
        // Append it to the beginning of body
        body.prepend(welcome_overlay);
        // Add the localstorage variable so info-box can't show again
        localStorage.setItem("welcome", "true");
        // Add the animation with some delay to make it more visible
        setTimeout(() => {
            welcome_container.classList.add("animate");
        }, 500);
    }
});
