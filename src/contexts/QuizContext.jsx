import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

// Define time per question
export const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [], // Store question from api
  status: "loading", // loading, error, ready, active, finished
  index: 0, // current question index
  answer: null, // user answer
  points: 0, // point on correct answer
  highscore: 0,
  secondsRemaining: null,
  numQuestions: 0,
};

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    // Fetch question and store it in questions list.
    // set status to ready and calculated total no of question
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        numQuestions: state.questions.length,
      };

    // in case of error in fetching data
    case "dataFailed":
      return { ...state, state: "error" };

    // On click on start button, set status to active (for conditional rendering of component)
    // Calculate the total time: total number of question * seconds per question
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    // Go to next question by incrementing index by one and reset the answer
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    // On selecting answer:
    // Store user answer in answer state
    // Compare user answer with the answer from our data;
    // if the condition is true add that question point in our points state

    case "answer": {
      // Get current active question
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload == question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    // Timer tick, when timer ends, set status state to "finished" to end the quiz
    case "time":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    // Ending the quiz
    // Calculate highscore: if the total points are greater than the value of highscore state then set it as new highscore
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points === state.highscore ? state.highscore : state.points,
      };

    // Restart quiz
    // Reset states, set status to ready and calculate total numbers of question
    // Set question state using stored fetched data without fetching the data again from "dataReceived"
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        numQuestions: state.questions.length,
      };

    default:
      throw new Error("Action Unknown");
  }
}

function QuizProvider({ children }) {
  // Destructor state
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      numQuestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Calculate max points: sum of all points
  const maxPoint = questions?.reduce((prev, curr) => prev + curr.points, 0);

  // Fetch Data from API
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch("/questions.json");

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        // Call our dispatch function and send fetched data as payload
        // Join both type of question array.
        dispatch({
          type: "dataReceived",
          payload: [...data.questions.mcqs, ...data.questions.intType],
        });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.error(error.message);
      }
    };
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        dispatch,
        maxPoint,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook to use our quiz context
function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext was used outside QuizProvider");
  return context;
}
export { QuizProvider, useQuiz };
