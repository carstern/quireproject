// Definiera en typ för event-objektet i filinmatningen
type FileInputEvent = Event & {
  target: HTMLInputElement & EventTarget;
};

document
  .getElementById("fileInput")!
  .addEventListener("change", function (e: Event) {
    const target = e.target as HTMLInputElement; // Typomvandling här
    const file = target.files![0];
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const img = document.createElement("img");
      img.src = e.target!.result as string;
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.resize = "both";
      img.style.overflow = "hidden";
      img.id = "resizableImage"; // Tilldela ID

      document.getElementById("noteInput")!.appendChild(img);
      addResizeListeners(img); // Lägg till eventlyssnare för den nya bilden
    };
    reader.readAsDataURL(file);
  });

// Funktion för att ändra storlek på bilden
function addResizeListeners(img: HTMLImageElement): void {
  let isResizing = false;
  let startX: number, startY: number, startWidth: number, startHeight: number;

  img.addEventListener("dblclick", () => {
    isResizing = !isResizing;
    img.classList.toggle("resizable");
  });

  img.addEventListener("mousedown", (e: MouseEvent) => {
    if (isResizing) {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = img.offsetWidth;
      startHeight = img.offsetHeight;
      e.preventDefault();
    }
  });

  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = startWidth + e.clientX - startX;
      const newHeight = startHeight + e.clientY - startY;
      img.style.width = newWidth + "px";
      img.style.height = newHeight + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}

// Funktion för att spara `div`-innehållet i localStorage
function saveDivContent(): void {
  const divContent = document.getElementById("noteInput")!.innerHTML;

  if (divContent.trim() === "") {
    console.log("Inget innehåll att spara");
    return;
  }

  const savedContent = localStorage.getItem("divContentArray");
  const contentArray: string[] = savedContent ? JSON.parse(savedContent) : [];

  contentArray.push(divContent);

  localStorage.setItem("divContentArray", JSON.stringify(contentArray));
}

// Funktion för att hämta och visa innehållet från localStorage
function loadDivContent(): void {
  const savedContent = localStorage.getItem("divContentArray");
  if (savedContent) {
    const contentArray: string[] = JSON.parse(savedContent);
    document.getElementById("editableDiv")!.innerHTML =
      contentArray[contentArray.length - 1];
  }
}

document
  .getElementById("saveButton")!
  .addEventListener("click", saveDivContent);

document.getElementById("getButton")!.addEventListener("click", function () {
  const savedContent = localStorage.getItem("divContentArray");
  if (savedContent) {
    const contentArray: string[] = JSON.parse(savedContent);
    const latestContent = contentArray[contentArray.length - 1];
    document.getElementById("contentDisplayDiv")!.innerHTML = latestContent;
  } else {
    console.log("Inget innehåll finns sparat i localStorage");
  }
});
