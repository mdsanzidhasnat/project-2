// File: CustomersGroup.jsx
import React, { useMemo, useState } from "react";

export default function CustomersGroup() {
  const [fromDate, setFromDate] = useState("2025-08-03");
  const [toDate, setToDate] = useState("2025-09-03");
  const [compareMode, setCompareMode] = useState(false);
  const [groupByProduct, setGroupByProduct] = useState("first order products");
  const [groupByCoupon, setGroupByCoupon] = useState("All coupons");
  const [aiPrompt, setAiPrompt] = useState("");
  const [sortField, setSortField] = useState("customers");
  const [sortDir, setSortDir] = useState("desc");

  // Role table states
  const [roleAiPrompt, setRoleAiPrompt] = useState("");
  const [roleSortField, setRoleSortField] = useState("customers");
  const [roleSortDir, setRoleSortDir] = useState("desc");

  // Custom Field states (NEW)
  const customFields = ["Customer Type", "Membership Level", "Referral Source", "Signup Campaign", "Custom Tag"];
  const [selectedCustomField, setSelectedCustomField] = useState(customFields[0]);
  const [customAiPrompt, setCustomAiPrompt] = useState("");

  // Billing grouped section
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
  const [selectedOption, setSelectedOption] = useState(groupedByOptions[0]);
  const [billingSortConfig, setBillingSortConfig] = useState({ key: "country", direction: "asc" });

  const data = [
    { firstProduct: "Microsoft 365 Business", customers: 124, totalLTV: 18450.5, avgLTV: 148.85, totalOrders: 310, avgOrders: 2.5, returnRate: 12.1 },
    { firstProduct: "Surface Pro 8", customers: 42, totalLTV: 13240.0, avgLTV: 315.24, totalOrders: 76, avgOrders: 1.81, returnRate: 6.0 },
    { firstProduct: "Xbox Series X", customers: 67, totalLTV: 9020.75, avgLTV: 134.63, totalOrders: 95, avgOrders: 1.42, returnRate: 4.5 },
    { firstProduct: "Windows 11 Pro License", customers: 31, totalLTV: 2790.0, avgLTV: 90.0, totalOrders: 39, avgOrders: 1.26, returnRate: 2.0 },
    { firstProduct: "Azure Credits (starter)", customers: 18, totalLTV: 5400.0, avgLTV: 300.0, totalOrders: 21, avgOrders: 1.17, returnRate: 1.0 },
  ];

  const roleData = [
    { role: "Admin", customers: 28, totalLTV: 8740.0, avgLTV: 312.14, totalOrders: 48, avgOrders: 1.71, returnRate: 8.9 },
    { role: "Manager", customers: 54, totalLTV: 13220.5, avgLTV: 244.83, totalOrders: 105, avgOrders: 1.94, returnRate: 7.2 },
    { role: "Support", customers: 39, totalLTV: 5420.75, avgLTV: 139.01, totalOrders: 53, avgOrders: 1.36, returnRate: 5.1 },
    { role: "Developer", customers: 17, totalLTV: 4300.0, avgLTV: 252.94, totalOrders: 20, avgOrders: 1.18, returnRate: 3.0 },
    { role: "Guest", customers: 88, totalLTV: 10240.0, avgLTV: 116.36, totalOrders: 150, avgOrders: 1.70, returnRate: 4.8 },
  ];

  const billingData = [
    { country: "USA", orders: 120, items: 300, customers: 100, netSales: 5000, avgNet: 41.67, grossSales: 5500, avgGross: 45.83 },
    { country: "UK", orders: 80, items: 200, customers: 70, netSales: 3500, avgNet: 43.75, grossSales: 4000, avgGross: 50.0 },
    { country: "BD", orders: 150, items: 400, customers: 130, netSales: 6000, avgNet: 46.15, grossSales: 6500, avgGross: 50.0 },
    { country: "Canada", orders: 60, items: 150, customers: 50, netSales: 2500, avgNet: 41.67, grossSales: 2800, avgGross: 46.67 },
    { country: "Australia", orders: 90, items: 220, customers: 80, netSales: 4000, avgNet: 50.0, grossSales: 4500, avgGross: 56.25 },
  ];

  // small theme placeholder used by ShippingMethodSection
  const theme = { muted: "#9fb7e6" };

  // Sorting helpers
  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      const A = a[sortField];
      const B = b[sortField];
      if (typeof A === "string") return sortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      return sortDir === "asc" ? A - B : B - A;
    });
    return arr;
  }, [data, sortField, sortDir]);

  const sortedRoles = useMemo(() => {
    const arr = [...roleData];
    arr.sort((a, b) => {
      const A = a[roleSortField];
      const B = b[roleSortField];
      if (typeof A === "string") return roleSortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      return roleSortDir === "asc" ? A - B : B - A;
    });
    return arr;
  }, [roleData, roleSortField, roleSortDir]);

  const sortedBilling = useMemo(() => {
    const arr = [...billingData];
    const key = billingSortConfig.key;
    const dir = billingSortConfig.direction;
    arr.sort((a, b) => {
      if (a[key] < b[key]) return dir === "asc" ? -1 : 1;
      if (a[key] > b[key]) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [billingData, billingSortConfig]);

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const toggleRoleSort = (field) => {
    if (field === roleSortField) {
      setRoleSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setRoleSortField(field);
      setRoleSortDir("desc");
    }
  };

  const requestBillingSort = (key) => {
    let direction = "asc";
    if (billingSortConfig.key === key && billingSortConfig.direction === "asc") direction = "desc";
    setBillingSortConfig({ key, direction });
  };

  // Mock functions
  const exportCSV = () => alert("Export Products CSV (mock)");
  const exportRolesCSV = () => alert("Export Roles CSV (mock)");
  const exportCustomCSV = () => alert(`Export Custom Field CSV for: ${selectedCustomField} (mock)`);
  const handleViewReport = () => alert(`Viewing customers for: ${fromDate} → ${toDate} (mock)`);
  const sendAi = () => alert(`AI Prompt (Products): ${aiPrompt}`);
  const sendRoleAi = () => alert(`AI Prompt (Roles): ${roleAiPrompt}`);
  const sendCustomAi = () => alert(`AI Prompt (Custom Field): ${customAiPrompt} for ${selectedCustomField}`);

  // ShippingMethodSection integrated as an inner component so it can use theme easily
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

    const exportShippingCSV = () => {
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
      header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 12 },
      left: { display: "flex", gap: 12, alignItems: "center" },
      groupToggle: { display: "inline-flex", gap: 6, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" },
      toggleBtn: (active) => ({
        padding: "6px 10px",
        cursor: "pointer",
        background: active ? "linear-gradient(90deg,#05377a,#0b63b2)" : "transparent",
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
            <button style={sStyles.btn} onClick={exportShippingCSV} title="Export CSV">
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
                  {groupBy === "id" ? "Shipping Method ID" : "Shipping Method Title"} {sortConfig.key === (groupBy === "id" ? "id" : "title") ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
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
                <tr
                  key={row.id}
                  onClick={() => setSelectedShipping(row.id)}
                  style={{
                    background: selectedShipping === row.id ? "rgba(91,129,255,0.03)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <td style={sStyles.td}>
                    {groupBy === "id" ? row.id : row.title}
                    <div style={{ fontSize: 11, color: theme.muted }}>{row.title}</div>
                  </td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>{row.orders}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>{row.items}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>{row.customers}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>${row.netSales.toLocaleString()}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>${Number(row.avgNet).toFixed(2)}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>${row.grossSales.toLocaleString()}</td>
                  <td style={{ ...sStyles.td, textAlign: "right" }}>${Number(row.avgGross).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const styles = {
    page: { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", background: "linear-gradient(180deg,#031233,#07112a)", minHeight: "100vh", color: "#e6eef8", padding: 24 },
    card: { background: "linear-gradient(180deg, rgba(8,20,44,0.92), rgba(5,12,28,0.88))", borderRadius: 12, padding: 18, boxShadow: "0 8px 40px rgba(2,8,23,0.6)", border: "1px solid rgba(255,255,255,0.04)" },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 18 },
    title: { fontSize: 20, fontWeight: 700, letterSpacing: 0.2 },
    compareBox: { display: "flex", alignItems: "center", gap: 8 },
    dateInput: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "8px 10px", borderRadius: 8, color: "#e6eef8", outline: "none" },
    btnPrimary: { background: "#1070ff", border: "none", padding: "8px 12px", borderRadius: 8, color: "white", cursor: "pointer", fontWeight: 600, boxShadow: "0 6px 18px rgba(16,112,255,0.18)" },
    section: { marginTop: 16, marginBottom: 18 },
    sectionRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    infoText: { fontSize: 14, opacity: 0.95, maxWidth: 820 },
    tableWrap: { marginTop: 14, overflowX: "auto", paddingBottom: 8 },
    table: { width: "100%", borderCollapse: "collapse", minWidth: 920, background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00))", borderRadius: 8 },
    th: { textAlign: "left", padding: "12px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", userSelect: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))" },
    td: { padding: "12px 14px", fontSize: 13, borderBottom: "1px dashed rgba(255,255,255,0.03)" },
    rowAccent: { background: "linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00))" },
    small: { fontSize: 12, opacity: 0.8 },
    controlLeft: { display: "flex", gap: 10, alignItems: "center" },
    controlRight: { display: "flex", gap: 10, alignItems: "center" },
    // SELECTS: make dropdown bg dark-blue as requested
    select: { padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "linear-gradient(90deg,#05377a,#0b63b2)", color: "#e6eef8", cursor: "pointer" },
    aiBox: { display: "flex", gap: 8, alignItems: "center" },
    inputAi: { padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6eef8", minWidth: 220 },
    exportBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#e6eef8", cursor: "pointer" },
    sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 12 },
    roleLeftControls: { display: "flex", gap: 8, alignItems: "center" },
    roleTitle: { fontSize: 16, fontWeight: 700, color: "#cfe3ff" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.headerRow}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={styles.title}>Customers Group</div>
            <div style={{ ...styles.small, color: "#9fb7e6" }}>Audience insights</div>
          </div>
          <div style={styles.compareBox}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={styles.dateInput} />
              <span style={{ opacity: 0.6 }}>→</span>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={styles.dateInput} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 12 }}>
              <input type="checkbox" checked={compareMode} onChange={(e) => setCompareMode(e.target.checked)} />
              <span style={{ fontSize: 13 }}>Compare</span>
            </label>
            <button style={{ ...styles.btnPrimary, marginLeft: 12 }} onClick={() => alert("(mock) Compare clicked")}>
              Compare calendar
            </button>
          </div>
        </div>

        {/* Products section */}
        <div style={styles.section}>
          <div style={styles.sectionRow}>
            <div style={styles.infoText}>
              <em>
                Customers that first ordered between <strong>August 3, 2025</strong> and <strong>September 3, 2025</strong> and the orders they made over their lifetime.
              </em>
            </div>
            <div>
              <button style={styles.btnPrimary} onClick={handleViewReport}>View customers in this report</button>
            </div>
          </div>
        </div>

        <div style={{ ...styles.section, marginTop: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div style={styles.controlLeft}>
              <strong style={{ marginRight: 8 }}>By</strong>
              <select style={styles.select} value={groupByProduct} onChange={(e) => setGroupByProduct(e.target.value)}>
                <option value="first order products">first order products</option>
                <option value="first order category">first order category</option>
                <option value="first order channel">first order channel</option>
              </select>
              <select style={styles.select} value={groupByCoupon} onChange={(e) => setGroupByCoupon(e.target.value)}>
                <option value="first order coupon">first order coupon</option>
                <option value="no coupon">no coupon</option>
                <option value="percent-off">percent-off</option>
              </select>
            </div>
            <div style={styles.controlRight}>
              <div style={styles.aiBox}>
                <input placeholder="Ask AI about this report" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} style={styles.inputAi} />
                <button style={styles.exportBtn} onClick={sendAi}>AI</button>
              </div>
              <button style={styles.exportBtn} onClick={exportCSV}>Export</button>
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {"firstProduct,customers,totalLTV,avgLTV,totalOrders,avgOrders,returnRate".split(",").map((key)=>((
                    <th key={key} style={styles.th} onClick={()=>toggleSort(key)}>
                      {key.replace(/([A-Z])/g," $1").replace(/firstProduct/,'First Product')}
                      {sortField===key?(sortDir==="asc"?" ▲":" ▼"):""}
                    </th>
                  )))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((row,i)=>((
                  <tr key={i} style={i%2===0?styles.rowAccent:{}}>
                    <td style={styles.td}>{row.firstProduct}</td>
                    <td style={styles.td}>{row.customers}</td>
                    <td style={styles.td}>${row.totalLTV.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
                    <td style={styles.td}>${row.avgLTV.toFixed(2)}</td>
                    <td style={styles.td}>{row.totalOrders}</td>
                    <td style={styles.td}>{row.avgOrders.toFixed(2)}</td>
                    <td style={styles.td}>{row.returnRate}%</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        {/* By Role section */}
        <div style={styles.section}>
          <div style={{ ...styles.sectionHeader, background: "linear-gradient(90deg,#0b1b3a,#14284f)", padding: 8, borderRadius: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={styles.roleTitle}>By Role</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Role-based customer breakdown</div>
            </div>
            <div style={styles.roleLeftControls}>
              <input placeholder="Ask AI about roles" value={roleAiPrompt} onChange={(e)=>setRoleAiPrompt(e.target.value)} style={{ ...styles.inputAi, minWidth: 200 }} />
              <button style={styles.exportBtn} onClick={sendRoleAi}>AI</button>
              <button style={styles.exportBtn} onClick={exportRolesCSV}>Export</button>
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {"role,customers,totalLTV,avgLTV,totalOrders,avgOrders,returnRate".split(",").map((key)=>((
                    <th key={key} style={styles.th} onClick={()=>toggleRoleSort(key)}>
                      {key.replace(/([A-Z])/g," $1")}
                      {roleSortField===key?(roleSortDir==="asc"?" ▲":" ▼"):""}
                    </th>
                  )))}
                </tr>
              </thead>
              <tbody>
                {sortedRoles.map((row,i)=>((
                  <tr key={i} style={i%2===0?styles.rowAccent:{}}>
                    <td style={styles.td}>{row.role}</td>
                    <td style={styles.td}>{row.customers}</td>
                    <td style={styles.td}>${row.totalLTV.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
                    <td style={styles.td}>${row.avgLTV.toFixed(2)}</td>
                    <td style={styles.td}>{row.totalOrders}</td>
                    <td style={styles.td}>{row.avgOrders.toFixed(2)}</td>
                    <td style={styles.td}>{row.returnRate}%</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grouped by Billing section */}
        <div style={styles.section}>
          <div style={{ ...styles.sectionHeader, background: "linear-gradient(90deg,#0b1b3a,#14284f)", padding: 8, borderRadius: 8 }}>
            <div style={{ fontWeight: 700 }}>Grouped by Billing</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select style={styles.select} value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                {groupedByOptions.map((opt,idx)=><option key={idx} value={opt}>{opt}</option>)}
              </select>
              <button style={styles.exportBtn} onClick={()=>alert("Export Billing CSV (mock)")}>Export</button>
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {"country,orders,items,customers,netSales,avgNet,grossSales,avgGross".split(",").map((key)=>((
                    <th key={key} style={styles.th} onClick={()=>requestBillingSort(key)}>
                      {key==="country"?"Billing Country":key==="avgNet"?"Average Net":key==="avgGross"?"Average Gross":key.replace(/([A-Z])/g," $1")}
                      {billingSortConfig.key===key?(billingSortConfig.direction==="asc"?" ▲":" ▼"):""}
                    </th>
                  )))}
                </tr>
              </thead>
              <tbody>
                {sortedBilling.map((row,i)=>((
                  <tr key={i} style={i%2===0?styles.rowAccent:{}}>
                    <td style={styles.td}>{row.country}</td>
                    <td style={styles.td}>{row.orders}</td>
                    <td style={styles.td}>{row.items}</td>
                    <td style={styles.td}>{row.customers}</td>
                    <td style={styles.td}>${row.netSales.toLocaleString()}</td>
                    <td style={styles.td}>${row.avgNet.toFixed(2)}</td>
                    <td style={styles.td}>${row.grossSales.toLocaleString()}</td>
                    <td style={styles.td}>${row.avgGross.toFixed(2)}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Method section inserted here */}
        <ShippingMethodSection />

        {/* NEW: By Custom Field section */}
        <div style={styles.section}>
          <div style={{ ...styles.sectionHeader, background: "linear-gradient(90deg,#06203f,#0b3760)", padding: 10, borderRadius: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 700 }}>By Custom Field</div>
              <select style={styles.select} value={selectedCustomField} onChange={(e)=>setSelectedCustomField(e.target.value)}>
                {customFields.map((cf, idx) => <option key={idx} value={cf}>{cf}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input placeholder="Ask AI about this custom field" value={customAiPrompt} onChange={(e)=>setCustomAiPrompt(e.target.value)} style={{ ...styles.inputAi, minWidth: 240 }} />
              <button style={styles.exportBtn} onClick={sendCustomAi}>AI</button>
              <button style={styles.exportBtn} onClick={exportCustomCSV}>Export</button>
            </div>
          </div>

          <div style={{ marginTop: 8, color: "#9fb7e6", fontSize: 13 }}>
            Select a custom field above.
          </div>
        </div>

      </div>
    </div>
  );
}