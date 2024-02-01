  const noteDiv = document.querySelector(".note-div");
  const toolbar = document.querySelector("#toolbar");

  const boldButton = document.querySelector("#bold");
  const italicButton = document.querySelector("#italic");
  const underlineButton = document.querySelector("#underline");
  const ULButton = document.querySelector("#unordered-list");
  const OLButton = document.querySelector("#ordered-list");
  const toggleToolbar = document.querySelector("#toggle-toolbar");

document.addEventListener("selectionchange", () => {
  if (toggleToolbar.classList.contains("pressed")) updatePosition();
});
noteDiv.addEventListener("mouseup", () => {
  if (toggleToolbar.classList.contains("pressed")) updatePosition();
});

function updatePosition() {
  let selection = window.getSelection();

  if (selection.toString().length > 0) {
    toolbar.style.display = "flex";
  } else toolbar.style.display = "none";

  let range = selection.getRangeAt(0);
  let selectionRect = range.getBoundingClientRect();
  let toolbarRect = toolbar.getBoundingClientRect();
  let centerX =
    selectionRect.left + selectionRect.width / 2 - toolbar.offsetWidth / 2;

  toolbar.style.top =
    selectionRect.top + window.scrollY - toolbar.offsetHeight - 10 + "px";

  if (centerX + window.scrollX < -9) toolbar.style.left = "-7px";
  else if (centerX + toolbarRect.width > window.innerWidth - 10) {
    toolbar.style.left = window.innerWidth - toolbar.offsetWidth - 10 + "px";
  } else toolbar.style.left = centerX + window.scrollX + "px";
}

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
const headerChoice = document.querySelector("#header-choice");

headerChoice.addEventListener("change", () => {
  const selectedHeading = headerChoice.value;
  document.execCommand("formatBlock", false, selectedHeading);
});

toggleToolbar.addEventListener("click", () => {
  updatePosition();
  toggleToolbar.classList.toggle("pressed");
  toolbar.classList.toggle("absolute");
});


