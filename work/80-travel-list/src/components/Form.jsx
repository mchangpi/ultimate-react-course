import { useState } from "react";

export default function Form({ onAddItem }) {
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
