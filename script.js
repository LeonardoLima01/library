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
  // Reset placeholder name
  document.querySelector("#pages").placeholder;

  container.style.display = "none";
  popupForm.style.display = "flex";
  body.style.display = "flex";
});

// Get and redirect forms input
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the form from auto-submitting

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read");

  // If pages value isn't a number
  if (isNaN(pages) || pages < 1) {
    (document.querySelector("#pages").value = ""),
      (document.querySelector("#pages").placeholder = "only positive NUMBERS");
    return;
  }

  let book = new Book(title, author, pages, read.checked);
  addBookToLibrary(book);

  // Reset "Add book" form input text
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
});

// Array to store books
let myLibrary = [];

// Refactored Book constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(book) {
  // Insert book into books array
  myLibrary.push(book);

  // Display it on screen
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
  // 'Pages' changes to 'page' depending on user input
  myLibrary[count].pages > 1
    ? (pagesDiv.innerHTML = myLibrary[count].pages + " pages")
    : (pagesDiv.innerHTML = myLibrary[count].pages + " page");
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
