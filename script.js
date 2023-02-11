// Variables
let addBookButton = document.querySelector(".addButton>button");
let container = document.querySelector(".container");
let popupForm = document.querySelector(".popup");
let body = document.querySelector("body");
let form = document.querySelector("form");
let booksGrid = document.querySelector(".booksGrid");
let deletedCards = 0;
let count = 0;

// Show/hide pop-up form
addBookButton.addEventListener("click", () => {
  container.style.display = "none";
  popupForm.style.display = "flex";
  body.style.display = "flex";
});

// Get and redirect forms input
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the form from autosubmitting

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read");

  let book = new Book(title, author, pages, read.checked);
  addBookToLibrary(book);
});

// Array to store books
let myLibrary = [];

function Book(title, author, pages, read) {
  // The constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  // Do stuff here
  myLibrary.push(book);

  displayBooks();
}

function displayBooks() {
  // Variables
  let mainDiv = document.createElement("div");
  let titleDiv = document.createElement("div");
  let authorDiv = document.createElement("div");
  let pagesDiv = document.createElement("div");
  let readButton = document.createElement("button");
  readButton.className = "read";
  let deleteButton = document.createElement("button");
  deleteButton.style.backgroundColor = "gray";
  deleteButton.className = "deleteButton";

  // Delete cards
  deleteButton.addEventListener("click", () => {
    cardIndex = deleteButton.parentElement.className.slice(-1) - deletedCards;
    myLibrary.splice(cardIndex, 1);
    mainDiv.remove();
    deletedCards++;
    count--;
  });

  // Update innerHTML
  titleDiv.innerHTML = '"' + myLibrary[count].title + '"';
  authorDiv.innerHTML = myLibrary[count].author;
  pagesDiv.innerHTML = myLibrary[count].pages + " pages";
  deleteButton.innerHTML = "Remove";

  // Change (Read/Not read) div based on the checkbox
  myLibrary[count].read === true
    ? ((readButton.innerHTML = "Read"),
      (readButton.style.backgroundColor = "rgb(149, 255, 175)"),
      (readButton.style.color = "black"))
    : ((readButton.innerHTML = "Not read"),
      (readButton.style.backgroundColor = "rgb(255, 117, 117)"),
      (readButton.style.color = "white"));

  // Read button toggle (read / not read) on click
  readButton.addEventListener("click", () => {
    readButton.innerHTML === "Read"
      ? ((readButton.innerHTML = "Not read"),
        (readButton.style.backgroundColor = "rgb(255, 117, 117)"),
        (readButton.style.color = "white"))
      : ((readButton.innerHTML = "Read"),
        (readButton.style.backgroundColor = "rgb(149, 255, 175)"),
        (readButton.style.color = "black"));
  });

  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(authorDiv);
  mainDiv.appendChild(pagesDiv);
  mainDiv.appendChild(readButton);
  mainDiv.appendChild(deleteButton);

  // Showing books page and hiding popup forms
  container.style.display = "flex";
  popupForm.style.display = "none";
  body.style.display = "block";

  // Tag each mainDiv with the respective book index on the array
  mainDiv.className = "card-" + count;

  count++;
  booksGrid.appendChild(mainDiv);
}
