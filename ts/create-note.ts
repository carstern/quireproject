// koppla till main-output-container
const mainOutputContainer = document.getElementById('main-output-container') as HTMLDivElement;
const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

function createNewNote(){
    // Create a new Date object
    const today: Date = new Date();

    // Get the current date components
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // Month is zero-based, so we add 1
    const day: number = today.getDate();

    // Format the date as a string (e.g., "YYYY-MM-DD")
    const formattedDate: string = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    createButtons();

    mainOutputContainer.innerHTML += `
    </div>
    <input placeholder="Add your title" id="notesTitle">
    <p> Date created: ${formattedDate} | Last Edited: ${formattedDate} </p>
    <textarea id="noteInput" name="userInput" placeholder="Type your notes here"></textarea>
    <button id="save-note-button">Save</button>`;

    // Get the dynamically created saveBtn element
    const saveBtn: HTMLButtonElement | null = document.getElementById('save-note-button') as HTMLButtonElement | null;
    const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

    if (saveBtn) {
        // Attach event listener to the dynamically created saveBtn
        saveBtn.addEventListener('click', function () {
            const titleInput: HTMLInputElement | null = document.getElementById('notesTitle') as HTMLInputElement | null;
            const noteTextArea: HTMLTextAreaElement | null = document.getElementById('noteInput') as HTMLTextAreaElement | null;

            if (titleInput && noteTextArea) {
                const savedTitle: string = titleInput.value;
                const savedNote: string = noteTextArea.value;

                // Retrieve existing notes from localStorage or initialize an empty array
                const savedNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

                // Add the new note to the array
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate, edit: formattedDate });

                // Save the updated array back to localStorage
                localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

                location.reload();
            } else {
                console.error('Error: titleInput or noteTextArea is null');
            }
        });
    } else {
        console.error('Error: saveBtn is null');
    }
    createNoteBtn.addEventListener('click', function () {
        createNewNote();
    });
}

createNoteBtn.addEventListener('click', function () {
    createNewNote();
});
// Function to perform actions on window load
function onWindowLoad() {
    const navOutputContainer: HTMLDivElement | null = document.getElementById('nav-output-container') as HTMLDivElement | null;
    const mainOutputContainer: HTMLDivElement | null = document.getElementById('main-output-container') as HTMLDivElement | null;

    if (navOutputContainer && mainOutputContainer) {
        // Retrieve savedNotes from localStorage
        const savedNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

        // Iterate over the savedNotes array and create cards
        savedNotes.forEach((note, index) => {
            const card: HTMLDivElement = document.createElement('div');
            card.classList.add('note-card'); // You can add a class for styling if needed

            // Add a unique identifier to each note-card
            card.setAttribute('data-index', index.toString());

            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.note}</p>
                <button class="button star-button">⭐</button>
                <button class="button delete-button">❌</button>
            `;

            // Add a click event listener to each note-card
            card.addEventListener('click', function () {
                // Check if mainOutputContainer has the child with ID 'view-note-card'
                const existingViewNoteCard: HTMLDivElement | null = document.getElementById('view-note-card') as HTMLDivElement | null;
            
                if (existingViewNoteCard) {
                    // Remove the existing viewNoteCard
                    mainOutputContainer.removeChild(existingViewNoteCard);
                }
            
                const dataIndex = card.getAttribute('data-index');
                console.log('Note-card clicked! Index:', dataIndex);
            
                // Retrieve the clicked note from savedNotes
                const clickedNoteIndex = parseInt(dataIndex || '0', 10);
                const clickedNote = savedNotes[clickedNoteIndex];

                createButtons();
            
                // Update the viewNoteCard with the clicked note
                mainOutputContainer.innerHTML += `
                    <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                    <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
                    <textarea id="noteInput" name="userInput" placeholder="Type your notes here">${clickedNote.note}</textarea>
                    <button id="save-note-button">Save</button>`;
            
                // Get the dynamically created saveBtn element within viewNoteCard
                const saveBtn: HTMLButtonElement | null = mainOutputContainer.querySelector('#save-note-button') as HTMLButtonElement | null;
                const createNoteBtn = document.getElementById('new-note-button') as HTMLButtonElement;

                createNoteBtn.addEventListener('click', function () {
                    createNewNote();
                });
            
                if (saveBtn) {
                    // Attach event listener to the dynamically created saveBtn
                    saveBtn.addEventListener('click', function () {
                        const updatedTitleInput: HTMLInputElement | null = document.getElementById('notesTitle') as HTMLInputElement | null;
                        const updatedNoteTextArea: HTMLTextAreaElement | null = document.getElementById('noteInput') as HTMLTextAreaElement | null;

            
                        if (updatedTitleInput && updatedNoteTextArea) {

                            // Create a new Date object
                            const currentDate: Date = new Date();

                            // Get the current date and time components
                            const year: number = currentDate.getFullYear();
                            const month: number = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
                            const day: number = currentDate.getDate();
                            const hours: number = currentDate.getHours();
                            const minutes: number = currentDate.getMinutes();

                            // Format the date and time as a string (e.g., "YYYY-MM-DD HH:mm")
                            const formattedDate: string = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

                            const updatedTitle: string = updatedTitleInput.value;
                            const updatedNote: string = updatedNoteTextArea.value;
                            const dateCreated: string = clickedNote.date;
                            const editdate: string = formattedDate;
            
                            // Call the function to update and save the edited note
                            updateAndSaveNote(clickedNoteIndex, updatedTitle, updatedNote, dateCreated, editdate);
                        } else {
                            console.error('Error: updatedTitleInput or updatedNoteTextArea is null');
                        }
                    });
                } else {
                    console.error('Error: saveBtn is null');
                }
            });         

            navOutputContainer.appendChild(card);
        });
    } else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}

// Call the function on window load
window.addEventListener('load', onWindowLoad);

// Assuming you have a Save button event listener
const saveBtn: HTMLButtonElement | null = document.getElementById('save-note-button') as HTMLButtonElement | null;

if (saveBtn) {
    saveBtn.addEventListener('click', function () {
        // Save the note or perform other actions
        onWindowLoad();
    });
}

//update saved note
function updateAndSaveNote(index: number, updatedTitle: string, updatedNote: string, dateCreated: string, editDate: string) {
    // Retrieve existing notes from localStorage or initialize an empty array
    const savedNotes: { title: string; note: string; date: string, edit: string }[] = JSON.parse(localStorage.getItem('savedNotes') || '[]');

    // Update the note at the specified index
    savedNotes[index] = { title: updatedTitle, note: updatedNote, date: dateCreated, edit: editDate };

    // Save the updated array back to localStorage
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

    // Reload the window or update the UI as needed
    location.reload();
}

function createButtons (){
    mainOutputContainer.innerHTML = `
    <button class="more-button" id="more-button">More</button>
    <div class="floating-control-menu" id="floating-control-container">
    <button class="new-note-button" id="new-note-button">New</button>
    <button class="print-button" id="print-button">Print</button>
    <button class="fav-button" id="fav-button">Star</button>
    </div>`
}
