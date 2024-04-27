const myLibrary = [];
const table = document.querySelector("tbody");
const addBookButton = document.querySelector(".add-book");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function updateButtonContent(button, read) {
  isRead = read === true ? "Read" : "Not Read";
  button.textContent = isRead;
}

function createStatusButton(book) {
  const button = document.createElement("button");
  updateButtonContent(button, book.read);
  button.classList.add("status");

  button.addEventListener("click", () => {
    book.toggleReadStatus();
    updateButtonContent(button, book.read);
  });

  return button;
}

function createDeleteButton() {
  const div = document.createElement("div");
  div.classList.add("delete-btn");

  div.addEventListener("click", (e) => {
    const tr = e.target.parentNode.parentNode;
    myLibrary.splice(tr.getAttribute("data-index"), 1);
    tr.remove();
  });

  return div;
}

function displayBook(book, index) {
  const tr = document.createElement("tr");
  const tds = [];

  tr.setAttribute("data-index", index);
  for (let i = 0; i < 5; i++) {
    tds.push(document.createElement("td"));
  }

  tds[0].textContent = book.title;
  tds[1].textContent = book.author;
  tds[2].textContent = book.pages;

  tds[3].appendChild(createStatusButton(book));
  tds[4].appendChild(createDeleteButton());

  tds.forEach(td => tr.appendChild(td));
  table.appendChild(tr);
}

function displayAllBooks() {
  myLibrary.forEach((book, index) => {
    displayBook(book, index);
  });
}

addBookButton.addEventListener("click", (e) => {
  const title = document.querySelector("input[name='title']").value;
  if (!title) {
    return;
  }
  e.preventDefault();
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
