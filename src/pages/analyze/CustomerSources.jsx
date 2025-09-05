import React, { useState } from "react";

const data = [
  { site: "https://www.google.com", customers: 8, orders: 8, revenue: 112.67, avgOrders: 1.0, avgLTV: 14.08, returning: 0, returnRate: 0 },
  { site: "Unknown", customers: 2, orders: 3, revenue: 1532.49, avgOrders: 1.5, avgLTV: 766.25, returning: 1, returnRate: 50 },
  { site: "https://statics.teams.cdn.office.com", customers: 1, orders: 1, revenue: 14.99, avgOrders: 1.0, avgLTV: 14.99, returning: 0, returnRate: 0 },
  { site: "https://duckduckgo.com", customers: 1, orders: 1, revenue: 28.29, avgOrders: 1.0, avgLTV: 28.29, returning: 0, returnRate: 0 },
  { site: "https://www.bing.com", customers: 1, orders: 1, revenue: 12.04, avgOrders: 1.0, avgLTV: 12.04, returning: 0, returnRate: 0 },
  { site: "https://mskeydeals.com", customers: 1, orders: 1, revenue: 14.2, avgOrders: 1.0, avgLTV: 14.2, returning: 0, returnRate: 0 },
];

export default function CustomerSources() {
  const [activeTab, setActiveTab] = useState("Referrer");
  const [showCalendars, setShowCalendars] = useState(false);
  const [dateRange1, setDateRange1] = useState({ from: "", to: "" });
  const [dateRange2, setDateRange2] = useState({ from: "", to: "" });

  const totals = data.reduce(
    (acc, item) => {
      acc.customers += item.customers;
      acc.orders += item.orders;
      acc.revenue += item.revenue;
      acc.avgOrders += item.avgOrders;
      acc.avgLTV += item.avgLTV;
      acc.returning += item.returning;
      return acc;
    },
    { customers: 0, orders: 0, revenue: 0, avgOrders: 0, avgLTV: 0, returning: 0 }
  );

  const handleAiPrompt = () => alert("🚀 AI Prompt clicked!");
  const handleExport = () => alert("📁 Exporting data...");
  const handleCompareToggle = () => setShowCalendars(!showCalendars);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        backgroundColor: "#0b132b",
        color: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#fff" }}>Customer Sources</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleCompareToggle}
            style={{
              background: showCalendars
                ? "linear-gradient(135deg, #ff7eb3, #ff758c)"
                : "linear-gradient(135deg, #ff4e50, #f9d423)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            📅 Compare Calendar
          </button>
          <button
            onClick={handleAiPrompt}
            style={{
              background: "linear-gradient(135deg, #007bff, #00c6ff)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              marginRight: "12px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            🚀 AI Prompt
          </button>
          <button
            onClick={handleExport}
            style={{
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            📁 Export
          </button>
        </div>
      </div>

      {/* Date Pickers */}
      {showCalendars && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "30px",
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#1c2541",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {/* First Range */}
          <div>
            <h4 style={{ marginBottom: "8px", color: "#4facfe" }}>Date Range 1</h4>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="date"
                value={dateRange1.from}
                onChange={(e) => setDateRange1({ ...dateRange1, from: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #2e3a67",
                  backgroundColor: "#0b132b",
                  color: "#fff",
                }}
              />
              <input
                type="date"
                value={dateRange1.to}
                onChange={(e) => setDateRange1({ ...dateRange1, to: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #2e3a67",
                  backgroundColor: "#0b132b",
                  color: "#fff",
                }}
              />
            </div>
          </div>

          {/* Second Range */}
          <div>
            <h4 style={{ marginBottom: "8px", color: "#ff758c" }}>Date Range 2</h4>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="date"
                value={dateRange2.from}
                onChange={(e) => setDateRange2({ ...dateRange2, from: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #2e3a67",
                  backgroundColor: "#0b132b",
                  color: "#fff",
                }}
              />
              <input
                type="date"
                value={dateRange2.to}
                onChange={(e) => setDateRange2({ ...dateRange2, to: e.target.value })}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #2e3a67",
                  backgroundColor: "#0b132b",
                  color: "#fff",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
        {["Referrer", "Landing", "UTMs", "Segment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? "#007bff" : "#1c2541",
              color: activeTab === tab ? "#fff" : "#ccc",
              border: "none",
              borderRadius: "6px",
              padding: "10px 18px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div
        style={{
          backgroundColor: "#1c2541",
          padding: "16px",
          borderRadius: "10px",
          marginBottom: "20px",
          lineHeight: "1.6",
          fontSize: "14px",
          border: "1px solid #2e3a67",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        This report is built by looking at the source of each customer's <b>first order</b>. The stats are for the customer's lifetime on your store.
        <br />
        <b>Note:</b> We only have source data available from when you started using Metorik (August 24, 2025) or whenever you enabled WooCommerce source tracking.
      </div>

      {/* Table */}
      <div
        style={{
          overflowX: "auto",
          borderRadius: "10px",
          backgroundColor: "#1c2541",
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0b1a3d" }}>
              {["Referring Site", "Customers", "Orders", "Revenue", "Average Orders", "Average LTV", "Returning Customers", "Return Rate"].map((header) => (
                <th
                  key={header}
                  style={{
                    textAlign: "left",
                    padding: "14px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#a9b7d0",
                    borderBottom: "1px solid #2e3a67",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#24305e" : "#1f2a4c",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2f3c73")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#24305e" : "#1f2a4c")}
              >
                <td style={{ padding: "12px" }}>
                  {row.site === "Unknown" ? (
                    <span style={{ color: "#ccc" }}>Unknown</span>
                  ) : (
                    <a
                      href={row.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#4facfe", textDecoration: "none", fontWeight: "600" }}
                    >
                      {row.site}
                    </a>
                  )}
                </td>
                <td style={{ padding: "12px" }}>{row.customers}</td>
                <td style={{ padding: "12px" }}>{row.orders}</td>
                <td style={{ padding: "12px" }}>£{row.revenue.toFixed(2)}</td>
                <td style={{ padding: "12px" }}>{row.avgOrders.toFixed(2)}</td>
                <td style={{ padding: "12px" }}>£{row.avgLTV.toFixed(2)}</td>
                <td style={{ padding: "12px" }}>{row.returning}</td>
                <td style={{ padding: "12px" }}>{row.returnRate}%</td>
              </tr>
            ))}
            {/* Totals */}
            <tr style={{ backgroundColor: "#0b1a3d", fontWeight: "700" }}>
              <td style={{ padding: "12px" }}>Totals</td>
              <td style={{ padding: "12px" }}>{totals.customers}</td>
              <td style={{ padding: "12px" }}>{totals.orders}</td>
              <td style={{ padding: "12px" }}>£{totals.revenue.toFixed(2)}</td>
              <td style={{ padding: "12px" }}>{(totals.avgOrders / data.length).toFixed(2)}</td>
              <td style={{ padding: "12px" }}>£{(totals.avgLTV / data.length).toFixed(2)}</td>
              <td style={{ padding: "12px" }}>{totals.returning}</td>
              <td style={{ padding: "12px" }}>{((totals.returning / totals.customers) * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}