"use strict";
// Get the HTML elements
const navOutputContainer = document.getElementById("nav-output-container");
const searchLink = document.getElementById("search-link");
// Global elements
let inputElement;
let userSearchInput;
let noteDisplayCard;
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
    // Select all noteDisplayCards within navOutputContainer
    const noteDisplayCards = document.querySelectorAll("#nav-output-container > div");
    // Clear all previous results every time input is changed
    noteDisplayCards.forEach(function (card) {
        card.remove();
    });
    // Get the notes from local storage, or init an empty array if none
    const LSNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    // Filter the notes
    const filteredNotes = LSNotes.filter(function (note) {
        // Try the notes against the input
        return (note.title.toLowerCase().includes(userSearchInput) ||
            note.note.toLowerCase().includes(userSearchInput));
    });
    // Display the filtered notes
    filteredNotes.forEach(function (note, index) {
        // Create a container card div for each result
        noteDisplayCard = document.createElement("div");
        // Define the content to display
        noteDisplayCard.classList.add("note-card");
        // We set an attribute to present the notes
        noteDisplayCard.setAttribute("note-index", index.toString());
        noteDisplayCard.innerHTML = `
                    <h3>${note.title}</h3>
                    <p>${note.note}</p>
                    <button class="button star-button">⭐</button>
                    <button class="button delete-button">❌</button>
                `;
        // Append
        navOutputContainer.appendChild(noteDisplayCard);
        // We get out attribute
        const noteIndex = noteDisplayCard.getAttribute("note-index");
        // We make our eventlistner viable to click on the result note
        noteDisplayCard.addEventListener("click", function () {
            // find the index (OBS detta genererar fel index då den tar från localstorage)
            const clickedIndex = parseInt(noteIndex || '0', 10);
            const clickedResultNote = filteredNotes[clickedIndex];
            // Showcase the whole notes as it is
            mainOutputContainer.innerHTML = `
      <input placeholder="Add your title" id="notesTitle" value="${clickedResultNote.title}">
      <p> Date created: ${clickedResultNote.date} | Last Edited: ${clickedResultNote.edit}</p>
      <textarea id="noteInput" name="userInput" placeholder="Type your notes here">${clickedResultNote.note}</textarea>
      `;
            // OBS! Tog bort save knappen, för att det inte ska se ut som att man ska göra förändringar i detta läget med tanke på att i framtiden ska sparas automatiskt när du skriver i antecknigen.
        });
    });
}
//   const quireLogo = document.getElementById('quire-logo');
//   quireLogo.addEventListener('click', function(){
//     location.reload();
//   })
