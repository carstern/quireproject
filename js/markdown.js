"use strict";
function setupMarkdownToggle() {
    const noteInput = document.getElementById("noteInput");
    const markdownButton = document.getElementById("markdown-button");
    let isHtmlView = false;
    markdownButton.addEventListener("click", () => {
        let content = noteInput.innerHTML;
        const showdownConverter = new showdown.Converter();
        showdown.setOption("simpleLineBreaks", "true");
        content = removeDivs(content);
        if (isHtmlView) {
            // Switch to Markdown view
            noteInput.innerHTML = showdownConverter.makeMarkdown(content);
        }
        else {
            // Switch to HTML view
            noteInput.innerHTML = showdownConverter.makeHtml(content);
        }
        isHtmlView = !isHtmlView;
    });
}
// We use es2016 compiler so replaceAll is not available
function removeDivs(noteContent) {
    while (noteContent.includes("<div>"))
        noteContent = noteContent.replace("<div>", "");
    while (noteContent.includes("</div>"))
        noteContent = noteContent.replace("</div>", "");
    return noteContent;
}
// Call the function to set up the Markdown toggle
setupMarkdownToggle();
