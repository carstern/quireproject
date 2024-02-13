"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button");
    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
    });
    const floatingControlMenu = document.getElementById("floating-control-container");
    const controlButtons = document.querySelectorAll(".control-button");
    floatingControlMenu === null || floatingControlMenu === void 0 ? void 0 : floatingControlMenu.addEventListener("click", () => {
        controlButtons.forEach((button) => {
            button.classList.toggle("control-buttons-show");
        });
    });
    // Add click event to body to close floating control menu
    document.body.addEventListener("click", (event) => {
        const target = event.target;
        if (!floatingControlMenu.contains(target)) {
            controlButtons.forEach((button) => {
                button.classList.remove("control-buttons-show");
            });
        }
    });
});
