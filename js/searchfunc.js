"use strict";
// // const navContainer = document.getElementById("nav-container");
// // const searchLink = document.getElementById("search-link") as HTMLAnchorElement;
// // const navOutputContainer = document.getElementById(
// //   "nav-output-container"
// // ) as HTMLDivElement;
// // // Interfaces
// // interface savedNotes {
// //   title: string;
// //   note: string;
// //   date: string;
// // }
// // //deklarera inputfält
// // let inputArea: any;
// // let inputValue: string = "";
// // function createInput() {
// //   inputArea = document.createElement("input");
// //   inputArea.setAttribute("type", "search");
// //   inputArea.setAttribute("placeholder", "Search");
// //   inputArea.setAttribute("maxlength", "30");
// //   inputArea.classList.add("search-input");
// //   navContainer?.appendChild(inputArea);
// //   inputArea.addEventListener("input", function () {
// //     inputValue = inputArea.value;
// //     console.log(inputValue);
// //     filterNotes(inputValue);
// //   });
// // }
// // searchLink.addEventListener("click", function (e) {
// //   e.preventDefault();
// //   createInput();
// // });
// // //Funktion som hämtar notes från localstorage
// // // Parsed notes end up in this array >;)
// // let notes = getNotes() || [];
// // function getNotes() {
// //   const localStorageNotes: any = localStorage.getItem("savedNotes");
// //   const parsedNotes = JSON.parse(localStorageNotes || "[]");
// //   return parsedNotes;
// // }
// // //Funktion för filtrering
// // function filterNotes(inputValue: string) {
// //   // Save filtered from notes array
// //   const filteredNotes = notes.filter(function (n: any) {
// //     // Check for includes match with inputValue
// //     return n.title.includes(inputValue) || n.note.includes(inputValue);
// //   });
// //   console.log("filtered Notes: ", filteredNotes);
// //   const resultText = document.querySelector(".result-text");
// //   if (resultText) {
// //     resultText.remove();
// //   }
// //   // Condition to display if includes ok
// //   if (filteredNotes.length === 0) {
// //     const resultText = document.createElement("p");
// //     resultText.classList.add("result-text");
// //     resultText.innerText = "Bajsa på dig inga resultat";
// //     navOutputContainer.appendChild(resultText);
// //   } else {
// //     notes.forEach((note: savedNotes) => {
// //         const bajsText = document.createElement('p');
// //         bajsText.innerHTML = `title: ${note.title}  note:${note.note} date:${note.date}`;
// //         navOutputContainer.appendChild(bajsText);
// //     });
// // }
// // // Namn för localstorage
// // // title: user entered title (string)
// // // note: user entered note (string)
// // // date: entered date (string)
// // //else if// not found så händer detta osv, appenda till nav-output
// // //Foreacha filtered notes som inkluderar inputValue
// // // card.innerHTML = `
// // // <h3>${note.title}</h3>
// // // <p>${note.note}</p>
// // // <button class="button star-button">⭐</button>
// // // <button class="button delete-button">❌</button>
// const navContainer = document.getElementById("nav-container");
// const searchLink = document.getElementById("search-link") as HTMLAnchorElement;
// const navOutputContainer = document.getElementById(
//   "nav-output-container"
// ) as HTMLDivElement;
// //deklarera inputfält
// let inputArea: any;
// let inputValue: string = "";
// // Create the input element
// function createInput() {
//   // Check if input exists, remove
//   if (inputArea) {
//     inputArea.remove();
//   }
//   // Create input element 
//   inputArea = document.createElement("input");
//   // Set the attributes
//   inputArea.setAttribute("type", "search");
//   inputArea.setAttribute("placeholder", "Search");
//   inputArea.setAttribute("maxlength", "30");
//   inputArea.classList.add("search-input");
//   navContainer?.appendChild(inputArea);
//   // Listen for input in the input element
//   inputArea.addEventListener("input", function () {
//     inputValue = inputArea.value;
//     console.log(inputValue);
//     // filterNotes(inputValue);
//   });
// }
// // Listen for clicks on search Anchor
// searchLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   createInput();
// });
// //Funktion som hämtar notes från localstorage
// // Parsed notes end up in this array >;)
// let notes = getNotes() || [];
// function getNotes() {
//     const key = "note"; 
//   const localStorageNotes: any = localStorage.getItem(key);
//   const parsedNotes = JSON.parse(localStorageNotes || "[]");
//   console.log(parsedNotes);
//   return parsedNotes;
// }
// getNotes(); 
