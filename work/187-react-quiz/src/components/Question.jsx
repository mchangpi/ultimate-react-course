import Options from "./Options";

function Question({ curQuestion, dispatch, userAnswer }) {
  // console.log(curQuestion);
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options
        question={curQuestion}
        dispatch={dispatch}
        userAnswer={userAnswer}
      />
    </div>
  );
}

export default Question;
