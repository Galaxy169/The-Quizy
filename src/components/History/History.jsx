import { useEffect, useState } from "react";
import "./History.css";
import { deleteQuizData, loadQuizData } from "../../helper/indexedDB";
import formatDate from "../../helper/formatDate";

function History() {
  const [history, setHistory] = useState([]);

  // Fetch data from IndexedDB using our custom api
  useEffect(() => {
    const fetchData = async () => {
      const data = await loadQuizData();
      setHistory(data);
    };
    fetchData();
  }, []);

  // On clear history
  const handleClear = () => {
    deleteQuizData();
    setHistory([]);
  };

  return (
    <>
      <div className="history">
        {history.length > 0 ? (
          <ul className="item">
            {history.map((data) => (
              <li key={data.id}>
                <p>{formatDate(data.date)}</p>
                <p>Points: {data.points}</p>
              </li>
            ))}
          </ul>
        ) : (
          <span>No quiz history yet.</span>
        )}
      </div>
      {history.length > 0 && (
        <button
          className="btn clear"
          onClick={handleClear}
          disabled={!history.length > 0}
        >
          Clear history
        </button>
      )}
    </>
  );
}

export default History;
