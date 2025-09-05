import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

const { RangePicker } = DatePicker;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState("All Segments");
  const [timeRange, setTimeRange] = useState("1 month");
  const [showCompare, setShowCompare] = useState(false);

  // Top-right compare dropdown state
  const [showTopCompare, setShowTopCompare] = useState(false);
  const topCompareRef = useRef(null);

  const [mainDates, setMainDates] = useState([
    dayjs().subtract(29, "day"),
    dayjs(),
  ]);
  const [compareDates, setCompareDates] = useState([
    dayjs().subtract(29, "day"),
    dayjs(),
  ]);
  const [prevCompareDates, setPrevCompareDates] = useState([dayjs(), dayjs()]);

  // Local temporary ranges for top compare UI (so user can change without immediate apply)
  const [topPrimaryTemp, setTopPrimaryTemp] = useState(mainDates);
  const [topCompareTemp, setTopCompareTemp] = useState(compareDates);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (compareDates && compareDates.length === 2) {
      const diff = compareDates[1].diff(compareDates[0], "day") + 1;
      const prevEnd = compareDates[0].subtract(1, "day");
      const prevStart = prevEnd.subtract(diff - 1, "day");
      setPrevCompareDates([prevStart, prevEnd]);
    }
  }, [compareDates]);

  // Close top dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (topCompareRef.current && !topCompareRef.current.contains(e.target)) {
        setShowTopCompare(false);
      }
    };
    if (showTopCompare) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTopCompare]);

  const rangeOptions = [
    { label: "1 week", days: 7 },
    { label: "4 week", days: 28 },
    { label: "1 month", days: 30 },
    { label: "6 month", days: 182 },
    { label: "1 year", days: 365 },
  ];

  const handleQuickRange = (label, days) => {
    setTimeRange(label);
    const end = dayjs();
    const start = end.subtract(days - 1, "day");
    setMainDates([start, end]);
    setCompareDates([start, end]);
    setTopPrimaryTemp([start, end]);
    setTopCompareTemp([start, end]);
  };

  // Chart data (kept same)
  const salesData = {
    labels: [
      "31/07/2025","01/08/2025","02/08/2025","03/08/2025","04/08/2025",
      "05/08/2025","06/08/2025","07/08/2025","08/08/2025","09/08/2025",
      "10/08/2025","11/08/2025","12/08/2025","13/08/2025","14/08/2025"
    ],
    datasets: [
      {
        label: "Net Sales",
        data: [300,400,500,1700,800,700,650,300,200,150,100,50,80,120,140],
        borderColor: darkMode ? "rgba(75,192,192,1)" : "rgba(0,128,128,1)",
        backgroundColor: darkMode ? "rgba(75,192,192,0.2)" : "rgba(0,128,128,0.1)",
      },
    ],
  };

  const visitorsData = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Visitors",
        data: Array(salesData.labels.length).fill(0.1),
        borderColor: darkMode ? "rgba(153,102,255,1)" : "rgba(128,0,128,1)",
        backgroundColor: darkMode ? "rgba(153,102,255,0.2)" : "rgba(128,0,128,0.1)",
      },
    ],
  };

  const last3MonthsData = {
    labels: ["June", "July", "August"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 15000, 18000],
        borderColor: darkMode ? "#10b981" : "#059669",
        backgroundColor: darkMode ? "rgba(16,185,129,0.2)" : "rgba(5,150,105,0.1)",
        tension: 0.3,
      },
    ],
  };

  const activityItems = [
    "Kirk Gregory (Monthly) $19.00",
    "Sergio Holt (Coupon) $9.99",
    "Ella Watkins (Monthly) $19.00",
    "Niklas Meyer (Regular) $9.99",
    "Andrea Juliao (Yearly) $19.00",
    "James Smith (Monthly) $29.00",
    "Sophia Lee (Coupon) $5.99",
    "Michael Brown (Yearly) $49.00",
    "Olivia Johnson (Monthly) $19.00",
    "William Davis (Regular) $9.99",
    "Emma Wilson (Coupon) $14.99",
    "Liam Martinez (Monthly) $24.00",
    "Noah Anderson (Yearly) $39.00",
  ];

  const topCustomers = [
    { name: "Deron Huels", price: "$314" },
    { name: "Winifred Grimes", price: "$303" },
    { name: "Terry du Buque", price: "$281" },
    { name: "Jorge Kulas", price: "$256" },
    { name: "Julius Kiehn", price: "$254" },
    { name: "Ferne Kulas", price: "$248" },
    { name: "John Doe", price: "$240" },
    { name: "Jane Smith", price: "$230" },
    { name: "Alice Brown", price: "$225" },
    { name: "Bob Johnson", price: "$220" },
    { name: "Charlie Davis", price: "$215" },
    { name: "Eve Wilson", price: "$210" },
    { name: "Frank Moore", price: "$205" },
    { name: "Grace Lee", price: "$200" },
    { name: "Hank Taylor", price: "$195" },
    { name: "Ivy Thomas", price: "$190" },
    { name: "Jack White", price: "$185" },
  ];

  const bg = darkMode ? "bg-[#0f2a5c]" : "bg-gray-100";
  const boxText = darkMode ? "text-white" : "text-black";
  const headerBg = darkMode ? "bg-[#081738]" : "bg-gray-200";

  // When user clicks Apply in top compare dropdown: copy temps to main states and close
  const applyTopCompare = () => {
    if (topPrimaryTemp && topPrimaryTemp.length === 2) {
      setMainDates(topPrimaryTemp);
    }
    if (topCompareTemp && topCompareTemp.length === 2) {
      setCompareDates(topCompareTemp);
    }
    setShowTopCompare(false);
  };

  return (
    <div className={`${darkMode ? "bg-[#0a1f44] text-white" : "bg-white text-black"} p-6 min-h-screen font-sans transition-colors duration-300`}>
      {/* Header */}
      <header className={`${headerBg} flex justify-between items-center p-4 rounded shadow transition-colors duration-300`}>
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">A2Key</h1>
          <nav className="flex gap-4">
            <a href="#" className="hover:text-blue-400">Home</a>
            <a href="#" className="hover:text-blue-400">Analytics</a>
            <a href="#" className="hover:text-blue-400">Reports</a>
            <a href="#" className="hover:text-blue-400">Settings</a>
          </nav>
        </div>

        {/* Right side of header: Search, Compare (top-right), Dark toggle */}
        <div className="flex items-center gap-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className={`border rounded px-3 py-1 ${darkMode ? "text-black bg-white" : "text-black bg-gray-200"}`}
          />

          {/* Top-right Compare dropdown */}
          <div className="relative" ref={topCompareRef}>
            <button
              onClick={() => {
                // initialize temps with current main/compare ranges
                setTopPrimaryTemp(mainDates);
                setTopCompareTemp(compareDates);
                setShowTopCompare(!showTopCompare);
              }}
              className="px-3 py-1 bg-indigo-600 rounded text-white hover:bg-indigo-700 transition-colors duration-200"
            >
              Compare
            </button>

            {showTopCompare && (
              <div className={`absolute right-0 mt-2 p-4 rounded shadow-lg z-50 ${darkMode ? "bg-[#081738] text-white" : "bg-white text-black"}`} style={{ minWidth: 520 }}>
                <div className="flex gap-3 items-start">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm">Primary</label>
                    <RangePicker
                      value={topPrimaryTemp}
                      onChange={(dates) => setTopPrimaryTemp(dates)}
                      format="DD MMM YYYY"
                      className="p-2 rounded border"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm">Compare</label>
                    <RangePicker
                      value={topCompareTemp}
                      onChange={(dates) => setTopCompareTemp(dates)}
                      format="DD MMM YYYY"
                      className="p-2 rounded border"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => setShowTopCompare(false)}
                    className={`px-3 py-1 rounded border ${darkMode ? "border-gray-600" : "border-gray-300"}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyTopCompare}
                    className="px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* existing dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-6 rounded-full relative transition-all ${darkMode ? "bg-purple-500" : "bg-gray-400"}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${darkMode ? "left-0.5" : "left-4.5"}`}
            ></span>
          </button>
        </div>
      </header>

      {/* Account Balance */}
      <div className="mt-4 p-3 rounded shadow text-right font-semibold transition-colors duration-300">
        Account Balance: $12,345.67
      </div>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Net Sales Chart */}
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">Net Sales</h2>
          <p className="text-xl font-bold">$8,332.07</p>
          <Line data={salesData} height={80} />
        </div>

        {/* Activity Box */}
        <div className={`${bg} p-2 rounded shadow max-h-72 overflow-y-auto transition-colors duration-300`}>
          <h2 className={`font-semibold sticky top-0 z-10 p-1 ${boxText} bg-[#0f2a5c] dark:bg-[#081738]`}>Activity</h2>
          <ul className="mt-1 space-y-2">
            {activityItems.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`${darkMode ? "bg-[#081738] hover:bg-[#11255e]" : "bg-gray-200 hover:bg-gray-300"} p-2 rounded cursor-pointer transition-colors`}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Last 3 Months Chart */}
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">Last 3 Months</h2>
          <Line data={last3MonthsData} height={80} />
        </div>
      </div>

      {/* Overview Section, Date Picker & Segments */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-8 mb-4">
        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
          <h2 className="text-2xl font-bold">Overview</h2>
          {rangeOptions.map((range) => (
            <button
              key={range.label}
              onClick={() => handleQuickRange(range.label, range.days)}
              className={`px-3 py-1 rounded border transition-colors duration-200
                ${timeRange === range.label
                  ? "bg-purple-500 text-white border-purple-500"
                  : darkMode
                    ? "bg-[#081738] text-white border-gray-600 hover:bg-[#0b2047]"
                    : "bg-white text-black border-gray-400 hover:bg-gray-200"
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <RangePicker
            value={mainDates}
            onChange={(dates) => setMainDates(dates)}
            format="DD MMM YYYY"
            className="p-2 rounded border w-80"
          />

          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className={`p-2 rounded border transition-colors duration-200
              ${darkMode ? "bg-[#081738] text-white border-gray-600 hover:bg-[#0b2047]" : "bg-white text-black border-gray-400 hover:bg-gray-200"}`}
          >
            <option>All Segments</option>
            <option>User Defined</option>
            <option>Test</option>
          </select>

          <div className="relative">
            <button
              onClick={() => setShowCompare(!showCompare)}
              className="px-3 py-1 bg-purple-500 rounded text-white hover:bg-purple-600 transition-colors duration-200"
            >
              Compare With
            </button>
            {showCompare && (
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-[#081738] p-3 rounded shadow-lg flex flex-col gap-3 z-10 w-max">
                <RangePicker
                  value={compareDates}
                  onChange={(dates) => setCompareDates(dates)}
                  format="DD MMM YYYY"
                  className="p-2 rounded border w-80"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Previous Period:{" "}
                  <span className="font-semibold text-green-600">
                    {prevCompareDates[0].format("DD MMM YYYY")}
                  </span>{" "}
                  -{" "}
                  <span className="font-semibold text-green-600">
                    {prevCompareDates[1].format("DD MMM YYYY")}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">Net Sales</h2>
          <p className="text-xl font-bold">$9,115.88 <span className="text-red-500">-47%</span></p>
          <p className="text-gray-300">Daily Avg: $325.57</p>
          <Line data={salesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">Customers</h2>
          <p className="text-xl font-bold">144 <span className="text-red-500">-34%</span></p>
          <p>Orders: 175 <span className="text-red-500">-29%</span></p>
          <p>ARPPU: $63.30 <span className="text-red-500">-20%</span></p>
          <p>Failed Orders: 138</p>
        </div>

        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">Visitors</h2>
          <p className="text-xl font-bold">779,702</p>
          <p>Conversion Rate: 3% <span className="text-green-500">+32%</span></p>
          <Line data={visitorsData} options={{ responsive:true, plugins:{legend:{display:false}}}}/>
        </div>
      </div>

      {/* Third Row: 4 Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* MRR */}
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">MRR</h2>
          <p className="text-xl font-bold">
            $890.10 <span className="text-red-500">-31%</span>
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-white-700">
              <span>Churn Rate</span>
              <span>5%</span>
            </div>
            <div className="flex justify-between text-sm text-white-700">
              <span>Active Subscriptions</span>
              <span>1,230</span>
            </div>
          </div>
          <div className="mt-4">
            <svg className="w-full h-12" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline 
                points="0,15 10,10 20,20 30,8 40,18 50,12 60,22 70,14 80,25 90,10 100,15" 
                stroke="#4F46E5" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Top Customers */}
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300 max-h-80 w-full overflow-hidden`}>
          <h2 className="font-semibold sticky top-0 z-10 bg-[#0f2a5c] dark:bg-[#081738] py-2">{`Top 20 Customers`}</h2>
          <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {topCustomers.map((customer, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{customer.name}</span>
                <span className="font-medium">{customer.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Products */}
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
          <h2 className="font-semibold">Top 20 Products</h2>
          <ul className="mt-2 list-disc list-inside">
            <li>Ergonomic Rubber Pants - $2,665.56</li>
            <li>Putler Starter-Monthly - $1,388.98</li>
            <li>Cardigan - $1,245.00</li>
            <li>Chair - $1,100.50</li>
            <li>Table Lamp - $999.99</li>
          </ul>
        </div>

        {/* Quality Check */}
        <div className={`${bg} p-4 rounded shadow transition-colors duration-300`}>
         {/* Header */}
         <h2 className="font-semibold text-lg">Quality Check</h2>
         <p className="mt-2 text-green-400">All systems operational ✅</p>
         <p className="mt-1 text-gray-300">No pending alerts</p>
       
         {/* Divider */}
         <div className="my-3 border-t border-gray-600"></div>

        {/* Table Layout */}
       <div className="w-full">
         <table className="w-full text-sm text-left">
           <tbody className="divide-y divide-gray-700">
             {/* Transactions Row */}
             <tr>
               <td className="py-2 font-semibold text-blue-400">Transactions</td>
               <td className="py-2 text-gray-300">24 success • 2 pending • 1 fail</td>
             </tr>

            {/* Emails Row */}
              <tr>
                <td className="py-2 font-semibold text-purple-400">Emails</td>
                <td className="py-2 text-gray-300">52 sent • 14 replies • 1 bounce</td>
              </tr>
      
              {/* Locations Row */}
              <tr>
                <td className="py-2 font-semibold text-yellow-400">Locations</td>
                <td className="py-2 text-gray-300">Dhaka • New York • London</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>

      {/* ---------- Recent Events (Full width table) ---------- */}
      <div className={`${bg} p-4 rounded shadow mt-6 transition-colors duration-300`}>
        <h2 className="font-semibold text-lg mb-3">Recent Events</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-700 rounded-lg">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Customer ID</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-gray-300">
              <tr>
                <td className="px-4 py-3 font-medium">John Doe</td>
                <td className="px-4 py-3">#C10234</td>
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3 text-green-400">$120.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Sarah Lee</td>
                <td className="px-4 py-3">#C10567</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3 text-green-400">$45.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Michael Smith</td>
                <td className="px-4 py-3">#C10921</td>
                <td className="px-4 py-3">5</td>
                <td className="px-4 py-3 text-green-400">$250.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Emily Johnson</td>
                <td className="px-4 py-3">#C11234</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3 text-green-400">$80.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Liam Martinez</td>
                <td className="px-4 py-3">#C11500</td>
                <td className="px-4 py-3">4</td>
                <td className="px-4 py-3 text-green-400">$160.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Olivia Brown</td>
                <td className="px-4 py-3">#C11876</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3 text-green-400">$70.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Noah Wilson</td>
                <td className="px-4 py-3">#C12045</td>
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3 text-green-400">$110.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Ava Davis</td>
                <td className="px-4 py-3">#C12333</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3 text-green-400">$50.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;