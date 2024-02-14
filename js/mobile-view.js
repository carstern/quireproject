"use strict";
//placera i if (window.innerWidth < 768) - mobilvy
document.addEventListener("DOMContentLoaded", () => {
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button");
    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
        // Toggle text between "More" and "Hide"
        if (moreBtn.textContent === "More") {
            moreBtn.textContent = "Hide";
        }
        else {
            moreBtn.textContent = "More";
        }
    });
    searchLink.addEventListener("click", () => {
        // const navContainer = document.getElementById("nav-container");
        navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
        console.log('click');
    });
    showFavoritesBtn.addEventListener("click", () => {
        // const navContainer = document.getElementById("nav-container");
        navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
        console.log('click');
    });
});
