import Book from "./Book.tsx";
import { useEffect, useState } from "react";

type BookData = {
  _id: string;
  title: string;
  author: string;
};

function Library({ token }: { token: string | null }) {
  const [books, setBooks] = useState<BookData[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("http://localhost:3000/books");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBooks(data);
      } catch {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  async function addBook() {
    if (!title.trim() || !author.trim()) return;
    const res = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, author }),
    });
    if (!res.ok) return;
    const book = await res.json();
    setBooks([
      ...books,
      { _id: book._id, title: book.title, author: book.author },
    ]);
    setTitle("");
    setAuthor("");
  }

  function deleteBook(bookId: string) {
    setBooks(books.filter((book) => book._id !== bookId));
  }

  async function addToMine(bookId: string) {
    if (!token) return;
    const res = await fetch(`http://localhost:3000/me/books/${bookId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setMessage("Добавлено");
    else if (res.status === 409) setMessage("Книга уже в вашем списке");
    else setMessage("Не удалось добавить");
  }

  return (
    <>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      {!loading && !error && (
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
                onAddToMine={addToMine}
              />
            ))
          )}
        </ul>
      )}
      {token && (
        <>
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
      )}
    </>
  );
}

export default Library;
