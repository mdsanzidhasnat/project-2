// File: SpendCharts.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendCharts = () => {
  // Sample grouped data
  const spendByDayData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Planned Spend",
        data: [120, 150, 180, 100, 200, 170, 90],
        backgroundColor: "#3498db", // Blue
      },
      {
        label: "Actual Spend",
        data: [100, 130, 160, 90, 180, 150, 80],
        backgroundColor: "#ffffff", // White
      },
    ],
  };

  const spendByHourData = {
    labels: ["0-3", "4-7", "8-11", "12-15", "16-19", "20-23"],
    datasets: [
      {
        label: "Planned Spend",
        data: [50, 70, 120, 200, 180, 90],
        backgroundColor: "#3498db", // Blue
      },
      {
        label: "Actual Spend",
        data: [40, 60, 100, 180, 160, 70],
        backgroundColor: "#ffffff", // White
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#ffffff" },
      },
      title: {
        display: true,
        color: "#ffffff",
        font: { size: 16 },
      },
    },
    scales: {
      x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.2)" } },
      y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.2)" } },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        backgroundColor: "#0a1f3d",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div style={{ flex: 1, padding: "10px", borderRadius: "10px" }}>
        <Bar
          data={spendByDayData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: "Spend by Day" },
            },
          }}
        />
      </div>
      <div style={{ flex: 1, padding: "10px", borderRadius: "10px" }}>
        <Bar
          data={spendByHourData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: "Spend by Hour" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SpendCharts;