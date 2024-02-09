// app.js
document.addEventListener('DOMContentLoaded', function () {
    const markdownInput = document.getElementById('markdownInput');
    const mainOutputContainer = document.getElementById('mainOutputContainer');

    if (markdownInput && mainOutputContainer) {
        const renderMarkdown = function () {
            const markdownContent = markdownInput.value;
            mainOutputContainer.innerHTML = marked(markdownContent);
        };

        // Render Markdown automatically when the input changes
        markdownInput.addEventListener('input', renderMarkdown);
    } else {
        console.error('Error: One or more elements not found.');
    }
});
