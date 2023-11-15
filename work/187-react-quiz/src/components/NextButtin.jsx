import { useQuizContext } from "../contexts/QuizContext";

function NextButtin() {
  const { dispatch, userAnswer, index, numQuestions } = useQuizContext();

  if (userAnswer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  else if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButtin;
