"use strict";
// funktion som spårar sökfunktionen
function trackSearchLinkClick() {
    // skickar event till GA4
    window.gtag("event", "search_link_clicked", {
        event_category: "Navigation",
        event_label: "Search Link Clicked",
    });
}
/*** MALL FÖR FUNCTION
 * function NAMNET PÅ DIN FUNKTION() {
    // skickar event till GA4
    // BYT UT ALLA NAMN
    (window as any).gtag('event', 'search_link_clicked', {
        'event_category': 'Navigation',
        'event_label': 'Search Link Clicked'
    });
}
 */
// undersöker att g-tagen har laddats in innan våra spårningar börjar
window.onload = function () {
    // undersöker att g-tagen är tillgänglig
    if (typeof window.gtag === "function") {
        // definera/deklarera elementet att spåra
        const searchLink = document.getElementById("search-link");
        //om det finns - länka en eventListener
        if (searchLink) {
            searchLink.addEventListener("click", trackSearchLinkClick);
        }
        /******MALL FÖR CUSTOM EVENT******* */
        // if (typeof (window as any).gtag === 'function') {
        //     const DITT-ELEMENT = document.getElementById('ID PÅ DITT ELEMENT');
        //     if (DITT ELEMENT) {
        //         DITT ELEMENT.addEventListener('click', DIN FUNKTION);
        //     }
        // }
    }
    else {
        // om gtag inte hittas - letar den igen efter en delay
        setTimeout(function () {
            if (typeof window.gtag === "function") {
                const searchLink = document.getElementById("search-link");
                if (searchLink) {
                    searchLink.addEventListener("click", trackSearchLinkClick);
                }
            }
            // if (typeof (window as any).gtag === 'function') {
            //     const DITT-ELEMENT = document.getElementById('ID PÅ DITT ELEMENT');
            //     if (DITT ELEMENT) {
            //         DITT ELEMENT.addEventListener('click', DIN FUNKTION);
            //     }
            // }
        }, 1000); // Adjust the delay time as needed
    }
};

// Jumi 
// Track note delete 
function noteDeletion(id) {
    // Send to Google Analytics 
    window.gtag("event", "note_deleted", {
        "event_category": "User Interactions",
        "event_label": "Note deleted",
        "value": id
    });
}
// Listen for note delete
document.addEventListener("noteDeleted", function (event) {
    const id = event.detail.id;
    deleteNoteFromLocalStorage(id);
    // call the tracking 
    noteDeletion(id);
});

