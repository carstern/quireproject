"use strict";
function dynamicSave(uniqueId, editDate) {
    const noteDiv = document.getElementById('noteInput');
    const titleInput = document.getElementById('notesTitle');
    const updatedNote = noteDiv.innerHTML;
    if (titleInput) {
        const updatedTitle = titleInput.value;
        const savedNotes = getSavedNotes();
        // om ingenting hittas blir currentNoteIndex === -1
        const currentNoteIndex = savedNotes.findIndex(note => note.id === uniqueId);
        if (currentNoteIndex !== -1) {
            savedNotes[currentNoteIndex].note = updatedNote;
            savedNotes[currentNoteIndex].title = updatedTitle;
            savedNotes[currentNoteIndex].edit = editDate;
            saveNotesToLocalStorage(savedNotes);
            getNotesFromLocalStorage();
        }
        else {
            console.error('Error: Note with id ' + uniqueId + ' not found');
        }
    }
    else {
        console.error('Error: titleInput is null');
    }
}
