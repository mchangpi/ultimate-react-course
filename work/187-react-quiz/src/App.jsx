import { useEffect, useReducer } from "react";
import "./App.css";
// import DateCounter from "./DateCounter";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButtin";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0 /* question index */,
  userAnswer: null /* answer index */,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  // console.log(state, action);
  switch (action.type) {
    case "received":
      return { ...state, questions: action.payload, status: "ready" };
    case "failed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        userAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, userAnswer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining > 0 ? state.secondsRemaining - 1 : 0,
        status: state.secondsRemaining < 1 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unkown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      userAnswer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (sum, curQuestion) => sum + curQuestion.points,
    0
  );
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
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              userAnswer={userAnswer}
            />
            <Question
              curQuestion={questions[index]}
              dispatch={dispatch}
              userAnswer={userAnswer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                userAnswer={userAnswer}
                index={index}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
