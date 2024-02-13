// Markdown toggle code

function setupMarkdownToggle() {
  let originalMarkdown = noteInput.innerText;
  let isHtmlView = false;

  document.querySelector("#markdown-button").addEventListener("click", () => {
    if (isHtmlView) {
      // Switch to Markdown view
      noteInput.innerText = originalMarkdown;
    } else {
      // Switch to HTML view
      originalMarkdown = noteInput.innerText;
      noteInput.innerHTML = marked(originalMarkdown, { sanitize: false });
    }
    isHtmlView = !isHtmlView;
  });
}

// Call the function to set up the Markdown toggle
setupMarkdownToggle();
