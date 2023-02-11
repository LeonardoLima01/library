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
