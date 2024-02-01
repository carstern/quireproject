"use strict";
//hämtar HTML element
const mainOutputContainer = document.getElementById('main-output-container');
const createNoteBtn = document.getElementById('new-note-button');
//hämtar sparade notes när sidan laddas
window.addEventListener('load', getNotesFromLocalStorage);
createNoteBtn.addEventListener('click', createNewNote);
function createNewNote() {
    const today = new Date();
    //anropar fuktion för att hämta datum
    const formattedDate = formatDate(today);
    const uniqueId = today.getTime();
    createButtons(); //skapar knappar
    //skapar grundmall
    mainOutputContainer.innerHTML += `
        <div>
            <input placeholder="Add your title" id="notesTitle">
            <p> Date created: ${formattedDate} | Last Edited: ${formattedDate} </p>
            <textarea id="noteInput" name="userInput" placeholder="Type your notes here"></textarea>
            <button id="save-note-button">Save</button>
        </div>`;
    //hämar spara-knapp
    const saveBtn = document.getElementById('save-note-button');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            //hämtar element och dess värden
            const titleInput = document.getElementById('notesTitle');
            const noteTextArea = document.getElementById('noteInput');
            if (titleInput && noteTextArea) {
                const savedTitle = titleInput.value;
                const savedNote = noteTextArea.value;
                //skapar en note - pushar till savedNotes -sparar
                const savedNotes = getSavedNotes();
                savedNotes.push({ title: savedTitle, note: savedNote, date: formattedDate, edit: formattedDate, id: uniqueId, isFavorite: false });
                saveNotesToLocalStorage(savedNotes);
                location.reload();
            }
            else {
                console.error('Error: titleInput or noteTextArea is null');
            }
        });
    }
    else {
        console.error('Error: saveBtn is null');
    }
    //gör skapa-knappen funktionell
    createNoteBtn.addEventListener('click', createNewNote);
}
//hämtar notes from localStorage - placerar i navOutput
function getNotesFromLocalStorage() {
    const navOutputContainer = document.getElementById('nav-output-container');
    const mainOutputContainer = document.getElementById('main-output-container');
    if (navOutputContainer && mainOutputContainer) {
        const savedNotes = getSavedNotes();
        //skapar ett kort/ note
        savedNotes.forEach((note) => {
            if (!note) {
                console.error('Note is null. Skipping.');
                return;
            }
            const card = createNoteCard(note);
            navOutputContainer.appendChild(card);
        });
    }
    else {
        console.error('Error: navOutputContainer or mainOutputContainer is null');
    }
}
//skapar kort - ger id / attribut / knappar med funktioner baserat på id
function createNoteCard(note) {
    const card = document.createElement('div');
    card.classList.add('note-card');
    card.setAttribute('data-id', note.id.toString());
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.note}</p>
        <button class="button star-button" data-id="${note.id}">⭐</button>
        <button class="button delete-button" data-id="${note.id}">❌</button>`;
    const starBtn = card.querySelector('.star-button');
    const deleteBtn = card.querySelector('.delete-button');
    if (starBtn) {
        starBtn.addEventListener('click', function () {
            addNotesToFavourites(note.id);
        });
    }
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            deleteNoteFromLocalStorage(note.id);
        });
    }
    // varje kort som klickas visas i mainOutput - tar bort befintligt kort som visas
    card.addEventListener('click', function () {
        const existingViewNoteCard = document.getElementById('view-note-card');
        if (existingViewNoteCard) {
            mainOutputContainer.removeChild(existingViewNoteCard);
        }
        const clickedNote = getSavedNotes().find((n) => n.id === note.id);
        if (clickedNote) {
            createButtons();
            mainOutputContainer.innerHTML += `
                <input placeholder="Add your title" id="notesTitle" value="${clickedNote.title}">
                <p> Date created: ${clickedNote.date} | Last Edited: ${clickedNote.edit}</p>
                <textarea id="noteInput" name="userInput" placeholder="Type your notes here">${clickedNote.note}</textarea>
                <button id="save-note-button" data-id="${clickedNote.id}">Save</button>`;
            const createNoteBtn = document.getElementById('new-note-button');
            const saveBtn = mainOutputContainer.querySelector('#save-note-button');
            createNoteBtn.addEventListener('click', createNewNote);
            if (saveBtn) {
                saveBtn.addEventListener('click', function () {
                    const updatedTitleInput = document.getElementById('notesTitle');
                    const updatedNoteTextArea = document.getElementById('noteInput');
                    if (updatedTitleInput && updatedNoteTextArea) {
                        const currentDate = new Date();
                        const formattedDate = formatDate(currentDate);
                        const updatedTitle = updatedTitleInput.value;
                        const updatedNote = updatedNoteTextArea.value;
                        const dateCreated = clickedNote.date;
                        const editDate = formattedDate;
                        updateAndSaveNote(updatedTitle, updatedNote, dateCreated, editDate, clickedNote.id, clickedNote.isFavorite);
                    }
                    else {
                        console.error('Error: updatedTitleInput or updatedNoteTextArea is null');
                    }
                });
            }
            else {
                console.error('Error: saveBtn is null');
            }
        }
    });
    return card;
}
//formaterar datum
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
