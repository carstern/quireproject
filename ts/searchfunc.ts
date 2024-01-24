const navContainer = document.getElementById("nav-container");
const searchLink = document.getElementById("search-link") as HTMLAnchorElement;
const navOutputContainer = document.getElementById("nav-output-container") as HTMLDivElement;

//deklarera inputfält
let inputArea:any 
let inputValue:string = "";

function createInput(){
    inputArea = document.createElement("input")
    inputArea.setAttribute("type", "search")
    inputArea.setAttribute("placeholder", "Search")
    inputArea.setAttribute("maxlength", "30")
    inputArea.classList.add("search-input")
    navContainer?.appendChild(inputArea);

    inputArea.addEventListener("input", function(){
        inputValue = inputArea.value;
        console.log(inputValue);
        });
};

searchLink.addEventListener("click", function(e){
    e.preventDefault();
    createInput();
});

//Funktion som hämtar notes från localstorage
let notes = getNotes() || [];
function getNotes(){
    const localStorageNotes:any = localStorage.getItem("savedNotes")
    const parsedNotes = JSON.parse(localStorageNotes);
    return parsedNotes;
}

//Funktion för filtrering
function filterNotes(inputValue:string){
const filteredNotes = notes.filter(function (n:string){
n.includes(inputValue)
})
} 

//else if// not found så händer detta osv, appenda till nav-output
//Foreacha filtered notes som inkluderar inputValue


// card.innerHTML = `
// <h3>${note.title}</h3>
// <p>${note.note}</p>
// <button class="button star-button">⭐</button>
// <button class="button delete-button">❌</button>