
const printBtn = document.getElementById('print-button') as HTMLButtonElement;

// Add event listener to the print button
printBtn.addEventListener('click', () => {
printDocument();
});


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
console.log("its working")

    // Implement the functionality to trigger the print action
    window.print();
}

// Get the print button element
 document.getElementById('print-button');

// Check if the print button element exists
if (document.getElementById('print-button')) {
    // Add event listener to trigger printDocument function when the button is clicked
    document.getElementById('print-button')?.addEventListener('click', printDocument);
} else {
    // Log an error if the print button element is not found
    console.error('Print button not found in the DOM');
}




