// funktion som spårar sökfunktionen
function tracksearchBtnClick() {
    // skickar event till GA4
    (window as any).gtag("event", "search_link_clicked", {
      event_category: "Navigation",
      event_label: "Search Link Clicked",
    });
  }
  
  // funktion som spårar klick på länken "Alla anteckningar"
  function trackAllNotesClicked() {
    // skickar event till GA4
    (window as any).gtag("event", "all_Notes_link_clicked", {
      event_category: "Anteckningar",
      event_label: "Se alla anteckningar",
    });
  }
  
  // function som spårar användning av knapp för att bifoga bilder
  function trackFileUpload() {
      // Skicka event
      (window as any).gtag('event', 'image_attached', {
          'event_category': 'User Interaction',
          'event_label': 'Image Attached'
      });
  }
  
  // Funktion som spårar klick på favoritknappen
  function favoriteClicked() {
      // skickar event till GA4
      (window as any).gtag('event', 'favorite_btn_clicked', {
          'event_category': 'favorite',
          'event_label': 'klicka på favorite knapp'
      });
  }
  
  // Funktion som spårar klick på välkomstlänken
  function trackSearchWelcomeClick() {
      // skickar event till GA4
      (window as any).gtag('event', 'welcome_link_clicked', {
          'event_category': 'User Interaction',
          'event_label': 'Welcome Link Clicked'
      });
  }
  
  // Funktion som spårar skapandet av nya anteckningar
  function trackCreatedNotes(): void {
    (window as any).gtag("event", "create_new_note", {
      event_category: "Note Interaction",
      event_label: "New Note Clicked",
    });
  }
  
  // Funktion som spårar borttagning av anteckningar
  function noteDeletion(id: any) {
      // Send to Google Analytics 
      (window as any).gtag("event", "note_deleted", {
          "event_category": "User Interactions",
          "event_label": "Note deleted",
          "value": id
      });
  }
  
  // Funktion för att starta timern för edit-mode
  let editModeStartTime: number | null = null;
  function startEditModeTimer() {
      editModeStartTime = Date.now();
  }
  
  // Funktion för att stoppa timern för edit-mode och spåra tiden
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
  
  // Funktion för att stoppa timern när klick utanför anteckningsrutan
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
  
  // säkerställer att allt har laddats innan eventhandlers defineras
//   window.onload = function (): void {
//     //lyssnar till create new note
//     if (typeof (window as any).gtag === "function") {
     
  
//       // undersöker att g-tagen är tillgänglig
//       if (typeof (window as any).gtag === 'function') {
          
//       } else {
//           // om gtag inte hittas - letar den igen efter en delay
//           setTimeout(function () {
//               if (typeof (window as any).gtag === 'function') {
//                   const welcomeOverlay = document.getElementById('welcome-link');
//                   if (welcomeOverlay) {
//                       welcomeOverlay.addEventListener('click', trackSearchWelcomeClick);
//                   }
//               }
  
//           }, 1000); 
//       }
//     } else {
//       setTimeout(function () {
//         if (typeof (window as any).gtag === "function") {
//           const createNote = document.querySelector("new-note-button");
//           if (createNote) {
//             createNote.addEventListener("click", trackCreatedNotes);
//           }
//         }
//       }, 1000);
//     }
//   };
  
  // //lyssnar till radera knappen
  document.addEventListener("noteDeleted", function(event) {
      const id = (<any>event).detail.id;
      deleteNoteFromLocalStorage(id);
  
      // call the tracking 
      noteDeletion(id); 
  }); 
  
  // //lyssnar till sökknappen
  const searchBtn = document.getElementById("search-link");
  if (searchBtn) {
      searchBtn.addEventListener("click", tracksearchBtnClick);
  }
  
  // //lyssnar till all notes knappen
  const allNotesLink = document.getElementById("all-notes-link");
  if (allNotesLink) {
      allNotesLink.addEventListener("click", trackAllNotesClicked);
  }
  
  // //lyssnar till bild knappen
  const fileInput = document.getElementById('uploadBtn');
  if (fileInput) {
      fileInput.addEventListener('click', trackFileUpload);
  }
  
  // //lyssnar till fav-btn
  const favLink = document.getElementById("fav-link");
  if (favLink) {
      favLink.addEventListener("click", favoriteClicked);
  }

  const createNote = document.querySelector("new-note-button");
  if (createNote) {
    createNote.addEventListener("click", trackCreatedNotes);

    // definera/deklarera elementet att spåra
    const welcomeOverlay = document.getElementById('welcome-link');
    //om det finns - länka en eventListener
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