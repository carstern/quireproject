// Define the HTML content for the info box
const content: string = `<h4>Hey! Welcome to Quire!</h4>
  <p>So now that you are finally here, what can this baby do for you?</p>
  <h4>Create Notes</h4>
  <p>Add notes on the fly with the click of a button. Fill them up with your
  brightest ideas and keep them all handy in one place.</p>
  <p> The note displaying can be printed or added to favorites through the floating menu in the right bottom corner of the screen! </p>
  <h4>Edit & Style</h4>
  <p>You can (incredibly/miraculously) edit your previously created notes, and
  style them with (revolutionizing/groundbreaking) tools like bold or underlined text, or add an unordered list. And that's actually it.</p>
  <p> You can add images! To resize: double-click on the image and press esc to exit the resize mode. All images are also draggable! </p>
  <p> The toolbar for text editing is undockable - HINT: click the ⇆ button! </p>
  <p> (beta) With the markdown toggle button in the toolbar - you can easily switch between markdown language and normal editable text! </p>
  <h4>Favourite && || Search</h4>
  <p>For all the cavemen out there that just got on the internet, you can mark notes as favourites to
be able to find them easier, and/or use the search function to find specific notes of interest.</p>`;

// When all content on the page has loaded, load the welcome-message first time
document.addEventListener("DOMContentLoaded", showWelcomeMessage);

/* Enable the user to reopen the modal when clicking the corresponding
navbar button */
document.querySelector("#welcome-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("welcome", "false");
  showWelcomeMessage();
});

function showWelcomeMessage() {
  const welcomeOverlay: HTMLDivElement = document.createElement("div");
  welcomeOverlay.classList.add("welcome-overlay");

  const welcomeContainer: HTMLDivElement = document.createElement("div");
  welcomeContainer.classList.add("welcome-container");

  const welcomeClose: HTMLSpanElement = document.createElement("span");
  welcomeClose.classList.add("welcome-close");
  welcomeClose.innerHTML = "&#x2715;";

  const body: HTMLBodyElement | null = document.querySelector("body");

  if (body) {
    // Check if localStorage item 'welcome' exists and its value is true
    if (localStorage.getItem("welcome") !== "true") {
      // Set variable to true so welcome-message wont be shown again
      localStorage.setItem("welcome", "true");
      // Append content and close button
      welcomeContainer.innerHTML += content;
      welcomeContainer.append(welcomeClose);
      welcomeOverlay.append(welcomeContainer);
      body.prepend(welcomeOverlay);

      // Modal closable by clicking outside or "X"
      welcomeOverlay.addEventListener("click", () => {
        welcomeContainer.classList.remove("welcome-animate");
        setTimeout(() => welcomeOverlay.remove(), 1000);
      });
      welcomeClose.addEventListener("click", () => {
        welcomeContainer.classList.remove("welcome-animate");
        setTimeout(() => welcomeOverlay.remove(), 1000);
      });

      // Start the transition with some delay to make it more visible
      setTimeout(() => {
        welcomeContainer.classList.add("welcome-animate");
      }, 500);
    }
  }
}
