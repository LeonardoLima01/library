addBookButton = document.querySelector(".addButton>button");
container = document.querySelector(".container");
popupForm = document.querySelector(".popup");
body = document.querySelector("body");

addBookButton.addEventListener("click", () => {
  container.style.display = "none";
  popupForm.style.display = "flex";
  body.style.display = "flex";
});

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function displayBooks() {
  // display books iterating over myLibrary array
}
