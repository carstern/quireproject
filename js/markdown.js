"use strict";
function setupMarkdownToggle() {
    const noteInput = document.querySelector("#noteInput");
    const markdownButton = document.querySelector("#markdown-button");
    let isHtmlView = false;
    markdownButton.addEventListener("click", () => {
        let content = noteInput.innerHTML;
        // Instance of html <-> markdown converter
        const showdownConverter = new showdown.Converter();
        showdown.setOption("simpleLineBreaks", "true");
        // Clean HTML from excess inner divs
        content = removeDivs(content);
        // Check what mode is currently set and convert to correct output
        if (isHtmlView) {
            // Switch to Markdown view
            noteInput.innerHTML = showdownConverter.makeMarkdown(content);
            markdownButton.textContent = "MD";
            markdownButton.style.width = "30px";
        }
        else {
            // Switch to HTML view
            noteInput.innerHTML = showdownConverter.makeHtml(content);
            markdownButton.textContent = "HTML";
            markdownButton.style.width = "42px";
        }
        isHtmlView = !isHtmlView;
    });
}
/* We use es2016 compiler so replaceAll is not available. Removes a
host of unwanted characters and adds some linebreaks */
function removeDivs(noteContent) {
    while (noteContent.includes("<div>"))
        noteContent = noteContent.replace("<div>", "");
    while (noteContent.includes("</div>"))
        noteContent = noteContent.replace("</div>", "<br>");
    while (noteContent.includes("\\*"))
        noteContent = noteContent.replace("\\*", "");
    return noteContent;
}
// Call the function to set up the Markdown toggle
setupMarkdownToggle();
