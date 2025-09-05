import React from 'react';
    import { motion } from 'framer-motion';
    import { CheckCircle, AlertCircle, Store } from 'lucide-react';

    const StoreIntegrations = () => {
      const stores = [
        { name: 'Shopify', status: 'connected', sales: '$45,230', orders: 234 },
        { name: 'WooCommerce', status: 'connected', sales: '$32,150', orders: 187 },
        { name: 'Etsy', status: 'connected', sales: '$18,940', orders: 156 },
        { name: 'eBay', status: 'warning', sales: '$12,680', orders: 89 }
      ];

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-inter mb-2">
                Store Integrations
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-roboto">
                Multi-platform performance overview
              </p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Store className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-4">
            {stores.map((store, index) => (
              <motion.div
                key={store.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    store.status === 'connected' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    {store.status === 'connected' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white font-roboto">
                      {store.name}
                    </h4>
                    <p className={`text-sm ${
                      store.status === 'connected' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-yellow-600 dark:text-yellow-400'
                    } font-roboto`}>
                      {store.status === 'connected' ? 'Connected' : 'Needs attention'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-white font-inter">
                    {store.sales}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-roboto">
                    {store.orders} orders
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default StoreIntegrations;