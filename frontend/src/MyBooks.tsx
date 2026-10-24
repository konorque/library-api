import { useEffect, useState } from "react";

type MyBookLink = {
  _id: string;
  book: { _id: string; title: string; author: string };
};

function MyBooks({ token }: { token: string }) {
  const [links, setLinks] = useState<MyBookLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMyBooks() {
      try {
        const res = await fetch("http://localhost:3000/me/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setLinks(data);
      } catch {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadMyBooks();
  }, [token]);

  async function deleteBook(bookId: string) {
    const res = await fetch(`http://localhost:3000/me/books/${bookId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    setLinks(links.filter((link) => link.book._id !== bookId));
  }

  return (
    <>
      <h2>Мои книги</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {links.length === 0 ? (
            <li>Список пуст</li>
          ) : (
            links.map((link) => (
              <li key={link._id}>
                {link.book.author} - {link.book.title}
                <p></p>
                <button onClick={() => deleteBook(link.book._id)}>
                  Удалить
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}

export default MyBooks;
