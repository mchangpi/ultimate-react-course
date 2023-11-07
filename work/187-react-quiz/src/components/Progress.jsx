function Progress({ index, numQuestions, points, sumPoints, userAnswer }) {
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
        <strong>{points}</strong> / {sumPoints}
      </p>
    </header>
  );
}

export default Progress;
