import "./DarkMode.css";
import { useState } from "react";
import lightModeIcon from "/light-mode-icon.png";
import darkModeIcon from "/dark-mode-icon.png";
import { useEffect } from "react";

function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  // Load and set saved theme mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark-mode") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Set theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", `${!isDark ? "dark-mode" : "light-mode"}`);
  };

  return (
    <div onClick={toggleTheme} className="dark-mode-button">
      {isDark ? (
        <img src={lightModeIcon} alt={lightModeIcon} />
      ) : (
        <img src={darkModeIcon} alt={darkModeIcon} />
      )}
    </div>
  );
}

export default DarkMode;
