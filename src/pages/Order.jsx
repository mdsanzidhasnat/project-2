import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import {
  Bell,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  PieChart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function OrderDashboard() {
  const [segment, setSegment] = useState("All Segments");
  const [compareOpen, setCompareOpen] = useState(false);
  const [dates, setDates] = useState([dayjs(), dayjs()]);
  const [chartData, setChartData] = useState([]);

  // Generate dummy chart data for animation
  useEffect(() => {
    const data = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 80 + 20)
    );
    setChartData(data);
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#0b1a33",
      color: "#fff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    headerLeft: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    headerRight: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
    },
    dropdown: {
      padding: "6px 12px",
      borderRadius: "6px",
      backgroundColor: "#15294d",
      color: "#fff",
      border: "1px solid #2f4e8c",
      cursor: "pointer",
    },
    search: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid #2f4e8c",
      backgroundColor: "#15294d",
      color: "#fff",
      outline: "none",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "15px",
      marginBottom: "25px",
    },
    statCard: {
      backgroundColor: "#15294d",
      borderRadius: "12px",
      padding: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    statTitle: {
      fontSize: "14px",
      color: "#9fb3d1",
    },
    statValue: {
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: "5px",
    },
    chartRow: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "15px",
      marginBottom: "25px",
    },
    chartBox: {
      backgroundColor: "#15294d",
      borderRadius: "12px",
      padding: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "25px",
    },
    th: {
      backgroundColor: "#1e3b6e",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #2f4e8c",
    },
    smallTablesRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      marginBottom: "25px",
    },
    profit: { color: "#4ade80", fontWeight: "bold" },
    loss: { color: "#f87171", fontWeight: "bold" },
  };

  const kpiData1 = [
    { title: "MRR", value: "$12,500", change: 12 },
    { title: "Churn Rate", value: "3.2%", change: -2 },
    { title: "Active Subscription", value: "1,245", change: 8 },
  ];

  const kpiData2 = [
    { title: "Refunds", value: "$800", change: -5 },
    { title: "Disputes", value: "12", change: -1 },
    { title: "Recurring Order", value: "345", change: 6 },
  ];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>Orders</div>
        <div style={styles.headerRight}>
          <select
            style={styles.dropdown}
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
          >
            <option>All Segments</option>
            <option>Test</option>
          </select>
          <button
            style={styles.dropdown}
            onClick={() => setCompareOpen(!compareOpen)}
          >
            Compare Dates
          </button>
          {compareOpen && (
            <div style={{ display: "flex", gap: "10px" }}>
              <DatePicker
                value={dates[0]}
                onChange={(date) => setDates([date, dates[1]])}
              />
              <DatePicker
                value={dates[1]}
                onChange={(date) => setDates([dates[0], date])}
              />
            </div>
          )}
          <input style={styles.search} placeholder="Search..." />
          <Bell size={22} />
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <DollarSign size={30} />
          <span style={styles.statTitle}>Net Sales</span>
          <span style={styles.statValue}>$25,300</span>
        </div>
        <div style={styles.statCard}>
          <TrendingUp size={30} />
          <span style={styles.statTitle}>Daily Average</span>
          <span style={styles.statValue}>$3,200</span>
        </div>
        <div style={styles.statCard}>
          <ShoppingBag size={30} />
          <span style={styles.statTitle}>Orders</span>
          <span style={styles.statValue}>1,245</span>
        </div>
        <div style={styles.statCard}>
          <PieChart size={30} />
          <span style={styles.statTitle}>Revenue Profit/Loss</span>
          <span style={styles.statValue}>+12%</span>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartRow}>
        {/* Net Sales Prediction Chart */}
        <div style={styles.chartBox}>
          <h3>Net Sales & Orders Prediction</h3>
          <svg width="100%" height="150" style={{ overflow: "visible" }}>
            {chartData.map((value, index) => (
              <motion.rect
                key={index}
                x={index * 20}
                y={150 - value}
                width="12"
                height={value}
                fill="url(#grad1)"
                initial={{ height: 0 }}
                animate={{ height: value }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                rx="4"
              />
            ))}
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Daily Prediction Chart */}
        <div style={styles.chartBox}>
          <h3>Daily Prediction (Hourly)</h3>
          <svg width="100%" height="150" style={{ overflow: "visible" }}>
            {chartData.slice(0, 12).map((value, index) => (
              <motion.rect
                key={index}
                x={index * 20}
                y={150 - value}
                width="12"
                height={value}
                fill="url(#grad2)"
                initial={{ height: 0 }}
                animate={{ height: value }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                rx="4"
              />
            ))}
            <defs>
              <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#f87171" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Summary Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Orders</th>
            <th style={styles.th}>Gross Sales</th>
            <th style={styles.th}>Refunds</th>
            <th style={styles.th}>Net Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>2025-08-25</td>
            <td style={styles.td}>245</td>
            <td style={styles.td}>$8,200</td>
            <td style={styles.td}>$300</td>
            <td style={styles.td}>$7,900</td>
          </tr>
        </tbody>
      </table>

      {/* KPI Small Tables */}
      <div style={styles.smallTablesRow}>
        <table style={styles.table}>
          <thead>
            <tr>
              {kpiData1.map((k) => (
                <th style={styles.th} key={k.title}>
                  {k.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {kpiData1.map((k) => (
                <td style={styles.td} key={k.title}>
                  {k.value} (
                  <span style={k.change >= 0 ? styles.profit : styles.loss}>
                    {k.change >= 0 ? `+${k.change}%` : `${k.change}%`}
                  </span>
                  )
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <table style={styles.table}>
          <thead>
            <tr>
              {kpiData2.map((k) => (
                <th style={styles.th} key={k.title}>
                  {k.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {kpiData2.map((k) => (
                <td style={styles.td} key={k.title}>
                  {k.value} (
                  <span style={k.change >= 0 ? styles.profit : styles.loss}>
                    {k.change >= 0 ? `+${k.change}%` : `${k.change}%`}
                  </span>
                  )
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Large Transactions Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Customers</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Products</th>
            <th style={styles.th}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>2025-08-25</td>
            <td style={styles.td}>John Doe</td>
            <td style={styles.td}>New York</td>
            <td style={styles.td}>5</td>
            <td style={styles.td}>$1,250</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}