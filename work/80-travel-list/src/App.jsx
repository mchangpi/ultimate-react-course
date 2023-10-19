import { useState } from "react";
import "./App.css";
import initialItems from "./items";

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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button>❌</button>
      </li>
    </>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

export default App;
