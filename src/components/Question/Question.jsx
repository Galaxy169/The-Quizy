import { useQuiz } from "../../contexts/QuizContext";
import Options from "../Options/Options";
import "./Question.css";

function Question() {
  const { questions, index } = useQuiz();

  // get current question
  const question = questions.at(index);

  return (
    <div className="question">
      <div>
        <h2>{question.question}</h2>
      </div>
      <Options />
    </div>
  );
}

export default Question;
