// File: RefundsPage_animated.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function RefundsPage() {
  const [toggleDate, setToggleDate] = useState("Book Order Date");
  const [viewMode, setViewMode] = useState("Day");
  const [compareMode, setCompareMode] = useState(false);
  const [showPercent, setShowPercent] = useState(false);

  const refundsChartRef = useRef(null);
  const hoursChartRef = useRef(null);

  // --- sample data maps (replace with real API data) ---
  const dataMap = useMemo(
    () => ({
      "Book Order Date": {
        Day: [200, 150, 300, 250, 400, 350],
        Week: [1200, 950, 1100, 1300],
        Month: [4000, 4200],
      },
      "Book Refunds Date": {
        Day: [50, 40, 60, 55, 80, 70],
        Week: [300, 250, 280, 310],
        Month: [1000, 1100],
      },
    }),
    []
  );

  const percentDataMap = useMemo(
    () => ({
      "Book Order Date": {
        Day: [4.5, 3.8, 6, 5.5, 8, 7],
        Week: [5, 4, 5.5, 6],
        Month: [4.8, 5.2],
      },
      "Book Refunds Date": {
        Day: [2, 1.5, 3, 2.5, 3.5, 3],
        Week: [2.5, 2, 2.8, 3],
        Month: [2.4, 2.6],
      },
    }),
    []
  );

  const labelsMap = useMemo(
    () => ({
      Day: ["Aug 2", "Aug 8", "Aug 15", "Aug 22", "Aug 29", "Sep 2"],
      Week: ["Week 1", "Week 2", "Week 3", "Week 4"],
      Month: ["Aug", "Sep"],
    }),
    []
  );

  // --- Hours between order created and refund sample data ---
  // For each label in labelsMap[viewMode] we have a sample median/average hours value.
  const hoursMap = useMemo(
    () => ({
      Day: [4.5, 12, 36, 8, 48, 20], // sample hours per label
      Week: [24, 18, 36, 16],
      Month: [30, 22],
    }),
    []
  );

  // Build refunds chart data depending on toggles
  const refundsChartData = useMemo(() => {
    const values = showPercent ? percentDataMap[toggleDate][viewMode] : dataMap[toggleDate][viewMode];
    return {
      labels: labelsMap[viewMode],
      datasets: [
        {
          label: showPercent ? "Refund %" : "Refunds",
          data: values,
          borderColor: "#60A5FA",
          borderWidth: 2.5,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#60A5FA",
          pointBorderWidth: 2,
          fill: true,
          cubicInterpolationMode: "monotone",
        },
      ],
    };
  }, [toggleDate, viewMode, showPercent, dataMap, percentDataMap, labelsMap]);

  // Build hours chart data
  const hoursChartData = useMemo(() => {
    const values = hoursMap[viewMode];
    return {
      labels: labelsMap[viewMode],
      datasets: [
        {
          label: "Hours to Refund (median)",
          data: values,
          borderColor: "#7C3AED",
          borderWidth: 2.5,
          tension: 0.38,
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#7C3AED",
          pointBorderWidth: 2,
          fill: true,
          cubicInterpolationMode: "monotone",
        },
      ],
    };
  }, [hoursMap, viewMode, labelsMap]);

  // Chart options with animation settings - smooth transitions
  const refundsOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      animation: {
        duration: 700,
        easing: "easeOutCubic",
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(10, 15, 25, 0.95)",
          titleColor: "#e6f0ff",
          bodyColor: "#d1e8ff",
          cornerRadius: 8,
          padding: 10,
          boxPadding: 6,
          callbacks: {
            label: (context) => (showPercent ? `${context.parsed.y}%` : `£${context.parsed.y}`),
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "rgba(226, 235, 255, 0.9)", font: { weight: 500 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)", drawBorder: false },
          ticks: {
            color: "rgba(226, 235, 255, 0.9)",
            beginAtZero: true,
            precision: 0,
            callback: (value) => (showPercent ? `${value}%` : `£${value}`),
          },
        },
      },
      transitions: {
        active: { animation: { duration: 350 } },
        resize: { animation: { duration: 300 } },
      },
    }),
    [showPercent]
  );

  const hoursOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      animation: {
        duration: 700,
        easing: "easeOutCubic",
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(10, 15, 25, 0.95)",
          titleColor: "#e6f0ff",
          bodyColor: "#d1e8ff",
          cornerRadius: 8,
          padding: 10,
          boxPadding: 6,
          callbacks: {
            label: (context) => `${context.parsed.y} hrs`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "rgba(226, 235, 255, 0.9)", font: { weight: 500 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)", drawBorder: false },
          ticks: {
            color: "rgba(226, 235, 255, 0.9)",
            beginAtZero: true,
            callback: (value) => `${value}h`,
          },
        },
      },
      elements: {
        line: {
          borderWidth: 2.5,
          borderJoinStyle: "round",
        },
      },
      transitions: {
        active: { animation: { duration: 350 } },
        resize: { animation: { duration: 300 } },
      },
    }),
    []
  );

  // Apply gradient and update refunds chart when chartData / options change
  useEffect(() => {
    const chart = refundsChartRef.current;
    if (!chart) return;

    const applyGradient = (c, startColor = "rgba(96,165,250,0.45)", midColor = "rgba(96,165,250,0.18)", endColor = "rgba(96,165,250,0.02)") => {
      const ctx = c.ctx;
      const ca = c.chartArea;
      if (!ctx || !ca) return false;
      const gradient = ctx.createLinearGradient(0, ca.top, 0, ca.bottom);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(0.5, midColor);
      gradient.addColorStop(1, endColor);
      c.data.datasets[0].backgroundColor = gradient;
      return true;
    };

    if (!applyGradient(chart)) {
      const id = requestAnimationFrame(() => {
        const c2 = refundsChartRef.current;
        if (!c2) return;
        applyGradient(c2);
        c2.data = refundsChartData;
        c2.options = refundsOptions;
        c2.update();
      });
      return () => cancelAnimationFrame(id);
    }

    chart.data = refundsChartData;
    chart.options = refundsOptions;
    chart.update();
  }, [refundsChartData, refundsOptions]);

  // Apply gradient and update hours chart
  useEffect(() => {
    const chart = hoursChartRef.current;
    if (!chart) return;

    const applyGradient = (c, startColor = "rgba(124,58,237,0.45)", midColor = "rgba(124,58,237,0.18)", endColor = "rgba(124,58,237,0.02)") => {
      const ctx = c.ctx;
      const ca = c.chartArea;
      if (!ctx || !ca) return false;
      const gradient = ctx.createLinearGradient(0, ca.top, 0, ca.bottom);
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(0.5, midColor);
      gradient.addColorStop(1, endColor);
      c.data.datasets[0].backgroundColor = gradient;
      return true;
    };

    if (!applyGradient(chart)) {
      const id = requestAnimationFrame(() => {
        const c2 = hoursChartRef.current;
        if (!c2) return;
        applyGradient(c2);
        c2.data = hoursChartData;
        c2.options = hoursOptions;
        c2.update();
      });
      return () => cancelAnimationFrame(id);
    }

    chart.data = hoursChartData;
    chart.options = hoursOptions;
    chart.update();
  }, [hoursChartData, hoursOptions]);

  // Export chart as PNG (refunds)
  const handleExportRefunds = () => {
    const chart = refundsChartRef.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = `refunds_${toggleDate.replace(/\s+/g, "_")}_${viewMode}.png`;
    link.click();
  };

  // Export hours chart
  const handleExportHours = () => {
    const chart = hoursChartRef.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = `hours_to_refund_${viewMode}.png`;
    link.click();
  };

  // Small stats for hours chart (avg, median, pct within 24h)
  const hoursStats = useMemo(() => {
    const arr = hoursMap[viewMode].slice();
    if (!arr || arr.length === 0) return { avg: 0, median: 0, within24: 0 };
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    const sorted = arr.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const within24 = (arr.filter((v) => v <= 24).length / arr.length) * 100;
    return { avg: Number(avg.toFixed(1)), median: Number(median.toFixed(1)), within24: Number(within24.toFixed(0)) };
  }, [hoursMap, viewMode]);

  return (
    <div
      style={{
        padding: "22px",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
        backgroundColor: "#041428",
        color: "#E6F0FF",
        minHeight: "100vh",
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Refunds</h1>
          <button
            onClick={() => setToggleDate(toggleDate === "Book Order Date" ? "Book Refunds Date" : "Book Order Date")}
            style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.04)", color: "#E6F0FF", cursor: "pointer", fontWeight: 600, boxShadow: "0 6px 18px rgba(2,6,23,0.45)" }}
          >
            {toggleDate}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!compareMode && (
            <input type="date" style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)", color: "#E6F0FF", cursor: "pointer" }} />
          )}

          {compareMode && (
            <>
              <input type="date" style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)", color: "#E6F0FF", cursor: "pointer" }} />
              <span style={{ color: "rgba(230,240,255,0.8)" }}>to</span>
              <input type="date" style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)", color: "#E6F0FF", cursor: "pointer" }} />
            </>
          )}

          <button
            onClick={() => setCompareMode(!compareMode)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", backgroundColor: compareMode ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.03)", color: "#E6F0FF", cursor: "pointer", fontWeight: 600 }}
          >
            {compareMode ? "Single" : "Compare"}
          </button>
        </div>
      </div>

      <p style={{ marginBottom: "20px", fontSize: "14px", color: "rgba(230,240,255,0.85)" }}>
        This report looks at refunds made for successful orders created between <strong>August 2, 2025</strong> and <strong>September 2, 2025</strong>.
      </p>

      {/* Chart + Stats */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Main Chart Section */}
        <div style={{ flex: "0 0 65%", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "18px", boxShadow: "0 10px 30px rgba(2,6,23,0.6)", minWidth: 320 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "10px", flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#E6F0FF" }}>Refunds</h2>

            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={handleExportRefunds} style={{ padding: "6px 12px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.03)", color: "#E6F0FF", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                Export
              </button>

              <button
                onClick={() => setShowPercent((s) => !s)}
                style={{ padding: "6px 12px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", backgroundColor: showPercent ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.03)", color: "#E6F0FF", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
              >
                View Refunds %
              </button>

              {["Day", "Week", "Month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: viewMode === mode ? "1px solid rgba(96,165,250,0.9)" : "1px solid rgba(255,255,255,0.04)",
                    backgroundColor: viewMode === mode ? "rgba(96,165,250,0.12)" : "transparent",
                    color: viewMode === mode ? "#DFF4FF" : "rgba(230,240,255,0.9)",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 320 }}>
            <Line ref={refundsChartRef} data={refundsChartData} options={refundsOptions} />
          </div>
        </div>

        {/* Stats Box (shorter height) */}
        <div style={{ flex: "1", backgroundColor: "rgba(255,255,255,0.02)", padding: "14px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(2,6,23,0.5)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "start", maxWidth: 420, maxHeight: 300, minHeight: 220, overflow: "hidden" }}>
          <h3 style={{ gridColumn: "span 2", margin: 0, fontSize: "15px", fontWeight: 700 }}>From the orders made in this period</h3>

          <div>
            <p style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#BFF0D6" }}>£120</p>
            <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#8EE7A7" }}>+5%</p>
            <span style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)" }}>Refunded</span>
          </div>

          <div>
            <p style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#FFD6D6" }}>3</p>
            <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#FF9B9B" }}>-2%</p>
            <span style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)" }}>Refunds</span>
          </div>

          <div>
            <p style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#BFF0D6" }}>£50</p>
            <span style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)" }}>Average Amount</span>
          </div>

          <div>
            <p style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#FFD6D6" }}>2</p>
            <span style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)" }}>Average Items</span>
          </div>

          <div>
            <p style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#BFF0D6" }}>4.5%</p>
            <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#8EE7A7" }}>+1%</p>
            <span style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)" }}>Refund Rate</span>
          </div>

          <div>
            <p style={{ margin: "2px 0 6px 0", fontSize: "14px", color: "#FFD6D6" }}>1.2%</p>
            <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#FF9B9B" }}>-0.5%</p>
            <span style={{ fontSize: "13px", color: "rgba(230,240,255,0.8)" }}>% of Sales</span>
          </div>
        </div>
      </div>

      {/* Hours to Refund section - placed below, modern and attractive */}
      <div style={{ marginTop: 24, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 50%", minWidth: 320, backgroundColor: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 18, boxShadow: "0 10px 30px rgba(2,6,23,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Hours to Refund</h2>
              <p style={{ margin: "6px 0 0 0", color: "rgba(230,240,255,0.75)", fontSize: 13 }}>Time elapsed between order creation and refund (median)</p>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={handleExportHours} style={{ padding: "6px 12px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.03)", color: "#E6F0FF", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                Export
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                {["Day", "Week", "Month"].map((mode) => (
                  <button
                    key={`hours-${mode}`}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "8px",
                      border: viewMode === mode ? "1px solid rgba(124,58,237,0.95)" : "1px solid rgba(255,255,255,0.04)",
                      backgroundColor: viewMode === mode ? "rgba(124,58,237,0.12)" : "transparent",
                      color: viewMode === mode ? "#F3E8FF" : "rgba(230,240,255,0.9)",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ height: 260 }}>
            <Line ref={hoursChartRef} data={hoursChartData} options={hoursOptions} />
          </div>
        </div>

        {/* Stats card for Hours (50% width look) */}
        <div style={{ flex: "0 0 320px", minWidth: 260, maxWidth: 420, backgroundColor: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.015))", borderRadius: 12, padding: 16, boxShadow: "0 8px 26px rgba(2,6,23,0.5)" }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Hours Summary ({viewMode})</h3>

          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 45%", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 12 }}>
              <p style={{ margin: "0 0 6px 0", color: "#BFF0D6", fontSize: 13 }}>Avg Hours</p>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{hoursStats.avg}h</p>
            </div>

            <div style={{ flex: "1 1 45%", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 12 }}>
              <p style={{ margin: "0 0 6px 0", color: "#FFD6D6", fontSize: 13 }}>Median</p>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{hoursStats.median}h</p>
            </div>

            <div style={{ flex: "1 1 100%", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 12, marginTop: 8 }}>
              <p style={{ margin: "0 0 6px 0", color: "rgba(230,240,255,0.85)", fontSize: 13 }}>Refunds within 24 hours</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 10, background: "rgba(255,255,255,0.04)", borderRadius: 999 }}>
                  <div style={{ width: `${hoursStats.within24}%`, height: "100%", background: "linear-gradient(90deg,#7C3AED,#60A5FA)", borderRadius: 999 }} />
                </div>
                <div style={{ minWidth: 42, textAlign: "right", fontWeight: 700 }}>{hoursStats.within24}%</div>
              </div>
            </div>

            <div style={{ flex: "1 1 100%", marginTop: 6, color: "rgba(230,240,255,0.75)", fontSize: 13 }}>
              <p style={{ margin: 0 }}>
                These numbers are based on sample data. Replace <code>hoursMap</code> with your real dataset (hours between order created and refund date) for accurate results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}