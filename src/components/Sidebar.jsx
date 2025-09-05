import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Users,
  Tag,
  Package,
  CreditCard,
  ChevronLeft,
  BarChart3,
  PieChart,
  RefreshCcw,
  DollarSign,
  FileText,
  Settings,
} from "lucide-react";

export default function A2KeySidebarLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [analyzeOpen, setAnalyzeOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [cohortsOpen, setCohortsOpen] = useState(false);

  const sizes = useMemo(() => ({ expanded: 220, collapsed: 64, buttonOffset: 8 }), []);
  const sidebarWidth = collapsed ? sizes.collapsed : sizes.expanded;

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      background: "#0b1020",
      color: "#e8ebf8",
      paddingLeft: sidebarWidth,
      transition: "padding-left 300ms ease",
      position: "relative",
    },
    sidebar: {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      width: sidebarWidth,
      background: "#0f172a",
      borderRight: "1px solid rgba(255,255,255,0.08)",
      transition: "width 300ms ease",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 30,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "16px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      whiteSpace: "nowrap",
    },
    logo: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: "linear-gradient(135deg,#22d3ee,#6366f1)",
      display: "grid",
      placeItems: "center",
      fontWeight: 800,
      color: "#0b1020",
    },
    brandText: {
      fontSize: 17,
      fontWeight: 700,
      opacity: collapsed ? 0 : 1,
      transform: collapsed ? "translateX(-10px)" : "translateX(0)",
      transition: "opacity 250ms ease, transform 250ms ease",
      marginLeft: 6,
    },
    nav: {
      display: "flex",
      flexDirection: "column",
      padding: 8,
      gap: 6,
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 10,
      color: "#c7cffc",
      textDecoration: "none",
      fontSize: 15,
      transition: "background 200ms ease, color 200ms ease, transform 150ms ease",
      cursor: "pointer",
    },
    linkActive: {
      background: "rgba(99,102,241,0.18)",
      color: "#e8ebf8",
    },
    icon: {
      width: 22,
      height: 22,
      flex: "0 0 auto",
      display: "grid",
      placeItems: "center",
      borderRadius: 6,
      fontSize: 16,
    },
    label: {
      flex: 1,
      opacity: collapsed ? 0 : 1,
      transform: collapsed ? "translateX(-10px)" : "translateX(0)",
      transition: "opacity 250ms ease, transform 250ms ease",
      whiteSpace: "nowrap",
    },
    submenuContainer: {
      marginTop: 6,
    },
    submenuToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 10,
      color: "#c7cffc",
      cursor: "pointer",
    },
    submenu: {
      display: analyzeOpen ? "flex" : "none",
      flexDirection: "column",
      marginLeft: collapsed ? 6 : 8,
      marginTop: 4,
      gap: 4,
    },
    nestedToggle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
      color: "#aeb9ff",
      textDecoration: "none",
    },
    nestedSubmenu: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      marginLeft: collapsed ? 8 : 26,
      marginTop: 6,
    },
    submenuLink: {
      fontSize: 14,
      padding: "6px 12px",
      color: "#a3b1fc",
      textDecoration: "none",
      borderRadius: 8,
      transition: "background 200ms ease, color 200ms ease",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    submenuLinkActive: {
      background: "rgba(99,102,241,0.18)",
      color: "#fff",
    },
    footer: {
      marginTop: "auto",
      padding: 12,
      fontSize: 12,
      opacity: 0.6,
    },
    toggleBtn: {
      position: "fixed",
      top: 16,
      left: sidebarWidth + sizes.buttonOffset,
      transform: "translateX(-50%)",
      zIndex: 40,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "#0f172a",
      color: "#e8ebf8",
      padding: "6px 10px",
      borderRadius: 999,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
      transition: "left 300ms ease, background 150ms ease",
      fontSize: 14,
      width: 38,
      height: 38,
    },
    caret: {
      display: "inline-block",
      transition: "transform 250ms ease",
      transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
      fontSize: 14,
    },
    content: {
      flex: 1,
      width: "100%",
      padding: 24,
    },
  };

  const items = [
    { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { to: "/customers", label: "Customers", icon: <Users size={18} /> },
    { to: "/coupons", label: "Coupons", icon: <Tag size={18} /> },
    { to: "/products", label: "Products", icon: <Package size={18} /> },
    { to: "/carts", label: "Carts", icon: <CreditCard size={18} /> },
  ];

  const reportsItems = [
    { to: "/analyze/revenue", label: "Revenue", icon: <DollarSign size={14} /> },
    { to: "/analyze/orders", label: "Order", icon: <ShoppingCart size={14} /> },
    { to: "/analyze/refunds", label: "Refunds", icon: <RefreshCcw size={14} /> },
    { to: "/analyze/orderdevices", label: "OrderDevices", icon: <Package size={14} /> },
    { to: "/analyze/sources", label: "Source", icon: <PieChart size={14} /> },
    { to: "/analyze/forecast", label: "Forecast", icon: <BarChart3 size={14} /> },
    { to: "/analyze/cartsettings", label: "Cart Settings", icon: <Settings size={14} /> },
    { to: "/analyze/customers", label: "Customers", icon: <Users size={14} /> },
    { to: "/analyze/customersgroup", label: "CustomersGroup", icon: <Users size={14} /> },
    { to: "/analyze/customerretention", label: "CustomerRetention", icon: <Users size={14} /> },
  ];

  const cohortsItems = [
    { to: "/analyze/returningcustomers", label: "Returning Customers" },
    { to: "/analyze/cohorts/by-order-count", label: "By order count" },
    { to: "/analyze/cohorts/orders-per-customer", label: "Order per customers" },
    { to: "/analyze/cohorts/avg-order-value", label: "Average order value" },
    { to: "/analyze/cohorts/lifetime-value", label: "Lifetime Value" },
    { to: "/analyze/cohorts/orders-over-time", label: "Orders over time" },
    { to: "/analyze/cohorts/sales-over-time", label: "Sales over time" },
  ];

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar} aria-label="A2Key sidebar">
        <div style={styles.brand}>
          <div style={styles.logo} aria-label="A2Key logo">
            A
          </div>
          <span style={styles.brandText}>A2Key</span>
        </div>

        <nav style={styles.nav}>
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/dashboard"}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.linkActive : {}),
              })}
            >
              <span style={styles.icon}>{it.icon}</span>
              <span style={styles.label}>{it.label}</span>
            </NavLink>
          ))}

          <div style={styles.submenuContainer}>
            <div
              onClick={() => setAnalyzeOpen((v) => !v)}
              style={{
                ...styles.link,
                ...styles.submenuToggle,
              }}
              role="button"
              aria-expanded={analyzeOpen}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setAnalyzeOpen((v) => !v);
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <BarChart3 size={18} />
                <span style={styles.label}>Analyze</span>
              </div>

              <ChevronLeft
                style={{
                  transform: analyzeOpen ? "rotate(-90deg)" : "rotate(0)",
                  transition: "transform 250ms ease",
                }}
              />
            </div>

            <div style={styles.submenu}>
              <NavLink
                to="/analyze/reports"
                onClick={() => setReportsOpen((v) => !v)}
                style={{ ...styles.nestedToggle }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FileText size={14} />
                  <span style={styles.label}>Reports</span>
                </div>
                <ChevronLeft
                  style={{ transform: reportsOpen ? "rotate(-90deg)" : "rotate(0)", transition: "transform 200ms ease" }}
                />
              </NavLink>

              {reportsOpen && (
                <div style={styles.nestedSubmenu}>
                  {reportsItems.map((it) => (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      style={({ isActive }) => ({
                        ...styles.submenuLink,
                        ...(isActive ? styles.submenuLinkActive : {}),
                      })}
                    >
                      <span style={{ width: 18, display: "inline-grid", placeItems: "center" }}>{it.icon}</span>
                      <span style={{ opacity: collapsed ? 0 : 1, transition: "opacity 200ms" }}>{it.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}

              <NavLink
                to="/analyze/cohorts"
                onClick={() => setCohortsOpen((v) => !v)}
                style={{ ...styles.nestedToggle, marginTop: 6 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Users size={14} />
                  <span style={styles.label}>Cohorts</span>
                </div>
                <ChevronLeft
                  style={{ transform: cohortsOpen ? "rotate(-90deg)" : "rotate(0)", transition: "transform 200ms ease" }}
                />
              </NavLink>

              {cohortsOpen && (
                <div style={styles.nestedSubmenu}>
                  {cohortsItems.map((it) => (
                    <NavLink
                      key={it.to}
                      to={it.to}
                      style={({ isActive }) => ({
                        ...styles.submenuLink,
                        ...(isActive ? styles.submenuLinkActive : {}),
                      })}
                    >
                      <span style={{ width: 18, display: "inline-grid", placeItems: "center" }}>•</span>
                      <span style={{ opacity: collapsed ? 0 : 1, transition: "opacity 200ms" }}>{it.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        <div style={styles.footer}>{collapsed ? "" : "© A2Key Dashboard"}</div>
      </aside>

      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed((v) => !v)}
        style={styles.toggleBtn}
      >
        <span style={styles.caret}>❮❯</span>
      </button>

      <main style={styles.content}>{children}</main>
    </div>
  );
}