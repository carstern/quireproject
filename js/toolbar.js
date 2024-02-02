// Connect to all relevant html
const noteDiv = document.querySelector(".note-div");
const toolbar = document.querySelector("#toolbar");

const boldButton = document.querySelector("#bold");
const italicButton = document.querySelector("#italic");
const underlineButton = document.querySelector("#underline");
const ULButton = document.querySelector("#unordered-list");
const OLButton = document.querySelector("#ordered-list");
const headerChoice = document.querySelector("#header-choice");
const toggleToolbar = document.querySelector("#toggle-toolbar");

/* Call update position when selection changes, and on mouseup inside,
but only if toolbar is undocked (undock button has class "pressed") */
document.addEventListener("selectionchange", () => {
  if (toggleToolbar.classList.contains("pressed")) updatePosition();
});
noteDiv.addEventListener("mouseup", () => {
  if (toggleToolbar.classList.contains("pressed")) updatePosition();
});

/* Handles position calculation of undocked toolbar and prevents it 
from leaving the screen on smaller screens */
function updatePosition() {
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

  /* Set X-coordinate of toolbar. Make sure it can never go outside of 
  screen to the left nor the right */
  if (centerX + window.scrollX < -9) toolbar.style.left = "-7px";
  else if (centerX + toolbarRect.width > window.innerWidth - 10) {
    toolbar.style.left = window.innerWidth - toolbar.offsetWidth - 10 + "px";
  } else toolbar.style.left = centerX + window.scrollX + "px";
}
// Text edit functions, self-explanatory
boldButton.addEventListener("click", () => {
  document.execCommand("bold", false, null);
});
italicButton.addEventListener("click", () => {
  document.execCommand("italic", false, null);
});
underlineButton.addEventListener("click", () => {
  document.execCommand("underline", false, null);
});
ULButton.addEventListener("click", () => {
  document.execCommand("insertUnorderedList", false, null);
});
OLButton.addEventListener("click", () => {
  document.execCommand("insertOrderedList", false, null);
});
headerChoice.addEventListener("change", () => {
  document.execCommand("formatBlock", false, headerChoice.value);
});

// Toolbar dock/undock toggle button
toggleToolbar.addEventListener("click", () => {
  updatePosition();
  toggleToolbar.classList.toggle("pressed");
  toolbar.classList.toggle("absolute");
});