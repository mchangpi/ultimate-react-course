import { useQuizContext } from "../contexts/QuizContext";

function Options() {
  const { curQuestion, dispatch, userAnswer } = useQuizContext();

  const hasAnswered = userAnswer !== null;
  return (
    <div className={"options"}>
      {curQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === userAnswer ? "answer" : ""} ${
            hasAnswered &&
            (index === curQuestion.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
