"use strict";
var _a;
// Define a function to handle the print action
function printDocument() {
    const printStyles = `
@media print {
    body, #floating-control-menu, .contain-toolbar, button {
        visibility: hidden;
    }
    #main-output-container {
        visibility: visible;
        position: absolute;
    }
    #notesTitle {
        border: none;
    }
}
`;
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.textContent = printStyles;
    // Append the style element to the head of the document
    document.head.appendChild(styleElement);
    console.log("its working");
    // Implement the functionality to trigger the print action
    window.print();
}
// Get the print button element
document.getElementById('print-button');
// Check if the print button element exists
if (document.getElementById('print-button')) {
    // Add event listener to trigger printDocument function when the button is clicked
    (_a = document.getElementById('print-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', printDocument);
}
else {
    // Log an error if the print button element is not found
    console.error('Print button not found in the DOM');
}
