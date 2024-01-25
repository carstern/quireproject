"use strict";
// koppla till main-output-container
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
function createNewNote() {
    // Create a new Date object
    const today = new Date();
    // Get the current date components
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-based, so we add 1
    const day = today.getDate();
    // Format the date as a string (e.g., "YYYY-MM-DD")
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    createButtons();
    mainOutputContainer.innerHTML += `
    </div>
    <input placeholder="Add your title" id="notesTitle">
    <p> Date created: ${formattedDate} </p>
    <textarea id="noteInput" name="userInput" placeholder="Type your notes here"></textarea>
    <button id="save-note-button">Save</button>`;
    // Get the dynamically created saveBtn element
    const saveBtn = document.getElementById('save-note-button');
    const createNoteBtn = document.getElementById('new-note-button');
    if (saveBtn) {
        // Attach event listener to the dynamically created saveBtn
        saveBtn.addEventListener('click', function () {
            const titleInput = document.getElementById('notesTitle');
            const noteTextArea = document.getElementById('noteInput');
            if (titleInput && noteTextArea) {
                const savedTitle = titleInput.value;
                const savedNote = noteTextArea.value;
                // Retrieve existing notes from localStorage or initialize an empty array
                const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
                // Add the new note to the array
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate });
                // Save the updated array back to localStorage
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
                location.reload();
            }
            else {
                console.error('Error: titleInput or noteTextArea is null');
            }
        });
    }
    else {
        console.error('Error: saveBtn is null');
    }
    createNoteBtn.addEventListener('click', function () {
        createNewNote();
    });
}
createNoteBtn.addEventListener('click', function () {
    createNewNote();
});
// Function to perform actions on window load
function onWindowLoad() {
    const navOutputContainer = document.getElementById('nav-output-container');
    const mainOutputContainer = document.getElementById('main-output-container');
    if (navOutputContainer && mainOutputContainer) {
        // Retrieve savedNotes from localStorage
        const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
        // Iterate over the savedNotes array and create cards
        savedNotes.forEach((note, index) => {
            const card = document.createElement('div');
            card.classList.add('note-card'); // You can add a class for styling if needed
            // Add a unique identifier to each note-card
            card.setAttribute('data-index', index.toString());
            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.note}</p>
                <button class="button star-button">⭐</button>
                <button class="button delete-button">❌</button>
            `;
            // Add a click event listener to each note-card
            card.addEventListener('click', function () {
                // Check if mainOutputContainer has the child with ID 'view-note-card'
                const existingViewNoteCard = document.getElementById('view-note-card');
                if (existingViewNoteCard) {
                    // Remove the existing viewNoteCard
                    mainOutputContainer.removeChild(existingViewNoteCard);
                }
                const dataIndex = card.getAttribute('data-index');
                console.log('Note-card clicked! Index:', dataIndex);
                // Retrieve the clicked note from savedNotes
                const clickedNoteIndex = parseInt(dataIndex || '0', 10);
                const clickedNote = savedNotes[clickedNoteIndex];
                // Create and append the new viewNoteCard
                // const viewNoteCard: HTMLDivElement = document.createElement('div');
                // viewNoteCard.id = 'view-note-card'; // Add an id for easier reference
                createButtons();
                // Update the viewNoteCard with the clicked note
                mainOutputContainer.innerHTML += `
                    <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                    <p> Date created: ${clickedNote.date} </p>
                    <textarea id="noteInput" name="userInput" placeholder="Type your notes here">${clickedNote.note}</textarea>
                    <button id="save-note-button">Save</button>`;
                // mainOutputContainer.appendChild(viewNoteCard);
                // Get the dynamically created saveBtn element within viewNoteCard
                const saveBtn = mainOutputContainer.querySelector('#save-note-button');
                const createNoteBtn = document.getElementById('new-note-button');
                createNoteBtn.addEventListener('click', function () {
                    createNewNote();
                });
                if (saveBtn) {
                    // Attach event listener to the dynamically created saveBtn
                    saveBtn.addEventListener('click', function () {
                        const updatedTitleInput = document.getElementById('notesTitle');
                        const updatedNoteTextArea = document.getElementById('noteInput');
                        if (updatedTitleInput && updatedNoteTextArea) {
                            const updatedTitle = updatedTitleInput.value;
                            const updatedNote = updatedNoteTextArea.value;
                            const dateCreated = clickedNote.date;
                            // Call the function to update and save the edited note
                            updateAndSaveNote(clickedNoteIndex, updatedTitle, updatedNote, dateCreated);
                        }
                        else {
                            console.error('Error: updatedTitleInput or updatedNoteTextArea is null');
                        }
                    });
                }
                else {
                    console.error('Error: saveBtn is null');
                }
            });
            navOutputContainer.appendChild(card);
        });
    }
    else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}
// Call the function on window load
window.addEventListener('load', onWindowLoad);
// Assuming you have a Save button event listener
const saveBtn = document.getElementById('save-note-button');
if (saveBtn) {
    saveBtn.addEventListener('click', function () {
        // Save the note or perform other actions
        onWindowLoad();
    });
}
//update saved note
function updateAndSaveNote(index, updatedTitle, updatedNote, dateCreated) {
    // Retrieve existing notes from localStorage or initialize an empty array
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    // Update the note at the specified index
    savedNotes[index] = { title: updatedTitle, note: updatedNote, date: dateCreated };
    // Save the updated array back to localStorage
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    // Reload the window or update the UI as needed
    location.reload();
}
function createButtons() {
    mainOutputContainer.innerHTML = `
    <button class="more-button" id="more-button">More</button>
    <div class="floating-control-menu" id="floating-control-container">
    <button class="new-note-button" id="new-note-button">New</button>
    <button class="print-button" id="print-button">Print</button>
    <button class="fav-button" id="fav-button">Star</button>
    </div>`;
}
