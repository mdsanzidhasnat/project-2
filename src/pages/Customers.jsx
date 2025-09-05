import React, { useState, useMemo } from "react";

export default function CustomersDashboard() {
  const [activeTab, setActiveTab] = useState("list");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("customers");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0b1020",
      color: "#eaeef9",
      padding: 24,
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    },
    container: {
      maxWidth: 1280,
      margin: "0 auto",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: 16,
    },
    titleWrap: { display: "flex", alignItems: "center", gap: 12 },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: "linear-gradient(135deg, #7c5cff, #2ec5ff)",
      boxShadow: "0 0 0 4px rgba(124,92,255,0.15)",
    },
    title: { fontSize: 26, fontWeight: 700, letterSpacing: 0.2 },
    tabBar: {
      display: "inline-flex",
      background: "#121938",
      border: "1px solid #1f2b5b",
      borderRadius: 14,
      padding: 4,
      gap: 4,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
    },
    tabBtn: (active) => ({
      appearance: "none",
      cursor: "pointer",
      border: "none",
      background: active
        ? "linear-gradient(135deg, #2ec5ff, #7c5cff)"
        : "transparent",
      color: active ? "#0b1020" : "#c8d2f2",
      padding: "10px 16px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0.4,
      transition: "transform 120ms ease, background 160ms ease, color 160ms ease",
      boxShadow: active ? "0 6px 18px rgba(46,197,255,0.25)" : "none",
      outline: "none",
    }),
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      marginTop: 12,
      marginBottom: 20,
      flexWrap: "wrap",
    },
    search: {
      flex: 1,
      minWidth: 200,
      background: "#0f1531",
      border: "1px solid #1b2652",
      borderRadius: 12,
      padding: "10px 12px",
      color: "#eaeef9",
      outline: "none",
    },
    dropdownContainer: { position: "relative" },
    dropdownButton: {
      background: "#0f1531",
      border: "1px solid #1b2652",
      color: "#eaeef9",
      padding: "10px 12px",
      borderRadius: 12,
      cursor: "pointer",
      minWidth: 180,
      textAlign: "left",
    },
    dropdownList: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "#121938",
      border: "1px solid #1b2652",
      borderRadius: 8,
      marginTop: 4,
      boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
      zIndex: 10,
    },
    dropdownItem: {
      padding: "10px 12px",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    card: {
      background: "#0f1531",
      border: "1px solid #1c2755",
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      width: "100%",
    },
    tableWrap: {
      overflow: "auto",
      borderRadius: 12,
      border: "1px solid #1c2755",
      width: "100%",
      marginTop: 16,
    },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 14 },
    th: {
      textAlign: "left",
      fontWeight: 700,
      padding: "12px 14px",
      background: "#10183a",
      borderBottom: "1px solid #203066",
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    td: { padding: "12px 14px", borderBottom: "1px solid #16204a" },
    button: {
      background: "#2ec5ff",
      border: "none",
      borderRadius: 12,
      padding: "10px 16px",
      color: "#0b1020",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  const customers = [
    { id: 1, name: "Arif H.", contact: "arif@gmail.com", location: "Dhaka", totalSpends: 3200, orders: 5, aco: 640, ltv: 800 },
    { id: 2, name: "Nadia R.", contact: "nadia@yahoo.com", location: "Chittagong", totalSpends: 1490, orders: 2, aco: 745, ltv: 745 },
    { id: 3, name: "Sanzid H.", contact: "sanzid@hotmail.com", location: "Dhaka", totalSpends: 870, orders: 1, aco: 870, ltv: 870 },
    { id: 4, name: "Tuhin A.", contact: "tuhin@gmail.com", location: "Khulna", totalSpends: 2240, orders: 3, aco: 747, ltv: 747 },
    { id: 5, name: "Samira K.", contact: "samira@gmail.com", location: "Sylhet", totalSpends: 5450, orders: 7, aco: 778, ltv: 778 },
    { id: 1, name: "Arif H.", contact: "arif@gmail.com", location: "Dhaka", totalSpends: 3200, orders: 5, aco: 640, ltv: 800 },
    { id: 2, name: "Nadia R.", contact: "nadia@yahoo.com", location: "Chittagong", totalSpends: 1490, orders: 2, aco: 745, ltv: 745 },
    { id: 3, name: "Sanzid H.", contact: "sanzid@hotmail.com", location: "Dhaka", totalSpends: 870, orders: 1, aco: 870, ltv: 870 },
    { id: 4, name: "Tuhin A.", contact: "tuhin@gmail.com", location: "Khulna", totalSpends: 2240, orders: 3, aco: 747, ltv: 747 },
    { id: 5, name: "Samira K.", contact: "samira@gmail.com", location: "Sylhet", totalSpends: 5450, orders: 7, aco: 778, ltv: 778 },
  ];

  const segments = [
    { key: "new", name: "New Customers", count: 128, revenue: 32000, orders: 450, aco: 711, ltv: 250 },
    { key: "vip", name: "VIP / High LTV", count: 42, revenue: 54000, orders: 300, aco: 1285, ltv: 1280 },
    { key: "repeat", name: "Repeat Buyers", count: 310, revenue: 124000, orders: 900, aco: 1370, ltv: 1100 },
    { key: "atRisk", name: "At-Risk (Churn)", count: 67, revenue: 20000, orders: 120, aco: 298, ltv: 298 },
    { key: "new", name: "New Customers", count: 128, revenue: 32000, orders: 450, aco: 711, ltv: 250 },
    { key: "vip", name: "VIP / High LTV", count: 42, revenue: 54000, orders: 300, aco: 1285, ltv: 1280 },
    { key: "repeat", name: "Repeat Buyers", count: 310, revenue: 124000, orders: 900, aco: 1370, ltv: 1100 },
    { key: "atRisk", name: "At-Risk (Churn)", count: 67, revenue: 20000, orders: 120, aco: 298, ltv: 298 },
    { key: "new", name: "New Customers", count: 128, revenue: 32000, orders: 450, aco: 711, ltv: 250 },
    { key: "vip", name: "VIP / High LTV", count: 42, revenue: 54000, orders: 300, aco: 1285, ltv: 1280 },
    { key: "repeat", name: "Repeat Buyers", count: 310, revenue: 124000, orders: 900, aco: 1370, ltv: 1100 },
  ];

  const filteredCustomers = useMemo(() => {
    if (!query) return customers;
    const q = query.toLowerCase();
    return customers.filter((c) =>
      [c.name, c.contact, c.location].some((v) => String(v).toLowerCase().includes(q))
    );
  }, [customers, query]);

  const sortOptions = ["customers", "contact", "location", "totalSpends"];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <div style={styles.dot} />
            <div style={styles.title}>Customers Dashboard</div>
          </div>
          <div style={styles.tabBar}>
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              style={styles.tabBtn(activeTab === "list")}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("segments")}
              style={styles.tabBtn(activeTab === "segments")}
            >
              Segments
            </button>
          </div>
        </div>

        {/* Toolbar */}
        {activeTab === "list" && (
          <div style={styles.toolbar}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={styles.dropdownContainer}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={styles.dropdownButton}
                >
                  Sort by: {sortBy}
                </button>
                {dropdownOpen && (
                  <div style={styles.dropdownList}>
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        style={styles.dropdownItem}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#1c2755")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        onClick={() => {
                          setSortBy(option);
                          setDropdownOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customers..."
                style={styles.search}
              />
            </div>
          </div>
        )}

        {activeTab === "segments" && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <button style={styles.button}>File Export</button>
            <button style={styles.button}>Segment Settings</button>
          </div>
        )}

        {/* Main Content */}
        <div style={styles.card}>
          {activeTab === "list" ? (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Contact Details</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Total Spends</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((c) => (
                    <tr key={c.id}>
                      <td style={styles.td}>{c.name}</td>
                      <td style={styles.td}>{c.contact}</td>
                      <td style={styles.td}>{c.location}</td>
                      <td style={styles.td}>৳ {c.totalSpends.toLocaleString()}</td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td style={styles.td} colSpan={4}>
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Names</th>
                      <th style={styles.th}>Customers</th>
                      <th style={styles.th}>Revenue</th>
                      <th style={styles.th}>Orders</th>
                      <th style={styles.th}>ACO</th>
                      <th style={styles.th}>LTV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {segments.map((s) => (
                      <tr key={s.key}>
                        <td style={styles.td}>{s.name}</td>
                        <td style={styles.td}>{s.count}</td>
                        <td style={styles.td}>৳ {s.revenue.toLocaleString()}</td>
                        <td style={styles.td}>{s.orders}</td>
                        <td style={styles.td}>{s.aco}</td>
                        <td style={styles.td}>{s.ltv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}