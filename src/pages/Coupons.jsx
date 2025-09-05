import React, { useState, useMemo, useRef, useEffect } from "react";

export default function CouponsDashboard() {
  const [activeTab, setActiveTab] = useState("list");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("created");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Compare calendar states
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [rangeAFrom, setRangeAFrom] = useState("");
  const [rangeATo, setRangeATo] = useState("");
  const [rangeBFrom, setRangeBFrom] = useState("");
  const [rangeBTo, setRangeBTo] = useState("");

  const popupRef = useRef(null);
  const calendarBtnRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        calendarBtnRef.current &&
        !calendarBtnRef.current.contains(e.target)
      ) {
        setCalendarOpen(false);
      }
    }
    if (calendarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0b1020",
      color: "#eaeef9",
      padding: 24,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    },
    container: { maxWidth: 1280, margin: "0 auto" },
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
      marginLeft: 12,
    },
    tabBtn: (active) => ({
      appearance: "none",
      cursor: "pointer",
      border: "none",
      background: active ? "linear-gradient(135deg, #2ec5ff, #7c5cff)" : "transparent",
      color: active ? "#0b1020" : "#c8d2f2",
      padding: "8px 12px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 0.4,
      transition: "transform 120ms ease, background 160ms ease, color 160ms ease",
      boxShadow: active ? "0 6px 18px rgba(46,197,255,0.15)" : "none",
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
    calendarBtn: {
      border: "1px solid #1b2652",
      borderRadius: 12,
      padding: "8px 12px",
      fontSize: 12,
      background: "#0f1531",
      color: "#eaeef9",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    calendarPopup: {
      position: "absolute",
      right: 0,
      top: "44px",
      width: 420,
      background: "#0f1531",
      border: "1px solid #1b2652",
      borderRadius: 10,
      padding: 12,
      boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
      zIndex: 50,
      display: "flex",
      gap: 12,
    },
    calendarColumn: { display: "flex", flexDirection: "column", gap: 8, minWidth: 190 },
    dateInput: {
      background: "#0b1228",
      border: "1px solid #23325a",
      borderRadius: 8,
      padding: "8px 10px",
      color: "#eaeef9",
      outline: "none",
      fontSize: 13,
    },
    smallText: { fontSize: 12, color: "#c8d2f2", opacity: 0.9 },
    popupActions: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 },
    clearBtn: {
      background: "transparent",
      border: "1px solid #2b3a66",
      color: "#c8d2f2",
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
    },
  };

  const coupons = [
    { id: 1, code: "SAVE10", discount: "10%", uses: 5, totalDiscounted: 3200, salesGranted: 5000 },
    { id: 2, code: "FREESHIP", discount: "Free Shipping", uses: 12, totalDiscounted: 1490, salesGranted: 3000 },
    { id: 3, code: "SUMMER15", discount: "15%", uses: 7, totalDiscounted: 870, salesGranted: 2500 },
    { id: 4, code: "WINTER20", discount: "20%", uses: 3, totalDiscounted: 2240, salesGranted: 4000 },
    { id: 5, code: "WELCOME5", discount: "5%", uses: 15, totalDiscounted: 5450, salesGranted: 8000 },
  ];

  const sortOptions = [
    "created",
    "expire",
    "code",
    "lastUsedAt",
    "totalDiscounts",
    "salesGranted",
  ];

  const filteredCoupons = useMemo(() => {
    if (!query) return coupons;
    const q = query.toLowerCase();
    return coupons.filter((c) => c.code.toLowerCase().includes(q));
  }, [coupons, query]);

  function formatDate(d) {
    if (!d) return "—";
    try {
      const dd = new Date(d + "T00:00:00");
      return dd.toLocaleDateString();
    } catch {
      return d;
    }
  }

  function applyCompare() {
    setCalendarOpen(false);
  }

  function clearCompare() {
    setRangeAFrom("");
    setRangeATo("");
    setRangeBFrom("");
    setRangeBTo("");
  }

  const exportedCount = 5;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <div style={styles.dot} />
            <div style={styles.title}>Coupons Dashboard</div>

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

          {/* Compare Calendar and selected ranges summary */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
            <button
              ref={calendarBtnRef}
              onClick={() => setCalendarOpen((s) => !s)}
              style={styles.calendarBtn}
            >
              Compare Calendar
            </button>

            {(rangeAFrom || rangeATo || rangeBFrom || rangeBTo) && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#c8d2f2" }}>
                  A: {formatDate(rangeAFrom)} — {formatDate(rangeATo)}
                </div>
                <div style={{ fontSize: 12, color: "#c8d2f2" }}>
                  B: {formatDate(rangeBFrom)} — {formatDate(rangeBTo)}
                </div>
              </div>
            )}

            {calendarOpen && (
              <div style={styles.calendarPopup} ref={popupRef}>
                <div style={styles.calendarColumn}>
                  <div style={styles.smallText}>Range A</div>
                  <input
                    type="date"
                    value={rangeAFrom}
                    onChange={(e) => setRangeAFrom(e.target.value)}
                    style={styles.dateInput}
                  />
                  <input
                    type="date"
                    value={rangeATo}
                    onChange={(e) => setRangeATo(e.target.value)}
                    style={styles.dateInput}
                  />
                </div>

                <div style={styles.calendarColumn}>
                  <div style={styles.smallText}>Range B</div>
                  <input
                    type="date"
                    value={rangeBFrom}
                    onChange={(e) => setRangeBFrom(e.target.value)}
                    style={styles.dateInput}
                  />
                  <input
                    type="date"
                    value={rangeBTo}
                    onChange={(e) => setRangeBTo(e.target.value)}
                    style={styles.dateInput}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 90 }}>
                    <button onClick={applyCompare} style={styles.button}>
                      Apply
                    </button>
                    <button onClick={clearCompare} style={styles.clearBtn}>
                      Clear
                    </button>
                    <button onClick={() => setCalendarOpen(false)} style={styles.clearBtn}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coupons..."
              style={styles.search}
            />
            <button style={styles.button}>Export Coupons</button>
          </div>

          <div style={styles.dropdownContainer}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} style={styles.dropdownButton}>
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
        </div>

        {/* Main Content */}
        <div style={styles.card}>
          {activeTab === "list" ? (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Code</th>
                    <th style={styles.th}>Discounts</th>
                    <th style={styles.th}>Uses</th>
                    <th style={styles.th}>Total Discounted</th>
                    <th style={styles.th}>Sales Granted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((c) => (
                    <tr key={c.id}>
                      <td style={styles.td}>{c.code}</td>
                      <td style={styles.td}>{c.discount}</td>
                      <td style={styles.td}>{c.uses}</td>
                      <td style={styles.td}>৳ {c.totalDiscounted.toLocaleString()}</td>
                      <td style={styles.td}>৳ {c.salesGranted.toLocaleString()}</td>
                    </tr>
                  ))}
                  {filteredCoupons.length === 0 && (
                    <tr>
                      <td style={styles.td} colSpan={5}>
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: 20 }}>Segments view coming soon...</div>
          )}
        </div>
      </div>
    </div>
  );
}