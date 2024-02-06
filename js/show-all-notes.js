"use strict";
// länka till quire logo för att visa default view
const quireLogo = document.getElementById('quire-logo');
quireLogo.addEventListener('click', function () {
    location.reload();
});
//visa alla anteckningar i mainOutput
const showAllNotesBtn = document.getElementById('all-notes-link');
showAllNotesBtn.addEventListener('click', function (event) {
    event.preventDefault(); // förhindrar att sidan laddas om
    allNotesOverview();
});
function allNotesOverview() {
    // hämtar notes
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    // tömmer main innan resultat visas
    mainOutputContainer.innerHTML = '';
    // loopar genom varje note - skapar kort med funktionella knappar
    savedNotes.forEach(note => {
        const noteDisplayCard = document.createElement("div");
        noteDisplayCard.classList.add("note-card");
        noteDisplayCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.note}</p>
            <button class="button star-button" data-id="${note.id}">⭐</button>
            <button class="button delete-button" data-id="${note.id}">❌</button>`;
        // appendar varje kort
        mainOutputContainer.appendChild(noteDisplayCard);
        // lägger till all funtionalitet - återanvänt från create-note.ts
        const starBtn = noteDisplayCard.querySelector('.star-button');
        const deleteBtn = noteDisplayCard.querySelector('.delete-button');
        if (starBtn) {
            starBtn.addEventListener('click', function () {
                addNotesToFavourites(note.id);
            });
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
                deleteNoteFromLocalStorage(note.id);
            });
        }
        noteDisplayCard.addEventListener('click', function () {
            const clickedNote = getSavedNotes().find((n) => n.id === note.id);
            if (clickedNote) {
                createButtons();
                mainOutputContainer.innerHTML += `
                <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
                <div class="contain-toolbar">
                <div class="keep-height"></div>
                <div class="toolbar" id="toolbar">
                  <button id="bold">B</button>
                  <button id="italic">I</button>
                  <button id="underline">U</button>
                  <button id="unordered-list">UL</button>
                  <button id="ordered-list">OL</button>
                  <select id="header-choice">
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="h4">H4</option>
                    <option value="h5">H5</option>
                    <option value="h6">H6</option>
                  </select>
                  <button id="uploadBtn">Välj fil</button>
                  <span id="fileName"></span>
                  <input type="file" id="fileInput" accept="image/*" style="display: none" />
                  <button id="toggle-toolbar">⇆</button>
                </div>
              </div>
              <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false">${clickedNote.note}</div>
                <button id="save-note-button" data-id="${clickedNote.id}">Save</button>`;
                //hämtar toolbar script
                loadScript('./js/toolbar.js', () => {
                    // Callback function is called when the script is loaded
                    console.log('Script loaded successfully!');
                    // Additional logic or initialization if needed
                });
                loadScript('./js/add-image.js', () => {
                    // Callback function is called when the script is loaded
                    console.log('Script loaded successfully!');
                    // Additional logic or initialization if needed
                });
                const createNoteBtn = document.getElementById('new-note-button');
                const saveBtn = mainOutputContainer.querySelector('#save-note-button');
                createNoteBtn.addEventListener('click', createNewNote);
                if (saveBtn) {
                    saveBtn.addEventListener('click', function () {
                        const updatedTitleInput = document.getElementById('notesTitle');
                        const updatednoteDiv = document.getElementById('noteInput');
                        if (updatedTitleInput && updatednoteDiv) {
                            const currentDate = new Date();
                            const formattedDate = formatDate(currentDate);
                            const updatedTitle = updatedTitleInput.value;
                            const updatedNote = updatednoteDiv.innerHTML;
                            const dateCreated = clickedNote.date;
                            const editDate = formattedDate;
                            updateAndSaveNote(updatedTitle, updatedNote, dateCreated, editDate, clickedNote.id, clickedNote.isFavorite);
                        }
                        else {
                            console.error('Error: updatedTitleInput or updatednoteDiv is null');
                        }
                    });
                }
                else {
                    console.error('Error: saveBtn is null');
                }
            }
        });
        return noteDisplayCard;
    });
}
