import React, { useState, useMemo } from "react";

// Customers.jsx — updated to include "Customer average" stats row and a heatmap section
// Single-file React component using inline styles only (no external CSS)

export default function Customers() {
  const [range, setRange] = useState("month"); // day | week | month
  const [fromDate, setFromDate] = useState("2025-08-03");
  const [toDate, setToDate] = useState("2025-09-03");

  // Mock datasets for toggles
  const datasets = {
    day: [2, 1, 0, 3, 2, 1, 4, 3, 2, 1, 0, 2],
    week: [5, 8, 6, 10, 9, 12],
    month: [14, 18, 22, 10, 16, 26],
  };

  const data = datasets[range] || datasets.month;

  const totalNew = data.reduce((s, v) => s + v, 0);
  const orders = Math.round(totalNew * 1.07); // mock
  const spend = Math.round(totalNew * 120 + Math.random() * 600);

  // Prepare simple CSV export
  function exportCSV() {
    const rows = [["label", "value"], ...data.map((v, i) => [`item-${i + 1}`, v])];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `new-customers-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---------- Styles ----------
  const colors = {
    bg: "#0f1724",
    card: "linear-gradient(180deg,#0b1220, #0b1a2a)",
    accent: "#1e3a8a",
    accent2: "#60a5fa",
    text: "#e6eef8",
    muted: "#9aa7bd",
  };

  const container = {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    background: colors.bg,
    color: colors.text,
    minHeight: "100vh",
    padding: 24,
  };

  const headerRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 18,
  };

  const titleBox = { display: "flex", alignItems: "center", gap: 12 };
  const title = { fontSize: 30, fontWeight: 800, letterSpacing: -0.2 };

  const calendarBox = {
    background: colors.card,
    padding: 12,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.6)",
    display: "flex",
    gap: 8,
    alignItems: "center",
  };

  const section = {
    background: colors.card,
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.6)",
    marginBottom: 18,
  };

  const smallMuted = { color: colors.muted, fontSize: 14 };
  const grid = { display: "flex", gap: 16, alignItems: "stretch" };
  const leftColumn = { flex: 1 };
  const rightColumn = { width: "360px", minWidth: 280 };

  // chart area (increased height & larger fonts)
  const chartContainer = {
    background: "linear-gradient(180deg, rgba(14,39,76,0.6), rgba(6,18,40,0.3))",
    padding: 18,
    borderRadius: 12,
    height: 420, // increased height
    display: "flex",
    flexDirection: "column",
    gap: 14,
  };

  const chartHeader = { display: "flex", alignItems: "center", justifyContent: "space-between" };
  const chartTitle = { fontWeight: 800, fontSize: 22 };

  const toolbar = { display: "flex", gap: 8, alignItems: "center" };
  const toggleBtn = (active) => ({
    padding: "8px 12px",
    borderRadius: 10,
    border: "none",
    background: active ? "rgba(255,255,255,0.06)" : "transparent",
    color: colors.text,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
  });

  const exportBtn = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "transparent",
    color: colors.text,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
  };

  const statBox = {
    padding: 18,
    borderRadius: 12,
    background: "linear-gradient(180deg,#071228,#071a2b)",
    boxShadow: "0 8px 26px rgba(2,6,23,0.55)",
  };

  const statRow = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 12,
  };

  const statCard = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), transparent)",
    padding: 14,
    borderRadius: 10,
    textAlign: "center",
  };

  const maxVal = Math.max(...data);

  // ---------- Chart path calculations ----------
  // We will draw a stock-style line + filled area and a small volume subplot below.
  const svg = useMemo(() => {
    const n = data.length;
    const width = 720; // logical SVG width
    const height = 260; // main chart height
    const pad = 32;
    const usableW = width - pad * 2;
    const usableH = height - pad * 2;

    const points = data.map((v, i) => {
      const x = pad + (usableW * (i / Math.max(1, n - 1)));
      const y = pad + (usableH * (1 - v / Math.max(1, maxVal)));
      return { x, y, v };
    });

    // build polyline path
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');

    // area path (close to bottom)
    const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${height - pad} L ${points[0].x.toFixed(2)} ${height - pad} Z`;

    // x-axis labels
    const xLabels = points.map((p, i) => ({ x: p.x, label: `${i + 1}` }));

    // volume bars (simple proportional) - placed under chart
    const volHeight = 60;
    const volMax = Math.max(...data) || 1;
    const volumes = data.map((v, i) => {
      const barW = Math.max(6, usableW / n - 8);
      const x = pad + (usableW * (i / Math.max(1, n - 1))) - barW / 2;
      const h = Math.round((v / volMax) * (volHeight - 8));
      const y = height + 12 + (volHeight - h);
      return { x, y, w: barW, h, v };
    });

    return { width, height, pad, points, linePath, areaPath, xLabels, volumes, volHeight };
  }, [data, maxVal]);

  // ---------- Customer average stats (user-specified values) ----------
  const customerAverage = useMemo(
    () => [
      { id: "ltv", value: "£122.48", label: "Lifetime Value", pct: "390%" },
      { id: "ov", value: "£114.31", label: "Order Value", pct: "357%" },
      { id: "lo", value: "1.07", label: "Lifetime Orders", pct: "7.1%" },
      { id: "li", value: "7.14", label: "Lifetime Items", pct: "495%" },
    ],
    []
  );

  const avgSection = {
    ...section,
    padding: 18,
  };

  const smallCard = {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  };

  const statLeft = { display: "flex", flexDirection: "column", gap: 6 };
  const statValue = { fontSize: 18, fontWeight: 800 };
  const statLabel = { fontSize: 12, color: colors.muted };

  const pctStyle = (pct) => ({
    fontWeight: 900,
    fontSize: 16,
    color: pct && pct.startsWith("-") ? "#f97373" : "#9ef08c",
    textAlign: "right",
    minWidth: 68,
  });

  // ---------- Heatmap data ----------
  // we'll make a 7x12 matrix (7 rows/days x 12 buckets) as a reasonable demo
  const heatmap = useMemo(() => {
    const rows = 7;
    const cols = 12;
    // sample deterministic values between 0 and 1 (so colors are stable)
    const values = Array.from({ length: rows }).map((_, r) =>
      Array.from({ length: cols }).map((_, c) => {
        // pattern: use a pseudo-random but deterministic function
        const v = Math.abs(Math.sin((r + 1) * 0.7 + (c + 1) * 0.3));
        return Math.round(v * 100) / 100; // 0..1 two decimals
      })
    );
    return { rows, cols, values };
  }, []);

  // color scale: map 0..1 to gradient between very dark and accent2
  function heatColor(v) {
    // v in 0..1
    const clamp = Math.max(0, Math.min(1, v));
    // interpolate between dark "#021427" and accent "#60a5fa"
    const hexA = { r: 2, g: 20, b: 39 }; // #021427
    const hexB = { r: 96, g: 165, b: 250 }; // #60a5fa
    const r = Math.round(hexA.r + (hexB.r - hexA.r) * clamp);
    const g = Math.round(hexA.g + (hexB.g - hexA.g) * clamp);
    const b = Math.round(hexA.b + (hexB.b - hexA.b) * clamp);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const heatmapBox = {
    padding: 12,
    borderRadius: 10,
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
    boxShadow: "0 6px 18px rgba(2,6,23,0.45)",
  };

  return (
    <div style={container}>
      <div style={headerRow}>
        <div style={titleBox}>
          <div style={title}>Customers</div>
        </div>

        <div style={calendarBox}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, color: colors.muted }}>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", padding: "8px 10px", borderRadius: 8, color: colors.text, fontSize: 14 }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, color: colors.muted }}>To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", padding: "8px 10px", borderRadius: 8, color: colors.text, fontSize: 14 }}
            />
          </div>
          <button
            onClick={() => alert(`Comparing ${fromDate} → ${toDate}`)}
            style={{ marginLeft: 8, padding: "10px 14px", borderRadius: 10, border: "none", background: "#1e40af", color: "white", cursor: "pointer", fontWeight: 700 }}
          >
            Compare
          </button>
        </div>
      </div>

      <div style={section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ maxWidth: "65%" }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>
              Customers that first ordered between August 3, 2025 and September 3, 2025 and the orders they made over their lifetime
            </div>
            <div style={smallMuted}>You can view details of each customer and explore lifetime order behaviour in this report.</div>
          </div>
          <div>
            <button style={{ padding: "10px 14px", borderRadius: 10, border: "none", background: "#0ea5a4", color: "#012028", fontWeight: 800, cursor: "pointer" }}>
              View customers in this report
            </button>
          </div>
        </div>
      </div>

      <div style={grid}>
        <div style={{ ...leftColumn }}>
          <div style={{ ...section, padding: 14 }}>
            <div style={chartHeader}>
              <div style={chartTitle}>New customers</div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={exportCSV} style={exportBtn} aria-label="Export CSV">Export</button>

                <div style={toolbar}>
                  <button style={toggleBtn(range === "day")} onClick={() => setRange("day")}>Day</button>
                  <button style={toggleBtn(range === "week")} onClick={() => setRange("week")}>Week</button>
                  <button style={toggleBtn(range === "month")} onClick={() => setRange("month")}>Month</button>
                </div>
              </div>
            </div>

            <div style={chartContainer}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: colors.muted, fontSize: 14 }}>Showing: <strong style={{ color: colors.text, fontSize: 14 }}>{range}</strong></div>
                <div style={{ color: colors.muted, fontSize: 14 }}>Total: <strong style={{ color: colors.text, fontSize: 14 }}>{totalNew}</strong></div>
              </div>

              {/* SVG STOCK-STYLE CHART */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <svg viewBox={`0 0 ${svg.width} ${svg.height + svg.volHeight + 32}`} style={{ width: "100%", height: "320px", display: "block" }}>

                  {/* defs for gradient */}
                  <defs>
                    <linearGradient id="lineGrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.04" />
                    </linearGradient>

                    <linearGradient id="volGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#9be7ff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>

                  {/* subtle grid lines */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const y = svg.pad + (i * (svg.height - svg.pad * 2)) / 3;
                    return <line key={i} x1={svg.pad} x2={svg.width - svg.pad} y1={y} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />;
                  })}

                  {/* area */}
                  <path d={svg.areaPath} fill="url(#areaGrad)" stroke="none" />

                  {/* line */}
                  <path d={svg.linePath} fill="none" stroke="url(#lineGrad)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

                  {/* points */}
                  {svg.points.map((p, idx) => (
                    <circle key={idx} cx={p.x} cy={p.y} r={3.5} fill="#fff" opacity={0.95} />
                  ))}

                  {/* x labels */}
                  {svg.xLabels.map((xl, i) => (
                    <text key={i} x={xl.x} y={svg.height - svg.pad + 18} fontSize={12} textAnchor="middle" fill={colors.muted}>
                      {xl.label}
                    </text>
                  ))}

                  {/* small volume bars */}
                  {svg.volumes.map((b, i) => (
                    <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#volGrad)" rx={2} />
                  ))}

                </svg>

                {/* legend / summary under chart */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: colors.muted, fontSize: 14 }}>
                  <div>Latest: <strong style={{ color: colors.text, fontSize: 15 }}>{data[data.length - 1]}</strong></div>
                  <div>Max: <strong style={{ color: colors.text, fontSize: 15 }}>{maxVal}</strong></div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <div style={{ ...rightColumn }}>
          <div style={{ ...statBox }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>In this period</div>
            <div style={{ marginTop: 6, color: colors.muted, fontSize: 14 }}>Summary of customer behaviour</div>

            <div style={statRow}>
              <div style={statCard}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{totalNew}</div>
                <div style={{ fontSize: 13, color: colors.muted }}>New Customers</div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#9ef08c" }}>+180%</div>
              </div>

              <div style={statCard}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{orders}</div>
                <div style={{ fontSize: 13, color: colors.muted }}>Orders</div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#9ef08c" }}>+200%</div>
              </div>

              <div style={statCard}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>£{spend.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: colors.muted }}>Spend</div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#9ef08c" }}>+1272%</div>
              </div>

              <div style={statCard}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{Math.round((orders / Math.max(totalNew, 1)) * 100)}%</div>
                <div style={{ fontSize: 13, color: colors.muted }}>Converted</div>
                <div style={{ marginTop: 6, fontSize: 13, color: "#9ef08c" }}>+33%</div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <button style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "none", background: "#0ea5a4", color: "#012028", fontWeight: 800, cursor: "pointer" }}>View detailed report</button>
              <button style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: colors.text, cursor: "pointer" }}>Share</button>
            </div>

          </div>
        </div>

      </div>

      {/* ----------------- NEW SECTION: Customer average ----------------- */}
      <div style={avgSection}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Customer average</div>
          <div style={smallMuted}>Average values per customer in the selected period</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {customerAverage.map((c) => (
            <div key={c.id} style={smallCard}>
              <div style={statLeft}>
                <div style={statValue}>{c.value}</div>
                <div style={statLabel}>{c.label}</div>
              </div>
              <div style={pctStyle(c.pct)}>{c.pct}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- NEW SECTION: Heatmap ----------------- */}
      <div style={section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Customer average — heatmap</div>
          <div style={smallMuted}>Activity intensity across buckets (darker = higher)</div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 420 }}>
            <div style={heatmapBox}>
              <svg
                viewBox={`0 0 ${heatmap.cols * 18 + 80} ${heatmap.rows * 18 + 60}`}
                width="100%"
                height={heatmap.rows * 18 + 60}
                style={{ display: "block" }}
              >
                {/* row labels (days) */}
                {heatmap.values.map((row, r) => {
                  const y = 20 + r * 18;
                  return (
                    <text key={`rowlabel-${r}`} x={8} y={y + 12} fontSize={11} fill={colors.muted}>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][r] || `R${r + 1}`}
                    </text>
                  );
                })}

                {/* grid */}
                {heatmap.values.map((row, r) =>
                  row.map((v, c) => {
                    const x = 70 + c * 18;
                    const y = 6 + r * 18;
                    return <rect key={`cell-${r}-${c}`} x={x} y={y} width={16} height={16} rx={3} fill={heatColor(v)} stroke="rgba(255,255,255,0.03)" />;
                  })
                )}

                {/* top column labels (bucket numbers) */}
                {Array.from({ length: heatmap.cols }).map((_, c) => {
                  const x = 70 + c * 18 + 8;
                  return (
                    <text key={`col-${c}`} x={x} y={heatmap.rows * 18 + 34} fontSize={10} textAnchor="middle" fill={colors.muted}>
                      {c + 1}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <div style={{ fontSize: 12, color: colors.muted }}>Low</div>
              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                {Array.from({ length: 6 }).map((_, i) => {
                  const v = i / 5;
                  return <div key={i} style={{ width: 28, height: 10, background: heatColor(v), borderRadius: 3 }} />;
                })}
              </div>
              <div style={{ fontSize: 12, color: colors.muted }}>High</div>
            </div>
          </div>

          <div style={{ width: 280, minWidth: 220 }}>
            <div style={{ ...heatmapBox }}>
              <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>Heatmap insights</div>
              <div style={{ color: colors.muted, fontSize: 13, lineHeight: 1.5 }}>
                This heatmap shows intensity across 7 rows (days) and 12 buckets. Darker cells indicate higher relative activity for the chosen metric. Use different ranges (Day / Week / Month) above to see how the pattern changes.
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ color: colors.muted, fontSize: 13 }}>Average intensity</div>
                  <div style={{ fontWeight: 800 }}>{Math.round((heatmap.values.flat().reduce((s, v) => s + v, 0) / (heatmap.rows * heatmap.cols)) * 100) / 100}</div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "none", background: colors.accent2, color: "#012028", fontWeight: 700, cursor: "pointer" }}>Explore</button>
                  <button style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: colors.text, cursor: "pointer" }}>Export</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}