import React, { useState, useMemo } from "react";

// CustomerRetention_Modified_Fixed.jsx
// Single-file React component using inline CSS (no external CSS).
// Changes from your last version:
// - interval dropdown background changed to dark-blue gradient
// - Added a new section below "Time between repeat orders":
//   Left 65%: "Items bought over the lifetime of customers" chart area
//   Right 35%: modern stats card with requested copy
// No other previous code changed.

export default function CustomerRetention() {
  const [fromDate, setFromDate] = useState("2025-07-01");
  const [toDate, setToDate] = useState("2025-08-31");
  const [intervalUnit, setIntervalUnit] = useState("Weeks");

  // Chart data (example)
  const chartData = useMemo(() => [12, 24, 35, 20, 16, 9, 5, 3, 2, 1], []);

  // Stats derived from data (sample calculations)
  const totalCustomers = 14; // sample static number (kept from original)
  const avgOrders = Math.round((chartData.reduce((a, b) => a + b, 0) / chartData.length) * 10) / 10;
  const returnedPercent = "7.14%";

  function handleExport() {
    // simple CSV export of chartData
    const header = ["Period", "Orders"];
    const rows = chartData.map((v, i) => [i + 1, v]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_retention_chart.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // SVG line generator
  const width = 720;
  const height = 320; // increased height
  const padding = 32;
  const maxValue = Math.max(...chartData);
  const points = chartData.map((v, i) => {
    const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
    const y = padding + (1 - v / maxValue) * (height - padding * 2);
    return [x, y];
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
    .join(" ");

  const areaPathD = `${pathD} L ${padding + (width - padding * 2)} ${height - padding} L ${padding} ${height - padding} Z`;

  const styles = {
    page: {
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#e6f0ff",
      padding: 24,
      background: "linear-gradient(180deg,#071237 0%, #0b254b 60%, #06203b 100%)",
      minHeight: "100vh",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 22,
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      color: "#ffffff",
    },
    compareBox: {
      display: "flex",
      gap: 12,
      alignItems: "center",
    },
    comparePill: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "linear-gradient(90deg,#0f3a6d 0%, #123a6f 100%)",
      padding: "6px 10px",
      borderRadius: 999,
      boxShadow: "0 6px 20px rgba(2,6,23,0.6)",
      border: "1px solid rgba(255,255,255,0.04)",
    },
    calendarIcon: {
      width: 18,
      height: 18,
      display: "inline-block",
      verticalAlign: "middle",
    },
    dateInput: {
      padding: "6px 8px",
      borderRadius: 8,
      border: "none",
      background: "rgba(255,255,255,0.06)",
      color: "#e6f0ff",
      fontSize: 13,
      outline: "none",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
      backdropFilter: "blur(4px)",
    },
    twoCol: {
      display: "flex",
      gap: 18,
      alignItems: "flex-start",
    },
    left65: {
      flexBasis: "65%",
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      padding: 16,
      borderRadius: 12,
      boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
      color: "#eaf6ff",
    },
    right35: {
      flexBasis: "35%",
      padding: 18,
      borderRadius: 12,
      background: "linear-gradient(135deg,#071237 0%, #183a72 100%)",
      color: "white",
      boxShadow: "0 8px 30px rgba(11,20,50,0.12)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    chartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "#eaf6ff",
    },
    exportBtn: {
      padding: "8px 12px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
      background: "linear-gradient(90deg,#2a8bf7,#6dd3ff)",
      color: "#05223f",
    },
    statBig: {
      fontSize: 44,
      fontWeight: 800,
      lineHeight: 1,
      margin: 0,
    },
    statLabel: {
      fontSize: 13,
      opacity: 0.95,
      marginTop: 2,
    },
    smallMuted: {
      fontSize: 12,
      opacity: 0.9,
      color: "rgba(230,240,255,0.9)",
    },
    svgWrap: {
      width: "100%",
      overflow: "visible",
    },
    sectionWrap: {
      marginTop: 40,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 14,
      color: "#9fd0ff",
    },
    kpiRow: {
      display: "flex",
      gap: 18,
      marginBottom: 28,
    },
    kpiRowSingle: {
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gap: 12,
      alignItems: "stretch",
      marginBottom: 18,
      width: "100%",
      overflowX: "auto",
    },
    kpiBox: {
      padding: 18,
      borderRadius: 12,
      background: "linear-gradient(180deg,#0f2b57,#153d75)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
      textAlign: "center",
      minWidth: 120,
    },
    kpiValue: {
      fontSize: 24,
      fontWeight: 800,
      marginBottom: 6,
      color: "#ffffff",
    },
    kpiLabel: {
      fontSize: 13,
      opacity: 0.85,
    },

    // New section styles
    repeatSection: {
      display: "flex",
      gap: 18,
      marginTop: 18,
    },
    repeatLeft: {
      flexBasis: "65%",
      padding: 16,
      borderRadius: 12,
      background: "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01))",
      boxShadow: "0 10px 40px rgba(2,6,23,0.6)",
    },
    repeatHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    repeatTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: "#eaf6ff",
    },
    intervalSelect: {
      padding: "8px 10px",
      borderRadius: 10,
      border: "none",
      background: "linear-gradient(90deg,#072a4a,#0f3a6d)", // <-- changed to dark-blue gradient
      color: "#eaf6ff",
      fontWeight: 700,
      outline: "none",
      cursor: "pointer",
    },
    repeatRight: {
      flexBasis: "35%",
      padding: 18,
      borderRadius: 12,
      background: "linear-gradient(135deg,#071237 0%, #183a72 100%)",
      color: "white",
      boxShadow: "0 8px 30px rgba(11,20,50,0.12)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },

    statCardTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: "#dbeeff",
    },
    statCardGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 8,
    },
    statCardValue: {
      fontSize: 22,
      fontWeight: 800,
      lineHeight: 1,
    },
    statCardLabel: {
      fontSize: 12,
      opacity: 0.9,
    },

    // === Added "Items bought" section styles ===
    itemsSection: {
      display: "flex",
      gap: 18,
      marginTop: 22,
      alignItems: "flex-start",
    },
    itemsLeft: {
      flexBasis: "65%",
      padding: 16,
      borderRadius: 12,
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      boxShadow: "0 12px 45px rgba(2,6,23,0.65)",
    },
    itemsRight: {
      flexBasis: "35%",
      padding: 18,
      borderRadius: 12,
      background: "linear-gradient(135deg,#05213a 0%, #0b3a68 100%)",
      boxShadow: "0 10px 36px rgba(5,12,30,0.45)",
      color: "#eaf6ff",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      justifyContent: "center",
    },
    itemsChartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    itemsChartTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: "#dff4ff",
    },
    itemsPlaceholder: {
      width: "100%",
      height: 240,
      borderRadius: 10,
      overflow: "hidden",
      background: "linear-gradient(180deg, rgba(155,231,255,0.06), rgba(59,130,246,0.03))",
    },
    itemsCardTitle: {
      fontSize: 13,
      fontWeight: 700,
      color: "#eaf6ff",
      marginBottom: 6,
    },
    itemsCardBig: {
      fontSize: 40,
      fontWeight: 800,
      lineHeight: 1,
      color: "#ffffff",
    },
    itemsCardSub: {
      fontSize: 12,
      opacity: 0.9,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.title}>Customer Retention</div>

        <div style={styles.compareBox}>
          <div style={styles.comparePill}>
            {/* calendar icon (inline SVG) */}
            <svg viewBox="0 0 24 24" fill="none" style={styles.calendarIcon} aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
              <path d="M16 2v4M8 2v4" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>

            <div style={{ fontSize: 13, color: "#dbeeff", fontWeight: 600 }}>Compare</div>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={styles.dateInput}
              aria-label="from date"
            />
            <div style={{ color: "#9fbfe8", opacity: 0.9 }}>—</div>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={styles.dateInput}
              aria-label="to date"
            />
          </div>
        </div>
      </div>

      <div style={styles.twoCol}>
        {/* LEFT 65%: Large SVG graph */}
        <div style={styles.left65}>
          <div style={styles.chartHeader}>
            <div style={styles.chartTitle}>Orders made over the lifetime of new customers</div>
            <button style={styles.exportBtn} onClick={handleExport} aria-label="Export chart">
              Export CSV
            </button>
          </div>

          <div style={{ width: "100%", height: height }}>
            <svg width={width} height={height} style={styles.svgWrap}>
              <defs>
                <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6dd3ff" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.06" />
                </linearGradient>

                <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#9be7ff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              <path d={areaPathD} fill="url(#areaGrad)" stroke="none" />
              <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p[0]} cy={p[1]} r={4.2} fill="#fff" opacity={0.95} />
                </g>
              ))}

              {points.map((p, i) => (
                <text key={i} x={p[0]} y={height - padding + 18} fontSize={11} textAnchor="middle" fill="#cfe8ff">
                  {i + 1}
                </text>
              ))}

              {[0, 0.5, 1].map((t, i) => {
                const y = padding + (1 - t) * (height - padding * 2);
                const val = Math.round(maxValue * t);
                return (
                  <g key={i}>
                    <line x1={padding} x2={width - padding} y1={y} y2={y} stroke="rgba(255,255,255,0.03)" />
                    <text x={8} y={y + 4} fontSize={11} fill="#cfe8ff">
                      {val}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* RIGHT 35%: Stats */}
        <div style={styles.right35}>
          <div style={{ fontSize: 13, opacity: 0.95, fontWeight: 600 }}>Customers made on average</div>
          <div style={styles.statBig}>{Math.round(avgOrders)}</div>
          <div style={styles.statLabel}>Avg Orders</div>
          <div style={{ height: 12 }} />
          <div style={styles.smallMuted}>From 1 order to 2 orders.</div>
          <div style={{ height: 12 }} />
          <div style={{ fontSize: 18, fontWeight: 700 }}>Customers</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{totalCustomers}</div>
          <div style={{ height: 10 }} />
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>Joined</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>1</div>
            </div>
            <div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>Returned</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{returnedPercent}</div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.9 }}>Retention Rate</div>
        </div>
      </div>

      {/* --- UPDATED KPI SECTIONS: single row with 8 boxes --- */}
      <div style={styles.sectionWrap}>
        <div style={styles.sectionTitle}>All Customers (quick KPIs)</div>

        <div style={styles.kpiRowSingle}>
          {/* 8 KPI boxes in one row */}
          <div style={styles.kpiBox}><div style={styles.kpiValue}>13</div><div style={styles.kpiLabel}>One-time Count</div></div>
          <div style={styles.kpiBox}><div style={styles.kpiValue}>13</div><div style={styles.kpiLabel}>One-time Orders</div></div>
          <div style={styles.kpiBox}><div style={styles.kpiValue}>£241</div><div style={styles.kpiLabel}>One-time Gross</div></div>
          <div style={styles.kpiBox}><div style={styles.kpiValue}>£19</div><div style={styles.kpiLabel}>One-time Avg Order</div></div>

          <div style={styles.kpiBox}><div style={styles.kpiValue}>1</div><div style={styles.kpiLabel}>Returning Count</div></div>
          <div style={styles.kpiBox}><div style={styles.kpiValue}>2</div><div style={styles.kpiLabel}>Returning Orders</div></div>
          <div style={styles.kpiBox}><div style={styles.kpiValue}>£1,473</div><div style={styles.kpiLabel}>Returning Gross</div></div>
          <div style={styles.kpiBox}><div style={styles.kpiValue}>£737</div><div style={styles.kpiLabel}>Returning Avg Order</div></div>
        </div>

        {/* --- NEW: Time between repeat orders section --- */}
        <div style={styles.repeatSection}>
          {/* LEFT: Graph (65%) */}
          <div style={styles.repeatLeft}>
            <div style={styles.repeatHeader}>
              <div style={styles.repeatTitle}>Time between repeat orders</div>
              <select
                value={intervalUnit}
                onChange={(e) => setIntervalUnit(e.target.value)}
                style={styles.intervalSelect}
                aria-label="Interval unit"
              >
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
                <option>Years</option>
              </select>
            </div>

            {/* simple illustrative chart (placeholder). Keep it lightweight and attractive */}
            <div style={{ width: "100%", height: 240 }}>
              <svg width={width} height={240} style={{ width: "100%", height: "100%" }}>
                <defs>
                  <linearGradient id="rbg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#9be7ff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.06" />
                  </linearGradient>
                </defs>

                {/* background grid lines */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const y = 12 + (i / 4) * (240 - 24);
                  return <line key={i} x1={0} x2={width} y1={y} y2={y} stroke="rgba(255,255,255,0.03)" />;
                })}

                {/* example bars (randomized heights from the earlier chartData) */}
                {chartData.map((v, i) => {
                  const barW = (width - padding * 2) / chartData.length - 6;
                  const barX = padding + i * (barW + 6);
                  const barH = Math.max(6, (v / maxValue) * (240 - padding * 2));
                  const barY = 240 - padding - barH;
                  return (
                    <rect key={i} x={barX} y={barY} width={barW} height={barH} rx={6} fill="url(#rbg)" opacity={0.95} />
                  );
                })}
              </svg>
            </div>

          </div>

          {/* RIGHT: Stats card (35%) */}
          <div style={styles.repeatRight}>
            <div style={styles.statCardTitle}>There were 1 returning customers</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Between repeat orders</div>

            <div style={styles.statCardGrid}>
              <div>
                <div style={styles.statCardValue}>1.00</div>
                <div style={styles.statCardLabel}>Weeks on average</div>
              </div>

              <div>
                <div style={styles.statCardValue}>1.00</div>
                <div style={styles.statCardLabel}>Weeks at least</div>
              </div>

              <div>
                <div style={styles.statCardValue}>1.00</div>
                <div style={styles.statCardLabel}>Weeks at most</div>
              </div>

              <div>
                <div style={styles.statCardValue}>—</div>
                <div style={styles.statCardLabel}>(extra)</div>
              </div>
            </div>

            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>Values shown in <strong>{intervalUnit}</strong>.</div>

          </div>
        </div>

        {/* === NEW SECTION: Items bought over the lifetime of customers === */}
        <div style={styles.itemsSection}>
          {/* LEFT: Chart (65%) */}
          <div style={styles.itemsLeft}>
            <div style={styles.itemsChartHeader}>
              <div style={styles.itemsChartTitle}>Items bought over the lifetime of customers</div>
              {/* optional right-side small control could go here if needed */}
            </div>

            <div style={styles.itemsPlaceholder}>
              {/* Lightweight illustrative SVG chart for items */}
              <svg width="100%" height="100%" viewBox={`0 0 ${width} 240`} preserveAspectRatio="none" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="itemsArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#bff0ff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.04" />
                  </linearGradient>
                  <linearGradient id="itemsLine" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#d3f7ff" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>

                {/* faint grid */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const y = 12 + (i / 4) * (240 - 24);
                  return <line key={`g-${i}`} x1="0" x2={width} y1={y} y2={y} stroke="rgba(255,255,255,0.02)" />;
                })}

                {/* area + line using same chartData for demonstration */}
                {(() => {
                  const localMax = Math.max(...chartData);
                  const pts = chartData.map((v, i) => {
                    const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
                    const y = 12 + (1 - v / localMax) * (240 - 24);
                    return `${x},${y}`;
                  });
                  const area = `M ${padding},${240 - 12} L ${pts.join(" L ")} L ${width - padding},${240 - 12} Z`;
                  const line = `M ${pts.join(" L ")}`;
                  return (
                    <>
                      <path d={area} fill="url(#itemsArea)" stroke="none" />
                      <path d={line} fill="none" stroke="url(#itemsLine)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      {chartData.map((v, i) => {
                        const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
                        const y = 12 + (1 - v / localMax) * (240 - 24);
                        return <circle key={`c-${i}`} cx={x} cy={y} r={4} fill="#fff" opacity={0.95} />;
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* RIGHT: Card (35%) */}
          <div style={styles.itemsRight}>
            <div style={styles.itemsCardTitle}>Customers bought on average</div>
            <div style={styles.itemsCardBig}>0</div>
            <div style={styles.itemsCardSub}>Items</div>

            <div style={{ height: 6 }} />

            <div style={{ fontSize: 13, opacity: 0.9 }}>From 0 items to 0 items.</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Values are illustrative — replace with real aggregated values from your data source.</div>
          </div>
        </div>
        {/* === end new section === */}

      </div>
    </div>
  );
}