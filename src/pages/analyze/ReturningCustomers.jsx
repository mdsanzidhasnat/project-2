// File: ReturningCustomers.jsx
// Requires: npm install chart.js react-chartjs-2

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ReturningCustomers() {
  // --- styles (kept as inline styles for a single-file component) ---
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #071020 0%, #0f172a 60%)",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
    padding: "28px",
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "-0.2px",
  };

  const buttonGroup = { display: "flex", gap: "10px" };

  const buttonStyle = {
    background: "#0b1220",
    border: "1px solid rgba(148,163,184,0.08)",
    borderRadius: "8px",
    padding: "8px 14px",
    color: "#e6eef8",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  };

  // Use CSS Grid for predictable two-column layout (left = flexible, right = fixed)
  const twoColumn = {
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "20px",
    alignItems: "start",
    marginBottom: "24px",
  };

  const leftCol = {
    boxSizing: "border-box",
  };

  const rightCol = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const sectionTitle = { fontSize: "18px", fontWeight: 700, marginBottom: "8px" };
  const sectionDesc = { color: "#cbd5e1", fontSize: "14px", lineHeight: 1.4, marginBottom: "16px" };

  const cardGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  };

  const cardStyle = {
    background: "#0f172a",
    border: "1px solid #233040",
    borderRadius: "10px",
    padding: "16px",
    minHeight: "92px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardTitle = { fontSize: "13px", color: "#9fb0c8", marginBottom: "6px", fontWeight: 600 };
  const cardValue = { fontSize: "20px", fontWeight: 800 };

  const controlsRow = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" };
  const controlsLeft = { display: "flex", gap: "10px" };
  const periodButton = {
    background: "#071227",
    border: "1px solid #233040",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    color: "#dbeafe",
    fontWeight: 700,
    fontSize: "13px",
  };

  const controlsRight = { display: "flex", gap: "10px" };

  // Chart container sizes (we rely on react-chartjs-2 to fill the container)
  const chartLargeWrap = {
    background: "#0f172a",
    border: "1px solid #233040",
    borderRadius: "10px",
    height: "260px",
    padding: "12px",
    boxSizing: "border-box",
  };

  const chartSmallWrap = {
    background: "#0f172a",
    border: "1px solid #233040",
    borderRadius: "10px",
    height: "120px",
    padding: "12px",
    boxSizing: "border-box",
  };

  const tableContainer = {
    background: "#071227",
    border: "1px solid #233040",
    borderRadius: "10px",
    padding: "16px",
    marginTop: "6px",
  };

  const table = { width: "100%", borderCollapse: "collapse", fontSize: "14px", marginTop: "8px" };
  const th = {
    background: "transparent",
    padding: "10px 12px",
    textAlign: "left",
    color: "#9fb0c8",
    borderBottom: "1px solid #233040",
    fontWeight: 700,
    fontSize: "13px",
  };
  const td = { padding: "10px 12px", borderBottom: "1px solid #233040", color: "#e6eef8" };

  // --- Sample chart data (replace with your real data) ---
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Returning customers",
        data: [12, 19, 8, 15, 11, 20, 18, 14],
        tension: 0.3,
        borderWidth: 2,
        fill: false,
        borderColor: "#3b82f6", // <-- blue color

      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9fb0c8" } },
      y: { grid: { color: "#102b44ff" }, ticks: { color: "#9fb0c8" }, beginAtZero: true },
    },
  };

  const barData = {
    labels: months.slice(0, 6),
    datasets: [
      {
        label: "New vs Returning",
        data: [5, 7, 3, 6, 4, 8],
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9fb0c8" } },
      y: { grid: { color: "#172c3fff" }, ticks: { color: "#9fb0c8" }, beginAtZero: true },
    },
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={titleStyle}>Customer Cohorts</div>
        <div style={buttonGroup}>
          <button style={buttonStyle}>Segment Customers</button>
          <button style={buttonStyle}>Apply Order Segment</button>
        </div>
      </div>

      {/* Two-column main area (Grid guarantees charts stay to the right of the 4 boxes) */}
      <div style={twoColumn}>
        {/* LEFT: Section + 4 boxes (2x2) */}
        <div style={leftCol}>
          <div style={{ marginBottom: "12px" }}>
            <div style={sectionTitle}>Returning customers</div>
            <div style={sectionDesc}>
              This report shows the number/percent of customers that returned to make another order in each following month after they first ordered. The summary above shows typical retention at common milestones.
            </div>
          </div>

          <div style={cardGrid}>
            <div style={cardStyle}>
              <div style={cardTitle}>MONTH 3 AVERAGE</div>
              <div style={cardValue}>0 Customers</div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitle}>MONTH 6 AVERAGE</div>
              <div style={cardValue}>0 Customers</div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitle}>MONTH 12 AVERAGE</div>
              <div style={cardValue}>0 Customers</div>
            </div>

            <div style={cardStyle}>
              <div style={cardTitle}>MONTH 24 AVERAGE</div>
              <div style={cardValue}>0 Customers</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Controls + charts (large + small) */}
        <div style={rightCol}>
          <div style={controlsRow}>
            <div style={controlsLeft}>
              <button style={periodButton}>Month</button>
              <button style={periodButton}>Week</button>
              <button style={periodButton}>Year</button>
            </div>

            <div style={controlsRight}>
              <button style={{ ...periodButton, fontWeight: 600 }}>AI Prompt</button>
              <button style={{ ...periodButton, fontWeight: 600 }}>Export</button>
            </div>
          </div>

          {/* Large Line Chart */}
          <div style={chartLargeWrap}>
            <div style={{ height: "100%", width: "100%" }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Small Bar Chart */}
          <div style={chartSmallWrap}>
            <div style={{ height: "100%", width: "100%" }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width table below */}
      <div style={tableContainer}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={buttonStyle}>Cohort: Month</button>
            <button style={buttonStyle}>Segment: Returning</button>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={buttonStyle}>AI Prompt</button>
            <button style={buttonStyle}>Export</button>
          </div>
        </div>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Cohort</th>
              <th style={th}>Customers</th>
              <th style={th}>Month 1</th>
              <th style={th}>Month 2</th>
              <th style={th}>Month 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>August 2025</td>
              <td style={td}>14</td>
              <td style={td}>1</td>
              <td style={td}>-</td>
              <td style={td}>-</td>
            </tr>
            <tr>
              <td style={td}>September 2025</td>
              <td style={td}>1</td>
              <td style={td}>-</td>
              <td style={td}>-</td>
              <td style={td}>-</td>
            </tr>
            <tr>
              <td style={td}>AVERAGE</td>
              <td style={td}>-</td>
              <td style={td}>1</td>
              <td style={td}>0</td>
              <td style={td}>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}