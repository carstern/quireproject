


// funktion som spårar sökfunktionen
function trackSearchWelcomeClick() {
    // skickar event till GA4
    (window as any).gtag('event', 'welcome_link_clicked', {
        'event_category': 'User Interaction',
        'event_label': 'Welcome Link Clicked'
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
        const welcomeOverlay = document.getElementById('welcome-link');
        //om det finns - länka en eventListener
        if (welcomeOverlay) {
            welcomeOverlay.addEventListener('click', trackSearchWelcomeClick);
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
                const welcomeOverlay = document.getElementById('welcome-link');
                if (welcomeOverlay) {
                    welcomeOverlay.addEventListener('click', trackSearchWelcomeClick);
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
