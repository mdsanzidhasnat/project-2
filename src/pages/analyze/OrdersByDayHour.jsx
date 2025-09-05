// File: OrdersByDayHourChart.jsx
import React, { useState, useMemo } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersByDayHourChart = () => {
  const [chartType, setChartType] = useState("totalOrders");

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const hours = ["12AM","2AM","4AM","6AM","8AM","10AM","12PM","2PM","4PM","6PM","8PM","10PM"];

  const generateData = () => days.map(() => hours.map(() => Math.floor(Math.random() * 100)));

  const dataStore = useMemo(() => ({
    totalOrders: generateData(),
    totalSales: generateData().map(row => row.map(v => v * 10)),
    avgOrder: generateData().map(row => row.map(v => Math.floor(v / 2))),
  }), []);

  const handleChange = (e) => setChartType(e.target.value);

  // Convert data into Chart.js dataset format
  const chartData = {
    labels: hours,
    datasets: days.map((day, idx) => ({
      label: day,
      data: dataStore[chartType][idx],
      backgroundColor: `rgba(${50 + idx*25}, 122, 255, 0.7)`, // Different shade per day
      borderRadius: 6,
      barPercentage: 0.7,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
      title: { display: true, text: "Orders by Day and Hour", color: "white", font: { size: 18 } },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.2)" } }
    },
  };

  return (
    <div style={{
      backgroundColor:"#0b1d3a",
      padding:"20px",
      borderRadius:"15px",
      color:"white",
      boxShadow:"0 10px 25px rgba(0,0,0,0.5)"
    }}>
      <div style={{display:"flex", justifyContent:"flex-end", marginBottom:"15px"}}>
        <select
          value={chartType}
          onChange={handleChange}
          style={{
            padding:"8px 12px",
            borderRadius:"6px",
            border:"none",
            backgroundColor:"#001f5b",
            color:"white",
            fontWeight:"bold",
            cursor:"pointer"
          }}
        >
          <option value="totalOrders">Total Orders</option>
          <option value="totalSales">Total Sales</option>
          <option value="avgOrder">Average Orders</option>
        </select>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrdersByDayHourChart;
