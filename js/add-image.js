"use strict";
document
    .getElementById("fileInput")
    .addEventListener("change", function (e) {
    const target = e.target; // Typomvandling här
    const file = target.files[0];
    if (!file.type.startsWith("image/")) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.resize = "both";
        img.style.overflow = "hidden";
        img.id = "resizableImage"; // Tilldela ID
        document.getElementById("noteInput").appendChild(img);
        addResizeListeners(img); // Lägg till eventlyssnare för den nya bilden
    };
    reader.readAsDataURL(file);
});
// Funktion för att ändra storlek på bilden
function addResizeListeners(img) {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    img.addEventListener("dblclick", () => {
        isResizing = !isResizing;
        img.classList.toggle("resizable");
    });
    img.addEventListener("mousedown", (e) => {
        if (isResizing) {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = img.offsetWidth;
            startHeight = img.offsetHeight;
            e.preventDefault();
        }
    });
    document.addEventListener("mousemove", (e) => {
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
function saveDivContent() {
    const divContent = document.getElementById("noteInput").innerHTML;
    if (divContent.trim() === "") {
        console.log("Inget innehåll att spara");
        return;
    }
    const savedContent = localStorage.getItem("divContentArray");
    const contentArray = savedContent ? JSON.parse(savedContent) : [];
    contentArray.push(divContent);
    localStorage.setItem("divContentArray", JSON.stringify(contentArray));
}
// Funktion för att hämta och visa innehållet från localStorage
function loadDivContent() {
    const savedContent = localStorage.getItem("divContentArray");
    if (savedContent) {
        const contentArray = JSON.parse(savedContent);
        document.getElementById("editableDiv").innerHTML =
            contentArray[contentArray.length - 1];
    }
}
document
    .getElementById("saveButton")
    .addEventListener("click", saveDivContent);
document.getElementById("getButton").addEventListener("click", function () {
    const savedContent = localStorage.getItem("divContentArray");
    if (savedContent) {
        const contentArray = JSON.parse(savedContent);
        const latestContent = contentArray[contentArray.length - 1];
        document.getElementById("contentDisplayDiv").innerHTML = latestContent;
    }
    else {
        console.log("Inget innehåll finns sparat i localStorage");
    }
});
