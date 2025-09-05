import React, { useState, useMemo, useRef, useEffect } from "react";
import GroupedByCurrencyTable from "./GroupedByCurrencyTable";
import GroupedByBilling from "./GroupedByBilling";
import GroupedByCustomField from "./GroupedByCustomField";
import DashboardCharts from "./DashboardCharts";
import AverageOrderCharts from "./AverageOrderCharts";
import SpendCharts from "./SpendCharts";
import OrdersByDayHour from './OrdersByDayHour';
import HoursBetweenOrdersChart from "./HoursBetweenOrdersChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

export default function DashboardClone() {
  const ordersByDate = [
    { date: "2025-07-31", orders: 1, gross: 20, refunds: 0, net: 20 },
    { date: "2025-08-12", orders: 4, gross: 420, refunds: 0, net: 420 },
    { date: "2025-08-21", orders: 8, gross: 1100, refunds: 0, net: 1100 },
    { date: "2025-08-29", orders: 1, gross: 165, refunds: 0, net: 165 },
  ];

  const statCards = [
    { title: "Net Sales", value: "£1,705", pct: 1151, positive: true },
    { title: "Daily Avg", value: "£122", pct: 436, positive: true },
    { title: "Orders", value: "14", pct: 133, positive: true },
    { title: "Avg Revenue", value: "£122", pct: 436, positive: true },
  ];

  const labels = ordersByDate.map((d) => dayjs(d.date).format("MMM D"));
  const netData = ordersByDate.map((d) => d.net);
  const orderCountData = ordersByDate.map((d) => d.orders);
  const hourlyLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const hourlyMock = hourlyLabels.map((_, i) =>
    Math.round(10 + Math.sin(i / 3) * 8 + Math.random() * 6)
  );
  const theme = {
    bg: "#071029",
    panel: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
    accent: "#5b81ff",
    muted: "#9aa6bd",
    green: "#2ecc71",
    red: "#ff6b6b",
    cardShadow: "0 6px 18px rgba(3,12,30,0.6)",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: theme.bg,
      color: "#e6eef8",
      fontFamily:
        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      padding: 20,
      boxSizing: "border-box",
    },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 },
    titleRow: { display: "flex", alignItems: "center", gap: 12 },
    title: { fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", gap: 12 },
    segmentBtn: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.06)",
      color: "#e6eef8",
      padding: "6px 10px",
      borderRadius: 8,
      cursor: "pointer",
      outline: "none",
    },
    controls: { display: "flex", alignItems: "center", gap: 10 },
    controlInput: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.04)",
      color: "#e6eef8",
      padding: "8px 10px",
      borderRadius: 8,
      outline: "none",
    },
    topRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 },
    card: {
      background: theme.panel,
      borderRadius: 12,
      padding: 16,
      boxShadow: theme.cardShadow,
      border: "1px solid rgba(255,255,255,0.03)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      minHeight: 88,
    },
    statLeft: { display: "flex", alignItems: "center", gap: 12 },
    statIcon: {
      width: 44,
      height: 44,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(135deg, rgba(91,129,255,0.14), rgba(91,129,255,0.06))",
      boxShadow: "inset 0 -6px 12px rgba(91,129,255,0.06)",
      flexShrink: 0,
      fontSize: 18,
    },
    pctBadge: (pos) => ({
      padding: "6px 8px",
      borderRadius: 999,
      background: pos ? "rgba(46,204,113,0.12)" : "rgba(255,107,107,0.09)",
      color: pos ? theme.green : theme.red,
      fontWeight: 700,
      fontSize: 12,
      minWidth: 56,
      textAlign: "center",
    }),
    mainArea: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 16 },
    chartBox: { background: theme.panel, borderRadius: 12, padding: 12, boxShadow: theme.cardShadow, border: "1px solid rgba(255,255,255,0.03)", minHeight: 320 },
    sectionTitle: { fontSize: 14, color: theme.muted, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" },
    focusRing: { outline: "3px solid rgba(91,129,255,0.18)", outlineOffset: 2, borderRadius: 8 },
    groupContainer: {
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.03)",
      borderRadius: 12,
      padding: 12,
      boxShadow: "0 6px 18px rgba(3,12,30,0.5)",
      marginTop: 16,
    },
    groupHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    groupTitleLeft: { display: "flex", gap: 12, alignItems: "baseline" },
    groupTitle: { fontSize: 15, fontWeight: 700 },
    smallSub: { fontSize: 12, color: theme.muted },
    groupBtn: {
      padding: "6px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.06)",
      background: "transparent",
      color: "#e6eef8",
      cursor: "pointer",
      fontSize: 13,
      marginLeft: 8,
    },
    tableWrap: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 },
    th: { textAlign: "left", padding: "10px 12px", color: theme.muted, borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", userSelect: "none" },
    td: { padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.02)" },
    rightAlign: { textAlign: "right" },
    statusBadge: (status) => ({
      padding: "6px 10px",
      borderRadius: 999,
      background:
        status === "Completed"
          ? "rgba(46,204,113,0.12)"
          : status === "Cancelled"
          ? "rgba(255,107,107,0.09)"
          : "rgba(241,196,15,0.08)",
      color: status === "Completed" ? theme.green : status === "Cancelled" ? theme.red : "#f1c40f",
      fontWeight: 700,
      display: "inline-block",
      minWidth: 80,
      textAlign: "center",
    }),
  };
  const leftChartData = useMemo(
    () => ({
      labels,
      datasets: [
        { type: "line", label: "Net Sales", data: netData, tension: 0.35, fill: true, backgroundColor: "rgba(91,129,255,0.14)", borderColor: "rgba(91,129,255,0.95)", pointBackgroundColor: "#fff", pointBorderColor: "rgba(91,129,255,0.95)", yAxisID: "y" },
        { type: "line", label: "Orders", data: orderCountData, tension: 0.4, borderDash: [6, 6], borderColor: "rgba(170,120,255,0.9)", backgroundColor: "transparent", yAxisID: "y1" },
        { type: "line", label: "Prediction", data: netData.map((v, i) => Math.round(v * (1 + 0.12 * (i + 1) / labels.length))), tension: 0.35, borderColor: "rgba(60,220,180,0.85)", backgroundColor: "rgba(60,220,180,0.06)", fill: true, yAxisID: "y" },
      ],
    }),
    [labels, netData, orderCountData]
  );

  const leftChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { labels: { color: "#cfe6ff" } }, tooltip: { mode: "index", intersect: false } },
    scales: {
      x: { ticks: { color: "#9fb0d6" }, grid: { color: "rgba(255,255,255,0.02)" } },
      y: { position: "left", ticks: { color: "#9fb0d6" }, grid: { color: "rgba(255,255,255,0.02)" } },
      y1: { position: "right", grid: { display: false }, ticks: { color: "#9fb0d6" } },
    },
    animation: { duration: 800, easing: "easeOutCubic" },
  };

  const rightChartData = useMemo(
    () => ({
      labels: hourlyLabels,
      datasets: [{ label: "Hourly Prediction", data: hourlyMock, fill: true, tension: 0.35, backgroundColor: "rgba(91,129,255,0.10)", borderColor: "rgba(91,129,255,0.95)", pointRadius: 3 }],
    }),
    [hourlyLabels, hourlyMock]
  );

  const rightChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: {} },
    scales: {
      x: { ticks: { color: "#9fb0d6" }, grid: { color: "rgba(255,255,255,0.02)" } },
      y: { ticks: { color: "#9fb0d6" }, grid: { color: "rgba(255,255,255,0.02)" } },
    },
    animation: { duration: 900, easing: "easeOutQuart" },
  };
  const [segment, setSegment] = useState("All Segments");
  const [compareOpen, setCompareOpen] = useState(false);
  const [search, setSearch] = useState("");
  const compareStartRef = useRef(null);
  const compareEndRef = useRef(null);
  const [focusKey, setFocusKey] = useState(null);
  useEffect(() => {
    const handler = (e) => { if (e.key === "Tab") setFocusKey("keyboard"); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const focusProps = (keyName) => focusKey ? { onFocus: () => setFocusKey(keyName), onBlur: () => setFocusKey(null), tabIndex: 0, "aria-label": keyName } : { tabIndex: 0, "aria-label": keyName };
  const StatsRow = () => {
    const boxes = [
      { name: "Gross Sales", amount: "$12,500", profit: "+5%", color: "#5b81ff" }, // blue
      { name: "Refunds", amount: "$1,200", profit: "-2%", color: "#ff6b6b" },       // red
      { name: "Discounts", amount: "$800", profit: "-1%", color: "#f1c40f" },       // yellow
      { name: "Taxes", amount: "$2,300", profit: "+0.5%", color: "#2ecc71" },       // green
      { name: "Shipping", amount: "$450", profit: "+1%", color: "#9b59b6" },        // purple
      { name: "Fees", amount: "$600", profit: "-0.3%", color: "#e67e22" },          // orange
    ];

    const baseBoxStyles = {
      flex: "1",
      backgroundColor: "#041020",
      color: "white",
      borderRadius: "12px",
      padding: "12px",
      margin: "5px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      minHeight: "72px",
    };

    const nameStyle = { fontSize: "13px", opacity: 0.85, marginBottom: 6 };
    const amountStyle = { fontSize: "17px", fontWeight: 700, marginBottom: 6 };
    const profitStyle = (profit) => ({
      fontSize: "13px",
      fontWeight: 600,
      color: profit.includes("+") ? "#2ecc71" : "#e74c3c",
    });

    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0", gap: 8 }}>
        {boxes.map((box, index) => (
          <div
            key={index}
            style={{
              ...baseBoxStyles,
              borderTop: `4px solid ${box.color}`,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
            }}
          >
            <div style={nameStyle}>{box.name}</div>
            <div style={amountStyle}>{box.amount}</div>
            <div style={profitStyle(box.profit)}>{box.profit}</div>
          </div>
        ))}
      </div>
    );
  };
  const DailyStatsRow = () => {
    const boxes = [
      { name: "Daily Net", amount: "£53", pct: "1151%", color: "#5b81ff" },
      { name: "Daily Gross", amount: "£53", pct: "1151%", color: "#ff6b6b" },
      { name: "Daily Orders", amount: "0", pct: "133%", color: "#2ecc71" },
      { name: "Daily Items", amount: "3", pct: "1314%", color: "#f1c40f" },
    ];

    const boxStyles = {
      flex: "1",
      backgroundColor: "#041020",
      color: "white",
      borderRadius: "12px",
      padding: "10px 12px",
      margin: "5px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
      transition: "transform 0.18s, box-shadow 0.18s",
      cursor: "pointer",
      minHeight: "56px",
    };

    const nameStyle = { fontSize: "14px", opacity: 0.9 };
    const rightWrap = { display: "flex", alignItems: "center" };
    const amountStyle = { fontSize: "15px", fontWeight: 700, marginLeft: 8 };
    const pctStyle = (pct) => ({
      fontSize: "13px",
      fontWeight: 600,
      marginLeft: 8,
      color: pct.includes("-") ? "#e74c3c" : "#2ecc71",
      opacity: 0.95,
    });

    return (
      <div style={{ display: "flex", gap: 8, margin: "8px 0 22px 0" }}>
        {boxes.map((box, idx) => (
          <div
            key={idx}
            style={{
              ...boxStyles,
              borderTop: `4px solid ${box.color}`,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              minWidth: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.32)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.22)";
            }}
          >
            <div style={nameStyle}>{box.name}</div>
            <div style={rightWrap}>
              <div style={amountStyle}>{box.amount}</div>
              <div style={pctStyle(box.pct)}>{box.pct}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const GroupedByStatusTable = () => {
    const initial = [
      { status: "Fails", orders: 2, items: 4, customers: 2, netSales: 120, avgNet: 60, grossSales: 150, avgGross: 75 },
      { status: "Cancelled", orders: 3, items: 7, customers: 3, netSales: 300, avgNet: 100, grossSales: 330, avgGross: 110 },
      { status: "Completed", orders: 14, items: 35, customers: 10, netSales: 2500, avgNet: 178.57, grossSales: 2700, avgGross: 192.86 },
    ];

    const [rows, setRows] = useState(initial);
    const [sortKey, setSortKey] = useState("status");
    const [sortDir, setSortDir] = useState("asc");

    useEffect(() => {
      handleSort(sortKey, sortDir, false);
    }, []);
    const numberCompare = (a, b, key) => {
      const av = a[key] ?? 0;
      const bv = b[key] ?? 0;
      return av - bv;
    };
    const stringCompare = (a, b, key) => {
      const av = (a[key] ?? "").toString().toLowerCase();
      const bv = (b[key] ?? "").toString().toLowerCase();
      return av < bv ? -1 : av > bv ? 1 : 0;
    };
    const handleSort = (key, dir = sortDir, toggle = true) => {
      const newDir = toggle ? (sortKey === key && sortDir === "asc" ? "desc" : "asc") : dir;
      const sorted = [...rows].sort((a, b) => {
        if (["orders", "items", "customers", "netSales", "avgNet", "grossSales", "avgGross"].includes(key)) {
          return numberCompare(a, b, key) * (newDir === "asc" ? 1 : -1);
        }
        return stringCompare(a, b, key) * (newDir === "asc" ? 1 : -1);
      });
      setRows(sorted);
      setSortKey(key);
      setSortDir(newDir);
    };

    const exportCSV = () => {
      const headers = ["Status", "Orders", "Items", "Customers", "Net Sales", "Avg Net", "Gross Sales", "Avg Gross"];
      const rowsCsv = rows.map((r) => [
        r.status,
        r.orders,
        r.items,
        r.customers,
        `£${r.netSales}`,
        `£${Number(r.avgNet).toFixed(2)}`,
        `£${r.grossSales}`,
        `£${Number(r.avgGross).toFixed(2)}`,
      ]);
      const csv = [headers, ...rowsCsv].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "grouped_by_status.csv";
      a.click();
      URL.revokeObjectURL(url);
    };

    const aiPrompt = () => {
      console.log("AI Prompt clicked for Grouped by Status section", rows);
      alert("AI Prompt action triggered (placeholder).");
    };

    const format = (val) =>
      typeof val === "number" ? `£${Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : val;

    return (
      <div style={styles.groupContainer} role="region" aria-label="Grouped by Status">
        <div style={styles.groupHeader}>
          <div style={styles.groupTitleLeft}>
            <div style={styles.groupTitle}>Grouped by Status</div>
            <div style={styles.smallSub}>Status summary (Fails / Cancelled / Completed)</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontSize: 13, color: theme.muted }}>Sort</label>
            <select
              value={sortKey}
              onChange={(e) => handleSort(e.target.value, sortDir, false)}
              style={{ ...styles.controlInput, padding: "6px 8px", fontSize: 13 }}
            >
              <option value="status">Status</option>
              <option value="orders">Orders</option>
              <option value="items">Items</option>
              <option value="customers">Customers</option>
              <option value="netSales">Net Sales</option>
              <option value="avgNet">Average Net</option>
              <option value="grossSales">Gross Sales</option>
              <option value="avgGross">Average Sales</option>
            </select>

            <select
              value={sortDir}
              onChange={(e) => handleSort(sortKey, e.target.value, false)}
              style={{ ...styles.controlInput, padding: "6px 8px", fontSize: 13 }}
              title="Sort order"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <button style={styles.groupBtn} onClick={aiPrompt} title="AI Prompt">
              AI Prompt
            </button>
            <button style={styles.groupBtn} onClick={exportCSV} title="Export CSV">
              Export
            </button>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table} role="table" aria-label="Grouped by status table">
            <thead>
              <tr>
                <th style={styles.th} onClick={() => handleSort("status")}>
                  Status {sortKey === "status" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("orders")}>
                  Orders {sortKey === "orders" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("items")}>
                  Items {sortKey === "items" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("customers")}>
                  Customers {sortKey === "customers" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("netSales")}>
                  Net Sales {sortKey === "netSales" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("avgNet")}>
                  Average Net {sortKey === "avgNet" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("grossSales")}>
                  Gross Sales {sortKey === "grossSales" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...styles.th, ...styles.rightAlign }} onClick={() => handleSort("avgGross")}>
                  Average Sales {sortKey === "avgGross" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.status}>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(r.status)}>{r.status}</span>
                  </td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{r.orders}</td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{r.items}</td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{r.customers}</td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{format(r.netSales)}</td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{`£${Number(r.avgNet).toFixed(2)}`}</td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{format(r.grossSales)}</td>
                  <td style={{ ...styles.td, ...styles.rightAlign }}>{`£${Number(r.avgGross).toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  const NewReturningTable = () => {
    const [showPercent, setShowPercent] = useState(false);
    const tableData = [
      {
        type: "New",
        customers: 120,
        orders: 300,
        netSales: 4500,
        grossSales: 5000,
      },
      {
        type: "Returning",
        customers: 80,
        orders: 200,
        netSales: 3500,
        grossSales: 4000,
      },
    ];
    const totals = tableData.reduce(
      (acc, r) => {
        acc.customers += r.customers;
        acc.orders += r.orders;
        acc.netSales += r.netSales;
        acc.grossSales += r.grossSales;
        return acc;
      },
      { customers: 0, orders: 0, netSales: 0, grossSales: 0 }
    );
    const avg = (value, orders) => (orders === 0 ? 0 : +(value / orders).toFixed(2));

    const generateCSV = () => {
      const headers = ["Type", "Customers", "Orders", "Net Sales", "Avg Net", "Gross Sales", "Avg Gross"];
      const rows = tableData.map((r) => [
        r.type,
        r.customers,
        r.orders,
        r.netSales,
        avg(r.netSales, r.orders),
        r.grossSales,
        avg(r.grossSales, r.orders),
      ]);
      const totalRow = [
        "Total",
        totals.customers,
        totals.orders,
        totals.netSales,
        avg(totals.netSales, totals.orders),
        totals.grossSales,
        avg(totals.grossSales, totals.orders),
      ];
      const csv = [headers, ...rows, totalRow].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "new_returning_customers.csv";
      a.click();
      URL.revokeObjectURL(url);
    };
    const tStyles = {
      container: {
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.03)",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 6px 18px rgba(3,12,30,0.5)",
      },
      headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
      titleLeft: { display: "flex", gap: 12, alignItems: "baseline" },
      title: { fontSize: 14, fontWeight: 700 },
      smallSub: { fontSize: 12, color: theme.muted },
      buttonGroup: { display: "flex", gap: 8, alignItems: "center" },
      btn: {
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "transparent",
        color: "#e6eef8",
        cursor: "pointer",
        fontSize: 13,
      },
      tableWrap: { overflowX: "auto" },
      table: { width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 },
      th: { textAlign: "left", padding: "8px 10px", color: theme.muted, borderBottom: "1px solid rgba(255,255,255,0.04)" },
      td: { padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.02)" },
      rightAlign: { textAlign: "right" },
      totalRow: { fontWeight: 700, background: "rgba(255,255,255,0.01)" },
    };

    const format = (val) => (typeof val === "number" ? val.toLocaleString() : val);

    return (
      <div style={{ marginTop: 12 }}>
        <div style={tStyles.container}>
          <div style={tStyles.headerRow}>
            <div style={tStyles.titleLeft}>
              <div style={tStyles.title}>New vs Returning Customers</div>
              <div style={tStyles.smallSub}>Total Customers: {totals.customers}</div>
            </div>

            <div style={tStyles.buttonGroup}>
              <button
                style={tStyles.btn}
                onClick={() => setShowPercent((s) => !s)}
                aria-pressed={showPercent}
                title="Toggle percent view"
              >
                Show %
              </button>
              <button style={tStyles.btn} onClick={generateCSV} title="Export CSV">
                Export
              </button>
            </div>
          </div>

          <div style={tStyles.tableWrap} role="table" aria-label="New vs Returning Customers table">
            <table style={tStyles.table}>
              <thead>
                <tr>
                  <th style={tStyles.th}>Type</th>
                  <th style={{ ...tStyles.th, ...tStyles.rightAlign }}>Customers</th>
                  <th style={{ ...tStyles.th, ...tStyles.rightAlign }}>Orders</th>
                  <th style={{ ...tStyles.th, ...tStyles.rightAlign }}>Net Sales</th>
                  <th style={{ ...tStyles.th, ...tStyles.rightAlign }}>Avg Net</th>
                  <th style={{ ...tStyles.th, ...tStyles.rightAlign }}>Gross Sales</th>
                  <th style={{ ...tStyles.th, ...tStyles.rightAlign }}>Avg Gross</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((r) => {
                  const avgNet = avg(r.netSales, r.orders);
                  const avgGross = avg(r.grossSales, r.orders);
                  return (
                    <tr key={r.type}>
                      <td style={tStyles.td}>{r.type}</td>
                      <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>
                        {showPercent ? `${((r.customers / totals.customers) * 100).toFixed(1)}%` : format(r.customers)}
                      </td>
                      <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>
                        {showPercent ? `${((r.orders / totals.orders) * 100).toFixed(1)}%` : format(r.orders)}
                      </td>
                      <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>
                        {showPercent ? `${((r.netSales / totals.netSales) * 100).toFixed(1)}%` : `£${format(r.netSales)}`}
                      </td>
                      <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>
                        {showPercent ? `${((avgNet / avg(totals.netSales, totals.orders)) * 100).toFixed(1)}%` : `£${format(avgNet)}`}
                      </td>
                      <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>
                        {showPercent ? `${((r.grossSales / totals.grossSales) * 100).toFixed(1)}%` : `£${format(r.grossSales)}`}
                      </td>
                      <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>
                        {showPercent ? `${((avgGross / avg(totals.grossSales, totals.orders)) * 100).toFixed(1)}%` : `£${format(avgGross)}`}
                      </td>
                    </tr>
                  );
                })}

                <tr style={tStyles.totalRow}>
                  <td style={tStyles.td}>Total</td>
                  <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>{totals.customers}</td>
                  <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>{totals.orders}</td>
                  <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>£{totals.netSales.toLocaleString()}</td>
                  <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>£{avg(totals.netSales, totals.orders)}</td>
                  <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>£{totals.grossSales.toLocaleString()}</td>
                  <td style={{ ...tStyles.td, ...tStyles.rightAlign }}>£{avg(totals.grossSales, totals.orders)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  const PaymentMethodSection = () => {
    const paymentData = [
      {
        id: "stripe_cc",
        title: "Stripe Credit Card",
        createdVia: "Online",
        orders: 120,
        items: 300,
        customers: 100,
        netSales: 5000,
        avgNet: 41.67,
        grossSales: 5500,
        avgGross: 45.83,
      },
      {
        id: "fastspring",
        title: "Fastspring",
        createdVia: "Online",
        orders: 80,
        items: 200,
        customers: 70,
        netSales: 4000,
        avgNet: 50,
        grossSales: 4500,
        avgGross: 56.25,
      },
    ];

    const [selectedPayment, setSelectedPayment] = useState(paymentData[0].id);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [aiPromptText, setAiPromptText] = useState("");

    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };

    const sortedData = [...paymentData].sort((a, b) => {
      if (!sortConfig.key) return 0;
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    const selectedData = paymentData.find((p) => p.id === selectedPayment) ?? paymentData[0];

    const exportCSV = () => {
      const headers = ["ID", "Title", "Created Via", "Orders", "Items", "Customers", "Net Sales", "Avg Net", "Gross Sales", "Avg Gross"];
      const rows = paymentData.map((p) => [
        p.id,
        p.title,
        p.createdVia,
        p.orders,
        p.items,
        p.customers,
        p.netSales,
        p.avgNet,
        p.grossSales,
        p.avgGross,
      ]);
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment_methods.csv";
      a.click();
      URL.revokeObjectURL(url);
    };

    const aiAction = () => {
      console.log("AI Prompt for Payment Method Section:", aiPromptText, selectedData);
      alert("AI Prompt triggered (placeholder). Check console for data.");
    };

    const pStyles = {
      container: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: 12, boxShadow: "0 6px 18px rgba(3,12,30,0.5)", marginTop: 16 },
      header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
      left: { display: "flex", gap: 12, alignItems: "center" },
      select: { padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", background: "transparent", color: "#e6eef8" },
      meta: { fontSize: 13, color: theme.muted },
      table: { width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 },
      th: { textAlign: "left", padding: "8px 10px", color: theme.muted, borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" },
      td: { padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.02)" },
      rightCol: { width: 320, display: "flex", flexDirection: "column", gap: 8 },
      textarea: { width: "100%", minHeight: 120, padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.35)", color: "#e6eef8" },
      btn: { padding: "10px", borderRadius: 8, background: theme.accent, color: "#fff", border: "none", cursor: "pointer" },
    };

    return (
      <div style={pStyles.container} role="region" aria-label="Grouped by Payment Method">
        <div style={pStyles.header}>
          <div style={pStyles.left}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Grouped by Payment Method</div>
            <div style={{ ...pStyles.meta, marginLeft: 6 }}>{paymentData.length} methods</div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} style={pStyles.select}>
              {paymentData.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>

            <button onClick={exportCSV} style={{ ...pStyles.btn, background: "transparent", color: "#e6eef8", border: "1px solid rgba(255,255,255,0.06)" }}>
              Export
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {/* Left side */}
          <div style={{ flex: 2 }}>
            <div style={{ marginBottom: 10, color: theme.muted }}>
              <strong>Payment Method ID:</strong> {selectedData.id} &nbsp;|&nbsp;
              <strong>Title:</strong> {selectedData.title} &nbsp;|&nbsp;
              <strong>Created Via:</strong> {selectedData.createdVia}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={pStyles.table}>
                <thead>
                  <tr>
                    {[
                      { key: "id", label: "Payment Method ID" },
                      { key: "orders", label: "Orders" },
                      { key: "items", label: "Items" },
                      { key: "customers", label: "Customers" },
                      { key: "netSales", label: "Net Sales" },
                      { key: "avgNet", label: "Average Net" },
                      { key: "grossSales", label: "Gross Sales" },
                      { key: "avgGross", label: "Average Gross" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        style={{
                          ...pStyles.th,
                          background: sortConfig.key === col.key ? "rgba(255,255,255,0.02)" : "transparent",
                        }}
                      >
                        {col.label} {sortConfig.key === col.key ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((p) => (
                    <tr key={p.id} style={{ background: p.id === selectedPayment ? "rgba(91,129,255,0.03)" : "transparent" }}>
                      <td style={pStyles.td}>{p.id}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>{p.orders}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>{p.items}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>{p.customers}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>£{p.netSales.toLocaleString()}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>£{p.avgNet}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>£{p.grossSales.toLocaleString()}</td>
                      <td style={{ ...pStyles.td, textAlign: "right" }}>£{p.avgGross}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        <div style={pStyles.rightCol}>
         <button style={pStyles.btn} onClick={aiAction}>
           AI Prompt
         </button>
         <button
           onClick={exportCSV}
           style={{
             ...pStyles.btn,
             background: "transparent",
             color: "#e6eef8",
             border: "1px solid rgba(255,255,255,0.06)",
           }}
         >
           Export
         </button>
       </div>


        </div>
      </div>
    );
  };
  const ShippingMethodSection = () => {
        const shippingData = [
      {
        id: "free_shipping",
        title: "Free Shipping",
        createdVia: "Online",
        orders: 220,
        items: 480,
        customers: 180,
        netSales: 6200,
        avgNet: 28.18,
        grossSales: 6800,
        avgGross: 30.91,
      },
      {
        id: "flat_rate",
        title: "Flat Rate",
        createdVia: "Online",
        orders: 90,
        items: 200,
        customers: 75,
        netSales: 3400,
        avgNet: 37.78,
        grossSales: 3800,
        avgGross: 42.22,
      },
      {
        id: "local_pickup",
        title: "Local Pickup",
        createdVia: "In-store",
        orders: 40,
        items: 55,
        customers: 38,
        netSales: 1200,
        avgNet: 30,
        grossSales: 1350,
        avgGross: 33.75,
      },
    ];

    const [groupBy, setGroupBy] = useState("id"); // 'id' or 'title'
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [selectedShipping, setSelectedShipping] = useState(shippingData[0].id);
    const [aiPromptText, setAiPromptText] = useState("");

    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };

    const sortedData = [...shippingData].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const ak = a[sortConfig.key];
      const bk = b[sortConfig.key];
      if (typeof ak === "number" && typeof bk === "number") {
        return sortConfig.direction === "asc" ? ak - bk : bk - ak;
      }
      if ((ak ?? "") < (bk ?? "")) return sortConfig.direction === "asc" ? -1 : 1;
      if ((ak ?? "") > (bk ?? "")) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    const exportCSV = () => {
      const headers = ["Shipping Method ID", "Title", "Created Via", "Orders", "Items", "Customers", "Net Sales", "Avg Net", "Gross Sales", "Avg Gross"];
      const rows = shippingData.map((p) => [
        p.id,
        p.title,
        p.createdVia,
        p.orders,
        p.items,
        p.customers,
        p.netSales,
        p.avgNet,
        p.grossSales,
        p.avgGross,
      ]);
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shipping_methods.csv";
      a.click();
      URL.revokeObjectURL(url);
    };

    const aiAction = () => {
          console.log("AI Prompt for Shipping Method Section:", aiPromptText, shippingData);
      alert("AI Prompt triggered for Shipping Method (placeholder).");
    };

    const sStyles = {
      container: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: 12, padding: 12, boxShadow: "0 6px 18px rgba(3,12,30,0.5)", marginTop: 16 },
      header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
      left: { display: "flex", gap: 12, alignItems: "center" },
      groupToggle: { display: "inline-flex", gap: 6, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" },
      toggleBtn: (active) => ({
        padding: "6px 10px",
        cursor: "pointer",
        background: active ? "rgba(91,129,255,0.12)" : "transparent",
        color: "#e6eef8",
        border: "none",
      }),
      meta: { fontSize: 13, color: theme.muted },
      table: { width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 },
      th: { textAlign: "left", padding: "8px 10px", color: theme.muted, borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" },
      td: { padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.02)" },
      btn: { padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#e6eef8", cursor: "pointer" },
      rightCol: { display: "flex", gap: 8, alignItems: "center" },
      textarea: { width: 260, minHeight: 96, padding: 8, borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.35)", color: "#e6eef8" },
    };

    return (
      <div style={sStyles.container} role="region" aria-label="Grouped by Shipping Method">
        <div style={sStyles.header}>
          <div style={sStyles.left}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Grouped by Shipping Method</div>
            <div style={{ ...sStyles.meta, marginLeft: 6 }}>{shippingData.length} methods</div>
            <div style={{ marginLeft: 12 }}>
              <div style={sStyles.groupToggle} role="tablist" aria-label="Group by shipping method">
                <button
                  type="button"
                  onClick={() => setGroupBy("id")}
                  style={sStyles.toggleBtn(groupBy === "id")}
                  aria-pressed={groupBy === "id"}
                  title="Group by Shipping Method ID"
                >
                  Shipping Method ID
                </button>
                <button
                  type="button"
                  onClick={() => setGroupBy("title")}
                  style={sStyles.toggleBtn(groupBy === "title")}
                  aria-pressed={groupBy === "title"}
                  title="Group by Shipping Method Title"
                >
                  Shipping Method Title
                </button>
              </div>
            </div>
          </div>
          <div style={sStyles.rightCol}>
          <button style={sStyles.btn} onClick={aiAction} title="Run AI Prompt">
            AI Prompt
          </button>
          <button style={sStyles.btn} onClick={exportCSV} title="Export CSV">
            Export
          </button>
        </div>

        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={sStyles.table}>
            <thead>
              <tr>
                <th
                  style={sStyles.th}
                  onClick={() => handleSort(groupBy === "id" ? "id" : "title")}
                >
                  {groupBy === "id" ? "Shipping Method ID" : "Shipping Method Title"}{" "}
                  {sortConfig.key === (groupBy === "id" ? "id" : "title") ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>

                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("orders")}>
                  Orders {sortConfig.key === "orders" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("items")}>
                  Items {sortConfig.key === "items" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("customers")}>
                  Customers {sortConfig.key === "customers" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("netSales")}>
                  Net Sales {sortConfig.key === "netSales" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("avgNet")}>
                  Average Net {sortConfig.key === "avgNet" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("grossSales")}>
                  Gross Sales {sortConfig.key === "grossSales" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ ...sStyles.th, textAlign: "right" }} onClick={() => handleSort("avgGross")}>
                  Average Gross {sortConfig.key === "avgGross" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id} style={{ background: selectedShipping === row.id ? "rgba(91,129,255,0.03)" : "transparent" }}>
                  <td style={sStyles.td}>
                    {groupBy === "id" ? row.id : row.title}
                    <div style={{ fontSize: 11, color: theme.muted }}>{row.title}</div>
                  </td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>{row.orders}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>{row.items}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>{row.customers}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>£{row.netSales.toLocaleString()}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>£{Number(row.avgNet).toFixed(2)}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>£{row.grossSales.toLocaleString()}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>£{Number(row.avgGross).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
return (
  <main style={styles.page}>
    {/* Header */}
    <header style={styles.header}>
      <div style={styles.titleRow}>
        <div style={styles.title}>
          <button
            style={{ background: "transparent", border: "none", color: "#cfe6ff", fontSize: 18, cursor: "pointer" }}
            {...focusProps("back")}
          >
            ←
          </button>
          <span>Orders</span>
          <button
            style={{ ...styles.segmentBtn, marginLeft: 12 }}
            onClick={() => setSegment((s) => (s === "All Segments" ? "Segment A" : "All Segments"))}
            aria-pressed={segment !== "All Segments"}
            {...focusProps("segment")}
          >
            {segment} ▾
          </button>
        </div>
      </div>

      <div style={styles.controls}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 13, color: theme.muted }}>Compare Calendar</label>
          <button
            onClick={() => setCompareOpen((s) => !s)}
            style={{ ...styles.segmentBtn, display: "inline-flex", alignItems: "center", gap: 6 }}
            aria-expanded={compareOpen}
            {...focusProps("compare-toggle")}
          >
            {compareOpen ? "On" : "Off"}
          </button>
        </div>

        {compareOpen && (
          <div
            style={{ display: "flex", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.02)", padding: 8, borderRadius: 8 }}
            role="region"
            aria-label="Compare Calendar"
          >
            <input ref={compareStartRef} type="date" aria-label="Start date" defaultValue="2025-07-29" style={styles.controlInput} {...focusProps("compare-start")} />
            <input ref={compareEndRef} type="date" aria-label="End date" defaultValue="2025-08-30" style={styles.controlInput} {...focusProps("compare-end")} />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="search"
            placeholder="Search orders..."
            aria-label="Search orders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...styles.controlInput, width: 180 }}
            {...focusProps("search")}
          />
        </div>
      </div>
    </header>
    <section aria-label="Top statistics" style={styles.topRow}>
      {statCards.map((s, idx) => (
        <article
          key={s.title}
          style={{ ...styles.card, transition: "transform 180ms ease", ...(focusKey === `card-${idx}` ? styles.focusRing : {}) }}
          {...focusProps(`card-${idx}`)}
          role="region"
          aria-labelledby={`stat-${idx}`}
        >
          <div style={styles.statLeft}>
            <div style={styles.statIcon} aria-hidden="true">{idx === 0 ? "💷" : idx === 1 ? "📈" : idx === 2 ? "🧾" : "💡"}</div>
            <div>
              <div id={`stat-${idx}`} style={{ fontSize: 13, color: theme.muted }}>{s.title}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.value}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={styles.pctBadge(s.positive)} aria-hidden="true">{s.positive ? "▲" : "▼"} {s.pct}%</div>
            <div style={{ fontSize: 12, color: theme.muted, marginTop: 8 }}>vs previous</div>
          </div>
        </article>
      ))}
    </section>
    <section style={styles.mainArea} aria-label="Charts">
      <div style={styles.chartBox} role="region" aria-label="Net sales and orders">
        <div style={styles.sectionTitle}><strong>Orders</strong></div>
        <div style={{ height: 260 }}><Line data={leftChartData} options={leftChartOptions} /></div>
      </div>

      <aside style={styles.chartBox} role="complementary" aria-label="Hourly prediction">
        <div style={styles.sectionTitle}><strong>Daily (hourly) prediction</strong></div>
        <div style={{ height: 260 }}><Line data={rightChartData} options={rightChartOptions} /></div>
      </aside>
    </section>
    <section style={{ marginTop: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h2 style={{ margin: 0 }}>Grouped by Currency</h2>
        <div>
          <span style={{ marginRight: 10 }}>Prompt:</span>
          <button style={{ padding: "4px 10px", cursor: "pointer", border: "1px solid #ccc", borderRadius: 4 }}>Export</button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            {["Currency", "Orders", "Items", "Customers", "Net Sales", "Average Net", "Gross Sales", "Average Gross"].map((header) => (
              <th
                key={header}
                style={{ borderBottom: "1px solid #ccc", padding: "8px 12px", cursor: "pointer" }}
                onClick={() => alert(`Sort by ${header}`)} 
              >
                {header} &#x25B2;&#x25BC;
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { currency: "USD", orders: 120, items: 300, customers: 100, net: 5000, avgNet: 41.67, gross: 5500, avgGross: 45.83 },
            { currency: "GBP", orders: 90, items: 250, customers: 80, net: 4000, avgNet: 44.44, gross: 4400, avgGross: 48.89 },
            { currency: "BDT", orders: 200, items: 500, customers: 150, net: 1200000, avgNet: 6000, gross: 1300000, avgGross: 6500 },
          ].map((row) => (
            <tr key={row.currency} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 12px" }}>{row.currency}</td>
              <td style={{ padding: "8px 12px" }}>{row.orders}</td>
              <td style={{ padding: "8px 12px" }}>{row.items}</td>
              <td style={{ padding: "8px 12px" }}>{row.customers}</td>
              <td style={{ padding: "8px 12px" }}>{row.net.toLocaleString()}</td>
              <td style={{ padding: "8px 12px" }}>{row.avgNet.toLocaleString()}</td>
              <td style={{ padding: "8px 12px" }}>{row.gross.toLocaleString()}</td>
              <td style={{ padding: "8px 12px" }}>{row.avgGross.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    <StatsRow />
    <DailyStatsRow />
    <GroupedByStatusTable />
    <NewReturningTable />
    <ShippingMethodSection />
    <PaymentMethodSection />
    <GroupedByCurrencyTable />
    <GroupedByBilling />
    <GroupedByCustomField />
    <DashboardCharts />
    <AverageOrderCharts />
    <SpendCharts />
    <OrdersByDayHour />
    <HoursBetweenOrdersChart />

  </main>
);
};