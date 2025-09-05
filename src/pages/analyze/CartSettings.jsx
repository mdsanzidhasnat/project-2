import React, { useState, useEffect } from "react";

export default function CartSettings() {
  // initialize from localStorage (safe-guard for SSR)
  const getInitial = () => {
    try {
      const raw = window?.localStorage?.getItem("cartTrackingEnabled");
      return raw ? JSON.parse(raw) : false;
    } catch {
      return false;
    }
  };

  const [enabled, setEnabled] = useState(getInitial);
  const [loading, setLoading] = useState(false);

  // sync enabled -> localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem("cartTrackingEnabled", JSON.stringify(enabled));
    } catch {
      // ignore storage errors
    }
  }, [enabled]);

  // simulate enabling/disabling (replace with real API if you have one)
  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Simulate a network request / enabling process
      await new Promise((res) => setTimeout(res, 600));
      setEnabled((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0f14",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Cart Settings
      </h1>

      {/* Enable Section */}
      <div
        style={{
          backgroundColor: "#111318",
          border: "1px solid #2a2d34",
          borderRadius: "8px",
          padding: "30px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Enable
        </h2>

        <div style={{ textAlign: "center" }}>
          {/* Illustration Placeholder */}
          <div style={{ marginBottom: "20px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
              alt="Cart Illustration"
              style={{ width: "180px", margin: "0 auto" }}
            />
          </div>

          <p style={{ fontWeight: "600", marginBottom: "10px" }}>
            Would you like Metorik to track carts from your store?
          </p>
          <p
            style={{
              color: "#9da3af",
              fontSize: "14px",
              lineHeight: "1.5",
              marginBottom: "20px",
            }}
          >
            With cart tracking enabled, you'll be able to view every cart within
            Metorik, analyse carts through reports, and even send abandoned cart
            emails.
          </p>

          <button
            onClick={handleToggle}
            aria-pressed={enabled}
            disabled={loading}
            style={{
              backgroundColor: enabled ? "#10b981" : "#3b82f6",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              minWidth: "190px",
            }}
          >
            {loading ? (enabled ? "Disabling..." : "Enabling...") : enabled ? "Cart Tracking Enabled" : "Enable Cart Tracking"}
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div
        style={{
          backgroundColor: "#111318",
          border: "1px solid #2a2d34",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Settings
        </h2>

        {enabled ? (
          <>
            <p style={{ fontSize: "14px", color: "#9da3af", marginBottom: "12px" }}>
              Cart tracking is <strong>enabled</strong>. You can now analyze carts, view reports, and send abandoned cart emails.
            </p>

            {/* Example: a simple setting row */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <label style={{ fontSize: "14px", color: "#fff", minWidth: "220px" }}>
                Include guest carts:
              </label>
              <input
                type="checkbox"
                defaultChecked
                aria-label="Include guest carts"
                style={{ transform: "scale(1.1)", cursor: "pointer" }}
                // wire this up to state or API if needed
              />
            </div>
          </>
        ) : (
          <p
            style={{
              fontSize: "14px",
              color: "#9da3af",
              fontStyle: "italic",
            }}
          >
            Enable cart tracking above first.
          </p>
        )}
      </div>

      {/* Help button */}
      <button
        onClick={() => alert("Need help? Visit Docs or contact support.")}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#3b82f6",
          border: "none",
          borderRadius: "20px",
          color: "#fff",
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Help
      </button>
    </div>
  );
}