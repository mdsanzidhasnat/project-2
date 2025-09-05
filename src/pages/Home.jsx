import React, { useState, useEffect } from 'react';
    import { DollarSign, Users, ShoppingCart, TrendingUp, Eye, Clock } from 'lucide-react';
    import Header from '../components/Header';
    import MetricCard from '../components/MetricCard';
    import SalesChart from '../components/SalesChart';
    import ProductTable from '../components/ProductTable';
    import StoreIntegrations from '../components/StoreIntegrations';
    import Footer from '../components/Footer';

    const Home = () => {
      const [darkMode, setDarkMode] = useState(false);

      useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
        }
      }, []);

      const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      };

      const metrics = [
        {
          title: 'Total Revenue',
          value: '$124,563',
          change: '+12.5%',
          changeType: 'positive',
          icon: DollarSign,
          delay: 0.1
        },
        {
          title: 'Active Customers',
          value: '8,549',
          change: '+8.2%',
          changeType: 'positive',
          icon: Users,
          delay: 0.2
        },
        {
          title: 'Total Orders',
          value: '2,847',
          change: '+15.3%',
          changeType: 'positive',
          icon: ShoppingCart,
          delay: 0.3
        },
        {
          title: 'Conversion Rate',
          value: '3.24%',
          change: '-2.1%',
          changeType: 'negative',
          icon: TrendingUp,
          delay: 0.4
        },
        {
          title: 'Page Views',
          value: '45,892',
          change: '+18.7%',
          changeType: 'positive',
          icon: Eye,
          delay: 0.5
        },
        {
          title: 'Avg. Session',
          value: '4m 32s',
          change: '+5.4%',
          changeType: 'positive',
          icon: Clock,
          delay: 0.6
        }
      ];

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-inter mb-2">
                Welcome back, Sarah
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-roboto">
                Here's what's happening with your e-commerce stores today.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  delay={metric.delay}
                />
              ))}
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProductTable />
              <StoreIntegrations />
            </div>
          </main>

          <Footer />
        </div>
      );
    };

    export default Home;