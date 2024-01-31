// koppla till main-output-container
const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement;
const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

// anropar funtionen som visar våra sparade anteckningar
window.addEventListener('load', getNotesFromLocalStorage);

createNoteBtn.addEventListener('click', function () {
    createNewNote();
});

function createNewNote() {
    // hämtar datum
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; 
    const day: number = today.getDate();
    const formattedDate: string = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    // generar ett unikt id baserat på timestap
    const uniqueId: number = today.getTime();

    // knappar skapas
    createButtons();

    // skapar grundmall för anteckningen
    mainOutputContainer.innerHTML += `
    </div>
    <input placeholder="Add your title" id="notesTitle">
    <p> Date created: ${formattedDate} | Last Edited: ${formattedDate} </p>
    <textarea id="noteInput" name="userInput" placeholder="Type your notes here"></textarea>
    <button id="save-note-button">Save</button>`;

    // hämtar våra dynamiskt skapade knapppar
    const saveBtn: HTMLButtonElement | null = document.getElementById('save-note-button') as HTMLButtonElement | null;
    const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

    // säkerställer att knappen finns
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            // hämtar inputs
            const titleInput: HTMLInputElement | null = document.getElementById('notesTitle') as HTMLInputElement | null;
            const noteTextArea: HTMLTextAreaElement | null = document.getElementById('noteInput') as HTMLTextAreaElement | null;

            if (titleInput && noteTextArea) {
                // hämtar dess värden
                const savedTitle: string = titleInput.value;
                const savedNote: string = noteTextArea.value;

                // hämtar sparade anteckningar || skapar ny för förstagångsanvändare
                const savedNotes: { title: string; note: string; date: string, edit: string, id: number }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

                // lägger till anteckningen med fem properties + sparar
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate, edit: formattedDate, id: uniqueId });
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

                // laddar om sidan
                location.reload();
            } else {
                console.error('Error: titleInput or noteTextArea is null');
            }
        });
    } else {
        console.error('Error: saveBtn is null');
    }

    // den nyskapade knappen får samma funktionalitet som på default-sidan
    createNoteBtn.addEventListener('click', function () {
        createNewNote();
    });

}
function getNotesFromLocalStorage() {
    const navOutputContainer: HTMLDivElement | null = document.getElementById('nav-output-container') as HTMLDivElement | null;
    const mainOutputContainer: HTMLDivElement | null = document.getElementById('main-output-container') as HTMLDivElement | null;

    if (navOutputContainer && mainOutputContainer) {
        // hämtar savedNotes || skapar ny array för förstagångsanvändare
        const savedNotesString: string | null = localStorage.getItem('savedNotes');
        const savedNotes: { title: string; note: string; date: string, edit: string, id: number }[] = savedNotesString ? JSON.parse(savedNotesString) : [];

       // loopar igenom alla - skapar kort - tillger unikt id
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }

            const card: HTMLDivElement = document.createElement('div');
            card.classList.add('note-card');

            // fer varje kort ett unikt attribut baserat på dess id
            card.setAttribute('data-id', note.id.toString());

            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.note}</p>
                <button class="button star-button" data-id="${note.id}">⭐</button>
                <button class="button delete-button" data-id="${note.id}">❌</button>
            `;

            //hämtar nya knappar
            const starBtn = card.querySelector('.star-button') as HTMLButtonElement;
            const deleteBtn = card.querySelector('.delete-button') as HTMLButtonElement;

            if (starBtn) {
                starBtn.addEventListener('click', function () {
                    // hämtar rätt knapp baserat på id
                    const dataId = starBtn.getAttribute('data-id');
                    const clickedNoteId = parseInt(dataId || '0', 10);
                    //anropar för att spara som favo
                    addNotesToFavourites(clickedNoteId);
                });
            }

            if (deleteBtn) {
                deleteBtn.addEventListener('click', function () {
                    // hämtar rätt knapp baserat på id
                    const dataId = deleteBtn.getAttribute('data-id');
                    const clickedNoteId = parseInt(dataId || '0', 10);
                    //anropar för att radera 
                    deleteNoteFromLocalStorage(clickedNoteId);
                });
            }

            // unikt event för varje kort
            card.addEventListener('click', function () {
                // undersöker att mainOutput inte redan visar en note
                const existingViewNoteCard: HTMLDivElement | null = document.getElementById('view-note-card') as HTMLDivElement | null;
                if (existingViewNoteCard) {
                    // tar bort den om det stämmer
                    mainOutputContainer.removeChild(existingViewNoteCard);
                }
                //hämtar attribut/id
                const dataId = card.getAttribute('data-id');

                // hämtar den specifika anteckningen baserat på id
                const clickedNote = savedNotes.find((note) => note.id === parseInt(dataId || '0', 10));

                if (clickedNote) {
                    createButtons();

                    // visar anteckningens innehåll
                    mainOutputContainer.innerHTML += `
                        <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                        <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
                        <textarea id="noteInput" name="userInput" placeholder="Type your notes here">${clickedNote.note}</textarea>
                        <button id="save-note-button" data-id="${clickedNote.id}">Save</button>`;
                    
                    // de dynamiskt skapade knapparna får samma funktioner som i default läget
                    const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;
                    const saveBtn: HTMLButtonElement | null = mainOutputContainer.querySelector('#save-note-button') as HTMLButtonElement | null;

                    createNoteBtn.addEventListener('click', function () {
                        createNewNote();
                    });

                    if (saveBtn) {
                        saveBtn.addEventListener('click', function () {
                            // hämtar element
                            const updatedTitleInput: HTMLInputElement | null = document.getElementById('notesTitle') as HTMLInputElement | null;
                            const updatedNoteTextArea: HTMLTextAreaElement | null = document.getElementById('noteInput') as HTMLTextAreaElement | null;

                            if (updatedTitleInput && updatedNoteTextArea) {
                                //hämtar datum
                                const currentDate: Date = new Date();
                                const year: number = currentDate.getFullYear();
                                const month: number = currentDate.getMonth() + 1;
                                const day: number = currentDate.getDate();
                                const hours: number = currentDate.getHours();
                                const minutes: number = currentDate.getMinutes();

                                // formatterar till string
                                const formattedDate: string = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

                                const updatedTitle: string = updatedTitleInput.value;
                                const updatedNote: string = updatedNoteTextArea.value;
                                const dateCreated: string = clickedNote.date;
                                const editdate: string = formattedDate;

                                // anropar funktion för att uppdatera allt innehåll + last edited
                                updateAndSaveNote( updatedTitle, updatedNote, dateCreated, editdate, clickedNote.id);

                                // samma funktion fast för favNotes
                                updateFavNoteIfExists( updatedTitle, updatedNote, dateCreated, editdate, clickedNote.id);
                            } else {
                                console.error('Error: updatedTitleInput or updatedNoteTextArea is null');
                            }
                        });
                    } else {
                        console.error('Error: saveBtn is null');
                    }
                }
            });
            // alla kort läggs till i navOutput
            navOutputContainer.appendChild(card);
        });
    } else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}



function updateAndSaveNote( updatedTitle: string, updatedNote: string, dateCreated: string, editDate: string, id: number) {
    // hämtar notes
    const savedNotes: { title: string; note: string; date: string, edit: string; id: number }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

    // hitta dess index baserat på dess id
    const savedNoteIndex = savedNotes.findIndex(note => note.id === id);

    if (savedNoteIndex !== -1) {
        // uppdaterar innehållet - sparar till laocalStorage
        savedNotes[savedNoteIndex] = { title: updatedTitle, note: updatedNote, date: dateCreated, edit: editDate, id };
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

        // uppdaterar favNotes om den är sparad där
        updateFavNoteIfExists(updatedTitle, updatedNote, dateCreated, editDate, id);

        // laddar om sidan
        location.reload();
    }
}


//våra knappar skapas dynamiskt varje gång vårt innehåll ändras i main-output
function createButtons (){
    mainOutputContainer.innerHTML = `
    <button class="more-button" id="more-button">More</button>
    <div class="floating-control-menu" id="floating-control-container">
    <button class="new-note-button" id="new-note-button">New</button>
    <button class="print-button" id="print-button">Print</button>
    <button class="fav-button" id="fav-button">Star</button>
    </div>`
}

