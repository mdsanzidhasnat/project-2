import React, { useState } from "react";

export default function Cohorts() {
  const [hovered, setHovered] = useState(null);

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
    color: "#f1f5f9",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    textShadow: "0px 2px 6px rgba(0,0,0,0.4)",
  };

  const cardContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  };

  const baseCardStyle = {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
    outline: "none",
  };

  const hoverCardStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0px 12px 36px rgba(0,0,0,0.75)",
  };

  const cardTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
  };

  const descriptionStyle = {
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "16px",
    color: "#cbd5e1",
  };

  const imageStyle = {
    width: "100%",
    height: "160px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: "14px",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
  };

  const cards = [
    {
      key: "returning",
      title: "Returning customers",
      desc:
        "Shows the number/percent of customers that returned to make another order in each following month after their first order.",
      imageLabel: "📊 cohort screenshot",
    },
    {
      key: "ltv",
      title: "Customer lifetime value over time",
      desc:
        "Shows the cumulative average customer lifetime value (total spent less refunds) per cohort in each following month after their first order.",
      imageLabel: "📈 cohort screenshot",
    },
    {
      key: "byOrderCount",
      title: "Customers by order count",
      desc:
        "This report shows the number/percentage of customers grouped by their total order count for each cohort.",
      imageLabel: "📊 cohort screenshot",
    },
    {
      key: "salesOverTime",
      title: "Sales over time",
      desc:
        "This report shows the total sales (total spent less refunds) per cohort in each following month after they first ordered.",
      imageLabel: "📈 cohort screenshot",
    },
    {
      key: "ordersPerCustomer",
      title: "Orders per customer",
      desc:
        "This report shows the average number of orders per customer in each following month after they first ordered.",
      imageLabel: "📊 cohort screenshot",
    },
    {
      key: "ordersOverTime",
      title: "Orders over time",
      desc:
        "This report shows the number of orders per cohort in each following month after they first ordered.",
      imageLabel: "📈 cohort screenshot",
    },
    {
      key: "avgOrderValue",
      title: "Average order value over time",
      desc:
        "This report shows the average order value of the orders a cohort has made in each following month after they first ordered.",
      imageLabel: "💹 cohort screenshot",
    },
  ];

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Customer Cohorts Report</h1>

      <div style={cardContainerStyle}>
        {cards.map((c, idx) => (
          <div
            key={c.key}
            style={
              hovered === idx ? { ...baseCardStyle, ...hoverCardStyle } : baseCardStyle
            }
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(idx)}
            onBlur={() => setHovered(null)}
            tabIndex={0}
            aria-label={c.title}
          >
            <h2 style={cardTitleStyle}>{c.title}</h2>
            <p style={descriptionStyle}>{c.desc}</p>
            <div style={imageStyle} role="img" aria-label={c.imageLabel}>
              {c.imageLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}