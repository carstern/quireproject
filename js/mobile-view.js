"use strict";
//placera i if (window.innerWidth < 768) - mobilvy
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 1020) {
        navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.remove('nav-output-container');
        navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.add("nav-output-container-show");
    }
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button");
    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
    });
    searchLink.addEventListener("click", () => {
        if (window.innerWidth < 1020) {
            // const navContainer = document.getElementById("nav-container");
            navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
        }
        console.log('click');
    });
    showFavoritesBtn.addEventListener("click", () => {
        // const navContainer = document.getElementById("nav-container");
        navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
        console.log('click');
    });
});
