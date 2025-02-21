import { useQuiz } from "../../contexts/QuizContext";
import "./Progress.css";

function Progress() {
  const { index, numQuestions, points, maxPoint, answer } = useQuiz();
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        Score: <strong>{points}</strong> / {maxPoint}
      </p>
    </div>
  );
}

export default Progress;
