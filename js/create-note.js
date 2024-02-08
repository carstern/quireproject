"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//hämtar HTML element
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
//hämtar sparade notes när sidan laddas
window.addEventListener('load', getNotesFromLocalStorage);
createNoteBtn.addEventListener('click', createNewNote);
function createNewNote() {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const formattedDate = formatDate(today);
        const uniqueId = today.getTime();
        createButtons(); // Create buttons
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
        </div>`;
        try {
            yield Promise.all([
                loadScript('./js/toolbar.js', () => {
                    console.log('Toolbar script loaded successfully!');
                }),
                loadScript('./js/add-image.js', () => {
                    console.log('Add image script loaded successfully!');
                })
            ]);
            console.log('All scripts loaded successfully!');
            const savedNotes = getSavedNotes();
            savedNotes.push({ title: '', note: '', date: formattedDate, edit: formattedDate, id: uniqueId, isFavorite: false });
            saveNotesToLocalStorage(savedNotes);
            getNotesFromLocalStorage();
            const noteDiv = document.getElementById('noteInput');
            const titleInput = document.getElementById('notesTitle');
            if (noteDiv && titleInput) {
                noteDiv.addEventListener('input', function () {
                    dynamicSave(uniqueId);
                });
                titleInput.addEventListener('input', function () {
                    dynamicSave(uniqueId);
                });
            }
            else {
                console.error('Error: noteDiv or titleInput is null');
            }
        }
        catch (error) {
            console.error('Error loading scripts:', error);
        }
    });
}
//hämtar notes from localStorage - placerar i navOutput - uppdateras dynamiskt tack vare dynamicSave();
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById('nav-output-container');
    const mainOutputContainer = document.getElementById('main-output-container');
    if (navOutputContainer && mainOutputContainer) {
        navOutputContainer.innerHTML = '';
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
    // Limit the note length
    const limitedNote = limitNoteLength(note.note);
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${limitedNote}</p> 
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
        // checkExistingScripts();
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
              <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false">${clickedNote.note}</div>`;
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
            // const saveBtn = mainOutputContainer.querySelector('#save-note-button') as HTMLButtonElement | null;
            createNoteBtn.addEventListener('click', createNewNote);
            //ersätt saveButton med dynamicSave
            const savedNotes = getSavedNotes();
            const noteDiv = document.getElementById('noteInput');
            const titleInput = document.getElementById('notesTitle');
            if (noteDiv && titleInput) {
                noteDiv.addEventListener('input', function () {
                    dynamicSave(clickedNote.id);
                });
                titleInput.addEventListener('input', function () {
                    dynamicSave(clickedNote.id);
                });
            }
            else {
                console.error('Error: noteDiv is null');
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
    var _a;
    const existingScripts = document.body.querySelectorAll(`script[src="${scriptSrc}"]`);
    const existingShowAllNotesScript = document.body.querySelector('script[src="./js/show-all-notes.js"]');
    if (existingScripts.length > 0) {
        // Remove existing scripts with the same source
        existingScripts.forEach(script => {
            var _a;
            (_a = script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
        });
    }
    if (existingShowAllNotesScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.onload = callback;
        // script.defer = true;
        // Insert the script after the existing show-all-notes.js script
        (_a = existingShowAllNotesScript.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(script, existingShowAllNotesScript.nextSibling);
    }
    else {
        console.error('Error: show-all-notes.js script not found.');
    }
}
