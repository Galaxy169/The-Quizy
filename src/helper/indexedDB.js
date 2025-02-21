// Define our variable
const DB_NAME = "QuizDB";
const STORE_NAME = "quizData";
const DB_VERSION = 1;

// Open or create the our database
function openDB() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save our points to indexedDB
export async function saveQuizData(data) {
  let db = await openDB();
  let transaction = db.transaction(STORE_NAME, "readwrite");
  let store = transaction.objectStore(STORE_NAME);
  const newData = { id: Date.now(), ...data }; // using date as unique id.
  store.add(newData);
}

// Load saved quiz data
export async function loadQuizData() {
  let db = await openDB();
  return new Promise((resolve) => {
    let transaction = db.transaction(STORE_NAME, "readonly");
    let store = transaction.objectStore(STORE_NAME);
    let request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => resolve([]);
  });
}

// Delete saved quiz data
export async function deleteQuizData() {
  let db = await openDB();
  let transaction = db.transaction(STORE_NAME, "readwrite");
  let store = transaction.objectStore(STORE_NAME);
  store.clear();
}
