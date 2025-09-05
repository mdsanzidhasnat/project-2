// File: Revenue.jsx
import React, { useMemo, useState } from "react";
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
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Revenue() {
  const [compareMode, setCompareMode] = useState(false);
  const [timeframe, setTimeframe] = useState("day"); // chart timeframe
  const [showOrders, setShowOrders] = useState(false);
  const [tableTimeframe, setTableTimeframe] = useState("day"); // table timeframe

  // ----------------------------
  // Base daily table data (15+ rows)
  // ----------------------------
  const baseTableData = [
    { date: "Aug 1", orders: 30, gross: 3000, taxes: 200, shipping: 50, fees: 30, refunds: 100, net: 2620 },
    { date: "Aug 2", orders: 28, gross: 2800, taxes: 180, shipping: 45, fees: 25, refunds: 80, net: 2470 },
    { date: "Aug 3", orders: 35, gross: 3500, taxes: 220, shipping: 55, fees: 35, refunds: 120, net: 3070 },
    { date: "Aug 4", orders: 25, gross: 2500, taxes: 150, shipping: 40, fees: 20, refunds: 90, net: 2200 },
    { date: "Aug 5", orders: 32, gross: 3200, taxes: 210, shipping: 50, fees: 28, refunds: 100, net: 2812 },
    { date: "Aug 6", orders: 27, gross: 2700, taxes: 190, shipping: 45, fees: 25, refunds: 80, net: 2360 },
    { date: "Aug 7", orders: 40, gross: 4000, taxes: 250, shipping: 60, fees: 40, refunds: 150, net: 3500 },
    { date: "Aug 8", orders: 38, gross: 3800, taxes: 230, shipping: 55, fees: 35, refunds: 140, net: 3340 },
    { date: "Aug 9", orders: 22, gross: 2200, taxes: 140, shipping: 35, fees: 18, refunds: 70, net: 1937 },
    { date: "Aug 10", orders: 33, gross: 3300, taxes: 210, shipping: 50, fees: 30, refunds: 110, net: 2900 },
    { date: "Aug 11", orders: 29, gross: 2900, taxes: 190, shipping: 45, fees: 28, refunds: 90, net: 2547 },
    { date: "Aug 12", orders: 36, gross: 3600, taxes: 220, shipping: 55, fees: 35, refunds: 130, net: 3160 },
    { date: "Aug 13", orders: 31, gross: 3100, taxes: 200, shipping: 50, fees: 30, refunds: 100, net: 2720 },
    { date: "Aug 14", orders: 34, gross: 3400, taxes: 220, shipping: 55, fees: 32, refunds: 120, net: 2973 },
    { date: "Aug 15", orders: 26, gross: 2600, taxes: 160, shipping: 40, fees: 22, refunds: 80, net: 2298 },
  ];

  // ----------------------------
  // Aggregation helper for table (day / week / month)
  // ----------------------------
  const aggregateTable = (data, tf) => {
    if (tf === "day") return data.map((d) => ({ ...d }));
    if (tf === "week") {
      // group in chunks of 7 (Week 1, Week 2, ...)
      const groups = {};
      data.forEach((row, idx) => {
        const weekNo = Math.floor(idx / 7) + 1;
        const key = `Week ${weekNo}`;
        if (!groups[key]) groups[key] = { date: key, orders: 0, gross: 0, taxes: 0, shipping: 0, fees: 0, refunds: 0, net: 0 };
        groups[key].orders += row.orders;
        groups[key].gross += row.gross;
        groups[key].taxes += row.taxes;
        groups[key].shipping += row.shipping;
        groups[key].fees += row.fees;
        groups[key].refunds += row.refunds;
        groups[key].net += row.net;
      });
      return Object.values(groups);
    }
    // month aggregate as a single row labeled "Aug 2025"
    if (tf === "month") {
      const acc = data.reduce(
        (s, r) => {
          s.orders += r.orders;
          s.gross += r.gross;
          s.taxes += r.taxes;
          s.shipping += r.shipping;
          s.fees += r.fees;
          s.refunds += r.refunds;
          s.net += r.net;
          return s;
        },
        { orders: 0, gross: 0, taxes: 0, shipping: 0, fees: 0, refunds: 0, net: 0 }
      );
      return [{ date: "Aug 2025", ...acc }];
    }
    return data;
  };

  // displayed table based on tableTimeframe
  const displayedTable = useMemo(() => aggregateTable(baseTableData, tableTimeframe), [baseTableData, tableTimeframe]);

  // totals computed from displayedTable (so footer always stable for current view)
  const totals = useMemo(() => {
    return displayedTable.reduce(
      (acc, row) => {
        acc.orders += row.orders;
        acc.gross += row.gross;
        acc.taxes += row.taxes;
        acc.shipping += row.shipping;
        acc.fees += row.fees;
        acc.refunds += row.refunds;
        acc.net += row.net;
        return acc;
      },
      { orders: 0, gross: 0, taxes: 0, shipping: 0, fees: 0, refunds: 0, net: 0 }
    );
  }, [displayedTable]);

  // ----------------------------
  // Chart data depends on chart timeframe
  // ----------------------------
  const chartData = useMemo(() => {
    if (timeframe === "day") {
      return {
        labels: baseTableData.map((r) => r.date),
        datasets: [
          {
            label: "Net Revenue",
            data: baseTableData.map((r) => r.net),
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.12)",
            tension: 0.4,
          },
          {
            label: "Gross Sales",
            data: baseTableData.map((r) => r.gross),
            borderColor: "#2196F3",
            backgroundColor: "rgba(33, 150, 243, 0.12)",
            tension: 0.4,
          },
        ],
      };
    }
    if (timeframe === "week") {
      const weeks = aggregateTable(baseTableData, "week");
      return {
        labels: weeks.map((w) => w.date),
        datasets: [
          { label: "Net Revenue", data: weeks.map((w) => w.net), borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.12)", tension: 0.4 },
          { label: "Gross Sales", data: weeks.map((w) => w.gross), borderColor: "#2196F3", backgroundColor: "rgba(33,150,243,0.12)", tension: 0.4 },
        ],
      };
    }
    // month
    if (timeframe === "month") {
      const month = aggregateTable(baseTableData, "month")[0];
      return {
        labels: [month.date],
        datasets: [
          { label: "Net Revenue", data: [month.net], borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.12)", tension: 0.4 },
          { label: "Gross Sales", data: [month.gross], borderColor: "#2196F3", backgroundColor: "rgba(33,150,243,0.12)", tension: 0.4 },
        ],
      };
    }
    return { labels: [], datasets: [] };
  }, [baseTableData, timeframe]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: "#fff" } },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

  // ----------------------------
  // Export CSV (exports displayedTable which follows tableTimeframe)
  // ----------------------------
  const exportCSV = () => {
    const headers = ["Date", "Orders", "Gross Sales", "Taxes", "Shipping", "Fees", "Refunds", "Net"];
    const rows = displayedTable.map((r) => [r.date, r.orders, r.gross, r.taxes, r.shipping, r.fees, r.refunds, r.net]);
    rows.push(["Total", totals.orders, totals.gross, totals.taxes, totals.shipping, totals.fees, totals.refunds, totals.net]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `revenue_breakdown_${tableTimeframe}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // small stats and prev stats for right side box
  const stats = {
    netRevenue: 32500,
    grossSales: 40000,
    refunds: 2000,
    taxes: 1500,
    shipping: 700,
    orders: 450,
    avgOrder: 72,
  };

  const prevStats = {
    netRevenue: 30000,
    grossSales: 38000,
    refunds: 2500,
    taxes: 1200,
    shipping: 900,
    orders: 420,
    avgOrder: 68,
  };

  const calcPercent = (current, previous) => {
    if (!previous) return "0.0";
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  // hide webkit scrollbar
  const scrollbarHideStyle = `::-webkit-scrollbar{display:none}`;

  // -----------------------------------------
  // GroupedByBilling component (integrated) - existing one defined earlier in the file
  // (kept as-is to preserve original behaviour)
  // -----------------------------------------
  const GroupedByBilling = () => {
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

    // rename to avoid collision with other table variables
    const groupedData = [
      { country: "USA", orders: 120, items: 300, customers: 100, netSales: 5000, avgNet: 41.67, grossSales: 5500, avgGross: 45.83 },
      { country: "UK", orders: 80, items: 200, customers: 70, netSales: 3500, avgNet: 43.75, grossSales: 4000, avgGross: 50.0 },
      { country: "BD", orders: 150, items: 400, customers: 130, netSales: 6000, avgNet: 46.15, grossSales: 6500, avgGross: 50.0 },
      { country: "Canada", orders: 60, items: 150, customers: 50, netSales: 2500, avgNet: 41.67, grossSales: 2800, avgGross: 46.67 },
      { country: "Australia", orders: 90, items: 220, customers: 80, netSales: 4000, avgNet: 50.0, grossSales: 4500, avgGross: 56.25 },
    ];

    const [selectedOption, setSelectedOption] = useState(groupedByOptions[0]);
    const [sortConfig, setSortConfig] = useState({ key: "country", direction: "asc" });

    const sortedData = useMemo(() => {
      const arr = [...groupedData];
      arr.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        // numeric vs string handling
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
      return arr;
    }, [groupedData, sortConfig]);

    const requestSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
      setSortConfig({ key, direction });
    };

    // export grouped CSV
    const exportGroupedCSV = () => {
      const headers = ["Billing Country", "Orders", "Items", "Customers", "Net Sales", "Avg Net", "Gross Sales", "Avg Gross"];
      const rows = sortedData.map((r) => [r.country, r.orders, r.items, r.customers, r.netSales, r.avgNet, r.grossSales, r.avgGross]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `grouped_by_billing.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div style={{ ...styles.tableContainer, marginTop: 20 }}>
        {/* Header */}
        <div style={styles.tableHeader}>
          <div>
            <span style={{ fontWeight: 700, marginRight: 10, color: "#fff" }}>Grouped by:</span>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{
                padding: "6px",
                backgroundColor: "#0f2a47",
                color: "#fff",
                border: "1px solid #1f4068",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              {groupedByOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.exportBtn} onClick={() => alert("AI Prompt action (placeholder)")}>
              AI Prompt
            </button>
            <button style={styles.exportBtn} onClick={exportGroupedCSV}>
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["country", "orders", "items", "customers", "netSales", "avgNet", "grossSales", "avgGross"].map((key) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key)}
                    style={{
                      borderBottom: "1px solid #1f4068",
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor: "#0f2644",
                      color: "#8adfff",
                      textTransform: "capitalize",
                      fontWeight: 700,
                      textAlign: "left",
                    }}
                  >
                    {key === "country"
                      ? "Billing Country"
                      : key === "avgNet"
                      ? "Average Net"
                      : key === "avgGross"
                      ? "Average Gross"
                      : key.replace(/([A-Z])/g, " $1")}
                    {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #1b355a" }}>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.country}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.orders}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.items}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.customers}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.netSales.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.avgNet}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.grossSales.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.avgGross}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // -----------------------------------------
  // Render main Revenue UI
  // -----------------------------------------
  return (
    <div style={styles.page}>
      <style>{scrollbarHideStyle}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Revenue</h1>
          <button style={styles.segmentBtn}>Segments</button>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.compareBtn} onClick={() => setCompareMode(!compareMode)}>
            {compareMode ? "Close Compare" : "Compare"}
          </button>
          {compareMode && (
            <div style={styles.calendarWrapper}>
              <input type="date" style={styles.calendar} />
              <input type="date" style={styles.calendar} />
            </div>
          )}
        </div>
      </div>

      {/* Report Info */}
      <div style={styles.reportInfo}>
        <div style={styles.reportText}>
          <p>
            This report looks at the net revenue you received between <b>August 1, 2025</b> and <b>September 1, 2025</b>.
          </p>
          <p>
            Net revenue is your total gross sales less amounts charged for taxes, shipping, fees, and less refunds made in this period.
          </p>
        </div>
        <div style={styles.reportButton}>
          <button style={styles.viewBtn} onClick={() => setShowOrders(!showOrders)}>
            {showOrders ? "Hide Orders" : "View Orders in this Report"}
          </button>
          {showOrders && (
            <div style={styles.ordersBox}>
              <p>Order #12345 - $500</p>
              <p>Order #12346 - $750</p>
              <p>Order #12347 - $300</p>
            </div>
          )}
        </div>
      </div>

      {/* Chart + Stats */}
      <div style={styles.chartSection}>
        <div style={styles.chartContainer}>
          <div style={styles.chartHeader}>
            <h2 style={styles.chartTitle}>Revenue</h2>
            <button style={styles.exportBtn} onClick={exportCSV}>
              Export
            </button>
          </div>

          {/* Chart timeframe toggle (affects chart only) */}
          <div style={styles.toggle}>
            <button style={timeframe === "day" ? styles.activeToggle : styles.toggleBtn} onClick={() => setTimeframe("day")}>
              Day
            </button>
            <button style={timeframe === "week" ? styles.activeToggle : styles.toggleBtn} onClick={() => setTimeframe("week")}>
              Week
            </button>
            <button style={timeframe === "month" ? styles.activeToggle : styles.toggleBtn} onClick={() => setTimeframe("month")}>
              Month
            </button>
          </div>

          <Line data={chartData} options={chartOptions} />
        </div>

        <div style={styles.statsBox}>
          <h3 style={styles.statsTitle}>In This Period</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statsItem}>
              <b>Net Revenue:</b> ${stats.netRevenue.toLocaleString()} {" "}
              <span style={{ color: parseFloat(calcPercent(stats.netRevenue, prevStats.netRevenue)) >= 0 ? "#4CAF50" : "#F44336" }}>
                ({calcPercent(stats.netRevenue, prevStats.netRevenue)}%)
              </span>
            </div>
            <div style={styles.statsItem}>
              <b>Gross Sales:</b> ${stats.grossSales.toLocaleString()} {" "}
              <span style={{ color: parseFloat(calcPercent(stats.grossSales, prevStats.grossSales)) >= 0 ? "#4CAF50" : "#F44336" }}>
                ({calcPercent(stats.grossSales, prevStats.grossSales)}%)
              </span>
            </div>
            <div style={styles.statsItem}>
              <b>Refunds:</b> ${stats.refunds.toLocaleString()} <span style={{ color: "#F44336" }}>({calcPercent(stats.refunds, prevStats.refunds)}%)</span>
            </div>
            <div style={styles.statsItem}>
              <b>Taxes:</b> ${stats.taxes.toLocaleString()} <span style={{ color: "#FF9800" }}>({calcPercent(stats.taxes, prevStats.taxes)}%)</span>
            </div>
            <div style={styles.statsItem}>
              <b>Shipping:</b> ${stats.shipping.toLocaleString()} <span style={{ color: "#FF9800" }}>({calcPercent(stats.shipping, prevStats.shipping)}%)</span>
            </div>
            <div style={styles.statsItem}>
              <b>Orders:</b> {stats.orders} {" "}
              <span style={{ color: parseFloat(calcPercent(stats.orders, prevStats.orders)) >= 0 ? "#4CAF50" : "#F44336" }}>
                ({calcPercent(stats.orders, prevStats.orders)}%)
              </span>
            </div>
            <div style={styles.statsItem}>
              <b>Avg Order:</b> ${stats.avgOrder} {" "}
              <span style={{ color: parseFloat(calcPercent(stats.avgOrder, prevStats.avgOrder)) >= 0 ? "#4CAF50" : "#F44336" }}>
                ({calcPercent(stats.avgOrder, prevStats.avgOrder)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <h2 style={styles.chartTitle}>Revenue Breakdown</h2>
          <div style={styles.actions}>
            <button style={styles.exportBtn} onClick={exportCSV}>
              Export
            </button>

            {/* Table timeframe toggle (affects the table view only) */}
            <div style={styles.toggle}>
              <button style={tableTimeframe === "day" ? styles.activeToggle : styles.toggleBtn} onClick={() => setTableTimeframe("day")}>
                Day
              </button>
              <button style={tableTimeframe === "week" ? styles.activeToggle : styles.toggleBtn} onClick={() => setTableTimeframe("week")}>
                Week
              </button>
              <button style={tableTimeframe === "month" ? styles.activeToggle : styles.toggleBtn} onClick={() => setTableTimeframe("month")}>
                Month
              </button>
            </div>
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Orders</th>
                <th style={styles.th}>Gross Sales</th>
                <th style={styles.th}>Taxes</th>
                <th style={styles.th}>Shipping</th>
                <th style={styles.th}>Fees</th>
                <th style={styles.th}>Refunds</th>
                <th style={styles.th}>Net</th>
              </tr>
            </thead>

            <tbody style={styles.tbody}>
              {displayedTable.map((row, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.orders}</td>
                  <td style={styles.td}>${row.gross.toLocaleString()}</td>
                  <td style={styles.td}>${row.taxes}</td>
                  <td style={styles.td}>${row.shipping}</td>
                  <td style={styles.td}>${row.fees}</td>
                  <td style={styles.td}>${row.refunds}</td>
                  <td style={styles.td}>${row.net.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>

            <tfoot style={styles.tfoot}>
              <tr style={styles.totalRow}>
                <td style={{ ...styles.td, fontWeight: "bold" }}>Total</td>
                <td style={styles.td}>{totals.orders}</td>
                <td style={styles.td}>${totals.gross.toLocaleString()}</td>
                <td style={styles.td}>${totals.taxes.toLocaleString()}</td>
                <td style={styles.td}>${totals.shipping.toLocaleString()}</td>
                <td style={styles.td}>${totals.fees.toLocaleString()}</td>
                <td style={styles.td}>${totals.refunds.toLocaleString()}</td>
                <td style={styles.td}>${totals.net.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Integrated GroupedByBilling component */}
      <GroupedByBillingSection />

      {/* NEW: Grouped by Tax Rate Section (added below the billing section) */}
      <GroupedByTaxRateSection />
    </div>
  );

  // small wrapper to keep GroupedByBilling defined below
  function GroupedByBillingSection() {
    return <div style={{ marginTop: 18 }}><GroupedByBillingInner /></div>;
  }

  // the actual GroupedByBilling inner component (declared as inner function so it can access styles)
  function GroupedByBillingInner() {
    // Options and data (kept inside the function to avoid scope collisions)
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

    const groupedData = [
      { country: "USA", orders: 120, items: 300, customers: 100, netSales: 5000, avgNet: 41.67, grossSales: 5500, avgGross: 45.83 },
      { country: "UK", orders: 80, items: 200, customers: 70, netSales: 3500, avgNet: 43.75, grossSales: 4000, avgGross: 50.0 },
      { country: "BD", orders: 150, items: 400, customers: 130, netSales: 6000, avgNet: 46.15, grossSales: 6500, avgGross: 50.0 },
      { country: "Canada", orders: 60, items: 150, customers: 50, netSales: 2500, avgNet: 41.67, grossSales: 2800, avgGross: 46.67 },
      { country: "Australia", orders: 90, items: 220, customers: 80, netSales: 4000, avgNet: 50.0, grossSales: 4500, avgGross: 56.25 },
    ];

    const [selectedOption, setSelectedOption] = useState(groupedByOptions[0]);
    const [sortConfig, setSortConfig] = useState({ key: "country", direction: "asc" });

    const sortedData = useMemo(() => {
      const arr = [...groupedData];
      arr.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
      return arr;
    }, [groupedData, sortConfig]);

    const requestSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
      setSortConfig({ key, direction });
    };

    const exportGroupedCSV = () => {
      const headers = ["Billing Country", "Orders", "Items", "Customers", "Net Sales", "Avg Net", "Gross Sales", "Avg Gross"];
      const rows = sortedData.map((r) => [r.country, r.orders, r.items, r.customers, r.netSales, r.avgNet, r.grossSales, r.avgGross]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `grouped_by_billing.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div style={{ ...styles.tableContainer }}>
        <div style={styles.tableHeader}>
          <div>
            <span style={{ fontWeight: 700, marginRight: 10, color: "#fff" }}>Grouped by:</span>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{
                padding: "6px",
                backgroundColor: "#0f2a47",
                color: "#fff",
                border: "1px solid #1f4068",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              {groupedByOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.exportBtn} onClick={() => alert("AI Prompt action (placeholder)")}>
              AI Prompt
            </button>
            <button style={styles.exportBtn} onClick={exportGroupedCSV}>
              Export
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["country", "orders", "items", "customers", "netSales", "avgNet", "grossSales", "avgGross"].map((key) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key)}
                    style={{
                      borderBottom: "1px solid #1f4068",
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor: "#0f2644",
                      color: "#8adfff",
                      textTransform: "capitalize",
                      fontWeight: 700,
                      textAlign: "left",
                    }}
                  >
                    {key === "country" ? "Billing Country" : key === "avgNet" ? "Average Net" : key === "avgGross" ? "Average Gross" : key.replace(/([A-Z])/g, " $1")}
                    {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #1b355a" }}>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.country}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.orders}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.items}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.customers}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.netSales.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.avgNet}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.grossSales.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.avgGross}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // NEW: GroupedByTaxRate Section — added below the billing section
  // -----------------------------------------
  function GroupedByTaxRateSection() {
    return <div style={{ marginTop: 18 }}><GroupedByTaxRateInner /></div>;
  }

  function GroupedByTaxRateInner() {
    const groupedTaxOptions = ["Tax Rate Code", "Tax Rate ID", "Tax Rate Label"];

    const groupedTaxData = [
      { code: "TR-STD", id: "tx_101", label: "Standard 10%", orders: 200, netTax: 1800, refundedTax: 120, totalTax: 1680, shippingTax: 50 },
      { code: "TR-ZERO", id: "tx_102", label: "Zero 0%", orders: 50, netTax: 0, refundedTax: 0, totalTax: 0, shippingTax: 0 },
      { code: "TR-RED", id: "tx_103", label: "Reduced 5%", orders: 120, netTax: 600, refundedTax: 30, totalTax: 570, shippingTax: 20 },
      { code: "TR-IMP", id: "tx_104", label: "Imported 15%", orders: 80, netTax: 1200, refundedTax: 60, totalTax: 1140, shippingTax: 40 },
      { code: "TR-SPEC", id: "tx_105", label: "Special 8%", orders: 40, netTax: 320, refundedTax: 10, totalTax: 310, shippingTax: 10 },
    ];

    const [selectedTaxOption, setSelectedTaxOption] = useState(groupedTaxOptions[0]);
    const [taxSortConfig, setTaxSortConfig] = useState({ key: "code", direction: "asc" });

    const taxSortedData = useMemo(() => {
      const arr = [...groupedTaxData];
      arr.sort((a, b) => {
        const aVal = a[taxSortConfig.key];
        const bVal = b[taxSortConfig.key];
        if (typeof aVal === "number" && typeof bVal === "number") {
          return taxSortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return taxSortConfig.direction === "asc" ? -1 : 1;
        if (aStr > bStr) return taxSortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
      return arr;
    }, [groupedTaxData, taxSortConfig]);

    const requestTaxSort = (key) => {
      let direction = "asc";
      if (taxSortConfig.key === key && taxSortConfig.direction === "asc") direction = "desc";
      setTaxSortConfig({ key, direction });
    };

    const exportGroupedTaxCSV = () => {
      const headers = ["Tax Rate Code", "Orders", "Net Tax", "Refunded Tax", "Total Tax", "Shipping Tax"];
      const rows = taxSortedData.map((r) => [r.code, r.orders, r.netTax, r.refundedTax, r.totalTax, r.shippingTax]);

      // compute totals
      const totals = taxSortedData.reduce(
        (acc, r) => {
          acc.orders += r.orders;
          acc.netTax += r.netTax;
          acc.refundedTax += r.refundedTax;
          acc.totalTax += r.totalTax;
          acc.shippingTax += r.shippingTax;
          return acc;
        },
        { orders: 0, netTax: 0, refundedTax: 0, totalTax: 0, shippingTax: 0 }
      );

      rows.push(["Total", totals.orders, totals.netTax, totals.refundedTax, totals.totalTax, totals.shippingTax]);

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `grouped_by_tax_rate.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div style={{ ...styles.tableContainer, marginTop: 20 }}>
        {/* Header */}
        <div style={styles.tableHeader}>
          <div>
            <span style={{ fontWeight: 700, marginRight: 10, color: "#fff" }}>Grouped by</span>
            <select
              value={selectedTaxOption}
              onChange={(e) => setSelectedTaxOption(e.target.value)}
              style={{
                padding: "6px",
                backgroundColor: "#0f2a47",
                color: "#fff",
                border: "1px solid #1f4068",
                borderRadius: 6,
                fontWeight: 600,
                minWidth: 160,
              }}
            >
              {groupedTaxOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button style={styles.exportBtn} onClick={() => alert("AI Prompt action (placeholder)")}>
              AI Prompt
            </button>
            <button style={styles.exportBtn} onClick={exportGroupedTaxCSV}>
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  { key: "code", label: "Tax Rate Code" },
                  { key: "orders", label: "Orders" },
                  { key: "netTax", label: "Net Tax" },
                  { key: "refundedTax", label: "Refunded Tax" },
                  { key: "totalTax", label: "Total Tax" },
                  { key: "shippingTax", label: "Shipping Tax" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => requestTaxSort(col.key)}
                    style={{
                      borderBottom: "1px solid #1f4068",
                      padding: "10px",
                      cursor: "pointer",
                      backgroundColor: "#0f2644",
                      color: "#8adfff",
                      textTransform: "capitalize",
                      fontWeight: 700,
                      textAlign: "left",
                    }}
                  >
                    {col.label}
                    {taxSortConfig.key === col.key ? (taxSortConfig.direction === "asc" ? " ▲" : " ▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {taxSortedData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #1b355a" }}>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.code}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>{row.orders}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.netTax.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.refundedTax.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.totalTax.toLocaleString()}</td>
                  <td style={{ padding: "10px", color: "#cdd7e1" }}>${row.shippingTax.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// Styles (kept at bottom)
const styles = {
  page: {
    padding: "20px",
    backgroundColor: "#0a192f",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    minHeight: "100vh",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  title: { fontSize: "28px", fontWeight: "700", color: "#fff" },
  segmentBtn: {
    padding: "8px 14px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  headerRight: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  compareBtn: {
    padding: "8px 14px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  calendarWrapper: { marginTop: "10px", display: "flex", gap: "10px" },
  calendar: { padding: "6px", borderRadius: "5px", border: "1px solid #ccc" },
  reportInfo: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" },
  reportText: { width: "65%", fontSize: "15px", color: "#ccc" },
  reportButton: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  viewBtn: {
    padding: "8px 14px",
    backgroundColor: "#FF9800",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  ordersBox: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#112240",
    border: "1px solid #1f4068",
    borderRadius: "5px",
    width: "220px",
    color: "#fff",
  },
  chartSection: { display: "flex", gap: "20px", marginBottom: "30px" },
  chartContainer: {
    width: "65%",
    backgroundColor: "#112240",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(255,255,255,0.1)",
  },
  chartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  chartTitle: { fontSize: "20px", color: "#fff" },
  exportBtn: {
    padding: "6px 12px",
    backgroundColor: "#607D8B",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggle: { display: "flex", gap: "8px", justifyContent: "flex-end", marginBottom: "10px" },
  toggleBtn: {
    padding: "6px 10px",
    border: "1px solid #1f4068",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#112240",
    color: "#ccc",
    fontWeight: 600,
  },
  activeToggle: {
    padding: "6px 10px",
    border: "1px solid #2196F3",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "#fff",
    fontWeight: 700,
  },
  statsBox: {
    width: "35%",
    background: "linear-gradient(145deg, #112240, #0a192f)",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    maxHeight: "300px",
    border: "1px solid #1f4068",
  },
  statsTitle: { fontSize: "18px", marginBottom: "12px", color: "#fff", fontWeight: "600" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  statsItem: {
    background: "#0e2a47",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#ccc",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    boxShadow: "inset 0 0 8px rgba(255,255,255,0.05)",
  },

  // Table styles
  tableContainer: {
    backgroundColor: "#112240",
    borderRadius: "12px",
    border: "1px solid #1f4068",
    boxShadow: "0 0 10px rgba(255,255,255,0.05)",
    padding: "16px",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  actions: { display: "flex", alignItems: "center", gap: "10px" },
  tableWrapper: {
    maxHeight: "420px",
    overflowY: "auto",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    overflow: "hidden",
  },
  thead: { backgroundColor: "#0f2644", position: "sticky", top: 0, zIndex: 3 },
  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: "13px",
    color: "#8adfff",
    borderBottom: "1px solid #1f4068",
  },
  tbody: {},
  tr: { transition: "background 0.2s ease" },
  td: {
    padding: "10px",
    fontSize: "14px",
    color: "#cdd7e1",
    borderBottom: "1px solid #1b355a",
  },
  tfoot: {
    backgroundColor: "#0e2a47",
    position: "sticky",
    bottom: 0,
    zIndex: 4,
    boxShadow: "0 -4px 10px rgba(0,0,0,0.25)",
  },
  totalRow: {
    fontWeight: 700,
    backgroundColor: "#102b4c",
  },
};