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

// const floatingMenu = document.getElementById("floating-control-menu") as HTMLDivElement;

// floatingMenu.addEventListener('click', function(){
//     console.log('HEööiiii')
// });

// Select the floating-toggle button
const toggleButton = document.getElementById('floating-control-menu') as HTMLDivElement;

// Define the function to toggle the 'active' class
const activeMenu = () => {
    toggleButton.classList.toggle('active');
};

// Add event listener to the toggleButton
toggleButton.addEventListener('click', activeMenu);

   

  