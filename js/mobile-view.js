"use strict";
const moreBtn = document.getElementById("more-button");
moreBtn.addEventListener("click", function () {
    const navContainer = document.getElementById("nav-container");
    navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
});
const floatingControlMenu = document.getElementById("floating-control-container");
const controlButtons = document.querySelectorAll(".control-button");
floatingControlMenu === null || floatingControlMenu === void 0 ? void 0 : floatingControlMenu.addEventListener("click", function () {
    controlButtons.forEach((button) => {
        button.classList.toggle("control-buttons-show");
    });
});
// Att lägga till click på body för att stänga floating control menu
