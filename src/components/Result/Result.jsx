import "./Result.css";
import { useQuiz } from "../../contexts/QuizContext";

function Result() {
  const { points, maxPoint, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPoint) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoint} (
        {Math.ceil(percentage)}%) 🎉
      </p>
      <p className="highscore">(Highscore: {highscore} point 🥇) </p>
      <button
        className="btn restart"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Result;
