import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";

import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating messages={["Terrible", "Bad", "Okay", "Good", "Awesome"]} />
    <StarRating size="36" color="blue" className="test" defaultRating={2} />
    <Test />
  </React.StrictMode>
);
