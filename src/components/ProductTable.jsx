import React from "react";

export default function ProductTable() {
  const products = [
    { name: "Ergonomic Rubber Pants", pct: "30.5%", revenue: "$2,549.16" },
    { name: "Putler Starter-Monthly", pct: "15.03%", revenue: "$1,255.98" },
    { name: "Generic Granite Salad", pct: "13.02%", revenue: "$1,088.44" },
    { name: "Ergonomic Metal Shoes", pct: "10.5%", revenue: "$877.50" },
  ];

  return (
    <div className="card product-card">
      <h4>Top products</h4>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>% of sales</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.pct}</td>
              <td>{p.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}