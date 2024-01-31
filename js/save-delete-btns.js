"use strict";
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
        const cardToRemove = document.querySelector(`[data-index="${deletedNoteIndex}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }
        // hämtar favNotes
        const favNotes = JSON.parse(localStorage.getItem('favNotes') || '[]');
        // filterar ut antckningen baserat på id - uppdaterar favNotes
        const updatedFavNotes = favNotes.filter(note => note.id !== id);
        localStorage.setItem('favNotes', JSON.stringify(updatedFavNotes));
        // sidan laddas om för att visa resultatet
        location.reload();
    }
}
function addNotesToFavourites(id) {
    // hämtar vår favNotes array från localStorage || skapar en ny för förstagångsanvändare
    const favNotes = JSON.parse(localStorage.getItem('favNotes') || '[]');
    // Hämtar den rätta anteckningen baserat på id i savedNotes 
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const clickedNote = savedNotes.find((note) => note.id === id); // sparar till clickedNote
    if (clickedNote) {
        // undersöker om den redan finns i favoriter
        const isAlreadyFavourite = favNotes.some((note, i) => {
            if (note.id === clickedNote.id) { // <-- använder id som jämförelse
                // tar bort if true
                favNotes.splice(i, 1);
                // sparar och uppdaterar array i localStorage
                localStorage.setItem('favNotes', JSON.stringify(favNotes));
                return true;
            }
            return false;
        });
        if (!isAlreadyFavourite) {
            // lägger till i favNotes om den inte redan finns
            favNotes.push({ title: clickedNote.title, note: clickedNote.note, date: clickedNote.date, edit: clickedNote.edit, id: clickedNote.id });
            // sparar till localStorage
            localStorage.setItem('favNotes', JSON.stringify(favNotes));
        }
    }
}
// undersöker om antckningen som ska uppdateras redan finns i favNotes - uppdaterar därefter
function updateFavNoteIfExists(updatedTitle, updatedNoteText, dateCreated, editDate, id) {
    const favNotes = JSON.parse(localStorage.getItem('favNotes') || '[]');
    // hittar rätt note efter id
    const index = favNotes.findIndex(note => note.id === id);
    if (index !== -1) {
        // om den finns - uppdateras innehållet i rätt index
        favNotes[index] = { title: updatedTitle, note: updatedNoteText, date: dateCreated, edit: editDate, id };
        // sparar till localStorage
        localStorage.setItem('favNotes', JSON.stringify(favNotes));
    }
}
