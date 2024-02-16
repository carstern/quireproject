const favBtn = document.getElementById('fav-button') as HTMLButtonElement;

favBtn.addEventListener('click', function(){
    // Find the main output container
    const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement;

    // Find the currently displayed note within the main output container
    const displayedNote = mainOutputContainer.querySelector('#template') as HTMLDivElement | null;

    // Ensure a note is displayed
    if (displayedNote) {
        // Extract the ID of the displayed note
        const displayNoteId: string | null = displayedNote.getAttribute('data-id');

        if (displayNoteId) {
            // Convert the ID to a number
            const noteId: number = parseInt(displayNoteId, 10);

            // Ensure the conversion is successful
            if (!isNaN(noteId)) {
                // Save the ID in the displayNoteId variable
                // Here, you can perform any additional actions with the ID, such as adding the note to favorites
                console.log('Display Note ID:', noteId);
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
