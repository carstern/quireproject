function addNotesToFavourites(id: number) {
    // Hämtar den rätta anteckningen baserat på id i savedNotes 
    const savedNotes: { title: string; note: string; date: string, edit: string; id: number, isFavorite: boolean }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const clickedNote = savedNotes.find((note) => note.id === id);

    if (clickedNote) {
        // Toggle isFavorite to the opposite value
        clickedNote.isFavorite = !clickedNote.isFavorite;

        // Sparar och uppdaterar array i localStorage
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

        // Hämta star-button elementet med id
        const button = document.querySelector(`.star-button[data-id="${id}"]`);

        if (button) {
            // Toggle button style based on isFavorite property
            if (clickedNote.isFavorite) {
                button.innerHTML= '<i class="fa-solid fa-star"></i>';
            } else {
                button.innerHTML= '<i class="fa-regular fa-star"></i>';
            }
        } else {
            console.error('Button not found.');
        }
    }
}

//funktion som tar bort anteckingen från localStorage
function deleteNoteFromLocalStorage(id: number) {
    // hämtar rätt anteckning
    const savedNotes: { title: string; note: string; date: string, edit: string; id: number, isFavorite: boolean }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

    // hittar rätt index baserat på anteckningens id
    const deletedNoteIndex = savedNotes.findIndex(note => note.id === id);

    if (deletedNoteIndex !== -1) {
        // raderar rätt anteckning i savedNotes
        const deletedNote = savedNotes.splice(deletedNoteIndex, 1)[0];

        //updaterar savedNotes
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

        // ska radera kortet från DOMen (osäker på att det fungerar som det ska)
        const cardToRemove = document.querySelector(`[data-id="${deletedNote.id}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }
        // sidan laddas om för att visa resultatet
        location.reload();
    }
}

function updateAndSaveNote(updatedTitle: string, updatedNote: string, dateCreated: string, editDate: string, id: number, isFavorite: boolean) {
    const savedNotes: Note[] = getSavedNotes();
    const savedNoteIndex = savedNotes.findIndex(note => note.id === id);

    if (savedNoteIndex !== -1) {
        savedNotes[savedNoteIndex] = { title: updatedTitle, note: updatedNote, date: dateCreated, edit: editDate, id, isFavorite };
        saveNotesToLocalStorage(savedNotes);
        location.reload();
    }
}


//hämtar alla sparade notes
function getSavedNotes(): Note[] {
    const savedNotesString: string | null = localStorage.getItem('savedNotes');
    return savedNotesString ? JSON.parse(savedNotesString) : [];
}

function saveNotesToLocalStorage(notes: Note[]) {
    localStorage.setItem('savedNotes', JSON.stringify(notes));
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

