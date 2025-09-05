// ThemeToggle.jsx
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.style.backgroundColor = "#1a1a1a"; // dark bg
      root.style.color = "#f5f5f5"; // text light
    } else {
      root.style.backgroundColor = "#f9f9f9"; // light bg
      root.style.color = "#333"; // text dark
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      style={{
        width: "56px",
        height: "28px",
        borderRadius: "14px",
        padding: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        backgroundColor: darkMode ? "#333" : "#ccc",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          transform: darkMode ? "translateX(28px)" : "translateX(0px)",
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
};

export default ThemeToggle;