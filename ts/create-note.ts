//skapar en typ för att slippa skriva egenskaperna varje gång
type Note = {
    title: string;
    note: string;
    date: string;
    edit: string;
    id: number;
    isFavorite: boolean;
};

//hämtar HTML element
const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement;
const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

//hämtar sparade notes när sidan laddas
window.addEventListener('load', getNotesFromLocalStorage); 

createNoteBtn.addEventListener('click', createNewNote);

function createNewNote() {
    const today: Date = new Date();
    const formattedDate: string = formatDate(today);
    const uniqueId: number = today.getTime();
    
    createButtons(); //skapar knappar

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

    loadScript('./js/toolbar.js', () => {
        console.log('Script loaded successfully!');
      });

    loadScript('./js/add-image.js', () => {
        console.log('Script loaded successfully!');
    });

    const savedNotes: Note[] = getSavedNotes();
    savedNotes.push({ title: '', note: '', date: formattedDate, edit: formattedDate, id: uniqueId, isFavorite: false });
    saveNotesToLocalStorage(savedNotes);
    getNotesFromLocalStorage();

    const noteDiv = document.getElementById('noteInput') as HTMLDivElement | null;
    const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;
    if (noteDiv && titleInput) {
        noteDiv.addEventListener('input', function(){
            dynamicSave(uniqueId, formattedDate);
        });
        titleInput.addEventListener('input', function(){
            dynamicSave(uniqueId, formattedDate);
        })
    } else {
        console.error('Error: noteDiv or titleInput is null');
    }
}


//hämtar notes from localStorage - placerar i navOutput - uppdateras dynamiskt tack vare dynamicSave();
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById('nav-output-container') as HTMLDivElement | null;
    const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement | null;

    if (navOutputContainer && mainOutputContainer) {
        navOutputContainer.innerHTML = '';
        const savedNotes: Note[] = getSavedNotes();
        //skapar ett kort/ note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }

            const card = createNoteCard(note);
            navOutputContainer.appendChild(card);
        });
    } else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}

//skapar kort - ger id / attribut / knappar med funktioner baserat på id
function createNoteCard(note: Note): HTMLDivElement {
    const card: HTMLDivElement = document.createElement('div');
    card.classList.add('note-card');
    card.setAttribute('data-id', note.id.toString());

    // Limit the note length
    const limitedNote: string = limitNoteLength(note.note);

    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${limitedNote}</p> 
        <button class="button star-button" data-id="${note.id}">⭐</button>
        <button class="button delete-button" data-id="${note.id}">❌</button>`;


    const starBtn = card.querySelector('.star-button') as HTMLButtonElement;
    const deleteBtn = card.querySelector('.delete-button') as HTMLButtonElement;

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
        const existingViewNoteCard = document.getElementById('view-note-card') as HTMLDivElement | null;

        if (existingViewNoteCard) {
            mainOutputContainer.removeChild(existingViewNoteCard);
        }

        const clickedNote = getSavedNotes().find((n) => n.id === note.id);

        if (clickedNote) {
            //read view
            createButtons();
            mainOutputContainer.innerHTML += `
                <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
              <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false">${clickedNote.note}</div>`;

            const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

            createNoteBtn.addEventListener('click', createNewNote);
            const noteDiv = document.getElementById('noteInput') as HTMLDivElement | null;
            const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;

            //edit mode
            if (noteDiv){
                noteDiv.addEventListener('click', function(event){
                    // Pass the event object to getToolbar
                    getToolbar(clickedNote, event);
                })
            }
            if (titleInput){
                titleInput.addEventListener('click', function(event){
                    // Pass the event object to getToolbar
                    getToolbar(clickedNote, event);
                })
            }

            if (noteDiv && titleInput) {
                noteDiv.addEventListener('input', function(){
                    dynamicSave(clickedNote.id, clickedNote.edit);
                });
                titleInput.addEventListener('input', function(){
                    dynamicSave(clickedNote.id, clickedNote.edit);
                })
            } else {
                console.error('Error: noteDiv is null');
            }
        }
    });

    return card;
}

//formaterar datum
function formatDate(date: Date): string {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

// Function to load a script dynamically
function loadScript(scriptSrc: string, callback: () => void): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.onload = callback;
  
    // Append the script to the document
    document.head.appendChild(script);
  }

  
  function getToolbar(clickedNote: Note, event: MouseEvent) {
    const today: Date = new Date();
    clickedNote.edit = formatDate(today)
    createButtons();
    mainOutputContainer.innerHTML += `
        <input id="notesTitle" value="${clickedNote.title}">
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

    const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

    createNoteBtn.addEventListener('click', createNewNote);

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
    const noteDiv = document.getElementById('noteInput') as HTMLDivElement | null;
    
    const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;

    if (noteDiv && titleInput) {
        noteDiv.addEventListener('input', function(){
            dynamicSave(clickedNote.id, clickedNote.edit);
        });
        titleInput.addEventListener('input', function(){
            dynamicSave(clickedNote.id, clickedNote.edit);
        })
    } else {
        console.error('Error: noteDiv is null');
    }

        // Get the target element that triggered the click event
        const targetElement = event.target as HTMLElement;

        // Check if the target element is noteDiv or titleInput
        if (targetElement.id === 'noteInput') {
            // If it's noteDiv, focus on it and set the caret at the end
            const noteDiv = document.getElementById('noteInput') as HTMLDivElement;
            if (noteDiv) {
                noteDiv.focus();
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(noteDiv);
                range.collapse(false); // Set to end of text
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        } else if (targetElement.id === 'notesTitle') {
            // If it's titleInput, focus on it and set the caret at the end
            const titleInput = document.getElementById('notesTitle') as HTMLInputElement;
            if (titleInput) {
                titleInput.focus();
                const length = titleInput.value.length;
                titleInput.setSelectionRange(length, length);
            }
        }
    
  }