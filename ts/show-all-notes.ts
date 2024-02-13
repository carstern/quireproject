// länka till quire logo för att visa default view
const quireLogo = document.getElementById('quire-logo') as HTMLImageElement;

quireLogo.addEventListener('click', function(){
    location.reload();
})

//visa alla anteckningar i mainOutput
const showAllNotesBtn = document.getElementById('all-notes-link') as HTMLAnchorElement;

showAllNotesBtn.addEventListener('click', function(event){
    event.preventDefault(); // förhindrar att sidan laddas om
    allNotesOverview();
});

function allNotesOverview(){
    // hämtar notes
    const savedNotes: Note[] = getSavedNotes();
    // tömmer main innan resultat visas
    // mainOutputContainer.innerHTML = '';
    const template = document.createElement('div') as HTMLDivElement;
    template.id = 'template'

    if (navOutputContainer && mainOutputContainer) {
        const savedNotes: Note[] = getSavedNotes();
        //skapar ett kort/ note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }

            const card = createNoteCard(note);
            template.appendChild(card);
        });
    } else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
    mainOutputContainer.appendChild(template);
}
