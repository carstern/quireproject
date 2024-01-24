// Insert html content for first-time-info-box here
const content =
  "<h4>Hey!</h4><p>This is some random text that will eventually keep some valueable text.</p>";

// When all content on the page has loaded, do all the stuff
document.addEventListener("DOMContentLoaded", () => {
  const welcomeOverlay = document.createElement("div");
  welcomeOverlay.classList.add("welcome-overlay");
  const welcomeContainer = document.createElement("div");
  welcomeContainer.classList.add("welcome-container");
  const welcomeClose = document.createElement("span");
  welcomeClose.classList.add("welcome-close");
  welcomeClose.innerHTML = "&#x2715;";

  const body = document.querySelector("body") as HTMLBodyElement;

  /* If welcome variable does not already exist, append everything 
  and show the info-modal to the user */
  if (!localStorage.getItem("welcome")) {
    welcomeContainer.innerHTML += content;
    welcomeContainer.append(welcomeClose);
    welcomeOverlay.append(welcomeContainer);
    // Append it to the beginning of body
    body.prepend(welcomeOverlay);

    // Modal closable by clicking outside or "X"
    welcomeOverlay.addEventListener("click", () => {
      welcomeContainer.classList.remove("welcome-animate");
      setTimeout(() => welcomeOverlay.remove(), 1200);
    });
    welcomeClose.addEventListener("click", () => {
      welcomeContainer.classList.remove("welcome-animate");
      setTimeout(() => welcomeOverlay.remove(), 1200);
    });

    // Add the localstorage variable so info-box can't show again
    localStorage.setItem("welcome", "true");

    // Start the transition with some delay to make it more visible
    setTimeout(() => {
      welcomeContainer.classList.add("welcome-animate");
    }, 500);
  }
});
