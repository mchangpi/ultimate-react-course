import { useEffect, useRef } from "react";
import "../App.css";
import { useKey } from "../hooks/useKey";

export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function Search({ query, setQuery }) {
  const inputEL = useRef(null);

  useKey("enter", () => {
    if (document.activeElement === inputEL.current) {
      return;
    }
    inputEL.current.focus();
    setQuery("");
  });

  useEffect(
    function () {
      // console.log(inputEL.current);

      const callback = (e) => {};

      document.addEventListener("keydown", callback);

      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEL}
    />
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
