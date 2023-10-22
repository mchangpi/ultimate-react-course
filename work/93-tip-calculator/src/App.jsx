import "./App.css";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercent1] = useState(0);
  const [percentage2, setPercent2] = useState(0);

  const tip = ((percentage1 + percentage2) / 2 / 100) * bill;

  function handleReset() {
    setBill("");
    setPercent1(0);
    setPercent2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onBill={setBill}></BillInput>
      <SelectPercentage percentage={percentage1} onSelect={setPercent1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercent2}>
        How did your friend like the service?
      </SelectPercentage>
      {Number(bill) > 0 && (
        <>
          <Output bill={bill} tip={tip}></Output>
          <Reset onReset={handleReset}></Reset>
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onBill }) {
  return (
    <div>
      How much was the bill?
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onBill(e.target.value)}
      ></input>
    </div>
  );
}

function SelectPercentage({ percentage, onSelect, children }) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied(0%)</option>
        <option value="5">It was OK(5%)</option>
        <option value="10">It was Good(10%)</option>
        <option value="20">It was Amazing!(20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div>
      You pay ${Number(bill) + Number(tip)} (${bill} + ${tip} tip)
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
