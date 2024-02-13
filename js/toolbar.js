"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
/* Call update position when selection changes, and on mouseup inside,
but only if toolbar is undocked (undock button has class "pressed") */
document.addEventListener("selectionchange", () => {
    const toggleToolbar = document.querySelector("#toggle-toolbar");
    if (toggleToolbar.classList.contains("pressed")) {
        updatePosition();
    }
});
(_a = document.querySelector(".note-div")) === null || _a === void 0 ? void 0 : _a.addEventListener("mouseup", () => {
    const toggleToolbar = document.querySelector("#toggle-toolbar");
    if (toggleToolbar.classList.contains("pressed")) {
        updatePosition();
    }
});
/* Handles position calculation of undocked toolbar and prevents it
from leaving the screen on smaller screens */
function updatePosition() {
    const toolbar = document.querySelector("#toolbar");
    const noteDiv = document.querySelector("#noteInput");
    // Fetch users selection
    let selection = window.getSelection();
    /* Show undocked toolbar when selection is at least one character
    long, and is actually inside the note div */
    if (selection.toString().length > 0) {
        // Check if the selection is inside the note div
        if (noteDiv.contains(selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0).commonAncestorContainer)) {
            toolbar.style.display = "flex";
        }
        else {
            toolbar.style.display = "none";
        }
    }
    else {
        toolbar.style.display = "none";
    }
    /* Get range of selection and extract its positional information as
    well as of the toolbar. Calculate coordinates where middle of the
    selection would be */
    let range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
    let selectionRect = range === null || range === void 0 ? void 0 : range.getBoundingClientRect();
    let toolbarRect = toolbar === null || toolbar === void 0 ? void 0 : toolbar.getBoundingClientRect();
    let centerX = (selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.left) + (selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.width) / 2 - (toolbarRect === null || toolbarRect === void 0 ? void 0 : toolbarRect.width) / 2;
    // Set Y position of toolbar
    toolbar.style.top =
        (selectionRect === null || selectionRect === void 0 ? void 0 : selectionRect.top) + window.scrollY - (toolbarRect === null || toolbarRect === void 0 ? void 0 : toolbarRect.height) - 2 + "px";
    /* Set X position of toolbar. Make sure it can never go outside of
    screen to the left nor the right */
    if (centerX + window.scrollX < -9) {
        toolbar.style.left = "-7px";
    }
    else if (centerX + toolbarRect.width > window.innerWidth - 10) {
        toolbar.style.left = window.innerWidth - toolbarRect.width - 10 + "px";
    }
    else {
        toolbar.style.left = centerX + window.scrollX + "px";
    }
}
// Text edit functions, self-explanatory
(_b = document.querySelector("#bold")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    document.execCommand("bold", false, undefined);
});
(_c = document.querySelector("#italic")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    document.execCommand("italic", false, undefined);
});
(_d = document.querySelector("#underline")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    document.execCommand("underline", false, undefined);
});
(_e = document.querySelector("#unordered-list")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    document.execCommand("insertUnorderedList", false, undefined);
});
(_f = document.querySelector("#ordered-list")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    document.execCommand("insertOrderedList", false, undefined);
});
(_g = document.querySelector("#header-choice")) === null || _g === void 0 ? void 0 : _g.addEventListener("change", () => {
    document.execCommand("formatBlock", false, document.querySelector("#header-choice").value);
});
// Toolbar dock/undock toggle button
(_h = document.querySelector("#toggle-toolbar")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
    updatePosition();
    const toggleToolbar = document.querySelector("#toggle-toolbar");
    toggleToolbar === null || toggleToolbar === void 0 ? void 0 : toggleToolbar.classList.toggle("pressed");
    const toolbar = document.querySelector("#toolbar");
    toolbar === null || toolbar === void 0 ? void 0 : toolbar.classList.toggle("absolute");
});
