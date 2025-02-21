import { SECS_PER_QUESTION, useQuiz } from "../../contexts/QuizContext";
import "./StartScreen.css";

function StartScreen() {
  const { dispatch, numQuestions } = useQuiz();

  return (
    <div className="start-screen">
      <h2>Welcome to The Quiz!</h2>
      <h3>{numQuestions} questions to test your Knowledge</h3>
      <p>Instructions</p>
      <ol>
        <li>
          For multiple-choice questions, select the one best answer (A, B, C, or
          D)
        </li>
        <li>For integer-type questions, write your numerical answer clearly</li>
        <li>No calculators unless specified</li>
        <li>
          Total time is calculated based on {SECS_PER_QUESTION} seconds per
          question
        </li>
      </ol>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Start the Quiz
      </button>
    </div>
  );
}

export default StartScreen;
