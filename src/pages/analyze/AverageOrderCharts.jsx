// File: AverageOrderCharts.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AverageOrderCharts = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const avgOrderGrossData = {
    labels,
    datasets: [
      {
        label: "Average Order Gross",
        data: [120, 150, 170, 140, 180, 200],
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Avg Order Gross 2",
        data: [100, 130, 160, 120, 150, 180],
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const avgOrderItemsData = {
    labels,
    datasets: [
      {
        label: "Average Order Items",
        data: [5, 7, 6, 8, 9, 7],
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Avg Order Items 2",
        data: [6, 5, 7, 6, 8, 7],
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
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
      x: { ticks: { color: "#ffffff" }, grid: { color: "#444" } },
      y: { ticks: { color: "#ffffff" }, grid: { color: "#444" } },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        backgroundColor: "#0d1b3d",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {/* Average Order Gross Chart */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0d1b3d",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#ffffff", textAlign: "center" }}>
          Average Order Gross
        </h3>
        <Line data={avgOrderGrossData} options={options} />
      </div>

      {/* Average Order Items Chart */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0d1b3d",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#ffffff", textAlign: "center" }}>
          Average Order Items
        </h3>
        <Line data={avgOrderItemsData} options={options} />
      </div>
    </div>
  );
};

export default AverageOrderCharts;