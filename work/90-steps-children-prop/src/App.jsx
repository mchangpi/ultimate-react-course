import { useState } from "react";
import "./App.css";
import messages from "./messages.js";

export default function App() {
  return (
    <>
      <Steps />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);

  function handlePrevious() {
    console.log("Previous");
    if (step > 1) setStep((prev) => prev - 1);
  }

  function handleNext() {
    console.log("Next");
    if (step < 3) setStep((prev) => prev + 1);
  }
  return (
    <>
      <button className="close" onClick={() => setOpen((prev) => !prev)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <Message step={step}>{messages[step - 1]}</Message>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span>Previous {/* children prop */}
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next<span>👉</span> {/* children prop */}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Message({ step, children }) {
  return (
    <p className="message">
      <h3>Step {step}</h3>
      {children}
    </p>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
