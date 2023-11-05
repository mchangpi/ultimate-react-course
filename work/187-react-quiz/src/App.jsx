import { useEffect, useReducer } from "react";
import "./App.css";
// import DateCounter from "./DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "received":
      return { ...state, questions: action.payload, status: "ready" };
    case "failed":
      return { ...state, status: "error" };

    default:
      throw new Error("Action unkown");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "received", payload: data });
      } catch (err) {
        // console.error("Error", err);
        dispatch({ type: "failed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      {/* <DateCounter></DateCounter> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={questions.length} />}
      </Main>
    </div>
  );
}
