import { useState } from "react";
import "./App.css";

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const handleStepMinus = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleStepPlus = () => {
    setStep((prev) => prev + 1);
  };

  const handleCountMinus = () => {
    setCount((prev) => prev - step);
  };

  const handleCountPlus = () => {
    setCount((prev) => prev + step);
  };

  const date = new Date();
  date.setDate(new Date().getDate() + count);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      ></input>
      <br />
      <button onClick={handleStepMinus}>-</button>
      <span>Step:{step}</span>
      <button onClick={handleStepPlus}>+</button>
      <br />
      <button onClick={handleCountMinus}>-</button>
      {/* <span>Count:{count}</span> */}
      <input
        type="text"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      ></input>
      <button onClick={handleCountPlus}>+</button>
      <br />
      <p>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} days AFTER Today is `
          : `${Math.abs(count)} days BEFORE Today is `}
        <span>{date.toDateString()}</span>
      </p>
      {count > 0 ? (
        <button
          onClick={() => {
            setStep(1);
            setCount(0);
          }}
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
