import { useState } from "react";
import "./App.css";
import initialItems from "./items";

function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const isClearList = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (isClearList) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> Far Away </h1>;
}

function Form({ onAddItem }) {
  const [description, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);

  const optionArr = Array.from({ length: 20 }, (element, idx) => idx + 1);

  function handleSubmit(event) {
    event.preventDefault();

    if (description.length < 1) return;

    const newItem = {
      id: Date.now(),
      description /* description: description */,
      quantity,
      packed: false,
    }; /* generate id the quick way */
    console.log(newItem);

    onAddItem(newItem); /* lift up state */

    setDesc("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {optionArr.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = items;

  /* if (sortBy === "input") {
    sortedItems = items;
  } else */

  if (sortBy === "description") {
    sortedItems = items.slice(0, items.length).sort((a, b) => {
      return a.description.localeCompare(b.description); /* return is needed */
    });
  } else if (sortBy === "packed") {
    sortedItems = items.slice(0, items.length).sort((a, b) => {
      return Number(a.packed) - Number(b.packed); /* return is needed */
    });
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
      <button onClick={onClearList}>Clear list</button>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </>
  );
}

function Stats({ items }) {
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

export default App;
