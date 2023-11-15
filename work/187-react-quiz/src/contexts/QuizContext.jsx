import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
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

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "received", payload: data });
        console.log(data);
      } catch (err) {
        // console.error("Error", err);
        dispatch({ type: "failed" });
      }
    }
    fetchQuestions();
  }, []);

  const maxPoints = questions.reduce(
    (sum, curQuestion) => sum + curQuestion.points,
    0
  );

  const providerValue = {
    questions,
    numQuestions: questions.length,
    status,
    index,
    curQuestion: questions[index],
    userAnswer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
    maxPoints,
  };

  return (
    <QuizContext.Provider value={providerValue}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuizContext };
