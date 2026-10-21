function Book({
  id,
  title,
  author,
  onDelete,
}: {
  id: string;
  title: string;
  author: string;
  onDelete: (id: string) => void;
}) {
  return (
    <li>
      {author} - {title}
      <p>
        <button onClick={() => onDelete(id)}>Удалить книгу</button>
      </p>
    </li>
  );
}

export default Book;
