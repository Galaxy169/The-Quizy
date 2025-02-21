import { useQuiz } from "../../contexts/QuizContext";
import { saveQuizData } from "../../helper/indexedDB";

function NextButton() {
  const { dispatch, numQuestions, index, answer, points, highscore } =
    useQuiz();

  // Date
  const date = new Date();

  // On finish button, dispatch finish action and save data to the indexedDB
  const handleFinish = () => {
    dispatch({ type: "finish" });
    saveQuizData({ date, points });
  };

  // If current question is not the last question, show next button
  if (index < numQuestions - 1)
    return (
      <button
        className="btn"
        onClick={() => dispatch({ type: "nextQuestion" })}
        disabled={answer == null}
      >
        Next
      </button>
    );

  // If current question is the last question, show finish button
  if (index === numQuestions - 1)
    return (
      <button className="btn" onClick={handleFinish}>
        Finish
      </button>
    );
}

export default NextButton;
