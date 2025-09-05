import React from "react";
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
  Filler,
} from "chart.js";

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

const DashboardCharts = () => {
  // Item Count Distribution (Spline)
  const itemCountData = {
    labels: ["Item A", "Item B", "Item C", "Item D"],
    datasets: [
      {
        label: "Item Count",
        data: [120, 90, 150, 70],
        borderColor: "rgba(30, 144, 255, 1)", // line color
        backgroundColor: "rgba(30, 144, 255, 0.2)", // fill under curve
        tension: 0.4, // smooth curve (spline)
        fill: true,
        pointRadius: 6,
        pointBackgroundColor: "#00ffff",
      },
    ],
  };

  // Order Value Distribution (Spline)
  const orderValueData = {
    labels: ["$0-$50", "$51-$100", "$101-$200", "$201+"],
    datasets: [
      {
        label: "Order Value",
        data: [30, 50, 40, 20],
        borderColor: "rgba(65, 105, 225, 1)",
        backgroundColor: "rgba(65, 105, 225, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointBackgroundColor: "#87cefa",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff", font: { size: 14, weight: "bold" } },
      },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#fff", font: { size: 12, weight: "bold" } },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      y: {
        ticks: { color: "#fff", font: { size: 12, weight: "bold" } },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "space-between",
        margin: "20px",
        backgroundColor: "#0d1b2a",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      {/* Item Count Distribution Spline Chart */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#1b263b",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#00ffff",
          }}
        >
          Item Count Distribution
        </h3>
        <Line data={itemCountData} options={options} />
      </div>

      {/* Order Value Distribution Spline Chart */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#1b263b",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#87cefa",
          }}
        >
          Order Value Distribution
        </h3>
        <Line data={orderValueData} options={options} />
      </div>
    </div>
  );
};

export default DashboardCharts;