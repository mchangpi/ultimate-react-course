import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [cur, setCur] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCur() {
        try {
          setIsLoading(true);

          if (!amount || fromCur === toCur) {
            setCur(Number(amount));
            return;
          }

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          if (data.Response === "False") throw new Error("Not Found");

          setCur(Number(data?.rates[toCur]));
          console.log(data);
        } catch (e) {
          if (e.name !== "AbortError") {
            console.log("error", e.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchCur();
      return () => controller.abort();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? (
        <p>LOADING... </p>
      ) : (
        <p>
          Convert from {amount} {fromCur}, to {cur} {toCur}
        </p>
      )}
    </div>
  );
}
