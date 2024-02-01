"use strict";
// koppla till main-output-container
const mainOutputContainer = document.getElementById("main-output-container");
const createNoteBtn = document.getElementById("new-note-button");
// anropar funtionen som visar våra sparade anteckningar
window.addEventListener("load", getNotesFromLocalStorage);
createNoteBtn.addEventListener("click", function () {
    createNewNote();
});
function createNewNote() {
    // Hämtar dagen datum - sparar som en string
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-based, so we add 1
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    //anropar funtion som skapar våra knappar
    createButtons();
    //skapar en grundmall för anteckning
    mainOutputContainer.innerHTML += `
    <input placeholder="Add your title" id="notesTitle">
    <p> Date created: ${formattedDate} | Last Edited: ${formattedDate} </p>
    <div id="noteInput" name="userInput" contenteditable="true"></div>
    <button id="save-note-button">Save</button>`;
    // Hämtar vi vår dynamiskt skapade spara-knapp
    const saveBtn = document.getElementById("save-note-button");
    const createNoteBtn = document.getElementById("new-note-button");
    //försäkrar att knappen finns
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            //kopplar vi tll html element
            const titleInput = document.getElementById("notesTitle");
            const noteTextArea = document.getElementById("noteInput");
            if (titleInput && noteTextArea) {
                //hämtar värdet av titel + anteckning
                const savedTitle = titleInput.value;
                const savedNote = noteTextArea.innerText;
                // Hämtar vi redan sparaed anteckning || skapar ny array för förstagångsanvändare
                const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
                // lägger till vår nya anteckning - sparas
                savedNotes.push({
                    title: savedTitle,
                    note: savedNote,
                    date: formattedDate,
                    edit: formattedDate,
                });
                // Sparar till localStorage
                localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
                //sidan laddas om för att dynamiskt skapa innehåll i nav-output från localStorage
                location.reload();
            }
            else {
                console.error("Error: titleInput or noteTextArea is null");
            }
        });
    }
    else {
        console.error("Error: saveBtn is null");
    }
    //vår nyskapade createNoteBTn får samma funktionalitet som startsidan
    createNoteBtn.addEventListener("click", function () {
        createNewNote();
    });
}
// hämtar sparade anteckningar när sidan laddas om
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById("nav-output-container");
    const mainOutputContainer = document.getElementById("main-output-container");
    if (navOutputContainer && mainOutputContainer) {
        // Hämtar sparade anteckningar || skapar ny array för förstagångsanvändare
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
        // loopar genom våra anteckningar - skapar kort - med ett indexattribut för att särskilja dem
        savedNotes.forEach((note, index) => {
            const card = document.createElement("div");
            card.classList.add("note-card");
            // ger ett attribut som unik identifikation - ger kortet innehåll
            card.setAttribute("data-index", index.toString());
            card.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.note}</p>
                <button class="button star-button">⭐</button>
                <button class="button delete-button">❌</button>
            `;
            // varje unikt kort får en eventListener
            card.addEventListener("click", function () {
                // undersöker om main-output redan har innehåll (dvs redan visar en befintlig anteckning)
                const existingViewNoteCard = document.getElementById("view-note-card");
                if (existingViewNoteCard) {
                    // raderar isf innehållet från mainoutput
                    mainOutputContainer.removeChild(existingViewNoteCard);
                }
                const dataIndex = card.getAttribute("data-index");
                // Hämtar den specifika anteckningen från vår localStorage
                const clickedNoteIndex = parseInt(dataIndex || "0", 10);
                const clickedNote = savedNotes[clickedNoteIndex];
                //hämtar knappar
                createButtons();
                // Visar vårt innehåll från kortet
                mainOutputContainer.innerHTML += `
                    <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                    <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
                    <div id="noteInput" name="userInput" contenteditable="true">${clickedNote.note}</div>
                    <button id="save-note-button">Save</button>`;
                // De dynamiskt skapde knapparna får samma funktionalitet som default-läget
                const createNoteBtn = document.getElementById("new-note-button");
                const saveBtn = mainOutputContainer.querySelector("#save-note-button");
                createNoteBtn.addEventListener("click", function () {
                    createNewNote();
                });
                if (saveBtn) {
                    saveBtn.addEventListener("click", function () {
                        //kopplar till våra html-elemnt
                        const updatedTitleInput = document.getElementById("notesTitle");
                        const updatedNoteTextArea = document.getElementById("noteInput");
                        if (updatedTitleInput && updatedNoteTextArea) {
                            //hämtar dagens datum (KAN GÖRAS OM TILL EN FRISTÅENDE FUNKTION)
                            const currentDate = new Date();
                            const year = currentDate.getFullYear();
                            const month = currentDate.getMonth() + 1;
                            const day = currentDate.getDate();
                            const hours = currentDate.getHours();
                            const minutes = currentDate.getMinutes();
                            // formaterar till en string
                            const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day} ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
                            const updatedTitle = updatedTitleInput.value;
                            const updatedNote = updatedNoteTextArea.innerText;
                            const dateCreated = clickedNote.date;
                            const editdate = formattedDate;
                            // anropar funktionen för att uppdatera och spara vårt innehåll - lägger till last edited
                            updateAndSaveNote(clickedNoteIndex, updatedTitle, updatedNote, dateCreated, editdate);
                        }
                        else {
                            console.error("Error: updatedTitleInput or updatedNoteTextArea is null");
                        }
                    });
                }
                else {
                    console.error("Error: saveBtn is null");
                }
            });
            navOutputContainer.appendChild(card);
        });
    }
    else {
        console.error("Error: navOutputContainer or mainOutputContainer is null");
    }
}
//uppdaterar och sparar vid edit - genom att ta emot fem parameterar
function updateAndSaveNote(index, updatedTitle, updatedNote, dateCreated, editDate) {
    //Hämtar från localStorage || skapar en ny array för förstagångsanvändare
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    // uppdaterar kortet så att den behåller sitt ursprungliga index
    savedNotes[index] = {
        title: updatedTitle,
        note: updatedNote,
        date: dateCreated,
        edit: editDate,
    };
    // Sparar datan i localStorage
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    // Laddas sidan om för att uppdatera enligt getNotesFromLocalStorage
    location.reload();
}
//våra knappar skapas dynamiskt varje gång vårt innehåll ändras i main-output
function createButtons() {
    mainOutputContainer.innerHTML = `
    <button class="more-button" id="more-button">More</button>
    <div class="floating-control-menu" id="floating-control-container">
    <button class="new-note-button" id="new-note-button">New</button>
    <button class="print-button" id="print-button">Print</button>
    <button class="fav-button" id="fav-button">Star</button>
    </div>`;
}
