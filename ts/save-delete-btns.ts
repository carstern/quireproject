// Function to delete a note from localStorage
function deleteNoteFromLocalStorage(index: number) {
    // Fetch saved notes from localStorage or create a new array
    const savedNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

    // Remove the selected note based on the index
    const deletedNote = savedNotes.splice(index, 1)[0];

    // Save the updated notes to localStorage
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

    // Remove the deleted card directly from the DOM
    const cardToRemove = document.querySelector(`[data-index="${index}"]`);
    if (cardToRemove) {
        cardToRemove.remove();
    }

    // Fetch favNotes from localStorage or create a new array
    const favNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('favNotes') || '[]');

    // Filter out the deleted note from favNotes
    const updatedFavNotes = favNotes.filter(note => {
        return note.title !== deletedNote.title || note.note !== deletedNote.note;
    });

    // Save the updated favNotes to localStorage
    localStorage.setItem('favNotes', JSON.stringify(updatedFavNotes));

    // Reload the page to reflect the changes
    location.reload();
}


// Funktion som lägger till/tar bort antckningen till favNotes-array
function addNotesToFavourites(index: number) {
    // hämtar vår favNotes array från localStorage || skapar en ny för förstagångsanvändare
    const favNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('favNotes') || '[]');

    // Hämtar den rätta anteckningen baserat på index i savedNotes 
    const savedNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    const clickedNote = savedNotes[index]; //sparar till clickedNote

    // undersöker om den redan finns i favoriter
    const isAlreadyFavourite = favNotes.some((note, i) => {
        if (note.title === clickedNote.title && note.note === clickedNote.note) {
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
        favNotes.push(clickedNote);

        // sparar till localStorage
        localStorage.setItem('favNotes', JSON.stringify(favNotes));
    }
}

// Function to check if a note is in favNotes and update its content
function updateFavNoteIfExists(index: number, updatedTitle: string, updatedNoteText: string, dateCreated: string, editDate: string) {
    // Fetch favNotes from localStorage or create a new array
    const favNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('favNotes') || '[]');

    // Check if the note is in favNotes based on the index
    if (index >= 0 && index < favNotes.length) {
        // If the note is in favNotes, update its content
        favNotes[index] = { title: updatedTitle, note: updatedNoteText, date: dateCreated, edit: editDate };

        // Save the updated favNotes to localStorage
        localStorage.setItem('favNotes', JSON.stringify(favNotes));
    }
}
