// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Apply global background & text colors
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.backgroundColor = "#0a1f44";
      root.style.color = "#fff";
    } else {
      root.style.backgroundColor = "#ffffff";
      root.style.color = "#000";
    }
  }, [darkMode]);

  // Chart & dashboard data
  const salesData = {
    labels: ["31/07","01/08","02/08","03/08","04/08","05/08","06/08","07/08","08/08","09/08","10/08","11/08","12/08","13/08","14/08"],
    datasets: [
      {
        label: "Net Sales",
        data: [300,400,500,1700,800,700,650,300,200,150,100,50,80,120,140],
        borderColor: darkMode ? "rgba(75,192,192,1)" : "rgba(0,128,128,1)",
        backgroundColor: darkMode ? "rgba(75,192,192,0.2)" : "rgba(0,128,128,0.1)",
      },
    ],
  };

  const last3MonthsData = {
    labels: ["June", "July", "August"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 15000, 18000],
        borderColor: darkMode ? "#10b981" : "#059669",
        backgroundColor: darkMode ? "rgba(16,185,129,0.2)" : "rgba(5,150,105,0.1)",
        tension: 0.3,
      },
    ],
  };

  const activityItems = [
    "Kirk Gregory (Monthly) $19.00",
    "Sergio Holt (Coupon) $9.99",
    "Ella Watkins (Monthly) $19.00",
    "Niklas Meyer (Regular) $9.99",
    "Andrea Juliao (Yearly) $19.00",
    "James Smith (Monthly) $29.00",
  ];

  // Inline styles based on darkMode
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: darkMode ? "#081738" : "#e5e7eb",
    color: darkMode ? "#fff" : "#000",
    transition: "all 0.3s ease",
  };

  const boxStyle = {
    backgroundColor: darkMode ? "#0f2a5c" : "#f3f4f6",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  const activityItemStyle = (index) => ({
    backgroundColor: darkMode ? "#081738" : "#e5e7eb",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "4px",
    transition: "all 0.3s ease",
  });

  const toggleButtonStyle = {
    width: "40px",
    height: "20px",
    borderRadius: "10px",
    position: "relative",
    cursor: "pointer",
    backgroundColor: darkMode ? "#7c3aed" : "#9ca3af",
    transition: "all 0.3s ease",
  };

  const toggleCircleStyle = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "1px",
    left: darkMode ? "20px" : "2px",
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh", fontFamily: "sans-serif", transition: "all 0.3s ease" }}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>A2Key</h1>
          <nav style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Analytics</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Reports</a>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Settings</a>
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: darkMode ? "#fff" : "#e5e7eb",
              color: "#000",
              transition: "all 0.3s ease",
            }}
          />
          <div style={toggleButtonStyle} onClick={() => setDarkMode(!darkMode)}>
            <div style={toggleCircleStyle}></div>
          </div>
        </div>
      </header>

      {/* Dashboard Boxes */}
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        <div style={boxStyle}>
          <h2 style={{ fontWeight: "600" }}>Net Sales</h2>
          <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>$8,332.07</p>
          <Line data={salesData} height={80} />
        </div>

        <div style={{ ...boxStyle, maxHeight: "288px", overflowY: "auto" }}>
          <h2 style={{ fontWeight: "600", position: "sticky", top: 0, backgroundColor: darkMode ? "#0f2a5c" : "#f3f4f6", padding: "4px", zIndex: 10 }}>Activity</h2>
          <ul style={{ marginTop: "8px" }}>
            {activityItems.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={activityItemStyle(idx)}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div style={boxStyle}>
          <h2 style={{ fontWeight: "600" }}>Last 3 Months</h2>
          <Line data={last3MonthsData} height={80} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;