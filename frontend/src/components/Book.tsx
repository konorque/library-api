function Book({
  id,
  title,
  author,
  onAddToMine,
}: {
  id: string;
  title: string;
  author: string;
  onAddToMine: (id: string) => void;
}) {
  return (
    <li>
      {author} - {title}
      <p>
        <button onClick={() => onAddToMine(id)}>Add To Mine</button>
      </p>
    </li>
  );
}

export default Book;
