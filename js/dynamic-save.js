"use strict";
//tar inte id och editDate som parametrar för att dynamiskt uppdatera efter varje enskild input
function dynamicSave(uniqueId, editDate) {
    const noteDiv = document.getElementById('noteInput');
    const titleInput = document.getElementById('notesTitle');
    if (titleInput) {
        const updatedNote = noteDiv.innerHTML;
        const updatedTitle = titleInput.value;
        const savedNotes = getSavedNotes();
        // hämtar rätt index genom att söka efter unikt id
        // om ingenting hittas blir currentNoteIndex === -1
        const currentNoteIndex = savedNotes.findIndex(note => note.id === uniqueId);
        // om noten hittas
        if (currentNoteIndex !== -1) {
            //uppdaterar rätt note med [currentNoteIndex]
            savedNotes[currentNoteIndex].note = updatedNote;
            savedNotes[currentNoteIndex].title = updatedTitle;
            savedNotes[currentNoteIndex].edit = editDate;
            //sparar med varje input 
            saveNotesToLocalStorage(savedNotes);
            //uppdaterar navOutput med varje input
            getNotesFromLocalStorage();
            //om den inte hittas
        }
        else {
            console.error('Error: Note with id ' + uniqueId + ' not found');
        }
    }
    else {
        console.error('Error: titleInput is null');
    }
}
