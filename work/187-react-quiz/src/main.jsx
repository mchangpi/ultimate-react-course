import React from "react";
import ReactDOM from "react-dom/client";
import { QuizProvider } from "./contexts/QuizContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
