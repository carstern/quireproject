function dynamicSave(uniqueId: number) {
    const noteDiv = document.getElementById('noteInput') as HTMLDivElement;
    const titleInput = document.getElementById('notesTitle') as HTMLInputElement | null;
    const updatedNote: string = noteDiv.innerHTML;

    if (titleInput) {
        const updatedTitle: string = titleInput.value;
        const savedNotes: Note[] = getSavedNotes();
        // om ingenting hittas blir currentNoteIndex === -1
        const currentNoteIndex: number = savedNotes.findIndex(note => note.id === uniqueId); 

        if (currentNoteIndex !== -1) {
            savedNotes[currentNoteIndex].note = updatedNote;
            savedNotes[currentNoteIndex].title = updatedTitle;
            saveNotesToLocalStorage(savedNotes);
            getNotesFromLocalStorage();
        } else {
            console.error('Error: Note with id ' + uniqueId + ' not found');
        }
    } else {
        console.error('Error: titleInput is null');
    }
}