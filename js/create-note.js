"use strict";
//hämtar HTML element
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
//hämtar sparade notes när sidan laddas - visas i NavOutput
window.addEventListener('load', getNotesFromLocalStorage);
document.addEventListener("DOMContentLoaded", () => {
    createNoteBtn.addEventListener('click', createNewNote); //får sin funktionalitet
});
function createNewNote() {
    //hämtar datum för created och edit
    const today = new Date();
    const formattedDate = formatDate(today);
    const uniqueId = today.getTime();
    //grundmallen skapas
    // createButtons(); //skapar knappar floating menu control
    if (document.getElementById('template')) {
        const template = document.getElementById('template');
        mainOutputContainer.removeChild(template);
    }
    mainOutputContainer.innerHTML += `
        <div id="template">
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
    //hämtar script med funktionalitet för textredigering och bildhantering
    loadScript('./js/toolbar.js', () => {
        console.log('Script loaded successfully!');
    });
    loadScript('./js/add-image.js', () => {
        console.log('Script loaded successfully!');
    });
    //skapar en tom note - visas i nav med getNotesFromLocalStorage();
    const savedNotes = getSavedNotes();
    savedNotes.push({ title: '', note: '', date: formattedDate, edit: formattedDate, id: uniqueId, isFavorite: false });
    saveNotesToLocalStorage(savedNotes);
    getNotesFromLocalStorage();
    //dynamiskt skapade element hämtas
    const noteDiv = document.getElementById('noteInput');
    const titleInput = document.getElementById('notesTitle');
    // const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;
    // createNoteBtn.addEventListener('click', createNewNote);//får sin funktionalitet
    //får eventListeners för dynamicSave();
    if (noteDiv && titleInput) {
        noteDiv.addEventListener('input', function () {
            dynamicSave(uniqueId, formattedDate);
        });
        titleInput.addEventListener('input', function () {
            dynamicSave(uniqueId, formattedDate);
        });
    }
    else {
        console.error('Error: noteDiv or titleInput is null');
    }
}
//hämtar notes from localStorage - placerar i navOutput - uppdateras dynamiskt tack vare dynamicSave();
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById('nav-output-container');
    const mainOutputContainer = document.getElementById('main-output-container');
    if (navOutputContainer && mainOutputContainer) {
        //rensar innehåll först
        navOutputContainer.innerHTML = '';
        const savedNotes = getSavedNotes();
        //skapar ett kort för varje Note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }
            //nytt kort skapas - appendas till navOutput
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
    //kortets attribut === id
    card.setAttribute('data-id', note.id.toString());
    // begränsar antal tecken (över 30)
    const limitedNote = limitNoteLength(note.note);
    //kortet får innehåll - knapparna får unikt id
    card.innerHTML = `
        <div class= card-content>
        <h3>${note.title}</h3><br>
        <p>${limitedNote}</p> 
        </div>
        <div class="button-div">
        <button class="star-button ${note.isFavorite ? 'is-favorite' : ''}" data-id="${note.id}">
        ${note.isFavorite ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>'}
        </button>
        <button class="delete-button" data-id="${note.id}"><i class="fa-solid fa-x"></i></button>
        </div>`;
    const starBtn = card.querySelector('.star-button');
    const deleteBtn = card.querySelector('.delete-button');
    //gör knapparna funktionella - anropar functions onclick baserat på id
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
    // varje kort som klickas visas i mainOutput
    card.addEventListener('click', function () {
        if (document.getElementById('template')) {
            const template = document.getElementById('template');
            mainOutputContainer.removeChild(template);
        }
        //placera i if (window.innerWidth < 768) - mobilvy
        if (window.innerWidth < 760) {
            const navContainer = document.getElementById("nav-container");
            navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
            navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
            const moreBtn = document.getElementById("more-button");
        }
        if (window.innerWidth > 760 && window.innerWidth < 1020) {
            navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
        }
        if (document.getElementById('template')) {
            const template = document.getElementById('template');
            mainOutputContainer.removeChild(template);
        }
        const existingViewNoteCard = document.getElementById('view-note-card');
        // - tar bort befintligt kort som visas
        if (existingViewNoteCard) {
            mainOutputContainer.removeChild(existingViewNoteCard);
        }
        //hittar rätt kort baserat på id
        const clickedNote = getSavedNotes().find((n) => n.id === note.id);
        if (clickedNote) {
            //Skapar vår vy för VIEW MODE
            // createButtons();
            if (document.getElementById('template')) {
                const template = document.getElementById('template');
                mainOutputContainer.removeChild(template);
            }
            mainOutputContainer.innerHTML += `
                <div id="template"><input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
              <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false">${clickedNote.note}</div></div>`;
            //hämtar element - ger funktionalitet
            // const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;
            // createNoteBtn.addEventListener('click', createNewNote);
            const noteDiv = document.getElementById('noteInput');
            const titleInput = document.getElementById('notesTitle');
            //Tooglar till EDIT MODE när inputs klickas
            if (noteDiv) {
                noteDiv.addEventListener('click', function (event) {
                    // Pass the event object to editMode
                    editMode(clickedNote, event);
                });
            }
            if (titleInput) {
                titleInput.addEventListener('click', function (event) {
                    // Pass the event object to editMode
                    editMode(clickedNote, event);
                });
            }
            //uppdaterar innehåll med dynamicSave();
            if (noteDiv && titleInput) {
                noteDiv.addEventListener('input', function () {
                    dynamicSave(clickedNote.id, clickedNote.edit);
                });
                titleInput.addEventListener('input', function () {
                    dynamicSave(clickedNote.id, clickedNote.edit);
                });
            }
            else {
                console.error('Error: noteDiv is null');
            }
        }
    });
    return card;
}
function editMode(clickedNote, event) {
    //hämtar nytt datum för last edited
    const today = new Date();
    clickedNote.edit = formatDate(today);
    //skapar editMode-mall (med uppdaterad last edited)
    // createButtons();
    if (document.getElementById('template')) {
        const template = document.getElementById('template');
        mainOutputContainer.removeChild(template);
    }
    mainOutputContainer.innerHTML += `
        <div id="template"><input id="notesTitle" value="${clickedNote.title}">
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
    <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false">${clickedNote.note}</div></div>`;
    // const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;
    const noteDiv = document.getElementById('noteInput');
    const titleInput = document.getElementById('notesTitle');
    // createNoteBtn.addEventListener('click', createNewNote);
    //hämtar toolbar script
    loadScript('./js/toolbar.js', () => {
        console.log('Script loaded successfully!');
    });
    loadScript('./js/add-image.js', () => {
        console.log('Script loaded successfully!');
    });
    // uppdaterar innehåll med dynamicSave();
    if (noteDiv && titleInput) {
        noteDiv.addEventListener('input', function () {
            dynamicSave(clickedNote.id, clickedNote.edit);
        });
        titleInput.addEventListener('input', function () {
            dynamicSave(clickedNote.id, clickedNote.edit);
        });
    }
    else {
        console.error('Error: noteDiv is null');
    }
    // hämtar elementet som först klickades på som target
    const targetElement = event.target;
    // undersöker vilket element det var
    if (targetElement.id === 'noteInput') {
        // placerar vår 'text cursor' i slutet av texten för edit
        const noteDiv = document.getElementById('noteInput');
        if (noteDiv) {
            noteDiv.focus();
            //måste göra en createRange (iom DivElement)
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(noteDiv);
            range.collapse(false); // placerar 'text cursor' sist
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
    }
    else if (targetElement.id === 'notesTitle') {
        // placerar vår 'caret' i slutet av texten för edit
        const titleInput = document.getElementById('notesTitle');
        if (titleInput) {
            titleInput.focus();
            const length = titleInput.value.length;
            //setSelectionReange fungerar på InputElement (inte DIV)
            titleInput.setSelectionRange(length, length);
        }
    }
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
// Funktion för att ladda scripts som inte är hårdkodade i index.html
function loadScript(scriptSrc, callback) {
    var _a;
    // undersöker om srciptet redan finns
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingScript) {
        //om sant - tar bort det innan det läggs till igen
        (_a = existingScript.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(existingScript);
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.onload = callback;
    // placerar scriptet i <head>
    document.head.appendChild(script);
}