// Mirza gtag start
window.onload = function () {
    if (typeof window.gtag === "function") {
        const createNote = document.querySelector("new-note-button");
        if (createNote) {
            createNote.addEventListener("click", trackCreatedNotes);
        }
    }
    else {
        setTimeout(function () {
            if (typeof window.gtag === "function") {
                const createNote = document.querySelector("new-note-button");
                if (createNote) {
                    createNote.addEventListener("click", trackCreatedNotes);
                }
            }
        }, 1000);
    }
};
function trackCreatedNotes() {
    window.gtag("event", "create_new_note", {
        event_category: "Note Interaction",
        event_label: "New Note Clicked",
    });
}
// Mirza gtag end
//Linus Kod
// funktion som spårar sökfunktionen
function trackAllNotesClicked() {
    // skickar event till GA4
    window.gtag("event", "all_Notes_link_clicked", {
        event_category: "Anteckningar",
        event_label: "Se alla anteckningar",
    });
}
// undersöker att g-tagen har laddats in innan våra spårningar börjar
window.onload = function () {
    // undersöker att g-tagen är tillgänglig
    if (typeof window.gtag === "function") {
        // definera/deklarera elementet att spåra
        const allNotesLink = document.getElementById("all-notes-link");
        //om det finns - länka en eventListener
        if (allNotesLink) {
            allNotesLink.addEventListener("click", trackAllNotesClicked);
        }
    }
    else {
        // om gtag inte hittas - letar den igen efter en delay
        setTimeout(function () {
            if (typeof window.gtag === "function") {
                const allNotesLink = document.getElementById("all-notes-link");
                if (allNotesLink) {
                    allNotesLink.addEventListener("click", trackAllNotesClicked);
                }
            }
        }, 1000); // Adjust the delay time as needed
    }
};
// Linus kod slutar här
// --- CAROLINE --- \\
// function som spårar användning av knapp för att bifoga bilder
function trackFileUpload() {
    // Skicka event
    window.gtag('event', 'image_attached', {
        'event_category': 'User Interaction',
        'event_label': 'Image Attached'
    });
}
// Kontrollera inläsning av gtag
window.onload = function () {
    // Check if gtag is available
    if (typeof window.gtag === 'function') {
        // Målet att spåra
        const fileInput = document.getElementById('uploadBtn');
        if (fileInput) {
            fileInput.addEventListener('change', trackFileUpload);
        }
    }
    else {
        // Försök igen efter en satt delay om gtag inte hittas
        setTimeout(function () {
            if (typeof window.gtag === 'function') {
                const fileInput = document.getElementById('uploadBtn');
                if (fileInput) {
                    fileInput.addEventListener('change', trackFileUpload);
                }
            }
        }, 1000); // Adjust the delay time as needed
    }
};
// Funktion som tittar på hur länge en användare stannar i edit-mote (alltså hur lång tid man spenderar på att skriva sina notes)
// Lagra starttiden och starta timer
let editModeStartTime = null;
function startEditModeTimer() {
    editModeStartTime = Date.now();
}
// Stoppa timer och lagra tiden
function stopEditModeTimerAndTrackTiming() {
    if (editModeStartTime !== null) {
        const editModeDuration = Date.now() - editModeStartTime;
        // Skicka till google analytics
        window.gtag('event', 'edit_mode_duration', {
            'event_category': 'User Interaction',
            'event_label': 'Edit Mode Duration',
            'value': editModeDuration // millisekunder
        });
        // Rensa timer
        editModeStartTime = null;
    }
}
// Timern ska stanna vid klick utanför anteckningsfältet
// Koppla till anteckningsrutan
function handleClickOutside(event) {
    const target = event.target;
    const noteInputDiv = document.getElementById('noteInput');
    // Kontrollera om klicket är utanför och stanna isåfall timer
    if (noteInputDiv && !noteInputDiv.contains(target)) {
        stopEditModeTimerAndTrackTiming();
        //avsluta eventlistenern när det klickas utanför
        document.body.removeEventListener('click', handleClickOutside);
    }
}
// --- CAROLINE SLUT --- \\
// Aleksei kod
function favoriteClicked() {
    // skickar event till GA4
    // BYT UT ALLA NAMN
    window.gtag('event', 'favorite_btn_clicked', {
        'event_category': 'favorite',
        'event_label': 'klicka på favorite knapp'
    });
}
window.onload = function () {
    // undersöker att g-tagen är tillgänglig
    if (typeof window.gtag === "function") {
        // definera/deklarera elementet att spåra
        const favBtn = document.getElementById("fav-link");
        //om det finns - länka en eventListener
        if (favBtn) {
            favBtn.addEventListener("click", favoriteClicked);
        }
    }
    else {
        // om gtag inte hittas - letar den igen efter en delay
        setTimeout(function () {
            if (typeof window.gtag === "function") {
                const favBtn = document.getElementById("fav-link");
                if (favBtn) {
                    favBtn.addEventListener("click", favoriteClicked);
                }
            }
        }, 1000); // Adjust the delay time as needed
    }
};
//   Aleksei kod slutar här
// Jason kod börjar här
// funktion som spårar sökfunktionen
function trackSearchWelcomeClick() {
    // skickar event till GA4
    window.gtag('event', 'welcome_link_clicked', {
        'event_category': 'User Interaction',
        'event_label': 'Welcome Link Clicked'
    });
}
// undersöker att g-tagen har laddats in innan våra spårningar börjar
window.onload = function () {
    // undersöker att g-tagen är tillgänglig
    if (typeof window.gtag === 'function') {
        // definera/deklarera elementet att spåra
        const welcomeOverlay = document.getElementById('welcome-link');
        //om det finns - länka en eventListener
        if (welcomeOverlay) {
            welcomeOverlay.addEventListener('click', trackSearchWelcomeClick);
        }
    }
    else {
        // om gtag inte hittas - letar den igen efter en delay
        setTimeout(function () {
            if (typeof window.gtag === 'function') {
                const welcomeOverlay = document.getElementById('welcome-link');
                if (welcomeOverlay) {
                    welcomeOverlay.addEventListener('click', trackSearchWelcomeClick);
                }
            }
        }, 1000); // Adjust the delay time as needed
    }
};
// Jason kod slutar här

