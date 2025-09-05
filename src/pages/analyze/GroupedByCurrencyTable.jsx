import React, { useState } from "react";

const GroupedByCurrencyTable = () => {
  const [tableData, setTableData] = useState([
    { currency: "USD", orders: 120, items: 300, customers: 100, net: 5000, avgNet: 41.67, gross: 5500, avgGross: 45.83 },
    { currency: "GBP", orders: 90, items: 250, customers: 80, net: 4000, avgNet: 44.44, gross: 4400, avgGross: 48.89 },
    { currency: "BDT", orders: 200, items: 500, customers: 150, net: 1200000, avgNet: 6000, gross: 1300000, avgGross: 6500 },
  ]);

  const [sortedColumn, setSortedColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    const columnKey = column.toLowerCase().replace(/\s+/g, "").replace("average", "avg");
    const sortedData = [...tableData].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[columnKey] > b[columnKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
    setSortedColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const tdStyle = { padding: "10px 12px", borderBottom: "1px solid #111827" };

  return (
    <div style={{ marginTop: "40px", padding: "20px", borderRadius: "12px", backgroundColor: "#0f172a", color: "#fff", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "1.8rem" }}>Grouped by Currency</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ padding: "8px 16px", backgroundColor: "#1e40af", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", boxShadow: "0 5px 15px rgba(0,0,0,0.4)", transition: "all 0.3s" }}>
            Prompt
          </button>
          <button style={{ padding: "8px 16px", backgroundColor: "#1e40af", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", boxShadow: "0 5px 15px rgba(0,0,0,0.4)", transition: "all 0.3s" }}>
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#1e293b" }}>
            {["Currency", "Orders", "Items", "Customers", "Net Sales", "Average Net", "Gross Sales", "Average Gross"].map(header => (
              <th
                key={header}
                onClick={() => handleSort(header)}
                style={{
                  cursor: "pointer",
                  padding: "14px 12px",
                  textAlign: "left",
                  color: sortedColumn === header ? "#facc15" : "#e2e8f0",
                  fontWeight: "600",
                  transition: "color 0.3s",
                }}
              >
                {header} {sortedColumn === header ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 ? "#111827" : "#1e293b", transition: "background 0.3s" }}>
              <td style={tdStyle}>{row.currency}</td>
              <td style={tdStyle}>{row.orders}</td>
              <td style={tdStyle}>{row.items}</td>
              <td style={tdStyle}>{row.customers}</td>
              <td style={tdStyle}>{row.net}</td>
              <td style={tdStyle}>{row.avgNet}</td>
              <td style={tdStyle}>{row.gross}</td>
              <td style={tdStyle}>{row.avgGross}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupedByCurrencyTable;