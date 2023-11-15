import Options from "./Options";
import { useQuizContext } from "../contexts/QuizContext";

function Question() {
  const { curQuestion } = useQuizContext();

  // console.log(curQuestion);
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
