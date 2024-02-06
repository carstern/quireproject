"use strict";
// star-knappen filterar nav-outputs resultat efter favoriter
const showFavoritesBtn = document.getElementById('fav-link');
showFavoritesBtn.addEventListener('click', function (event) {
    event.preventDefault(); // förhindrar att sidan laddas om
    navOutputContainer.innerHTML = ''; // tömmer navoutput
    getFavoriteNotes();
});
function getFavoriteNotes() {
    // hämtar notes
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
    // filterar efter favoriter
    const favoriteNotes = savedNotes.filter(note => note.isFavorite);
    // visar resultatet i navoutput
    favoriteNotes.forEach(note => {
        const noteDisplayCard = document.createElement("div");
        noteDisplayCard.classList.add("note-card");
        noteDisplayCard.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.note}</p>
        <button class="button star-button" data-id="${note.id}">⭐</button>
        <button class="button delete-button" data-id="${note.id}">❌</button>`;
        // lägger till all funtionalitet
        navOutputContainer.appendChild(noteDisplayCard);
    });
}
