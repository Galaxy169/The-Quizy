import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Progress from "./components/Progress/Progress";
import StartScreen from "./components/StartScreen/StartScreen";
import Question from "./components/Question/Question";
import NextButton from "./components/NextButton/NextButton";
import Timer from "./components/Timer/Timer";
import History from "./components/History/History";
import { useQuiz } from "./contexts/QuizContext";
import Result from "./components/Result/Result";
import DarkMode from "./components/DarkMode/DarkMode";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        <DarkMode />
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && (
          <p>Some Error has occured while fetching data</p>
        )}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <div className="footer">
              <Timer />
              <NextButton />
            </div>
          </>
        )}
        {status === "finished" && <Result />}
        <History />
      </Main>
    </div>
  );
}

export default App;
