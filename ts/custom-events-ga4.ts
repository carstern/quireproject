// funktion som spårar sökfunktionen
function trackSearchLinkClick() {
    // skickar event till GA4
    (window as any).gtag('event', 'search_link_clicked', {
        'event_category': 'Navigation',
        'event_label': 'Search Link Clicked'
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
    if (typeof (window as any).gtag === 'function') {
        // definera/deklarera elementet att spåra
        const searchLink = document.getElementById('search-link');
        //om det finns - länka en eventListener
        if (searchLink) {
            searchLink.addEventListener('click', trackSearchLinkClick);
        }
            /******MALL FÖR CUSTOM EVENT******* */
            // if (typeof (window as any).gtag === 'function') {
            //     const DITT-ELEMENT = document.getElementById('ID PÅ DITT ELEMENT');
            //     if (DITT ELEMENT) {
            //         DITT ELEMENT.addEventListener('click', DIN FUNKTION);
            //     }
            // }
    } else {
        // om gtag inte hittas - letar den igen efter en delay
        setTimeout(function () {
            if (typeof (window as any).gtag === 'function') {
                const searchLink = document.getElementById('search-link');
                if (searchLink) {
                    searchLink.addEventListener('click', trackSearchLinkClick);
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
    (window as any).gtag("event", "note_deleted", {
        "event_category": "User Interactions",
        "event_label": "Note deleted",
        "value": id
    });
}

// Listen for note delete
document.addEventListener("noteDeleted", function(event) {
    const id = (<any>event).detail.id;
    deleteNoteFromLocalStorage(id);

    // call the tracking 
    noteDeletion(id); 
}); 

