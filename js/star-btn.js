"use strict";
const favBtn = document.getElementById('fav-button');
favBtn.addEventListener('click', function () {
    const mainOutputContainer = document.getElementById('main-output-container');
    // hittar noten som visas i main
    const displayedNote = mainOutputContainer.querySelector('#template');
    // säkerställer att det finns en note
    if (displayedNote) {
        // hämtar dess id
        const displayNoteId = displayedNote.getAttribute('data-id');
        if (displayNoteId) {
            // konverterar till number
            const noteId = parseInt(displayNoteId, 10);
            // säkerställer att konverteringen fungerade
            if (!isNaN(noteId)) {
                //anropar rätt metod för att favoritmarkera
                addNotesToFavourites(noteId);
            }
            else {
                console.error('Error: Invalid ID format for the displayed note.');
            }
        }
        else {
            console.error('Error: Unable to retrieve ID of the displayed note.');
        }
    }
    else {
        console.error('Error: No note is currently displayed in the main output container.');
    }
});
