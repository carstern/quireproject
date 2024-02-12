"use strict";
// Define the HTML content for the info box
const content = `<h4>Hey! Welcome to Quire!</h4>
  <p>So now that you are finally here, what can this baby do for you?</p>
  <h4>Create Notes</h4>
  <p>Add notes on the fly with the click of a button. Fill them up with your
  brightest ideas and keep them all handy in one place.</p>
  <h4>Edit & Style</h4>
  <p>You can (incredibly/miraculously) edit your previously created notes, and
  style them with (revolutionizing/groundbreaking) tools like bold or underlined text, or add an unordered list. And that's actually it.</p>
  <h4>Favourite && || Search</h4>
  <p>For all the cavemen out there that just got on the internet, you can mark notes as favourites to
be able to find them easier, and/or use the search function to find specific notes of interest.</p>`;
// When all content on the page has loaded, execute this function
document.addEventListener("DOMContentLoaded", () => {
    const welcomeOverlay = document.createElement("div");
    welcomeOverlay.classList.add("welcome-overlay");
    const welcomeContainer = document.createElement("div");
    welcomeContainer.classList.add("welcome-container");
    const welcomeClose = document.createElement("span");
    welcomeClose.classList.add("welcome-close");
    welcomeClose.innerHTML = "&#x2715;";
    const body = document.querySelector("body");
    if (body) {
        // Check if localStorage item 'welcome' exists and its value is false
        if (localStorage.getItem("welcome") !== "false") {
            // Append content and close button
            welcomeContainer.innerHTML += content;
            welcomeContainer.append(welcomeClose);
            welcomeOverlay.append(welcomeContainer);
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
            // Start the transition with some delay to make it more visible
            setTimeout(() => {
                welcomeContainer.classList.add("welcome-animate");
            }, 500);
        }
    }
});
