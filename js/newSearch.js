"use strict";
// Get the HTML elements
const navOutputContainer = document.getElementById("nav-output-container");
const searchLink = document.getElementById("search-link");
// Global elements
let inputElement;
let userSearchInput;
// Get the notes from local storage, or init an empty array
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
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
        userSearchInput = inputElement.value.toLowerCase();
        // Lets us see the input in the console
        console.log(userSearchInput);
        // Call getSavedNotes each time input is changed
        getNotes();
    });
}
// Fucntion to get the notes and display in output
function getNotes() {
    // Trim before and after whitespace from input
    const trimmedSearchInput = userSearchInput.trim();
    // Clear all noteDisplayCards if search input is empty
    if (trimmedSearchInput === "") {
        navOutputContainer.innerHTML = "";
        return;
    }
    // Select all noteDisplayCards within navOutputContainer
    const noteDisplayCards = document.querySelectorAll("#nav-output-container > div");
    // Clear all previous results every time input is changed
    noteDisplayCards.forEach(function (card) {
        card.remove();
    });
    // Get the notes from local storage, or init an empty array if none
    const LSNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    // // Display all notes (just check that the function works)
    // LSNotes.forEach(function(note) {
    //     const noteDisplayP = document.createElement('p');
    //     noteDisplayP.innerHTML = `${note.title}, ${note.note}`;
    //     navOutputContainer.appendChild(noteDisplayP);
    // })
    // Filter the notes
    const filteredNotes = LSNotes.filter(function (note) {
        // Try the notes against the input
        return (note.title.toLowerCase().includes(userSearchInput) ||
            note.note.toLowerCase().includes(userSearchInput));
    });
    // Display the filtered notes
    filteredNotes.forEach(function (note) {
        // Create a container card div for each result
        const noteDisplayCard = document.createElement("div");
        // Create a P for each note
        const displayNoteP = document.createElement("p");
        // Define the content to display
        displayNoteP.innerHTML = `${note.title}, ${note.note}`;
        // Append
        noteDisplayCard.appendChild(displayNoteP);
        navOutputContainer.appendChild(noteDisplayCard);
    });
}
