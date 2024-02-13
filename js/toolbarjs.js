/* Call update position when selection changes, and on mouseup inside,
but only if toolbar is undocked (undock button has class "pressed") */
document.addEventListener("selectionchange", () => {
  if (document.querySelector("#toggle-toolbar").classList.contains("pressed"))
    updatePosition();
});
document.querySelector(".note-div").addEventListener("mouseup", () => {
  const toggleToolbar = document.querySelector("#toggle-toolbar");

  if (toggleToolbar.classList.contains("pressed")) updatePosition();
});

/* Handles position calculation of undocked toolbar and prevents it 
from leaving the screen on smaller screens */
function updatePosition() {
  const toolbar = document.querySelector("#toolbar");
  const noteDiv = document.querySelector(".note-div");

  // Fetch users selection
  let selection = window.getSelection();
  /* Show undocked toolbar when selection is at least one character long, 
  and is actually inside the note div */
  if (selection.toString().length > 0) {
    // Check if the selection is inside the note div
    if (noteDiv.contains(selection.getRangeAt(0).commonAncestorContainer)) {
      toolbar.style.display = "flex";
    } else toolbar.style.display = "none";
  } else toolbar.style.display = "none";

  /* Get range of selection and extract its positional information as well as
  of the toolbar. Calculate coordinates where middle of the selection would be */
  let range = selection.getRangeAt(0);
  let selectionRect = range.getBoundingClientRect();
  let toolbarRect = toolbar.getBoundingClientRect();
  let centerX =
    selectionRect.left + selectionRect.width / 2 - toolbar.offsetWidth / 2;
  // Set Y position of toolbar
  toolbar.style.top =
    selectionRect.top + window.scrollY - toolbar.offsetHeight - 2 + "px";

  /* Set X position of toolbar. Make sure it can never go outside of 
  screen to the left nor the right */
  if (centerX + window.scrollX < -9) toolbar.style.left = "-7px";
  else if (centerX + toolbarRect.width > window.innerWidth - 10) {
    toolbar.style.left = window.innerWidth - toolbar.offsetWidth - 10 + "px";
  } else toolbar.style.left = centerX + window.scrollX + "px";
}
// Text edit functions, self-explanatory
document.querySelector("#bold").addEventListener("click", () => {
  document.execCommand("bold", false, null);
});
document.querySelector("#italic").addEventListener("click", () => {
  document.execCommand("italic", false, null);
});
document.querySelector("#underline").addEventListener("click", () => {
  document.execCommand("underline", false, null);
});
document.querySelector("#unordered-list").addEventListener("click", () => {
  document.execCommand("insertUnorderedList", false, null);
});
document.querySelector("#ordered-list").addEventListener("click", () => {
  document.execCommand("insertOrderedList", false, null);
});
document.querySelector("#header-choice").addEventListener("change", () => {
  document.execCommand(
    "formatBlock",
    false,
    document.querySelector("#header-choice").value
  );
});

// Toolbar dock/undock toggle button
document.querySelector("#toggle-toolbar").addEventListener("click", () => {
  updatePosition();
  document.querySelector("#toggle-toolbar").classList.toggle("pressed");
  document.querySelector("#toolbar").classList.toggle("absolute");
});
