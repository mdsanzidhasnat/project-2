import React, { useState, useMemo, useEffect } from "react";

export default function Forecast() {
  const [range, setRange] = useState("6");
  const [animatedHeights, setAnimatedHeights] = useState([]);
  const [animatedCustHeights, setAnimatedCustHeights] = useState([]);

  // Mock data
  const mockData = {
    "3": [420, 520, 480],
    "6": [360, 400, 450, 520, 560, 610],
    "12": [220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660],
  };

  // Customers mock data (always normalized to 6 bars)
  const mockCustomerData = {
    "3": [12, 18, 14],
    "6": [10, 18, 20, 15, 22, 17],
    "12": [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
  };

  // Normalize data → always 6 bars
  const data = useMemo(() => {
    const values = mockData[range] || mockData["6"];
    if (values.length >= 6) return values.slice(-6);
    const missing = 6 - values.length;
    return [...values, ...Array(missing).fill(values[values.length - 1])];
  }, [range]);

  const custData = useMemo(() => {
    const values = mockCustomerData[range] || mockCustomerData["6"];
    if (values.length >= 6) return values.slice(-6);
    const missing = 6 - values.length;
    return [...values, ...Array(missing).fill(values[values.length - 1])];
  }, [range]);

  // Line chart mock data
  const orderData = {
    "3": [80, 120, 140],
    "6": [90, 100, 120, 140, 160, 180],
    "12": [50, 70, 90, 120, 150, 180, 210, 250, 280, 300, 320, 350],
  };

  const lineData = useMemo(() => {
    const values = orderData[range] || orderData["6"];
    if (values.length >= 6) return values.slice(-6);
    const missing = 6 - values.length;
    return [...values, ...Array(missing).fill(values[values.length - 1])];
  }, [range]);

  // Chart configs
  const CHART_HEIGHT = 420;
  const CHART_PADDING = 24;
  const barGapPct = 0.9; // smaller gap → thinner bars
  const barWidth = (100 / 6) - barGapPct; // fixed to 6 bars always
  const maxVal = Math.max(...data) * 1.2;
  const custMaxVal = Math.max(...custData) * 1.2;
  const maxLineVal = Math.max(...lineData) * 1.2;

  // Animate bar heights for sales
  useEffect(() => {
    let start = 0;
    const steps = 22;
    const interval = setInterval(() => {
      start++;
      setAnimatedHeights(data.map((v) => (v / maxVal) * (start / steps)));
      if (start >= steps) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [data, maxVal]);

  // Animate bar heights for customers
  useEffect(() => {
    let start = 0;
    const steps = 22;
    const interval = setInterval(() => {
      start++;
      setAnimatedCustHeights(custData.map((v) => (v / custMaxVal) * (start / steps)));
      if (start >= steps) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [custData, custMaxVal]);

  // Generate smooth line path (Bézier curves)
  const getSmoothPath = (points) => {
    if (points.length < 2) return "";

    const step = 100 / (points.length - 1);
    return points.reduce((path, point, i) => {
      const x = i * step;
      const y = CHART_HEIGHT - CHART_PADDING - (point / maxLineVal) * (CHART_HEIGHT - CHART_PADDING * 2);

      if (i === 0) return `M ${x},${y}`;

      const prevX = (i - 1) * step;
      const prevY = CHART_HEIGHT - CHART_PADDING - (points[i - 1] / maxLineVal) * (CHART_HEIGHT - CHART_PADDING * 2);
      const midX = (prevX + x) / 2;
      return `${path} Q ${prevX},${prevY} ${midX},${(prevY + y) / 2} T ${x},${y}`;
    }, "");
  };

  // Inline styles
  const styles = {
    page: {
      fontFamily: "Inter, Roboto, Arial, sans-serif",
      padding: 22,
      boxSizing: "border-box",
      color: "#f8fafc",
      background: "linear-gradient(180deg,#071226 0%,#071224 100%)",
      minHeight: "100vh",
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    titleArea: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    title: {
      fontSize: 22,
      fontWeight: 700,
      color: "#fff",
    },
    aboutButton: {
      padding: "8px 14px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(255,255,255,0.03)",
      cursor: "pointer",
      fontWeight: 600,
      color: "#cbd5e1",
      boxShadow: "0 6px 20px rgba(2,6,23,0.6)",
      transition: "transform 150ms",
    },
    controls: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    select: {
      padding: "8px 10px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(255,255,255,0.02)",
      color: "#f8fafc",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 6px 20px rgba(2,6,23,0.6)",
    },
    contentColumn: {
      display: "flex",
      flexDirection: "column",
      gap: 28,
    },
    sectionContainer: {
      display: "flex",
      gap: 18,
      alignItems: "flex-start",
    },
    leftColumn: {
      flexBasis: "65%",
      background: "linear-gradient(180deg,#0b1220, #071226)",
      padding: 18,
      borderRadius: 14,
      boxShadow: "0 8px 28px rgba(2,6,23,0.6)",
    },
    rightColumn: {
      flexBasis: "35%",
      background: "linear-gradient(180deg,#0b1220,#071226)",
      padding: 18,
      borderRadius: 14,
      boxShadow: "0 8px 28px rgba(2,6,23,0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 12,
      color: "#f8fafc",
    },
    svgWrapper: {
      width: "100%",
      height: CHART_HEIGHT,
      background: "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.005))",
      borderRadius: 10,
      padding: 10,
      boxSizing: "border-box",
      overflow: "hidden",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 12,
    },
    statCard: {
      padding: 14,
      borderRadius: 10,
      background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02))",
      minHeight: 86,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.02), 0 6px 18px rgba(2,6,23,0.5)",
    },
    statLabel: {
      fontSize: 13,
      color: "#94a3b8",
      marginBottom: 6,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 700,
      color: "#38bdf8",
    },
    boxTitle: {
      fontSize: 18,
      fontWeight: 800,
      marginBottom: 4,
      color: "#fff",
    },
    boxSub: {
      fontSize: 14,
      color: "#94a3b8",
      marginBottom: 12,
    },
    smallNote: {
      fontSize: 12,
      color: "#64748b",
      marginTop: 8,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div style={styles.titleArea}>
          <div style={styles.title}>Forecast</div>
          <button
            style={styles.aboutButton}
            aria-label="About report"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px) scale(1.01)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            About report
          </button>
        </div>

        <div style={styles.controls}>
          <label htmlFor="range-select" style={{ fontSize: 13, color: "#94a3b8" }}>
            Range
          </label>
          <select
            id="range-select"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={styles.select}
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
          </select>
        </div>
      </div>

      <div style={styles.contentColumn}>
        {/* Gross Sales Forecast */}
        <div style={styles.sectionContainer}>
          <div style={styles.leftColumn}>
            <div style={styles.chartTitle}>Gross Sales Forecast</div>
            <div style={styles.svgWrapper}>
              <svg viewBox="0 0 100 420" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                  <line
                    key={i}
                    x1="0"
                    x2="100"
                    y1={CHART_PADDING + (1 - t) * (CHART_HEIGHT - CHART_PADDING * 2)}
                    y2={CHART_PADDING + (1 - t) * (CHART_HEIGHT - CHART_PADDING * 2)}
                    stroke="rgba(148,163,184,0.06)"
                    strokeWidth="0.6"
                  />
                ))}

                {data.map((v, i) => {
                  const x = i * (100 / data.length) + 2;
                  const barHeight = (v / maxVal) * (CHART_HEIGHT - CHART_PADDING * 2) * (animatedHeights[i] || 0);
                  const y = CHART_HEIGHT - CHART_PADDING - barHeight;
                  return (
                    <g key={i}>
                      <rect
                        x={`${x}%`}
                        y={y}
                        width={`${barWidth}%`}
                        height={barHeight}
                        rx="3"
                        fill="url(#barGradient)"
                      />
                      <title>{`£${v.toLocaleString()}`}</title>
                    </g>
                  );
                })}

                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.boxTitle}>Over the next 6 months</div>
            <div style={styles.boxSub}>Sep '25 - Feb '26</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>You can expect</div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Sales</div>
                <div style={styles.statValue}>£5,278</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Per month</div>
                <div style={styles.statValue}>£880</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Growth Rate</div>
                <div style={styles.statValue}>100.9%</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>—</div>
                <div style={styles.statValue}>—</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Volume Forecast */}
        <div style={styles.sectionContainer}>
          <div style={styles.leftColumn}>
            <div style={styles.chartTitle}>Order Volume Forecast</div>
            <div style={styles.svgWrapper}>
              <svg viewBox="0 0 100 420" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                  <line
                    key={i}
                    x1="0"
                    x2="100"
                    y1={CHART_PADDING + (1 - t) * (CHART_HEIGHT - CHART_PADDING * 2)}
                    y2={CHART_PADDING + (1 - t) * (CHART_HEIGHT - CHART_PADDING * 2)}
                    stroke="rgba(148,163,184,0.06)"
                    strokeWidth="0.6"
                  />
                ))}

                <path d={getSmoothPath(lineData)} fill="none" stroke="url(#lineGradient)" strokeWidth="2.5" />

                {/* small circle markers */}
                {lineData.map((p, i) => {
                  const step = 100 / (lineData.length - 1);
                  const x = i * step;
                  const y = CHART_HEIGHT - CHART_PADDING - (p / maxLineVal) * (CHART_HEIGHT - CHART_PADDING * 2);
                  return <circle key={i} cx={`${x}%`} cy={y} r={1.8} fill="#4ade80" />;
                })}

                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.boxTitle}>Over the next 6 months</div>
            <div style={styles.boxSub}>Sep '25 - Feb '26</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>You can expect</div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Orders</div>
                <div style={styles.statValue}>132</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Per month</div>
                <div style={styles.statValue}>22</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Growth Rate</div>
                <div style={styles.statValue}>9.5%</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Based off</div>
                <div style={styles.statValue}>172 orders</div>
              </div>
            </div>

            <div style={styles.smallNote}>
              Based on 172 orders over the previous 12 months (Sep '24 - Aug '25).
            </div>
          </div>
        </div>

        {/* New Customers Forecast - NEW SECTION */}
        <div style={styles.sectionContainer}>
          <div style={styles.leftColumn}>
            <div style={styles.chartTitle}>New Customers Forecast</div>
            <div style={styles.svgWrapper}>
              <svg viewBox="0 0 100 420" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                  <line
                    key={i}
                    x1="0"
                    x2="100"
                    y1={CHART_PADDING + (1 - t) * (CHART_HEIGHT - CHART_PADDING * 2)}
                    y2={CHART_PADDING + (1 - t) * (CHART_HEIGHT - CHART_PADDING * 2)}
                    stroke="rgba(148,163,184,0.06)"
                    strokeWidth="0.6"
                  />
                ))}

                {custData.map((v, i) => {
                  const x = i * (100 / custData.length) + 2;
                  const barHeight = (v / custMaxVal) * (CHART_HEIGHT - CHART_PADDING * 2) * (animatedCustHeights[i] || 0);
                  const y = CHART_HEIGHT - CHART_PADDING - barHeight;
                  return (
                    <g key={i}>
                      <rect x={`${x}%`} y={y} width={`${barWidth}%`} height={barHeight} rx="3" fill="url(#custBarGradient)" />
                      <title>{`${v} new customers`}</title>
                    </g>
                  );
                })}

                <defs>
                  <linearGradient id="custBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7276f4ff" />
                    <stop offset="100%" stopColor="#3f37d9ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.boxTitle}>Over the next 6 months</div>
            <div style={styles.boxSub}>Sep '25 - Feb '26</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>You can expect</div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Customers</div>
                <div style={{ ...styles.statValue, color: "#7d80e1ff" }}>102</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Per month</div>
                <div style={styles.statValue}>17</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Growth Rate</div>
                <div style={styles.statValue}>0.0%</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Based off</div>
                <div style={styles.statValue}>156 customers</div>
              </div>
            </div>

            <div style={styles.smallNote}>
              Based on 156 customers over the previous 12 months (Sep '24 - Aug '25).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}