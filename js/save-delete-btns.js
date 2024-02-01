"use strict";
function addNotesToFavourites(id) {
    // Hämtar den rätta anteckningen baserat på id i savedNotes 
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const clickedNote = savedNotes.find((note) => note.id === id);
    if (clickedNote) {
        // Toggle isFavorite to the opposite value
        clickedNote.isFavorite = !clickedNote.isFavorite;
        // sparar och uppdaterar array i localStorage
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    }
}
//funktion som tar bort anteckingen från localStorage
function deleteNoteFromLocalStorage(id) {
    // hämtar rätt anteckning
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
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
function updateAndSaveNote(updatedTitle, updatedNote, dateCreated, editDate, id, isFavorite) {
    const savedNotes = getSavedNotes();
    const savedNoteIndex = savedNotes.findIndex(note => note.id === id);
    if (savedNoteIndex !== -1) {
        savedNotes[savedNoteIndex] = { title: updatedTitle, note: updatedNote, date: dateCreated, edit: editDate, id, isFavorite };
        saveNotesToLocalStorage(savedNotes);
        location.reload();
    }
}
//hämtar alla sparade notes
function getSavedNotes() {
    const savedNotesString = localStorage.getItem('savedNotes');
    return savedNotesString ? JSON.parse(savedNotesString) : [];
}
function saveNotesToLocalStorage(notes) {
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
