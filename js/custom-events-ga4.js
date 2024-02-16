"use strict";
// Start edit mode timer
let editModeStartTime = null;
const startEditModeTimer = () => {
    editModeStartTime = Date.now();
};
// Function to handle click outside note input field
const handleClickOutside = (event) => {
    const target = event.target;
    const noteInputDiv = document.getElementById('noteInput');
    // Check if the click is outside and stop timer if so
    if (noteInputDiv && !noteInputDiv.contains(target)) {
        stopEditModeTimerAndTrackTiming();
        // Remove event listener when clicked outside
        document.body.removeEventListener('click', handleClickOutside);
    }
};
// Stop edit mode timer and track timing
const stopEditModeTimerAndTrackTiming = () => {
    if (editModeStartTime !== null) {
        const editModeDuration = Date.now() - editModeStartTime;
        // Send event to Google Analytics
        window.gtag('event', 'edit_mode_duration', {
            'event_category': 'User Interaction',
            'event_label': 'Edit Mode Duration',
            'value': editModeDuration // milliseconds
        });
        // Clear timer
        editModeStartTime = null;
    }
};
window.onload = function () {
    setTimeout(function () {
        // Function to track search button click
        const tracksearchBtnClick = () => {
            // Send event to Google Analytics
            window.gtag("event", "search_link_clicked", {
                event_category: "Navigation",
                event_label: "Search Link Clicked",
            });
        };
        // Function to track click on "Alla anteckningar" link
        const trackAllNotesClicked = () => {
            // Send event to Google Analytics
            window.gtag("event", "all_Notes_link_clicked", {
                event_category: "Anteckningar",
                event_label: "Se alla anteckningar",
            });
        };
        // Function to track file upload button click
        const trackFileUpload = () => {
            // Send event to Google Analytics
            window.gtag('event', 'image_attached', {
                'event_category': 'User Interaction',
                'event_label': 'Image Attached'
            });
        };
        // Function to track favorite button click
        const favoriteClicked = () => {
            // Send event to Google Analytics
            window.gtag('event', 'favorite_btn_clicked', {
                'event_category': 'favorite',
                'event_label': 'klicka på favorite knapp'
            });
        };
        // Function to track click on welcome link
        const trackSearchWelcomeClick = () => {
            // Send event to Google Analytics
            window.gtag('event', 'welcome_link_clicked', {
                'event_category': 'User Interaction',
                'event_label': 'Welcome Link Clicked'
            });
        };
        // Function to track creation of new notes
        const trackCreatedNotes = () => {
            // Send event to Google Analytics
            window.gtag("event", "create_new_note", {
                event_category: "Note Interaction",
                event_label: "New Note Clicked",
            });
        };
        // Function to track deletion of notes
        const noteDeletion = (id) => {
            // Send event to Google Analytics
            window.gtag("event", "note_deleted", {
                "event_category": "User Interactions",
                "event_label": "Note deleted",
                "value": id
            });
        };
        // Function to handle note deletion event
        document.addEventListener("noteDeleted", function (event) {
            const id = event.detail.id;
            // Call the tracking function
            noteDeletion(id);
        });
        // Track search button click
        const searchBtn = document.getElementById("search-link");
        if (searchBtn) {
            searchBtn.addEventListener("click", tracksearchBtnClick);
        }
        // Track click on "Alla anteckningar" link
        const allNotesLink = document.getElementById("all-notes-link");
        if (allNotesLink) {
            allNotesLink.addEventListener("click", trackAllNotesClicked);
        }
        // Track file upload button click
        const fileInput = document.getElementById('uploadBtn');
        if (fileInput) {
            fileInput.addEventListener('click', trackFileUpload);
        }
        // Track favorite button click
        const favLink = document.getElementById("fav-link");
        if (favLink) {
            favLink.addEventListener("click", favoriteClicked);
        }
        // Track creation of new notes
        const createNote = document.querySelector("new-note-button");
        if (createNote) {
            createNote.addEventListener("click", trackCreatedNotes);
            // Define element to track
            const welcomeOverlay = document.getElementById('welcome-link');
            // If it exists, link an event listener
            if (welcomeOverlay) {
                welcomeOverlay.addEventListener('click', trackSearchWelcomeClick);
            }
            // Start edit mode timer
            const noteInputDiv = document.getElementById('noteInput');
            if (noteInputDiv) {
                noteInputDiv.addEventListener('focus', startEditModeTimer);
                // Stop edit mode timer when clicking outside the note input field
                document.body.addEventListener('click', handleClickOutside);
            }
        }
    }, 1000); // Increase timeout if needed
};
