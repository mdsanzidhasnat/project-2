// File: HoursBetweenOrdersChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HoursBetweenOrdersChart = () => {
  const data = {
    labels: ["Order 1", "Order 2", "Order 3", "Order 4", "Order 5"],
    datasets: [
      {
        label: "Hours Between Created & Completed",
        data: [2, 5, 1.5, 3, 4],
        backgroundColor: "skyblue",
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
      title: {
        display: true,
        text: "Hours Between Order Created and Completed",
        color: "white",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a2a", // dark navy
        padding: "20px",
        borderRadius: "10px",
        width: "50%",       // page er 50% width
        marginLeft: 0,      // left side
        marginTop: "20px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default HoursBetweenOrdersChart;