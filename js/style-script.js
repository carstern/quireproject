"use strict";
// Get the nav-container 
const navContainer = document.getElementById("nav-container");
// Get the more button 
const moreButton = document.getElementById("more-button");
// Add hide class to nav
navContainer.classList.add("hide");
// Listen for clicks on the more button; add/remove hide 
moreButton.addEventListener("click", function () {
    if (navContainer.classList.contains("hide")) {
        navContainer.classList.remove("hide");
    }
    else {
        navContainer.classList.add("hide");
    }
});
