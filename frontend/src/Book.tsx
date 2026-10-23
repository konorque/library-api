function Book({
  id,
  title,
  author,
  onDelete,
  onAddToMine,
}: {
  id: string;
  title: string;
  author: string;
  onDelete: (id: string) => void;
  onAddToMine: (id: string) => void;
}) {
  return (
    <li>
      {author} - {title}
      <p>
        <button onClick={() => onAddToMine(id)}>Add To Mine</button>
      </p>
      <p>
        <button onClick={() => onDelete(id)}>Delete</button>
      </p>
    </li>
  );
}

export default Book;
