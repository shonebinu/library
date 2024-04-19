const myLibrary = [];
const table = document.querySelector("tbody");
const addBookButton = document.querySelector(".add-book");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBook(book) {
  const tr = document.createElement("tr"); 
  const tds = [];
  for (let i = 0; i < 4; i++) {
    tds.push(document.createElement("td"));
  }

  tds[0].textContent = book.title;
  tds[1].textContent = book.author;
  tds[2].textContent = book.pages;
  tds[3].textContent = book.read === true ? "Yes" : "No";


  tds.forEach(td => tr.appendChild(td));
  table.appendChild(tr);
}

function displayAllBooks() {
  for (const book of myLibrary) {
    displayBook(book);
  }
}

addBookButton.addEventListener("click", () => {
  const title = document.querySelector("input[name='title']").value;
  const author = document.querySelector("input[name='author']").value;
  const pages = document.querySelector("input[name='pages']").value;
  const read = document.querySelector("select[name='status']").value === "true";

  addBookToLibrary(title, author, pages, read);
  displayBook(myLibrary.at(-1));
});

// sample filler data
addBookToLibrary("Lord of the Rings", "J.R.R. Tolkein", 1147, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

displayAllBooks();
