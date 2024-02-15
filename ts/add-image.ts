// Skapa en ny instans av DraggableImage för varje ny bild
// Skapa en ny instans av DraggableImage för varje ny bild
document
  .getElementById("fileInput")!
  .addEventListener("change", function (e: Event) {
    // Define FileInputEvent type within the change event handler
    type FileInputEvent = Event & {
      target: HTMLInputElement & EventTarget;
    };

    const target = (e as FileInputEvent).target as HTMLInputElement;
    const file = target.files![0];
    if (!file.type.startsWith("image/")) {
      console.log("Vald fil är inte en bild.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
       // Define DraggableImage class within the change event handler
 class DraggableImage {
  private imageElement: HTMLImageElement;
  private isDragging: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private isResizing: boolean = false;

  constructor(imageElement: HTMLImageElement) {
    if (!imageElement) {
      throw new Error("Ett HTMLImageElement måste tillhandahållas.");
    }

    this.imageElement = imageElement;
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    this.imageElement.addEventListener("mousedown", this.startDrag.bind(this));
    this.imageElement.addEventListener("dblclick", this.toggleResize.bind(this));
    document.addEventListener("mousemove", this.drag.bind(this));
    document.addEventListener("mouseup", this.endDrag.bind(this));
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  private toggleResize(event: MouseEvent): void {
    // Toggle resizing on double-click
    this.isResizing = !this.isResizing;
    if (this.isResizing) {
      this.imageElement.style.cursor = "nesw-resize"; // Ändra pekaren till ett storleksändringspekare
    } else {
      this.imageElement.style.cursor = "grab";
    }
    event.preventDefault();
  }

  private startDrag(event: MouseEvent): void {
    if (event.target === this.imageElement) {
      this.isDragging = true;
      this.startX = event.clientX - this.imageElement.offsetLeft;
      this.startY = event.clientY - this.imageElement.offsetTop;
      event.preventDefault();
    }
  }

  private drag(event: MouseEvent): void {
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

  private endDrag(): void {
    this.isDragging = false;
  }

  private onKeyDown(event: KeyboardEvent): void {
    // Stop resizing on Esc button press
    if (event.key === "Escape") {
      this.isResizing = false;
      this.imageElement.style.cursor = "grab";
      event.preventDefault();
    }
  }
}
      const reader = e.target as FileReader;
      const dataURL = reader.result as string; // Get the data URL
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
document.getElementById("uploadBtn")!.addEventListener("click", function () {
  (document.getElementById("fileInput") as HTMLInputElement).click();
});

document.getElementById("fileInput")!.addEventListener("change", function () {
  const input = this as HTMLInputElement;
  const file = input.files![0];
});


