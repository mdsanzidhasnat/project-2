// GroupedByCustomField.jsx
import React, { useState } from "react";

const customFields = [
  "Billing Country",
  "Billing State",
  "Billing City",
  "Billing Zip",
  "Shipping Country",
  "Shipping State",
  "Shipping City",
  "Shipping Zip",
  "Customer Type",
  "Order Status",
  "Payment Method",
  "Shipping Method",
];

const GroupedByCustomField = () => {
  const [selectedField, setSelectedField] = useState("");

  const buttonStyle = {
    padding: "6px 14px",
    border: "1px solid #0a2a5e",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #1f3a6e, #142850)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  };

  return (
    <div style={{
      width: "100%",
      background: "#0b1220",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      {/* Top Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        {/* Left Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px", fontWeight: "600", color: "#cfd8e1" }}>Grouped By</span>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.5)"}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)"}
          >
            Custom Field
          </button>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #0a2a5e",
              backgroundColor: "#1f3a6e",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#142850"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#1f3a6e"}
          >
            <option value="" style={{ color: "#333" }}>Select a custom field</option>
            {customFields.map((field, idx) => (
              <option key={idx} value={field}>{field}</option>
            ))}
          </select>
        </div>

        {/* Right Side */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.5)"}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)"}
          >
            AI Prompt
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.5)"}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)"}
          >
            Export
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{
        textAlign: "center",
        fontSize: "16px",
        color: "#aeb6bf",
        fontStyle: "italic",
      }}>
        Select a custom field above.
      </div>
    </div>
  );
};

export default GroupedByCustomField;