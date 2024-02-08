//tar inte id och editDate som parametrar för att dynamiskt uppdatera efter varje enskild input
function dynamicSave(uniqueId: number, editDate: string) {
    const noteDiv = document.getElementById('noteInput') as HTMLDivElement;
    const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;

    if (titleInput) {
        const updatedNote = noteDiv.innerHTML;
        const updatedTitle: string = titleInput.value;
        const savedNotes: Note[] = getSavedNotes();

        // hämtar rätt index genom att söka efter unikt id
        // om ingenting hittas blir currentNoteIndex === -1
        const currentNoteIndex: number = savedNotes.findIndex(note => note.id === uniqueId); 

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
        } else {
            console.error('Error: Note with id ' + uniqueId + ' not found');
        }
    } else {
        console.error('Error: titleInput is null');
    }
}