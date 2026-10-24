import { useQuery, useQueryClient } from "@tanstack/react-query";

type MyBookLink = {
  _id: string;
  book: { _id: string; title: string; author: string };
};

function MyBooks({ token }: { token: string }) {
  const { data, isPending, error } = useQuery<MyBookLink[]>({
    queryKey: ["myBooks", token],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/me/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    },
  });

  const links = data ?? [];
  const queryClient = useQueryClient();

  async function deleteBook(bookId: string) {
    const res = await fetch(`http://localhost:3000/me/books/${bookId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    queryClient.invalidateQueries({ queryKey: ["myBooks"] });
  }

  return (
    <>
      <h2>Мои книги</h2>
      {isPending && <p>Загрузка...</p>}
      {error && <p>Не удалось загрузить</p>}
      {!isPending && !error && (
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
