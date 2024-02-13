document.addEventListener("DOMContentLoaded", () => {
    // Code to run after the DOM is fully loaded
    const moreBtn = document.getElementById("more-button") as HTMLButtonElement;

    moreBtn.addEventListener("click", () => {
        const navContainer = document.getElementById("nav-container");
        navContainer?.classList.toggle("nav-container-show");
    });

    const floatingControlMenu = document.getElementById("floating-control-container") as HTMLDivElement;
    const controlButtons = document.querySelectorAll(".control-button") as NodeListOf<HTMLButtonElement>;
    floatingControlMenu?.addEventListener("click", () => {
        controlButtons.forEach((button: HTMLButtonElement) => {
            button.classList.toggle("control-buttons-show");
        });
    });

    // Add click event to body to close floating control menu
    document.body.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!floatingControlMenu.contains(target)) {
            controlButtons.forEach((button: HTMLButtonElement) => {
                button.classList.remove("control-buttons-show");
            });
        }
    });
});
