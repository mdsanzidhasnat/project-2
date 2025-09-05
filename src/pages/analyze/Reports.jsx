import React, { useState } from "react"; // Reports.jsx (Full-width page)

export default function Reports() {
  const [search, setSearch] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  // keep track of starred links by id: { "orders-0": true, ... }
  const [starred, setStarred] = useState({});

  const toggleStar = (id) => {
    setStarred((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      padding: "28px",
      boxSizing: "border-box",
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      background:
        "linear-gradient(180deg, #07102a 0%, #06112a 35%, #031623 100%)",
      color: "#E6EEF8",
    },
    container: {
      width: "100%", // full width container
      margin: "0 auto",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "20px",
    },
    leftHeader: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
    },
    title: {
      fontSize: "34px",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "#FFFFFF",
      textShadow: "0 6px 20px rgba(2,6,23,0.6)",
    },
    searchWrap: {
      display: "flex",
      alignItems: "center",
      background: "rgba(255,255,255,0.03)",
      padding: "8px 12px",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(2,6,23,0.55)",
      border: "1px solid rgba(255,255,255,0.03)",
      gap: 10,
    },
    searchInput: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#E6EEF8",
      fontSize: "15px",
      width: "360px",
    },
    showBtn: {
      background: showDesc
        ? "linear-gradient(90deg,#06b6d4,#7c3aed)"
        : "linear-gradient(90deg,#7c3aed,#06b6d4)",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      color: "white",
      fontWeight: 700,
      boxShadow: "0 8px 30px rgba(124,58,237,0.18)",
      cursor: "pointer",
      fontSize: "14px",
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
    },
    descBox: {
      marginTop: "14px",
      padding: "14px 18px",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.03)",
      color: "#dbeafe",
      fontSize: "15px",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 40px rgba(2,6,23,0.6)",
    },
    main: {
      display: "flex",
      gap: "24px",
      marginTop: "26px",
      alignItems: "flex-start",
      width: "100%",
      boxSizing: "border-box",
    },
    leftColumn: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      boxSizing: "border-box",
      paddingRight: 12,
    },
    rightColumn: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      paddingLeft: 12,
    },
    card: {
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.006))",
      borderRadius: "14px",
      padding: "18px",
      boxShadow: "0 12px 40px rgba(2,6,23,0.6)",
      border: "1px solid rgba(255,255,255,0.03)",
      boxSizing: "border-box",
    },
    bigCardTitle: {
      fontSize: "20px",
      fontWeight: 800,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    smallCard: {
      background: "linear-gradient(180deg,#061633,#071233)",
      borderRadius: "12px",
      padding: "14px",
      border: "1px solid rgba(255,255,255,0.035)",
      boxShadow: "0 8px 30px rgba(2,6,23,0.45)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      transition: "transform 0.14s ease, box-shadow 0.14s ease",
    },
    cardTitleRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    linkTitle: {
      fontSize: "17px",
      fontWeight: 800,
      color: "#CDE8FF",
      cursor: "pointer",
      textDecoration: "none",
      transition: "color 0.12s ease, transform 0.12s ease",
    },
    smallDesc: {
      marginTop: "8px",
      fontSize: "14px",
      color: "#BFDDF8",
      lineHeight: 1.6,
    },
    couponLink: {
      fontSize: "15px",
      fontWeight: 800,
      color: "#D6EFFE",
      textDecoration: "none",
      cursor: "pointer",
    },
    gradientRow: {
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.035)",
      boxShadow: "0 8px 30px rgba(2,6,23,0.45)",
      background: "linear-gradient(90deg, rgba(14,165,233,0.03), rgba(124,58,237,0.02))",
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
    },
    groupRow: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      padding: "10px 12px",
      borderRadius: 10,
      transition: "transform 0.14s ease, box-shadow 0.14s ease",
      cursor: "pointer",
    },
    groupLink: {
      fontSize: 15,
      fontWeight: 800,
      color: "#E6F6FF",
      textDecoration: "none",
    },
    groupDesc: {
      fontSize: 13,
      color: "#BFDDF8",
      lineHeight: 1.5,
    },
    badge: {
      fontSize: 12,
      background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
      padding: "6px 10px",
      borderRadius: 999,
      color: "#fff",
      fontWeight: 800,
      boxShadow: "0 6px 20px rgba(124,58,237,0.18)",
    },
    lastUpdated: {
      fontSize: 12,
      color: "rgba(255,255,255,0.6)",
      marginTop: 6,
    },
    // star button styles
    starBtn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      borderRadius: 6,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: 0,
      marginRight: 6,
    },
    starIcon: {
      width: 18,
      height: 18,
      display: "block",
    },
    // small inline row for coupon/customers single links
    inlineRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8,
    },
  };

  // small helper for hover effect on link — returns handlers
  const hoverHandlers = {
    onMouseEnter: (e) => {
      Object.assign(e.currentTarget.style, { transform: "translateX(6px)", color: "#E9FBFF" });
    },
    onMouseLeave: (e) => {
      Object.assign(e.currentTarget.style, { transform: "translateX(0px)", color: "" });
    },
  };

  // ROW RENDER HELPERS
  // gradient-style rows (used in left column lists)
  const renderGradientRow = (id, title, desc = null) => {
    const isStarred = !!starred[id];
    return (
      <div key={id} style={styles.gradientRow}>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleStar(id);
          }}
          aria-pressed={isStarred}
          aria-label={`${isStarred ? "Unstar" : "Star"} ${title}`}
          style={styles.starBtn}
        >
          {isStarred ? (
            <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id={`g-${id}`} x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#g-${id})`}
                d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
              <path
                fill="none"
                stroke="rgba(230,238,248,0.9)"
                strokeWidth="1.4"
                d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"
              />
            </svg>
          )}
        </button>

        <div style={{ flex: 1 }}>
          <a
            href="#"
            style={styles.linkTitle}
            {...hoverHandlers}
            onClick={(e) => e.preventDefault()}
          >
            {title}
          </a>
          {showDesc && desc && <div style={styles.smallDesc}>{desc}</div>}
        </div>
      </div>
    );
  };

  // group-style rows (used in right column lists)
  const renderGroupRow = (id, title, desc = null, index = 0) => {
    const isStarred = !!starred[id];
    return (
      <div
        key={id}
        style={{
          ...styles.groupRow,
          background: index % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
          border: "1px solid rgba(255,255,255,0.02)",
          marginBottom: 6,
        }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
          });
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, {
            transform: "translateY(0px)",
            boxShadow: "none",
          });
        }}
        onClick={(e) => e.preventDefault()}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleStar(id);
            }}
            aria-pressed={isStarred}
            aria-label={`${isStarred ? "Unstar" : "Star"} ${title}`}
            style={styles.starBtn}
          >
            {isStarred ? (
              <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id={`gg-${id}`} x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#gg-${id})`}
                  d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="none"
                  stroke="rgba(230,238,248,0.9)"
                  strokeWidth="1.4"
                  d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"
                />
              </svg>
            )}
          </button>

          <div style={{ flex: 1 }}>
            <a href="#" style={styles.groupLink} onClick={(e) => e.preventDefault()}>
              {title}
            </a>
            {showDesc && desc && <div style={styles.groupDesc}>{desc}</div>}
          </div>
        </div>
      </div>
    );
  };

  // DATA ROWS
  const ordersRows = [
    { title: "Orders over time", desc: "Order data from selected time period plotted on a chart." },
    { title: "Orders grouped by new vs returning customers", desc: "Number of customers, orders and sales split into new and returning customers groups." },
    { title: "Orders by Status", desc: "Number of orders and their current fulfillment/payment status." },
    { title: "Orders grouped by payment method", desc: "Orders and sales grouped by the payment method used." },
    { title: "Orders grouped by shipping method", desc: "Orders and sales grouped by shipping/carrier method." },
    { title: "Orders grouped by currency", desc: "Orders and sales broken down by currency used." },
    { title: "Orders grouped by", desc: "Number of orders and sales grouped by billing/shipping address country, state, city, and ZIP." },
    { title: "Orders grouped by custom field", desc: "Number of orders and sales grouped by a chosen custom field key." },
    { title: "Item count distribution", desc: "Chart showing how many items customers are adding to their orders." },
    { title: "Orders value distribution", desc: "Chart showing how much customers are spending on their orders." },
    { title: "Spend by day", desc: "Chart showing gross sales broken down by day of the week." },
    { title: "Average order gross", desc: "Chart showing the average order gross over time." },
  ];

  const refundsRows = [
    { title: "Refunds over time", desc: "Refunds over your selected time period." },
    { title: "Time between order and refund", desc: "See the average time between an order being created and it being refunded." },
    { title: "Refunded products", desc: "See the most refunded products and their refund stats in a given time period." },
    { title: "Refunds grouped by reason", desc: "The number of refunds made for each reason and the average refund amount." },
    { title: "Refunds grouped by billing location", desc: "The number of refunds and average refund amount for each billing address country, state, city, and ZIP." },
    { title: "Refunds grouped by shipping location", desc: "The number of refunds and average refund amount for each shipping address country, state, city, and ZIP." },
  ];

  const customerGroups = [
    { title: "Customers by first product", desc: "New customer cohorts grouped by their first ordered product." },
    { title: "Customers grouped by billing location", desc: "The number of new customers, LTV, and more for each billing address country, state, city, and ZIP." },
    { title: "Customers grouped by shipping location", desc: "The number of new customers, LTV, and more for each shipping address country, state, city, and ZIP." },
    { title: "Customers grouped by custom field", desc: "The number of new customers, LTV, and more grouped by a chosen custom field key." },
    { title: "Customers grouped by role", desc: "The number of new customers, LTV, and more for each customer role." },
  ];

  const retentionRows = [
    { title: "Orders made over the lifetime of new customers", desc: "See how many orders your customers are making over their lifetime. Data is plotted on a chart." },
    { title: "One time vs. returning customer KPIs", desc: "Compare number of customers, orders, gross spend and AOV of new and returning customers." },
    { title: "Time between repeat orders", desc: "Chart showing how long existing customers wait to make subsequent orders." },
    { title: "Items bought over lifetime of customers", desc: "Chart showing how many items a customer will purchase over their lifetime." },
  ];

  const sourcesRows = [
    { title: "Order Sources by Referring Site", desc: "The number of orders, gross sales, and average order value for referring sites." },
    { title: "Order Sources by Landing Path", desc: "The number of orders, gross sales, and average order value for each landing path." },
    { title: "Order Sources by UTM Parameters", desc: "The number of orders, gross sales, and average order value for UTM parameter combinations." },
    { title: "Customer Sources by Referring Site", desc: "The number of customers, average orders, average LTV for referring sites." },
    { title: "Customer Sources by Landing Path", desc: "The number of customers, average orders, average LTV for each landing path." },
    { title: "Customer Sources by UTM Parameters", desc: "The number of customers, average orders, average LTV for UTM parameter combinations." },
  ];

  const productSalesRows = [
    { title: "Products frequently bought together", desc: "See what products are most commonly purchased together in the same order." },
    { title: "Top selling products", desc: "The top products by gross sales in the selected period." },
    { title: "Top selling variations", desc: "Top variations by sales and velocity." },
    { title: "Top selling categories", desc: "Which categories are driving the most revenue." },
    { title: "Product groups", desc: "Create custom groups of products/variations and look at the sales stats for them combined over time." },
    { title: "Product Stock Velocity", desc: "Daily sales for each product and the expected remaining days of stock." },
    { title: "Variation Stock Velocity", desc: "Daily sales for each variation and the expected remaining days of stock." },
  ];

  const comparisonRows = [
    { title: "Product comparison", desc: "Compare as many products as you like against each other. Data is plotted on a chart." },
    { title: "Category comparison", desc: "Compare as many categories as you like against each other. Data is plotted on a chart." },
  ];

  const devicesRows = [
    { title: "Order grouped by devices", desc: "The number of orders and sales for desktop vs. mobile." },
    { title: "Order grouped by operating system", desc: "The number of orders and sales for each operating system (eg. iOS vs. Windows)." },
    { title: "Order grouped by web browser", desc: "The number of orders and sales for each browser (eg. Chrome vs. Safari)." },
  ];

  // Forecast report rows (NEW)
  const forecastRows = [
    { title: "Sales forecast", desc: "The expected gross sales over the next 12 months." },
    { title: "Order volume forecast", desc: "The expected orders over the next 12 months." },
    { title: "New customers forecast", desc: "The expected customers over the next 12 months." },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.leftHeader}>
            <div style={styles.title}>Reports</div>

            <div style={styles.searchWrap}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.95 }}>
                <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="rgba(255,255,255,0.65)" strokeWidth="1.6" />
              </svg>
              <input
                style={styles.searchInput}
                placeholder="Search reports, coupons, metrics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search reports"
              />
            </div>
          </div>

          <div>
            <button
              style={styles.showBtn}
              onClick={() => setShowDesc((s) => !s)}
              aria-pressed={showDesc}
              title="Toggle descriptions"
            >
              {showDesc ? "Hide all descriptions" : "Show all descriptions"}
            </button>
          </div>
        </header>

        {showDesc && (
          <div style={styles.descBox}>
            <strong>Page description:</strong> Use this Reports page to view revenue, orders, refunds and other sales analytics for any selected period. Click a report to open its detail view or chart. Filters and exporting are available in each detailed report view.
          </div>
        )}

        <main style={styles.main}>
          {/* LEFT COLUMN: Revenue / Orders / Refunds / Sources */}
          <div style={styles.leftColumn}>
            {/* Revenue */}
            <section style={{ ...styles.card }}>
              <div style={styles.bigCardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: "linear-gradient(90deg,#06b6d4,#7c3aed)" }} />
                  <div>Revenue reports</div>
                </div>
                <div style={{ fontSize: 13, color: "#9BD1FF", fontWeight: 700 }}>Overview</div>
              </div>

              <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                {renderGradientRow("rev-1", "Net/Gross revenue overtime", "Net/gross sales over your selected time period. Data plotted on a chart.")}
                {renderGradientRow("rev-2", "Revenue grouped by", "Revenue shown in a table grouped by billing/shipping location or payment method.")}
                {renderGradientRow("rev-3", "Revenue grouped by tax", "Revenue shown in a table grouped tax code/label/id.")}
              </div>
            </section>

            {/* Orders + Refunds + Sources combined within left column */}
            <section style={{ ...styles.card }}>
              <div style={styles.bigCardTitle}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: "linear-gradient(90deg,#60a5fa,#7c3aed)" }} />
                  <div>Orders & Refunds</div>
                </div>
                <div style={{ fontSize: 13, color: "#9BD1FF", fontWeight: 700 }}>Overview</div>
              </div>

              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                {ordersRows.map((r, idx) => renderGradientRow(`orders-${idx}`, r.title, r.desc))}

                <div style={{ marginTop: 8 }}>
                  <div style={{ ...styles.bigCardTitle, marginBottom: 8 }}>
                    <div>Refunds Reports</div>
                    <div style={{ fontSize: 12, color: "#9BD1FF", fontWeight: 700 }}>Overview</div>
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    {refundsRows.map((r, idx) => renderGradientRow(`refunds-${idx}`, r.title, r.desc))}
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <div style={{ ...styles.bigCardTitle, marginBottom: 8 }}>
                    <div>Sources Report</div>
                    <div style={{ fontSize: 12, color: "#9BD1FF", fontWeight: 700 }}>Overview</div>
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    {sourcesRows.map((r, idx) => renderGradientRow(`sources-${idx}`, r.title, r.desc))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: stacked small cards.
              NOTE: Coupons + Customers grouped together with no gap (as requested).
          */}
          <aside style={styles.rightColumn}>
            {/* top group: Coupons + Customers with no gap between them */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Coupons Report (top) */}
              <div style={{ ...styles.smallCard, borderRadius: 12 }}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={styles.badge}>New</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Coupons Report</div>
                  </div>
                </div>

                <div style={styles.inlineRow}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar("coupon-1");
                    }}
                    aria-pressed={!!starred["coupon-1"]}
                    aria-label={`${starred["coupon-1"] ? "Unstar" : "Star"} Coupons uses and sales generated`}
                    style={styles.starBtn}
                  >
                    {starred["coupon-1"] ? (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="g-coupon-1" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#g-coupon-1)" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="rgba(230,238,248,0.9)" strokeWidth="1.4" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <a href="#" style={styles.couponLink} onClick={(e) => e.preventDefault()}>
                      Coupons uses and sales generated
                    </a>
                    {showDesc && <div style={{ ...styles.smallDesc, marginTop: 8 }}>The total usage, amount discounted, and sales generated for each coupon in a given time period.</div>}
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>

              {/* Customers Reports (immediately below coupons - NO GAP) */}
              <div style={{ ...styles.smallCard, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Customers Reports</div>

                <div style={styles.inlineRow}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar("customers-1");
                    }}
                    aria-pressed={!!starred["customers-1"]}
                    aria-label={`${starred["customers-1"] ? "Unstar" : "Star"} New customers over time`}
                    style={styles.starBtn}
                  >
                    {starred["customers-1"] ? (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="g-customers-1" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#g-customers-1)" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="rgba(230,238,248,0.9)" strokeWidth="1.4" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <a href="#" style={styles.couponLink} onClick={(e) => e.preventDefault()}>New customers over time</a>
                    {showDesc && <div style={{ ...styles.smallDesc, marginTop: 8 }}>New customers over time. Data is plotted on a chart.</div>}
                  </div>
                </div>

                <div style={styles.inlineRow}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar("customers-2");
                    }}
                    aria-pressed={!!starred["customers-2"]}
                    aria-label={`${starred["customers-2"] ? "Unstar" : "Star"} Customers first ordered`}
                    style={styles.starBtn}
                  >
                    {starred["customers-2"] ? (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="g-customers-2" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#g-customers-2)" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="rgba(230,238,248,0.9)" strokeWidth="1.4" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <a href="#" style={styles.couponLink} onClick={(e) => e.preventDefault()}>Customers first ordered</a>
                    {showDesc && <div style={{ ...styles.smallDesc, marginTop: 8 }}>New customers by first ordered month.</div>}
                  </div>
                </div>

                <div style={styles.inlineRow}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleStar("customers-3");
                    }}
                    aria-pressed={!!starred["customers-3"]}
                    aria-label={`${starred["customers-3"] ? "Unstar" : "Star"} Customers Heatmap`}
                    style={styles.starBtn}
                  >
                    {starred["customers-3"] ? (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="g-customers-3" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#g-customers-3)" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" style={styles.starIcon} xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="rgba(230,238,248,0.9)" strokeWidth="1.4" d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" />
                      </svg>
                    )}
                  </button>

                  <div>
                    <a href="#" style={styles.couponLink} onClick={(e) => e.preventDefault()}>Customers Heatmap</a>
                    {showDesc && <div style={{ ...styles.smallDesc, marginTop: 8 }}>Customers plotted on a map of the world.</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* rest of the stacked small cards with normal gap */}
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Customer Groups Reports */}
              <div style={styles.smallCard}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={styles.badge}>Groups</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Customer Groups Reports</div>
                  </div>
                </div>

                {customerGroups.map((g, i) => renderGroupRow(`groups-${i}`, g.title, g.desc, i))}

                <div style={{ marginTop: 6 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>

              {/* Customer Retention Report */}
              <div style={styles.smallCard}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={styles.badge}>Retention</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Customer Retention Report</div>
                  </div>
                </div>

                {retentionRows.map((r, i) => renderGroupRow(`retention-${i}`, r.title, r.desc, i))}

                <div style={{ marginTop: 6 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>

              {/* Product Sales Report */}
              <div style={styles.smallCard}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={styles.badge}>Products</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Product Sales Report</div>
                  </div>
                </div>

                {productSalesRows.map((r, i) => renderGroupRow(`products-${i}`, r.title, r.desc, i))}

                <div style={{ marginTop: 6 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>

              {/* Comparison Report */}
              <div style={styles.smallCard}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={styles.badge}>Comparison</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Comparison Report</div>
                  </div>
                </div>

                {comparisonRows.map((r, i) => renderGroupRow(`comparison-${i}`, r.title, r.desc, i))}

                <div style={{ marginTop: 6 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>

              {/* Devices Report */}
              <div style={styles.smallCard}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={styles.badge}>Devices</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Devices Report</div>
                  </div>
                </div>

                {devicesRows.map((r, i) => renderGroupRow(`devices-${i}`, r.title, r.desc, i))}

                <div style={{ marginTop: 6 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>

              {/* Forecast Report (NEW) */}
              <div style={styles.smallCard}>
                <div style={styles.cardTitleRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={styles.badge}>Forecast</div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Forecast Report</div>
                  </div>
                </div>

                {forecastRows.map((r, i) => renderGroupRow(`forecast-${i}`, r.title, r.desc, i))}

                <div style={{ marginTop: 6 }}>
                  <div style={styles.lastUpdated}>Last updated: Today</div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}