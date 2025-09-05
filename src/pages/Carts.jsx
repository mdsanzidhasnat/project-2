import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleCarts = [
  { id: "Cart001", customer: "John Doe", items: 3, total: "$350" },
  { id: "Cart002", customer: "Jane Smith", items: 5, total: "$720" },
  { id: "Cart003", customer: "Alice Brown", items: 2, total: "$180" },
  { id: "Cart004", customer: "Bob Martin", items: 4, total: "$400" },
];

export default function Carts() {
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setCarts(sampleCarts), 300);
    return () => clearTimeout(timeout);
  }, []);

  const filtered = carts.filter(
    (c) =>
      c.customer.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search)
  );

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#e8ebf8" }}>Carts</h1>
          <p style={{ marginTop: 4, color: "#c7cffc" }}>View all active shopping carts.</p>
        </div>
        <button
          style={{
            padding: "8px 16px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.2s",
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => alert("Cart settings clicked!")}
        >
          Cart Settings
        </button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        style={{ marginTop: 20 }}
      >
        <input
          type="text"
          placeholder="Search by Customer or Cart ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #2c334d",
            background: "#0f172a",
            color: "#e8ebf8",
            outline: "none",
          }}
        />
      </motion.div>

      {/* Table */}
      <motion.div style={{ marginTop: 24, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ color: "#a1a6c1", textAlign: "left" }}>
              <th style={{ padding: "12px 16px" }}>Cart ID</th>
              <th style={{ padding: "12px 16px" }}>Customer</th>
              <th style={{ padding: "12px 16px" }}>Items</th>
              <th style={{ padding: "12px 16px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((c) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "#0b1020",
                    borderBottom: "1px solid #1c2033",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.02, background: "rgba(99,102,241,0.08)" }}
                >
                  <td style={{ padding: "12px 16px", color: "#e8ebf8" }}>{c.id}</td>
                  <td style={{ padding: "12px 16px", color: "#e8ebf8" }}>{c.customer}</td>
                  <td style={{ padding: "12px 16px", color: "#e8ebf8" }}>{c.items}</td>
                  <td style={{ padding: "12px 16px", color: "#e8ebf8" }}>{c.total}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ marginTop: 12, color: "#c7cffc" }}>No carts found.</p>
        )}
      </motion.div>
    </div>
  );
}