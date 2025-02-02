import { useQuizContext } from "../contexts/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPoints, userAnswer } =
    useQuizContext();

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(userAnswer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
