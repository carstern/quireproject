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

//hämtar sparade notes när sidan laddas - visas i NavOutput
window.addEventListener('load', getNotesFromLocalStorage); 

createNoteBtn.addEventListener('click', createNewNote);//får sin funktionalitet

function createNewNote() {
    //hämtar datum för created och edit
    const today: Date = new Date();
    const formattedDate: string = formatDate(today);
    const uniqueId: number = today.getTime();
    
    //grundmallen skapas
    createButtons(); //skapar knappar floating menu control
    /*
    const printBtn = document.getElementById('print-button') as HTMLButtonElement;

    // Add event listener to the print button
printBtn.addEventListener('click', () => {
    printDocument();
});

// Function to print the document
function printDocument() {
    // Use window.print() to initiate the print dialog
    window.print();
    
} */
    

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

    //hämtar script med funktionalitet för textredigering och bildhantering
    loadScript('./js/toolbar.js', () => {
        console.log('Script loaded successfully!');
      });

    loadScript('./js/add-image.js', () => {
        console.log('Script loaded successfully!');
    });

    loadScript('./js/print.js', () => {
        console.log('Script loaded successfully!');
    });

    //skapar en tom note - visas i nav med getNotesFromLocalStorage();
    const savedNotes: Note[] = getSavedNotes();
    savedNotes.push({ title: '', note: '', date: formattedDate, edit: formattedDate, id: uniqueId, isFavorite: false });
    saveNotesToLocalStorage(savedNotes);
    getNotesFromLocalStorage();

    //dynamiskt skapade element hämtas
    const noteDiv = document.getElementById('noteInput') as HTMLDivElement | null;
    const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;
    const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

    createNoteBtn.addEventListener('click', createNewNote);//får sin funktionalitet
    //får eventListeners för dynamicSave();
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
        //rensar innehåll först
        navOutputContainer.innerHTML = '';
        const savedNotes: Note[] = getSavedNotes();
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
    } else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}

//skapar kort - ger id / attribut / knappar med funktioner baserat på id
function createNoteCard(note: Note): HTMLDivElement {
    const card: HTMLDivElement = document.createElement('div');
    card.classList.add('note-card');
    //kortets attribut === id
    card.setAttribute('data-id', note.id.toString());

    // begränsar antal tecken (över 30)
    const limitedNote: string = limitNoteLength(note.note);

    //kortet får innehåll - knapparna får unikt id
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${limitedNote}</p> 
        <button class="button star-button" data-id="${note.id}">⭐</button>
        <button class="button delete-button" data-id="${note.id}">❌</button>`;


    const starBtn = card.querySelector('.star-button') as HTMLButtonElement;
    const deleteBtn = card.querySelector('.delete-button') as HTMLButtonElement;

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
        const existingViewNoteCard = document.getElementById('view-note-card') as HTMLDivElement | null;

        // - tar bort befintligt kort som visas
        if (existingViewNoteCard) {
            mainOutputContainer.removeChild(existingViewNoteCard);
        }

        //hittar rätt kort baserat på id
        const clickedNote = getSavedNotes().find((n) => n.id === note.id);

        if (clickedNote) {
            //Skapar vår vy för VIEW MODE
            createButtons();

            loadScript('./js/print.js', () => {
                console.log('Script loaded successfully!');
            });
        

            mainOutputContainer.innerHTML += `
                <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
              <div class="note-div" id="noteInput" contenteditable="true" spellcheck="false">${clickedNote.note}</div>`;

            //hämtar element - ger funktionalitet
            const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;
            createNoteBtn.addEventListener('click', createNewNote);
            const noteDiv = document.getElementById('noteInput') as HTMLDivElement | null;
            const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;

            //Tooglar till EDIT MODE när inputs klickas
            if (noteDiv){
                noteDiv.addEventListener('click', function(event){
                    // Pass the event object to editMode
                    editMode(clickedNote, event);
                })
            }
            if (titleInput){
                titleInput.addEventListener('click', function(event){
                    // Pass the event object to editMode
                    editMode(clickedNote, event);
                })
            }

            //uppdaterar innehåll med dynamicSave();
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

  function editMode(clickedNote: Note, event: MouseEvent) {
    //hämtar nytt datum för last edited
    const today: Date = new Date();
    clickedNote.edit = formatDate(today)
    //skapar editMode-mall (med uppdaterad last edited)
    createButtons();

    loadScript('./js/print.js', () => {
        console.log('Script loaded successfully!');
    });

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
    const noteDiv = document.getElementById('noteInput') as HTMLDivElement | null;
    const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;
    createNoteBtn.addEventListener('click', createNewNote);

    //hämtar toolbar script
    loadScript('./js/toolbar.js', () => {
        console.log('Script loaded successfully!');
    });

    loadScript('./js/add-image.js', () => {
    console.log('Script loaded successfully!');
    });

    // uppdaterar innehåll med dynamicSave();
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

        // hämtar elementet som först klickades på som target
        const targetElement = event.target as HTMLElement;

        // undersöker vilket element det var
        if (targetElement.id === 'noteInput') {
            // placerar vår 'text cursor' i slutet av texten för edit
            const noteDiv = document.getElementById('noteInput') as HTMLDivElement;
            if (noteDiv) {
                noteDiv.focus();
                //måste göra en createRange (iom DivElement)
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(noteDiv);
                range.collapse(false); // placerar 'text cursor' sist
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        } else if (targetElement.id === 'notesTitle') {
            // placerar vår 'caret' i slutet av texten för edit
            const titleInput = document.getElementById('notesTitle') as HTMLInputElement;
            if (titleInput) {
                titleInput.focus();
                const length = titleInput.value.length;
                //setSelectionReange fungerar på InputElement (inte DIV)
                titleInput.setSelectionRange(length, length);
            }
        }
    
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

// Funktion för att ladda scripts som inte är hårdkodade i index.html
function loadScript(scriptSrc: string, callback: () => void): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.onload = callback;
  
    // placerar scriptet i head (index.html)
    document.head.appendChild(script);
  }

  