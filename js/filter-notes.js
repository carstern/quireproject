"use strict";
// star-knappen filterar nav-outputs resultat efter favoriter
const showFavoritesBtn = document.getElementById('fav-link');
showFavoritesBtn.addEventListener('click', function (event) {
    navOutputContainer === null || navOutputContainer === void 0 ? void 0 : navOutputContainer.classList.toggle("nav-output-container-show");
    event.preventDefault(); // förhindrar att sidan laddas om
    navOutputContainer.innerHTML = ''; // tömmer navoutput
    getFavoriteNotes();
});
function getFavoriteNotes() {
    // tömmer main innan resultat visas
    // navOutputContainer.innerHTML = '';
    if (navOutputContainer) {
        const savedNotes = getSavedNotes();
        // filterar efter favoriter
        const favoriteNotes = savedNotes.filter(note => note.isFavorite);
        //skapar ett kort/ note
        favoriteNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }
            const card = createNoteCard(note);
            navOutputContainer.appendChild(card);
        });
    }
    else {
        console.error('Error: navOutputContainer is null');
    }
}
