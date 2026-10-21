import Book from "./Book.tsx";
import { useEffect, useState } from "react";

type BookData = {
  _id: string;
  title: string;
  author: string;
};

function App() {
  const [books, setBooks] = useState<BookData[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function loadBooks() {
      const res = await fetch("http://localhost:3000/books");
      const data = await res.json();
      setBooks(data);
    }
    loadBooks();
  }, []);

  function addBook() {
    if (!title.trim() || !author.trim()) return;
    setBooks([
      ...books,
      { _id: String(Date.now()), title: title, author: author },
    ]);
    setTitle("");
    setAuthor("");
  }

  function deleteBook(bookId: string) {
    setBooks(books.filter((book) => book._id !== bookId));
  }

  return (
    <>
      <h1>Моя библиотека</h1>
      <ul>
        {books.length === 0 ? (
          <li>Список книг пуст</li>
        ) : (
          books.map((book) => (
            <Book
              key={book._id}
              id={book._id}
              title={book.title}
              author={book.author}
              onDelete={deleteBook}
            />
          ))
        )}
      </ul>
      <input
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Автор книги"
      />
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название книги"
      />
      <button onClick={addBook}>Добавить книгу</button>
    </>
  );
}

export default App;
