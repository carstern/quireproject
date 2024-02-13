"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button");
    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
        console.log('click');
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
// const floatingMenu = document.getElementById("floating-control-menu") as HTMLDivElement;
// floatingMenu.addEventListener('click', function(){
//     console.log('HEööiiii')
// });
// Select the floating-toggle button
const toggleButton = document.getElementById('floating-control-menu');
// Define the function to toggle the 'active' class
const activeMenu = () => {
    toggleButton.classList.toggle('active');
};
// Add event listener to the toggleButton
toggleButton.addEventListener('click', activeMenu);
