"use strict";
// länka till quire logo för att visa default view
const quireLogo = document.getElementById('quire-logo');
quireLogo.addEventListener('click', function () {
    location.reload();
});
//visa alla anteckningar i mainOutput
const showAllNotesBtn = document.getElementById('all-notes-link');
showAllNotesBtn.addEventListener('click', function (event) {
    if (window.innerWidth < 760) {
        const navContainer = document.getElementById("nav-container");
        navContainer === null || navContainer === void 0 ? void 0 : navContainer.classList.toggle("nav-container-show");
        // navOutputContainer?.classList.toggle("nav-output-container-show");
        const moreBtn = document.getElementById("more-button");
        // Toggle text between "More" and "Hide"
        if (moreBtn.textContent === "More") {
            moreBtn.textContent = "Hide";
        }
        else {
            moreBtn.textContent = "More";
        }
    }
    event.preventDefault(); // förhindrar att sidan laddas om
    allNotesOverview();
});
function allNotesOverview() {
    if (document.getElementById('template')) {
        const template = document.getElementById('template');
        mainOutputContainer.removeChild(template);
    }
    // hämtar notes
    const savedNotes = getSavedNotes();
    // tömmer main innan resultat visas
    // mainOutputContainer.innerHTML = '';
    const template = document.createElement('div');
    template.id = 'template';
    if (navOutputContainer && mainOutputContainer) {
        const savedNotes = getSavedNotes();
        //skapar ett kort/ note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }
            const card = createNoteCard(note);
            template.appendChild(card);
        });
    }
    else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
    mainOutputContainer.appendChild(template);
}
