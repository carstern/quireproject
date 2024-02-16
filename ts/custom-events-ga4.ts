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


// --- CAROLINE --- \\
// function som spårar användning av knapp för att bifoga bilder
function trackFileUpload() {
    // Skicka event
    (window as any).gtag('event', 'image_attached', {
        'event_category': 'User Interaction',
        'event_label': 'Image Attached'
    });
}

// Kontrollera inläsning av gtag
window.onload = function () {
    // Check if gtag is available
    if (typeof (window as any).gtag === 'function') {
        // Målet att spåra
        const fileInput = document.getElementById('uploadBtn');
        if (fileInput) {
            fileInput.addEventListener('change', trackFileUpload);
        }
    } else {
        // Försök igen efter en satt delay om gtag inte hittas
        setTimeout(function () {
            if (typeof (window as any).gtag === 'function') {
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
let editModeStartTime: number | null = null;
function startEditModeTimer() {
    editModeStartTime = Date.now();
}

// Stoppa timer och lagra tiden
function stopEditModeTimerAndTrackTiming() {
    if (editModeStartTime !== null) {
        const editModeDuration = Date.now() - editModeStartTime;
        // Skicka till google analytics
        (window as any).gtag('event', 'edit_mode_duration', {
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
function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const noteInputDiv = document.getElementById('noteInput');

    // Kontrollera om klicket är utanför och stanna isåfall timer
    if (noteInputDiv && !noteInputDiv.contains(target)) {
        stopEditModeTimerAndTrackTiming();
        //avsluta eventlistenern när det klickas utanför
        document.body.removeEventListener('click', handleClickOutside);
    }
}

// --- CAROLINE SLUT --- \\