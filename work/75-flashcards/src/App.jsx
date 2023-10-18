import { useState } from "react";
import "./App.css";
import questions from "./questions";

function FlashCards() {
  const [selected, setSelected] = useState(null);

  function handleClick(id) {
    setSelected((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flashcards">
      {questions.map((q) => (
        <div
          key={q.id}
          className={selected === q.id ? "selected" : ""}
          onClick={() => handleClick(q.id)}
        >
          <p>{selected === q.id ? q.answer : q.question}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

export default App;
