"use strict";
// Skapa en ny instans av DraggableImage för varje ny bild
// Skapa en ny instans av DraggableImage för varje ny bild
document
    .getElementById("fileInput")
    .addEventListener("change", function (e) {
    const target = e.target;
    const file = target.files[0];
    if (!file.type.startsWith("image/")) {
        console.log("Vald fil är inte en bild.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        // Define DraggableImage class within the change event handler
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
                document.addEventListener("keydown", this.onKeyDown.bind(this));
            }
            toggleResize(event) {
                // Toggle resizing on double-click
                this.isResizing = !this.isResizing;
                if (this.isResizing) {
                    this.imageElement.style.cursor = "nesw-resize"; // Ändra pekaren till ett storleksändringspekare
                }
                else {
                    this.imageElement.style.cursor = "grab";
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
            onKeyDown(event) {
                // Stop resizing on Esc button press
                if (event.key === "Escape") {
                    this.isResizing = false;
                    this.imageElement.style.cursor = "grab";
                    event.preventDefault();
                }
            }
        }
        const reader = e.target;
        const dataURL = reader.result; // Get the data URL
        if (!dataURL) {
            console.error("Failed to read the file.");
            return;
        }
        const img = new Image(); // Create a new image element
        img.onload = function () {
            const editableDiv = document.getElementById("noteInput");
            if (!editableDiv) {
                console.log("Kunde inte hitta 'noteInput'");
                return;
            }
            img.style.height = "50%"; // Adjust height to maintain proportions
            img.style.width = "auto";
            editableDiv.appendChild(img); // Append the image to the editable div
            new DraggableImage(img); // Create a new DraggableImage for the uploaded image
            console.log(`'editableDiv' innehåller nu bilden med ID: ${img.id}`);
        };
        img.onerror = function () {
            console.error("Failed to load image:", dataURL); // Log any errors loading the image
        };
        img.src = dataURL; // Set the data URL as the source of the image
    };
    reader.onerror = function (error) {
        console.log("Fel vid läsning av fil: ", error);
    };
    reader.readAsDataURL(file); // Read the file as a data URL
});
// Hantering av filväljar-knapp och uppdatering av filnamn
document.getElementById("uploadBtn").addEventListener("click", function () {
    document.getElementById("fileInput").click();
});
document.getElementById("fileInput").addEventListener("change", function () {
    const input = this;
    const file = input.files[0];
});
