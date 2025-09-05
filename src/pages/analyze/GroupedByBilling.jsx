// File: GroupedByBilling.jsx
import React, { useState } from "react";

const groupedByOptions = [
  "Billing Country",
  "Billing State",
  "Billing Zip",
  "Billing City",
  "Billing Company",
  "Shipping Country",
  "Shipping State",
  "Shipping City",
  "Shipping Zip",
];

const tableData = [
  { country: "USA", orders: 120, items: 300, customers: 100, netSales: 5000, avgNet: 41.67, grossSales: 5500, avgGross: 45.83 },
  { country: "UK", orders: 80, items: 200, customers: 70, netSales: 3500, avgNet: 43.75, grossSales: 4000, avgGross: 50.0 },
  { country: "BD", orders: 150, items: 400, customers: 130, netSales: 6000, avgNet: 46.15, grossSales: 6500, avgGross: 50.0 },
  { country: "Canada", orders: 60, items: 150, customers: 50, netSales: 2500, avgNet: 41.67, grossSales: 2800, avgGross: 46.67 },
  { country: "Australia", orders: 90, items: 220, customers: 80, netSales: 4000, avgNet: 50.0, grossSales: 4500, avgGross: 56.25 },
];

const GroupedByBilling = () => {
  const [selectedOption, setSelectedOption] = useState(groupedByOptions[0]);
  const [sortConfig, setSortConfig] = useState({ key: "country", direction: "asc" });

  const sortedData = [...tableData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
        <div>
          <span style={{ fontWeight: "bold", marginRight: 10 }}>Grouped by:</span>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{ padding: 5, backgroundColor: "#003366", color: "#fff", border: "none", borderRadius: 4 }}
          >
            {groupedByOptions.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <button style={{ marginRight: 10, padding: "5px 15px", cursor: "pointer" }}>AI Prompt</button>
          <button style={{ padding: "5px 15px", cursor: "pointer" }}>Export</button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["country", "orders", "items", "customers", "netSales", "avgNet", "grossSales", "avgGross"].map((key) => (
              <th
                key={key}
                onClick={() => requestSort(key)}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: "#003366",
                  color: "#fff",
                  textTransform: "capitalize",
                }}
              >
                {key === "country" ? "Billing Country" :
                 key === "avgNet" ? "Average Net" :
                 key === "avgGross" ? "Average Gross" :
                 key.replace(/([A-Z])/g, " $1")}
                {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "8px" }}>{row.country}</td>
              <td style={{ padding: "8px" }}>{row.orders}</td>
              <td style={{ padding: "8px" }}>{row.items}</td>
              <td style={{ padding: "8px" }}>{row.customers}</td>
              <td style={{ padding: "8px" }}>{row.netSales}</td>
              <td style={{ padding: "8px" }}>{row.avgNet}</td>
              <td style={{ padding: "8px" }}>{row.grossSales}</td>
              <td style={{ padding: "8px" }}>{row.avgGross}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupedByBilling;