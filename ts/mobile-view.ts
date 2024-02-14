 //placera i if (window.innerWidth < 768) - mobilvy
document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 1020) {
        navOutputContainer?.classList.remove('nav-output-container')
        navOutputContainer?.classList.add("nav-output-container-show");
    }
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button") as HTMLButtonElement;

    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer?.classList.toggle("nav-container-show");

        // Toggle text between "More" and "Hide"
        if (moreBtn.textContent === "More") {
            moreBtn.textContent = "Hide";
        } else {
            moreBtn.textContent = "More";
        }
    });

    searchLink.addEventListener("click", () => {
        if (window.innerWidth < 1020) {
        // const navContainer = document.getElementById("nav-container");
        navOutputContainer?.classList.toggle("nav-output-container-show");
        }
        console.log('click')
    });

    showFavoritesBtn.addEventListener("click", () => {
        // const navContainer = document.getElementById("nav-container");
        navOutputContainer?.classList.toggle("nav-output-container-show");
        console.log('click')
    });

});
