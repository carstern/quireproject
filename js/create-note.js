"use strict";
//hämtar HTML element
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
//hämtar sparade notes när sidan laddas
window.addEventListener('load', getNotesFromLocalStorage);
createNoteBtn.addEventListener('click', createNewNote);
function createNewNote() {
    const today = new Date();
    //anropar fuktion för att hämta datum
    const formattedDate = formatDate(today);
    const uniqueId = today.getTime();
    createButtons(); //skapar knappar
    //skapar grundmall
    mainOutputContainer.innerHTML += `
        <div>
            <input placeholder="Add your title" id="notesTitle">
            <p> Date created: ${formattedDate} | Last Edited: ${formattedDate} </p>
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
          <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false"></div>
            <button id="save-note-button">Save</button>
        </div>`;
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
    //hämar spara-knapp
    const saveBtn = document.getElementById('save-note-button');
    const noteDiv = document.getElementById('noteInput');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            //hämtar element och dess värden
            const titleInput = document.getElementById('notesTitle');
            const noteDiv = document.getElementById('noteInput');
            if (titleInput && noteDiv) {
                const savedTitle = titleInput.value;
                const savedNote = noteDiv.innerHTML;
                //skapar en note - pushar till savedNotes -sparar
                const savedNotes = getSavedNotes();
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate, edit: formattedDate, id: uniqueId, isFavorite: false });
                saveNotesToLocalStorage(savedNotes);
                location.reload();
            }
            else {
                console.error('Error: titleInput or noteDiv is null');
            }
        });
    }
    else {
        console.error('Error: saveBtn is null');
    }
    //gör skapa-knappen funktionell
    createNoteBtn.addEventListener('click', createNewNote);
}
//hämtar notes from localStorage - placerar i navOutput
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById('nav-output-container');
    const mainOutputContainer = document.getElementById('main-output-container');
    if (navOutputContainer && mainOutputContainer) {
        const savedNotes = getSavedNotes();
        //skapar ett kort/ note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }
            const card = createNoteCard(note);
            navOutputContainer.appendChild(card);
        });
    }
    else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}
//skapar kort - ger id / attribut / knappar med funktioner baserat på id
function createNoteCard(note) {
    const card = document.createElement('div');
    card.classList.add('note-card');
    card.setAttribute('data-id', note.id.toString());
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.note}</p>
        <button class="button star-button" data-id="${note.id}">⭐</button>
        <button class="button delete-button" data-id="${note.id}">❌</button>`;
    const starBtn = card.querySelector('.star-button');
    const deleteBtn = card.querySelector('.delete-button');
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
    // varje kort som klickas visas i mainOutput - tar bort befintligt kort som visas
    card.addEventListener('click', function () {
        const existingViewNoteCard = document.getElementById('view-note-card');
        if (existingViewNoteCard) {
            mainOutputContainer.removeChild(existingViewNoteCard);
        }
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
    return card;
}
//formaterar datum
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
// Function to load a script dynamically
function loadScript(scriptSrc, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.onload = callback;
    // Append the script to the document
    document.head.appendChild(script);
}