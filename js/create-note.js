"use strict";
// koppla till main-output-container
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
// anropar funtionen som visar våra sparade anteckningar
window.addEventListener('load', getNotesFromLocalStorage);
createNoteBtn.addEventListener('click', function () {
    createNewNote();
});
function createNewNote() {
    // Hämtar dagen datum - sparar som en string
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-based, so we add 1
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    //anropar funtion som skapar våra knappar
    createButtons();
    //skapar en grundmall för anteckning
    mainOutputContainer.innerHTML += `
    </div>
    <input placeholder="Add your title" id="notesTitle">
    <p> Date created: ${formattedDate} | Last Edited: ${formattedDate} </p>
    <textarea id="noteInput" name="userInput" placeholder="Type your notes here"></textarea>
    <button id="save-note-button">Save</button>`;
    // Hämtar vi vår dynamiskt skapade spara-knapp
    const saveBtn = document.getElementById('save-note-button');
    const createNoteBtn = document.getElementById('new-note-button');
    //försäkrar att knappen finns
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            //kopplar vi tll html element
            const titleInput = document.getElementById('notesTitle');
            const noteTextArea = document.getElementById('noteInput');
            if (titleInput && noteTextArea) {
                //hämtar värdet av titel + anteckning
                const savedTitle = titleInput.value;
                const savedNote = noteTextArea.value;
                // Hämtar vi redan sparaed anteckning || skapar ny array för förstagångsanvändare
                const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
                // lägger till vår nya anteckning - sparas
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate, edit: formattedDate });
                // Sparar till localStorage
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
                //sidan laddas om för att dynamiskt skapa innehåll i nav-output från localStorage
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
    //vår nyskapade createNoteBTn får samma funktionalitet som startsidan
    createNoteBtn.addEventListener('click', function () {
        createNewNote();
    });
}
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById('nav-output-container');
    const mainOutputContainer = document.getElementById('main-output-container');
    if (navOutputContainer && mainOutputContainer) {
        // Retrieve savedNotes from localStorage or initialize to an empty array
        const savedNotesString = localStorage.getItem('savedNotes');
        const savedNotes = savedNotesString ? JSON.parse(savedNotesString) : [];
        console.log('savedNotes:', savedNotes);
        // loopar genom våra anteckningar - skapar kort - med ett indexattribut för att särskilja dem
        savedNotes.forEach((note, index) => {
            // Skip null notes
            if (!note) {
                console.error('Note at index', index, 'is null. Skipping.');
                return;
            }
            console.log('Processing note at index', index, ':', note);
            const card = document.createElement('div');
            card.classList.add('note-card');
            // Set a unique data-index attribute for each card
            card.setAttribute('data-index', index.toString());
            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.note}</p>
                <button class="button star-button" id="star-button" data-index="${index}">⭐</button>
                <button class="button delete-button" id="delete-button" data-index="${index}">❌</button>
            `;
            /**********************
             * Ny kod -start /Eva
             */
            //hämtar dynamiskt skapade knappar
            const starBtn = card.querySelector('#star-button');
            const deleteBtn = card.querySelector('#delete-button');
            //säkerställer att rätt knapp/kort trycks - anropar funktion (se save-delete-btns.ts)
            if (starBtn) {
                starBtn.addEventListener('click', function () {
                    // hämtar index från rätt knapp och kort
                    const dataIndex = starBtn.getAttribute('data-index');
                    const clickedNoteIndex = parseInt(dataIndex || '0', 10);
                    addNotesToFavourites(clickedNoteIndex);
                });
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function () {
                    // hämtar index från rätt knapp och kort
                    const dataIndex = deleteBtn.getAttribute('data-index');
                    const clickedNoteIndex = parseInt(dataIndex || '0', 10);
                    deleteNoteFromLocalStorage(clickedNoteIndex);
                });
            }
            /**********************
             * Ny kod -slut /Eva
             */
            // varje unikt kort får en eventListener
            card.addEventListener('click', function () {
                // undersöker om main-output redan har innehåll (dvs redan visar en befintlig anteckning)
                const existingViewNoteCard = document.getElementById('view-note-card');
                if (existingViewNoteCard) {
                    // raderar isf innehållet från mainoutput
                    mainOutputContainer.removeChild(existingViewNoteCard);
                }
                const dataIndex = card.getAttribute('data-index');
                // Hämtar den specifika anteckningen från vår localStorage
                const clickedNoteIndex = parseInt(dataIndex || '0', 10);
                const clickedNote = savedNotes[clickedNoteIndex];
                //hämtar knappar
                createButtons();
                // Visar vårt innehåll från kortet
                mainOutputContainer.innerHTML += `
                    <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                    <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
                    <textarea id="noteInput" name="userInput" placeholder="Type your notes here">${clickedNote.note}</textarea>
                    <button id="save-note-button">Save</button>`;
                // De dynamiskt skapde knapparna får samma funktionalitet som default-läget
                const createNoteBtn = document.getElementById('new-note-button');
                const saveBtn = mainOutputContainer.querySelector('#save-note-button');
                createNoteBtn.addEventListener('click', function () {
                    createNewNote();
                });
                if (saveBtn) {
                    saveBtn.addEventListener('click', function () {
                        //kopplar till våra html-elemnt
                        const updatedTitleInput = document.getElementById('notesTitle');
                        const updatedNoteTextArea = document.getElementById('noteInput');
                        if (updatedTitleInput && updatedNoteTextArea) {
                            //hämtar dagens datum (KAN GÖRAS OM TILL EN FRISTÅENDE FUNKTION)
                            const currentDate = new Date();
                            const year = currentDate.getFullYear();
                            const month = currentDate.getMonth() + 1;
                            const day = currentDate.getDate();
                            const hours = currentDate.getHours();
                            const minutes = currentDate.getMinutes();
                            // formaterar till en string
                            const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
                            const updatedTitle = updatedTitleInput.value;
                            const updatedNote = updatedNoteTextArea.value;
                            const dateCreated = clickedNote.date;
                            const editdate = formattedDate;
                            // anropar funktionen för att uppdatera och spara vårt innehåll - lägger till last edited
                            updateAndSaveNote(clickedNoteIndex, updatedTitle, updatedNote, dateCreated, editdate);
                            // Call the function to update favNotes if the note exists
                            updateFavNoteIfExists(index, updatedTitle, updatedNote, dateCreated, editdate);
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
function updateAndSaveNote(index, updatedTitle, updatedNote, dateCreated, editDate) {
    // Fetch savedNotes from localStorage or create a new array
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    // Update the card at the specified index
    savedNotes[index] = { title: updatedTitle, note: updatedNote, date: dateCreated, edit: editDate };
    // Save the updated notes to localStorage
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    // Reload the page to reflect the changes
    location.reload();
}
//våra knappar skapas dynamiskt varje gång vårt innehåll ändras i main-output
function createButtons() {
    mainOutputContainer.innerHTML = `
    <button class="more-button" id="more-button">More</button>
    <div class="floating-control-menu" id="floating-control-container">
    <button class="new-note-button" id="new-note-button">New</button>
    <button class="print-button" id="print-button">Print</button>
    <button class="fav-button" id="fav-button">Star</button>
    </div>`;
}
