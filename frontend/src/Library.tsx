import Book from "./Book.tsx";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type BookData = {
  _id: string;
  title: string;
  author: string;
};

function Library({ token }: { token: string | null }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { data, isPending, error } = useQuery<BookData[]>({
    queryKey: ["library"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/books");
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    },
  });

  const books = data ?? [];
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries({ queryKey: ["library"] });
    setTitle("");
    setAuthor("");
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
    queryClient.invalidateQueries({ queryKey: ["myBooks"] });
  }

  return (
    <>
      {isPending && <p>Загрузка...</p>}
      {error && <p>Не удалось загрузить</p>}
      {message && <p>{message}</p>}
      {!isPending && !error && (
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
