document.addEventListener("DOMContentLoaded", () => {
  const welcome_overlay = document.createElement("div");
  welcome_overlay.classList.add("welcome-overlay");
  const welcome_container = document.createElement("div");
  welcome_container.classList.add("welcome-container");
  const body = document.querySelector("body") as HTMLBodyElement;

  if (!localStorage.getItem("welcome")) {
    const content =
      "<h4>Hey!</h4><p>This is some random text that will eventually keep some valueable text.</p>";

    welcome_container.innerHTML += content;

    welcome_overlay.append(welcome_container);
    body.prepend(welcome_overlay);

    localStorage.setItem("welcome", "");

    setTimeout(() => {
      welcome_container.classList.add("animate");
    }, 500);
  } else {
    welcome_overlay.remove();
  }
});
