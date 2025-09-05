import React from "react";

const salesData = [
  { amount: "$19.00", name: "Kirk Gregory", product: "a product", time: "a day ago" },
  { amount: "$9.99", name: "Sergio Holt", product: "Icegram", time: "a day ago" },
  { amount: "$19.00", name: "Ella Watkins", product: "Putler Starter-Monthly", time: "a day ago" },
  { amount: "$9.99", name: "Niklas Meyer", product: "a product", time: "a day ago" },
  { amount: "$19.00", name: "Andrea Juliao", product: "Putler Starter-Monthly", time: "2 days ago" },
];

export default function SalesCart() {
  return (
    <div className="card sales-card">
      <h4>Activity</h4>
      <ul className="activity-list">
        {salesData.map((s, i) => (
          <li key={i}>
            <div>
              <span className="dot-green" />
              <strong>{s.amount}</strong> paid by <strong>{s.name}</strong> for {s.product}
            </div>
            <div className="time">{s.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}