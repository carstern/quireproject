const moreBtn = document.getElementById("more-button") as HTMLButtonElement;

moreBtn.addEventListener("click", function () {
  const navContainer = document.getElementById("nav-container");
  navContainer?.classList.toggle("nav-container-show");
});

const floatingControlMenu = document.getElementById(
  "floating-control-container"
) as HTMLDivElement;
const controlButtons = document.querySelectorAll(
  ".control-button"
) as NodeListOf<HTMLButtonElement>;
floatingControlMenu?.addEventListener("click", function () {
  controlButtons.forEach((button: HTMLButtonElement) => {
    button.classList.toggle("control-buttons-show");
  });
});

// Att lägga till click på body för att stänga floating control menu

