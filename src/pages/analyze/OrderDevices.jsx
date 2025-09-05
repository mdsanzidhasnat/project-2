import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const mockData = [
  { os: "Windows", orders: 13, sales: 1683, avg: 129.4 },
  { os: "Linux", orders: 1, sales: 18, avg: 17.9 },
  { os: "iOS", orders: 1, sales: 14, avg: 14.2 },
];

const browsersData = [
  { browser: "Chrome", orders: 9, sales: 1200, avg: 133.3 },
  { browser: "Firefox", orders: 3, sales: 300, avg: 100.0 },
  { browser: "Brave", orders: 3, sales: 215, avg: 71.7 },
];

const COLORS = ["#2563eb", "#3f51b5", "#06b6d4"];
const BROWSER_COLORS = ["#0ea5e9", "#3b82f6", "#7c3aed"];

export default function OrderDevices() {
  const [data, setData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    setData(mockData);
    const total = mockData.reduce((sum, item) => sum + item.orders, 0);
    setTotalOrders(total);
  }, []);

  const desktop = data.find((d) => d.os === "Windows")?.orders || 0;
  const mobile =
    (data.find((d) => d.os === "iOS")?.orders || 0) +
    (data.find((d) => d.os === "Linux")?.orders || 0);

  const desktopPct = totalOrders
    ? ((desktop / totalOrders) * 100).toFixed(1)
    : "0.0";
  const mobilePct = totalOrders ? ((mobile / totalOrders) * 100).toFixed(1) : "0.0";

  const progressDesktopFlex = totalOrders ? desktop / totalOrders : 0;
  const progressMobileFlex = totalOrders ? mobile / totalOrders : 0;

  const formatCurrency = (v) =>
    `£${Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  // visual helpers
  const maxOrders = Math.max(...(data.map(d => d.orders).concat([1])));
  const maxBrowserOrders = Math.max(...(browsersData.map(b => b.orders).concat([1])));

  // styles
  const pageStyle = {
    background: "#0b0c10",
    color: "#e6eef8",
    minHeight: "100vh",
    fontFamily: "Inter, Arial, sans-serif",
    padding: 20,
  };

  const headerTitleStyle = { margin: 0, fontSize: 22, fontWeight: 700 };
  const smallMuted = { fontSize: 13, color: "#9aa7c7" };

  const cardBase = {
    borderRadius: 12,
    padding: 18,
    boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
    border: "1px solid rgba(255,255,255,0.02)",
  };

  const tableContainerStyle = {
    background: "linear-gradient(180deg,#0a1b3c,#0d254d)",
    borderRadius: 12,
    padding: 18,
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px",
    fontSize: 15,
  };

  const thStyle = {
    padding: "10px 12px",
    textAlign: "left",
    fontSize: 15,
    color: "#cbd6ea",
    fontWeight: 700,
    opacity: 0.95,
  };

  const tdStyle = {
    padding: "8px 12px",
    fontSize: 15,
    color: "#e6eef8",
    verticalAlign: "top",
  };

  const rowCard = (accent) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
    borderRadius: 10,
    padding: 12,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
    borderLeft: `4px solid ${accent}`,
    transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
  });

  const rowCardHover = {
    transform: "translateY(-6px)",
    boxShadow: "0 10px 30px rgba(2,6,23,0.65)",
    background: "linear-gradient(90deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))",
  };

  const avatarStyle = (bg) => ({
    minWidth: 44,
    minHeight: 44,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14,
    color: "#fff",
    background: `linear-gradient(135deg, ${bg}, rgba(255,255,255,0.06))`,
    boxShadow: "0 4px 14px rgba(2,6,23,0.5)",
  });

  const miniBarWrapper = {
    width: 140,
    height: 8,
    background: "rgba(255,255,255,0.03)",
    borderRadius: 6,
    overflow: "hidden",
    marginLeft: 12,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
  };

  const miniBarInner = (w, color1, color2) => ({
    width: `${w}%`,
    height: "100%",
    background: `linear-gradient(90deg, ${color1}, ${color2})`,
    transition: "width 280ms ease",
  });

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={headerTitleStyle}>Order Devices</h2>
          <button
            style={{
              background: "linear-gradient(90deg,#283593,#3f51b5)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: 13,
              boxShadow: "0 6px 18px rgba(63,81,181,0.12)",
            }}
          >
            Segment
          </button>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ background: "#0f1114", border: "1px solid #22262b", padding: "8px 12px", borderRadius: 8, fontSize: 13 }}>
            Jul 1, 2025 - Aug 1, 2025
          </div>
          <div style={{ background: "#0f1114", border: "1px solid #22262b", padding: "8px 12px", borderRadius: 8, fontSize: 13 }}>
            Aug 2, 2025 - Sep 2, 2025
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 22 }}>
        {/* Desktop Card */}
        <div style={{ ...cardBase, background: "linear-gradient(180deg,#0f1724,#0b1220)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={smallMuted}>Desktop</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{desktop} orders</div>
              <div style={{ fontSize: 14, color: "#7ee787", marginTop: 6 }}>↑ {desktopPct}%</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, color: "#cbd6ea" }}>{formatCurrency(data.reduce((s, i) => s + i.sales, 0))}</div>
              <div style={{ fontSize: 12, color: "#9aa7c7" }}>Gross sales</div>
            </div>
          </div>
        </div>

        {/* Mobile Card */}
        <div style={{ ...cardBase, background: "linear-gradient(180deg,#071029,#071324)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={smallMuted}>Mobile</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{mobile} orders</div>
              <div style={{ fontSize: 14, color: "#7ee787", marginTop: 6 }}>↑ {mobilePct}%</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, color: "#cbd6ea" }}>{formatCurrency(data.find((d) => d.os === "iOS")?.sales || 0)}</div>
              <div style={{ fontSize: 12, color: "#9aa7c7" }}>Gross sales (iOS)</div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div style={{ ...cardBase, background: "linear-gradient(180deg,#08121b,#061018)" }}>
          <div style={{ fontSize: 13, color: "#9aa7c7", marginBottom: 6 }}>Summary</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{totalOrders} total orders</div>
          <div style={{ marginTop: 8, fontSize: 14, color: "#9aa7c7" }}>
            Average order value: {formatCurrency((data.reduce((s, i) => s + i.sales, 0) / Math.max(totalOrders, 1)).toFixed(2))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          display: "flex",
          height: 36,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 26,
          background: "#071019",
          border: "1px solid rgba(255,255,255,0.02)",
        }}
      >
        <div
          style={{
            flex: progressDesktopFlex,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            background: "linear-gradient(90deg,#2563eb,#40a9ff)",
          }}
        >
          Desktop ({desktopPct}%)
        </div>
        <div
          style={{
            flex: progressMobileFlex,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            background: "linear-gradient(90deg,#3f51b5,#06b6d4)",
          }}
        >
          Mobile ({mobilePct}%)
        </div>
      </div>

      {/* OS Table + Pie */}
      <div style={{ display: "flex", gap: 20, alignItems: "stretch", marginBottom: 26, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 360, ...tableContainerStyle }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 18 }}>Operating systems of matching orders</h3>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Operating System</th>
                <th style={thStyle}>Orders</th>
                <th style={thStyle}>Gross Sales</th>
                <th style={thStyle}>Average Order</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, idx) => {
                const accent = COLORS[idx % COLORS.length];
                const barPct = Math.round((item.orders / maxOrders) * 100);
                const initials = item.os.split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase();

                return (
                  <tr key={item.os} style={{ background: "transparent" }}>
                    <td style={{ ...tdStyle }} colSpan={1}>
                      <div
                        style={rowCard(accent)}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, rowCardHover)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)", background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" })}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={avatarStyle(accent)}>{initials}</div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "#eaf3ff" }}>{item.os}</div>
                            <div style={{ fontSize: 12, color: "#9aa7c7", marginTop: 4 }}>OS — {item.orders} orders</div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ textAlign: "right", minWidth: 120 }}>
                            <div style={{ fontSize: 15, fontWeight: 700 }}>{item.orders}</div>
                            <div style={{ fontSize: 12, color: "#9aa7c7" }}>{formatCurrency(item.sales)}</div>
                          </div>

                          <div style={miniBarWrapper}>
                            <div style={miniBarInner(barPct, accent, "#7cc3ff")}></div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ ...tdStyle, display: "none" }} />{/* placeholder for column layout */}
                    <td style={{ ...tdStyle, display: "none" }} />
                    <td style={{ ...tdStyle, display: "none" }} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ width: 520, minWidth: 300, background: "#0f1114", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", justifyContent: "center", ...cardBase }}>
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Tooltip wrapperStyle={{ background: "#0b1220", border: "none", color: "#e6eef8" }} />
              <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: "#cbd6ea", fontSize: 13 }} />
              <Pie
                data={data}
                dataKey="orders"
                nameKey="os"
                cx="50%"
                cy="45%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={6}
                label={({ name, percent }) => `${name} ${ (percent * 100).toFixed(0) }%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Browsers Table + Pie */}
      <div style={{ marginTop: 8 }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: 18 }}>Browsers of matching orders</h3>
        <div style={{ display: "flex", gap: 20, alignItems: "stretch", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 360, ...tableContainerStyle }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Browser</th>
                  <th style={thStyle}>Orders</th>
                  <th style={thStyle}>Gross Sales</th>
                  <th style={thStyle}>Average Order</th>
                </tr>
              </thead>

              <tbody>
                {browsersData.map((b, idx) => {
                  const accent = BROWSER_COLORS[idx % BROWSER_COLORS.length];
                  const barPct = Math.round((b.orders / maxBrowserOrders) * 100);
                  const initials = b.browser.split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase();

                  return (
                    <tr key={b.browser} style={{ background: "transparent" }}>
                      <td style={tdStyle}>
                        <div
                          style={rowCard(accent)}
                          onMouseEnter={(e) => Object.assign(e.currentTarget.style, rowCardHover)}
                          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "none", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)", background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" })}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={avatarStyle(accent)}>{initials}</div>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: "#eaf3ff" }}>{b.browser}</div>
                              <div style={{ fontSize: 12, color: "#9aa7c7", marginTop: 4 }}>{b.orders} orders</div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ textAlign: "right", minWidth: 120 }}>
                              <div style={{ fontSize: 15, fontWeight: 700 }}>{b.orders}</div>
                              <div style={{ fontSize: 12, color: "#9aa7c7" }}>{formatCurrency(b.sales)}</div>
                            </div>

                            <div style={miniBarWrapper}>
                              <div style={miniBarInner(barPct, accent, "#a3bffa")}></div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ ...tdStyle, display: "none" }} />
                      <td style={{ ...tdStyle, display: "none" }} />
                      <td style={{ ...tdStyle, display: "none" }} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ width: 520, minWidth: 300, background: "#0f1114", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", justifyContent: "center", ...cardBase }}>
            <ResponsiveContainer width="100%" height={420}>
              <PieChart>
                <Tooltip wrapperStyle={{ background: "#0b1220", border: "none", color: "#e6eef8" }} />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: "#cbd6ea", fontSize: 13 }} />
                <Pie
                  data={browsersData}
                  dataKey="orders"
                  nameKey="browser"
                  cx="50%"
                  cy="45%"
                  innerRadius={90}
                  outerRadius={160}
                  paddingAngle={6}
                  label={({ name, percent }) => `${name} ${ (percent * 100).toFixed(0) }%`}
                >
                  {browsersData.map((entry, index) => (
                    <Cell key={`cell-br-${index}`} fill={BROWSER_COLORS[index % BROWSER_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}