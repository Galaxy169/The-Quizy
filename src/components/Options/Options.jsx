import { useState } from "react";
import { useQuiz } from "../../contexts/QuizContext";
import "./Options.css";

function Options() {
  // State for storing numerical answer
  const [intAns, setIntAns] = useState("");
  const [message, setMessage] = useState("");

  // Get states fron context api using our custom hook
  const { questions, index, dispatch, answer } = useQuiz();

  // get current question
  const question = questions.at(index);

  const hasAnswered = answer !== null;

  // Handle interger answer
  const handleInt = (e) => {
    // Check if input is empty
    if (intAns.trim() === "") {
      setMessage("Please enter a valid number!");
      return;
    }

    // Check if input is a valid integer
    const validatedAnswer = Number(intAns);
    if (isNaN(validatedAnswer) || !Number.isInteger(validatedAnswer)) {
      setMessage("Please enter a valid integer!");
      return;
    }

    e.preventDefault();
    dispatch({ type: "answer", payload: validatedAnswer });
    setIntAns("");
    setMessage("");
  };

  return (
    <div className="options">
      {question.options ? (
        question.options.map((option, index) => {
          return (
            <button
              className={`btn opt ${index === answer ? "answer" : ""} ${
                hasAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              key={option}
              onClick={() => dispatch({ type: "answer", payload: index })}
              disabled={hasAnswered}
            >
              {option}
            </button>
          );
        })
      ) : (
        <>
          <div className="int-container">
            <label>Enter your answer</label>
            <p className="error-message">{message}</p>
            {hasAnswered && (
              <p>
                {answer == question.correctOption
                  ? `"Your answer ${answer} was correct"`
                  : `"Your answer ${answer} was wrong"`}
              </p>
            )}
            <input
              type="text"
              value={intAns}
              disabled={hasAnswered}
              onChange={(e) =>
                setIntAns(e.target.value.replace(/[^0-9-]/g, ""))
              }
            ></input>
            <button onClick={handleInt} disabled={hasAnswered} className="btn">
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Options;
