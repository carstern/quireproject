/*************************
 * Börja med en enkel CSS för att se tydligt resultat - inte ladda upp på github wayyoooo done
 */

/*************************
 * Task 1 - Presentera en notepad för användaren. Rubrik och textfält.
 *   addEventListener till skapa anteckning-knappen
 *      - skapar en basic 'mall' en input för rubrik, en textarea för brödtext 
 *      - gör i main-output-container
 *      - datum för när den skapades/senast redigerades?
 */

// koppla till main-output-container
const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement;
const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

createNoteBtn.addEventListener('click', function () {
    // Create a new Date object
    const today: Date = new Date();

    // Get the current date components
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // Month is zero-based, so we add 1
    const day: number = today.getDate();

    // Format the date as a string (e.g., "YYYY-MM-DD")
    const formattedDate: string = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    mainOutputContainer.innerHTML += `
    <input placeholder="Add your title" id="notesTitle">
    <p> Date created: ${formattedDate} </p>
    <textarea id="noteInput" name="userInput" placeholder="Type your notes here"></textarea>
    <button id="save-note-button">Save</button>`;

    // Get the dynamically created saveBtn element
    const saveBtn: HTMLButtonElement | null = document.getElementById('save-note-button') as HTMLButtonElement | null;

    if (saveBtn) {
        // Attach event listener to the dynamically created saveBtn
        saveBtn.addEventListener('click', function () {
            const titleInput: HTMLInputElement | null = document.getElementById('notesTitle') as HTMLInputElement | null;
            const noteTextArea: HTMLTextAreaElement | null = document.getElementById('noteInput') as HTMLTextAreaElement | null;

            if (titleInput && noteTextArea) {
                const savedTitle: string = titleInput.value;
                const savedNote: string = noteTextArea.value;

                // Retrieve existing notes from localStorage or initialize an empty array
                const savedNotes: { title: string; note: string; date: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

                // Add the new note to the array
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate });

                // Save the updated array back to localStorage
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
            } else {
                console.error('Error: titleInput or noteTextArea is null');
            }
        });
    } else {
        console.error('Error: saveBtn is null');
    }
});

window.addEventListener('load', function () {
    const navOutputContainer: HTMLDivElement | null = document.getElementById('nav-output-container') as HTMLDivElement | null;

    if (navOutputContainer) {
        // Retrieve savedNotes from localStorage
        const savedNotes: { title: string; note: string, date: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

        // Iterate over the savedNotes array and create cards
        savedNotes.forEach(note => {
            const card: HTMLDivElement = document.createElement('div');
            card.classList.add('note-card'); // You can add a class for styling if needed

            const titleElement: HTMLHeadingElement = document.createElement('h3');
            titleElement.textContent = note.title;

            const noteElement: HTMLParagraphElement = document.createElement('p');
            noteElement.textContent = note.note;

            card.appendChild(titleElement);
            card.appendChild(noteElement);

            if (navOutputContainer) {
                navOutputContainer.appendChild(card);
            } else {
                console.error('Error: navOutputContainer is null');
            }
        });
    } else {
        console.error('Error: navOutputContainer is null');
    }
});



/***
 * next steps for wednesday:
 * sparade anteckningar skapas dynamiskt i nav-output
 * localstorge ska funka som tänkt
 */

// key-event för input + textarea (tab) --> inputen sparas till savedNotesArray
/*************************
 * Task 2 - Spara anteckningen i localstorage
 *  skapar och sparar - vid knapp tryck för att spara?
 *      - localStorage savedNotesArray title: title - note: note
 */ 

/*************************
 * Task 3 - Presentera notes i containern
 *  länka till nav-output-container
 *      - skapa element:
 *                
                <section class="card">
                <h3>title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vero velit ea repellendus id, vel corrupti, accusamus aperiam explicabo minima cupiditate perferendis illum totam nisi. Sequi nam veniam cupiditate nobis.</p>
                + 2 buttons - delete | star ==> vid hover
                || ... i mobile view ==> statiska knappar tilll en början - sen swipe funktion

        - hämtar titel + första 12 orden av brödtext från vår savedNotesarray
 */ 

/*************************
 * Task 4 - Skapa toggle på read/edit-view, anpassad för desktop, mobile/tablet
 *  finslipa 'spara knappen'
 *  - eventListner för enter/tab i desktop (knapp i mobile view?) - för mobilanpassning
 */

/*************************
 * Task 5 - Skapa knapp för ta bort, stjärnmarkera vid hover över anteckningarna 
 * i desktop, liten meny i mobile/tablet
 *  Bygga vidare på Task 3
 *      - lägga till element för knappar - lämna funktionerna tomma
 */
