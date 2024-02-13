document.addEventListener("DOMContentLoaded", () => {
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button") as HTMLButtonElement;

    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer?.classList.toggle("nav-container-show");
        console.log('click')
    });

    searchLink.addEventListener("click", () => {

        // const navContainer = document.getElementById("nav-container");
        navOutputContainer?.classList.toggle("nav-output-container-show");
        console.log('click')
    });

    showFavoritesBtn.addEventListener("click", () => {
        // const navContainer = document.getElementById("nav-container");
        navOutputContainer?.classList.toggle("nav-output-container-show");
        console.log('click')
    });
});
