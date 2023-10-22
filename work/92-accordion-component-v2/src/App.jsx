import { useState } from "react";
import "./App.css";
import faqs from "./faq";

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {data.map((element, i) => (
        <Item
          curOpen={curOpen}
          onOpen={setCurOpen} /* lift state up */
          num={i}
          title={element.title}
          key={element.title}
        >
          {element.text}
        </Item>
      ))}
    </div>
  );
}

function Item({ curOpen, onOpen, num, title, children }) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 10 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
