"use strict";
// Get the HTML elements
const navOutputContainer = document.getElementById("nav-output-container");
const searchLink = document.getElementById("search-link");
// Global elements
let inputElement;
// Listen for clicks on the 'search' anchor and call the createInput function
searchLink.addEventListener("click", function (e) {
    // Prevent re-load on click
    e.preventDefault();
    // Call create Input function to create the search-field when the anchor is clicked
    createInput();
});
// Function to create input
function createInput() {
    // Clear the output container before anything else
    navOutputContainer.innerHTML = "";
    // Create the input element
    inputElement = document.createElement("input");
    // Assign type
    inputElement.type = "search";
    // Define a placeholder text
    inputElement.placeholder = "search...";
    // Add a class
    inputElement.classList.add("input");
    // Append to the output container
    navOutputContainer.appendChild(inputElement);
    // Listen for user input and store it
    inputElement.addEventListener("input", function () {
        // Store and dynamically update the seach input value
        const userSearchInput = inputElement.value.toLowerCase();
        // Lets us see the input in the console
        console.log(userSearchInput);
        // Call getSavedNotes each time input is changed
        getNotes(userSearchInput);
    });
}
// Fucntion to get the notes and display in output
function getNotes(userSearchInput) {
    // Check if the search input is empty
    if (!userSearchInput.trim()) {
        // Select and remove only the note cards from navOutputContainer
        const noteCards = navOutputContainer.querySelectorAll(".note-card");
        noteCards.forEach((card) => card.remove());
        return; // Exit the function if the search input is empty
    }
    // Select all noteDisplayCards within navOutputContainer
    const noteDisplayCards = document.querySelectorAll("#nav-output-container > div");
    // Clear all previous results every time input is changed
    noteDisplayCards.forEach(function (card) {
        card.remove();
    });
    // Get the notes from local storage, or init an empty array if none
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    // Filter the notes - based on input
    const filteredNotes = savedNotes.filter(function (note) {
        // Try the notes against the input
        return (note.title.toLowerCase().includes(userSearchInput) ||
            note.note.toLowerCase().includes(userSearchInput));
    });
    // Check if user has entered at least one character and filteredNotes is empty
    if (userSearchInput.length >= 1 && filteredNotes.length === 0) {
        // Create a new div for the "No notes found" message
        let noNotesDiv = document.createElement("div");
        noNotesDiv.classList.add("no-notes");
        noNotesDiv.innerHTML = `<p>No notes found</p>`;
        // Append the message div to the navOutputContainer
        navOutputContainer.appendChild(noNotesDiv);
    }
    else {
        // Display the filtered notes
        filteredNotes.forEach((note) => {
            //creates cards
            const card = createNoteCard(note);
            // appends the cards
            navOutputContainer.appendChild(card);
        });
    }
}
