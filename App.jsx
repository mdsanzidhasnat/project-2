// File: App.jsx
import React, { useState, useEffect } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout & Dashboard
import A2KeySidebarLayout from "./src/components/Sidebar.jsx";
import Dashboard from "./src/pages/Dashboard.jsx";

// Analyze pages
import OrdersAnalyze from "./src/pages/analyze/OrdersAnalyze.jsx";
import Revenue from "./src/pages/analyze/Revenue.jsx";
import Refunds from "./src/pages/analyze/Refunds.jsx";
import Sources from "./src/pages/analyze/Sources.jsx";
import OrderDevices from "./src/pages/analyze/OrderDevices.jsx";
import Forecast from "./src/pages/analyze/Forecast.jsx";
import CartSettings from "./src/pages/analyze/CartSettings.jsx";
import CustomersAnalyze from "./src/pages/analyze/Customers.jsx";
import CustomerSources from "./src/pages/analyze/CustomerSources.jsx";
import CustomersGroup from "./src/pages/analyze/CustomersGroup.jsx";
import CustomerRetention from "./src/pages/analyze/CustomerRetention.jsx"; 
import Reports from "./src/pages/analyze/Reports.jsx"; 
import Cohorts from "./src/pages/analyze/Cohorts.jsx"; // ✅ NEW PAGE
import ReturningCustomers from "./src/pages/analyze/ReturningCustomers.jsx"; // ✅ ADDED ReturningCustomers

// Other main pages
import Orders from "./src/pages/Order.jsx";
import Customers from "./src/pages/Customers.jsx";
import Coupons from "./src/pages/Coupons.jsx";
import Products from "./src/pages/Products.jsx";
import Carts from "./src/pages/Carts.jsx";
import NotFound from "./src/pages/NotFound.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Theme
      appearance={darkMode ? "dark" : "light"}
      radius="large"
      scaling="100%"
    >
      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-slate-900 text-white" : "bg-white text-slate-900"
        }`}
      >
        <Router>
          <A2KeySidebarLayout
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          >
            <Routes>
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Main dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Other main pages */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/products" element={<Products />} />
              <Route path="/carts" element={<Carts />} />

              {/* Analyze submenu */}
              <Route path="/analyze/orders" element={<OrdersAnalyze />} />
              <Route path="/analyze/revenue" element={<Revenue />} />
              <Route path="/analyze/refunds" element={<Refunds />} />
              <Route path="/analyze/sources" element={<Sources />} />
              <Route path="/analyze/orderdevices" element={<OrderDevices />} />
              <Route path="/analyze/forecast" element={<Forecast />} />
              <Route path="/analyze/cartsettings" element={<CartSettings />} />
              <Route path="/analyze/customers" element={<CustomersAnalyze />} />
              <Route path="/analyze/customersources" element={<CustomerSources />} />
              <Route path="/analyze/customersgroup" element={<CustomersGroup />} />
              <Route path="/analyze/customerretention" element={<CustomerRetention />} />
              <Route path="/analyze/reports" element={<Reports />} />
              <Route path="/analyze/cohorts" element={<Cohorts />} /> {/* ✅ NEW ROUTE */}
              <Route path="/analyze/returningcustomers" element={<ReturningCustomers />} /> {/* ✅ NEW ROUTE for ReturningCustomers */}

              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </A2KeySidebarLayout>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme={darkMode ? "dark" : "light"}
          />
        </Router>
      </div>
    </Theme>
  );
}