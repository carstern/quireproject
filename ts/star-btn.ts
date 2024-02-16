const favBtn = document.getElementById('fav-button') as HTMLButtonElement;

favBtn.addEventListener('click', function(){
    const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement;

    // hittar noten som visas i main
    const displayedNote = mainOutputContainer.querySelector('#template') as HTMLDivElement | null;

    // säkerställer att det finns en note
    if (displayedNote) {
        // hämtar dess id
        const displayNoteId: string | null = displayedNote.getAttribute('data-id');

        if (displayNoteId) {
            // konverterar till number
            const noteId: number = parseInt(displayNoteId, 10);

            // säkerställer att konverteringen fungerade
            if (!isNaN(noteId)) {
                //anropar rätt metod för att favoritmarkera
                addNotesToFavourites(noteId);
            } else {
                console.error('Error: Invalid ID format for the displayed note.');
            }
        } else {
            console.error('Error: Unable to retrieve ID of the displayed note.');
        }
    } else {
        console.error('Error: No note is currently displayed in the main output container.');
    }
});
