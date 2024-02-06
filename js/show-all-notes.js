"use strict";
// länka till quire logo för att visa default view
const quireLogo = document.getElementById('quire-logo');
quireLogo.addEventListener('click', function () {
    location.reload();
});
//visa alla anteckningar i mainOutput
const showAllNotesBtn = document.getElementById('all-notes-link');
showAllNotesBtn.addEventListener('click', function (event) {
    event.preventDefault(); // förhindrar att sidan laddas om
    allNotesOverview();
});
function allNotesOverview() {
    // hämtar notes
    const savedNotes = getSavedNotes();
    // tömmer main innan resultat visas
    mainOutputContainer.innerHTML = '';
    if (navOutputContainer && mainOutputContainer) {
        const savedNotes = getSavedNotes();
        //skapar ett kort/ note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }
            const card = createNoteCard(note);
            mainOutputContainer.appendChild(card);
        });
    }
    else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}
