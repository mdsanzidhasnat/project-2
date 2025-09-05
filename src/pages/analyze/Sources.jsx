import React, { useMemo, useState, useEffect } from "react";

// Sources component (updated for 100% width and larger fonts/padding)
// - outer wrapper uses full width (w-full)
// - overall base font increased (text-lg)
// - larger paddings and table font sizes for improved readability

export default function Sources() {
  const sampleData = {
    referer: [
      { site: "www.google.com", orders: 8, ordersChange: "↑ 167%", gross: 112.67, grossChange: "↑ 35.8%", avg: 14.08, avgChange: "↓ 49.1%", netSales: 95.5, netAvg: 11.94 },
      { site: "Unknown", orders: 3, ordersChange: "↑ 50.0%", gross: 1532.49, grossChange: "↑ 3739%", avg: 510.83, avgChange: "↑ 2459%", netSales: 1400, netAvg: 466.67 },
      { site: "www.bing.com", orders: 1, ordersChange: "0%", gross: 12.04, grossChange: "0%", avg: 12.04, avgChange: "0%", netSales: 12.04, netAvg: 12.04 },
      { site: "mskeydeals.com", orders: 1, ordersChange: "0%", gross: 14.2, grossChange: "↓ 20.8%", avg: 14.2, avgChange: "↓ 20.8%", netSales: 12.8, netAvg: 12.8 },
      { site: "statics.teams.cdn.office.net", orders: 1, ordersChange: "0%", gross: 14.99, grossChange: "0%", avg: 14.99, avgChange: "0%", netSales: 14.99, netAvg: 14.99 },
      { site: "duckduckgo.com", orders: 1, ordersChange: "0%", gross: 28.29, grossChange: "0%", avg: 28.29, avgChange: "0%", netSales: 25.0, netAvg: 25.0 },
    ],
    landing: [
      { site: "Homepage", orders: 12, ordersChange: "↑ 10%", gross: 800.0, grossChange: "↑ 20%", avg: 66.67, avgChange: "↑ 5%", netSales: 720, netAvg: 60 },
      { site: "Promo Landing", orders: 4, ordersChange: "↑ 300%", gross: 240.0, grossChange: "↑ 400%", avg: 60.0, avgChange: "↑ 200%", netSales: 200, netAvg: 50 },
    ],
    utms: [
      { site: "utm_source=facebook", orders: 6, ordersChange: "↑ 40%", gross: 360.0, grossChange: "↑ 30%", avg: 60.0, avgChange: "↑ 10%", netSales: 330, netAvg: 55 },
      { site: "utm_source=newsletter", orders: 2, ordersChange: "↓ 20%", gross: 80.0, grossChange: "↓ 10%", avg: 40.0, avgChange: "↓ 5%", netSales: 70, netAvg: 35 },
    ],
  };

  const [mode, setMode] = useState("referer");
  const [query, setQuery] = useState("");
  const [compareOpen, setCompareOpen] = useState(false);
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");

  const [data, setData] = useState(sampleData[mode]);

  useEffect(() => {
    setData(sampleData[mode]);
  }, [mode]);

  const filtered = useMemo(() => {
    if (!query) return data;
    return data.filter((r) => r.site.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

  const totals = useMemo(() => {
    const tOrders = filtered.reduce((s, r) => s + (r.orders || 0), 0);
    const tGross = filtered.reduce((s, r) => s + (r.gross || 0), 0);
    const tNet = filtered.reduce((s, r) => s + (r.netSales || 0), 0);
    const avg = filtered.length ? tGross / filtered.length : 0;
    const netAvg = filtered.length ? tNet / filtered.length : 0;
    return { tOrders, tGross, avg, tNet, netAvg };
  }, [filtered]);

  function formatCurrency(v) {
    return `£${(v || 0).toFixed(2)}`;
  }

  function exportCSV() {
    const headers = ["Referring Site", "Orders", "Gross Sales", "Average Order", "Net Sales", "Net Avg"];
    const rows = filtered.map((r) => [r.site, r.orders, r.gross, r.avg, r.netSales, r.netAvg]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sources_${mode}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function aiAction() {
    alert("AI Prompt executed (placeholder)");
  }

  // try to build a sensible external URL for clickable site names
  function makeSiteUrl(site) {
    if (!site) return null;
    const s = site.trim();
    const noExternal = ["unknown", "homepage", "promo landing"];
    if (noExternal.includes(s.toLowerCase())) return null;
    if (s.toLowerCase().startsWith("utm_") || s.includes("utm_source=")) return null;
    if (/^https?:\/\//i.test(s)) return s;
    if (s.includes(".") && !s.includes(" ")) {
      return `https://${s}`;
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-200 p-8 font-sans text-lg">
      {/* w-full ensures 100% width */}
      <div className="w-full mx-auto">
        {/* Top row: left = title + segment, right = toggles + Compare button */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Title + Segment */}
          <div className="flex items-center gap-6">
            <h2 className="text-white text-3xl font-semibold">Order Sources</h2>
            <button className="text-base px-4 py-2 bg-slate-800 rounded-md border border-slate-700">Segment</button>
          </div>

          {/* Right: toggles (modes) then Compare button and date display */}
          <div className="flex items-center gap-4">
            {/* Mode toggles placed to the right of the title as requested */}
            <div className="flex items-center bg-[#0f1724] p-2 rounded-full shadow-sm">
              {[
                { key: "referer", label: "Referer" },
                { key: "landing", label: "Landing" },
                { key: "utms", label: "UTMs" },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`px-4 py-2 rounded-full text-base font-medium transition ${mode === m.key ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md" : "text-slate-300 hover:bg-slate-800"}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Compare button (single word). Click shows two date pickers side-by-side immediately */}
            <button
              onClick={() => setCompareOpen((v) => !v)}
              className="px-4 py-2 bg-[#0f1724] rounded-md border border-slate-700 text-base hover:scale-[1.01] transition-shadow"
            >
              Compare
            </button>

            {/* date summary */}
            <div className="ml-2 text-base text-slate-400">{dateA && dateB ? `${dateA} — ${dateB}` : "No range"}</div>
          </div>
        </div>

        {/* Compare date pickers (shows side-by-side when compareOpen) */}
        {compareOpen && (
          <div className="flex gap-4 mb-6">
            <input
              type="date"
              value={dateA}
              onChange={(e) => setDateA(e.target.value)}
              className="bg-[#081125] border border-slate-700 p-3 rounded-md text-base"
              aria-label="Compare date A"
            />
            <input
              type="date"
              value={dateB}
              onChange={(e) => setDateB(e.target.value)}
              className="bg-[#081125] border border-slate-700 p-3 rounded-md text-base"
              aria-label="Compare date B"
            />
          </div>
        )}

        <div className="bg-[#0f1724] p-4 rounded-md mb-6 text-base text-slate-300">
          Note: We only have source data available from when you started using Metorik or when you enabled WooCommerce source tracking.
        </div>

        {/* Controls above table: search left, AI + Export right */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              placeholder="Filter results"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#07102a] border border-slate-700 p-3 rounded-md text-base placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button onClick={aiAction} className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md text-white text-base shadow-md">Run AI Prompt</button>
            <button onClick={exportCSV} className="px-6 py-3 bg-transparent border border-slate-700 rounded-md text-base">Export</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg bg-[#081025] border border-slate-800">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left text-lg text-slate-300 bg-[#071425]">
                <th className="px-6 py-4">Referring Site</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Gross Sales</th>
                <th className="px-6 py-4">Average Order</th>
                <th className="px-6 py-4">Net Sales</th>
                <th className="px-6 py-4">Net Avg</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const url = makeSiteUrl(r.site);
                return (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-[#071224]" : "bg-[#06121a]"} border-b border-slate-800`}>
                    <td className="px-6 py-4 font-medium text-lg">
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-300 hover:underline break-words"
                          title={r.site}
                        >
                          {r.site}
                        </a>
                      ) : (
                        <span className="text-indigo-300 cursor-default break-words">{r.site}</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-lg">
                      {r.orders}{" "}
                      <span className={`ml-3 text-sm ${String(r.ordersChange).includes("↑") ? "text-emerald-400" : String(r.ordersChange).includes("↓") ? "text-rose-500" : "text-slate-400"}`}>
                        {r.ordersChange}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-lg">
                      {formatCurrency(r.gross)}{" "}
                      <span className={`ml-3 text-sm ${String(r.grossChange).includes("↑") ? "text-emerald-400" : String(r.grossChange).includes("↓") ? "text-rose-500" : "text-slate-400"}`}>
                        {r.grossChange}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-lg">
                      {formatCurrency(r.avg)}{" "}
                      <span className={`ml-3 text-sm ${String(r.avgChange).includes("↑") ? "text-emerald-400" : String(r.avgChange).includes("↓") ? "text-rose-500" : "text-slate-400"}`}>
                        {r.avgChange}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-lg">{formatCurrency(r.netSales)}</td>
                    <td className="px-6 py-4 text-lg">{formatCurrency(r.netAvg)}</td>
                  </tr>
                );
              })}

              {/* Totals row */}
              <tr className="bg-[#0b1624] font-semibold">
                <td className="px-6 py-4 text-lg">Totals</td>
                <td className="px-6 py-4 text-lg">{totals.tOrders}</td>
                <td className="px-6 py-4 text-lg">{formatCurrency(totals.tGross)}</td>
                <td className="px-6 py-4 text-lg">{formatCurrency(totals.avg)}</td>
                <td className="px-6 py-4 text-lg">{formatCurrency(totals.tNet)}</td>
                <td className="px-6 py-4 text-lg">{formatCurrency(totals.netAvg)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Small footer */}
        <div className="mt-6 text-base text-slate-400">
          Showing <span className="text-slate-200">{filtered.length}</span> sources for <span className="text-slate-200">{mode}</span>.
        </div>
      </div>
    </div>
  );
}