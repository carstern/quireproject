// app.js
document.addEventListener('DOMContentLoaded', function () {
    const mainOutputContainer = document.getElementById('mainOutputContainer');

    if (mainOutputContainer) {
        const exportAsMarkdown = function () {
            const markdownContent = mainOutputContainer.innerText;
            const blob = new Blob([markdownContent], { type: 'text/markdown' });
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'exported_note.md';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        // Optional: Uncomment the following line to enable export on keydown
        // document.addEventListener('keydown', exportAsMarkdown);

        // Example: Enable export when user navigates away (comment out if not needed)
        window.addEventListener('beforeunload', exportAsMarkdown);
    } else {
        console.error('Error: mainOutputContainer not found.');
    }
});
