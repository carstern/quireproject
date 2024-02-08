"use strict";

document
    .getElementById("fileInput")
    .addEventListener("change", function (e) {
        let imageCounter = 0; // Räknare för att hålla koll på antalet inlästa bilder
        // Skapa en ny instans av DraggableImage för varje ny bild
    const target = e.target;
    const file = target.files[0];
    if (!file.type.startsWith("image/")) {
        console.log("Vald fil är inte en bild.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.id = `insertedImage${imageCounter++}`; // Ge bilden ett unikt ID
        const editableDiv = document.getElementById("noteInput");
        if (!editableDiv) {
            console.log("Kunde inte hitta 'noteInput'");
            return;
        }
        editableDiv.appendChild(img);
        new DraggableImage(img); // Skapa en ny DraggableImage för den uppladdade bilden
        console.log(`'editableDiv' innehåller nu bilden med ID: ${img.id}`);
    };
    reader.onerror = function (error) {
        console.log("Fel vid läsning av fil: ", error);
    };
    reader.readAsDataURL(file);
});
// Hantering av filväljar-knapp och uppdatering av filnamn
document.getElementById("uploadBtn").addEventListener("click", function () {
    document.getElementById("fileInput").click();
});
document.getElementById("fileInput").addEventListener("change", function () {
    const input = this;
    const file = input.files[0];
    if (file) {
        document.getElementById("fileName").textContent = file.name;
    }
    else {
        document.getElementById("fileName").textContent = "Ingen fil vald";
    }
});
// Funktion för att spara `div`-innehållet i localStorage
//   function saveDivContent(): void {
//     const divContent = document.getElementById("noteInput")!.innerHTML;
//     if (divContent.trim() === "") {
//       console.log("Inget innehåll att spara");
//       return;
//     }
//     const savedContent = localStorage.getItem("divContentArray");
//     const contentArray: string[] = savedContent ? JSON.parse(savedContent) : [];
//     contentArray.push(divContent);
//     localStorage.setItem("divContentArray", JSON.stringify(contentArray));
//   }
//   // Funktion för att hämta och visa innehållet från localStorage
//   function loadDivContent(): void {
//     const savedContent = localStorage.getItem("divContentArray");
//     if (savedContent) {
//       const contentArray: string[] = JSON.parse(savedContent);
//       document.getElementById("noteInput")!.innerHTML =
//         contentArray[contentArray.length - 1];
//     }
//   }
//   document
//     .getElementById("save-note-button")!
//     .addEventListener("click", saveDivContent);
//   document.getElementById("getButton")!.addEventListener("click", function () {
//     const savedContent = localStorage.getItem("divContentArray");
//     if (savedContent) {
//       const contentArray: string[] = JSON.parse(savedContent);
//       const latestContent = contentArray[contentArray.length - 1];
//       document.getElementById("contentDisplayDiv")!.innerHTML = latestContent;
//     } else {
//       console.log("Inget innehåll finns sparat i localStorage");
//     }
//   });
//   saveDivContent();
//   // Funktion som körs när mutationer observeras
//   const mutationCallback: MutationCallback = (mutationsList, observer) => {
//     for (const mutation of mutationsList) {
//       if (mutation.type === "childList") {
//         console.log("Ett barn-element har lagts till eller tagits bort.");
//       } else if (mutation.type === "attributes") {
//         console.log(`Attributet ${mutation.attributeName} har modifierats.`);
//       }
//     }
//   };
// Kod för att hantera drag-and-drop
class DraggableImage {
    constructor(imageElement) {
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.isResizing = false;
        if (!imageElement) {
            throw new Error("Ett HTMLImageElement måste tillhandahållas.");
        }
        this.imageElement = imageElement;
        this.attachEventListeners();
    }
    attachEventListeners() {
        this.imageElement.addEventListener("mousedown", this.startDrag.bind(this));
        this.imageElement.addEventListener("dblclick", this.toggleResize.bind(this));
        document.addEventListener("mousemove", this.drag.bind(this));
        document.addEventListener("mouseup", this.endDrag.bind(this));
    }
    toggleResize(event) {
        if (this.isResizing) {
            // Avsluta ändringsläget när bildens storlek är ändrad
            this.isResizing = false;
            this.imageElement.style.cursor = "grab";
        }
        else {
            // Aktivera ändringsläget när bild dubbelt klickas
            this.isResizing = true;
            this.imageElement.style.cursor = "nesw-resize"; // Ändra pekaren till ett storleksändringspekare
        }
        event.preventDefault();
    }
    startDrag(event) {
        if (event.target === this.imageElement) {
            this.isDragging = true;
            this.startX = event.clientX - this.imageElement.offsetLeft;
            this.startY = event.clientY - this.imageElement.offsetTop;
            event.preventDefault();
        }
    }
    drag(event) {
        if (this.isDragging) {
            const x = event.clientX - this.startX;
            const y = event.clientY - this.startY;
            this.imageElement.style.position = "absolute";
            this.imageElement.style.left = `${x}px`;
            this.imageElement.style.top = `${y}px`;
        }
        if (this.isResizing) {
            // Ändra storlek på bilden baserat på muspekarens position
            const width = event.clientX - this.imageElement.offsetLeft;
            const height = event.clientY - this.imageElement.offsetTop;
            this.imageElement.style.width = `${width}px`;
            this.imageElement.style.height = `${height}px`;
        }
    }
    endDrag() {
        this.isDragging = false;
    }
}
