import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart } from "lucide-react";

const MetricCard = ({ title, value, change, changeType, iconType = "dollar", delay = 0 }) => {
  const isPositive = changeType === "positive";

  const Icon = (() => {
    switch (iconType) {
      case "users":
        return Users;
      case "cart":
        return ShoppingCart;
      case "dollar":
      default:
        return DollarSign;
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
          <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;