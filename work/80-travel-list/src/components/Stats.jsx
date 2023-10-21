export default function Stats({ items }) {
  if (items.length < 1)
    return (
      <footer className="stats">
        <em>Start adding items to your packing list</em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percent < 100
          ? `💼 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percent}%)`
          : "You got everything! Ready to go"}
      </em>
    </footer>
  );
}
