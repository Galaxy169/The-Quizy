import "./Timer.css";
import { useEffect } from "react";
import { useQuiz } from "../../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  // Timer
  useEffect(() => {
    const intervalId = setInterval(() => dispatch({ type: "time" }), 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      <span>Time: </span>
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
