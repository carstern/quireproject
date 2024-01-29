// Funktion för att ta bort anteckning från localStorage
function deleteNoteFromLocalStorage(index: number) {
    // Hämtar sparade anteckningar från localStorage || skapar ny - onödigt kanske?
    const savedNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

    // Tar bort den valda anteckningen baserat på index
    savedNotes.splice(index, 1);

    // Sparar uppdaterade anteckningar till localStorage
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

    // Ta bort det raderade kortet direkt från DOM
    const cardToRemove: HTMLDivElement | null = document.querySelector(`[data-index="${index}"]`);
    if (cardToRemove) {
        cardToRemove.remove();
    }

    //laddar om sidan för att den raderade anteckningen inte ska visas i mainOutput
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