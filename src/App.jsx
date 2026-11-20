import React, { useState, useMemo } from 'react';
import MetricCard from './components/MetricCard.jsx';
import TransactionTable from './components/TransactionTable.jsx';
import Sidebar from './components/Sidebar.jsx';
import BannerCards from './components/BannerCards.jsx';
import FilterBar from './components/FilterBar.jsx';
import transactionsData from './data/transactions_144.json';

/**
 * Format currency in Indian Rupees format (e.g., ₹73,436)
 */
function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

export default function App() {
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('All');
  const [channel, setChannel] = useState('All');
  const [region, setRegion] = useState('All');
  const [dateRange, setDateRange] = useState('Sep – Nov 2026');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((item) => {
      // Search matching (ID, product name, customer ref, category, channel)
      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const matchesId = item.transaction_id.toLowerCase().includes(query);
        const matchesProduct = item.product_name.toLowerCase().includes(query);
        const matchesCustomer = item.customer_ref.toLowerCase().includes(query);
        const matchesCategory = (item.category || '').toLowerCase().includes(query);
        const matchesChannel = (item.channel || '').toLowerCase().includes(query);

        if (!matchesId && !matchesProduct && !matchesCustomer && !matchesCategory && !matchesChannel) {
          return false;
        }
      }

      // Payment Status filter
      if (paymentStatus !== 'All' && item.payment_status !== paymentStatus) {
        return false;
      }

      // Channel filter
      if (channel !== 'All' && item.channel !== channel) {
        return false;
      }

      // Region filter
      if (region !== 'All' && item.region !== region) {
        return false;
      }

      return true;
    });
  }, [search, paymentStatus, channel, region]);

  // Calculate KPIs according to metric_definitions.csv:
  // - Net sales: Sum net_amount_inr for payment_status Paid
  // - Orders: Count transactions with payment_status Paid
  // - Avg order: Net sales / Orders
  // - Refunds: Count records with payment_status Refunded
  const metrics = useMemo(() => {
    // If all filters are default, calculate over full dataset (matching reference design)
    // If filters applied, calculate over filtered transactions for dynamic insights
    const isFiltered = search.trim() !== '' || paymentStatus !== 'All' || channel !== 'All' || region !== 'All';
    const targetSet = isFiltered ? filteredTransactions : transactionsData;

    const paidTransactions = targetSet.filter((t) => t.payment_status === 'Paid');
    const refundTransactions = targetSet.filter((t) => t.payment_status === 'Refunded');

    const netSales = paidTransactions.reduce((acc, t) => acc + (Number(t.net_amount_inr) || 0), 0);
    const paidOrders = paidTransactions.length;
    const avgOrderValue = paidOrders > 0 ? Math.round(netSales / paidOrders) : 0;
    const refunds = refundTransactions.length;

    return {
      netSales,
      paidOrders,
      avgOrderValue,
      refunds,
      isFiltered,
    };
  }, [filteredTransactions, search, paymentStatus, channel, region]);

  const handleResetFilters = () => {
    setSearch('');
    setPaymentStatus('All');
    setChannel('All');
    setRegion('All');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="dashboard-content">
        {/* Mobile Header Bar (Only visible <= 600px via CSS) */}
        <header className="mobile-header" aria-label="Mobile Navigation Bar">
          <span className="mobile-header__brand">verdant.</span>
          <button
            type="button"
            className="mobile-header__menu-btn"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            Menu
          </button>
        </header>

        {/* Dashboard Main Container */}
        <main className="dashboard-main" id="main-content">
          {/* Top Title & Range Selector */}
          <div className="dashboard-topbar">
            <div className="dashboard-topbar__titles">
              <h1 className="dashboard-title">Commerce overview</h1>
              <p className="dashboard-subtitle">
                Track your beauty store performance at a glance
              </p>
            </div>

            <div className="dashboard-topbar__controls">
              <div className="date-badge" aria-label="Selected Date Range">
                <span className="date-badge__text">{dateRange}</span>
                <span className="date-badge__arrow" aria-hidden="true">▾</span>
              </div>
            </div>
          </div>

          {/* KPI Metrics Grid (Reusable MetricCard components) */}
          <section className="metrics-section" aria-labelledby="metrics-heading">
            <h2 id="metrics-heading" className="sr-only">Key performance indicators</h2>
            <div className="metrics-grid">
              <MetricCard
                title="Net sales"
                value={formatCurrency(metrics.netSales)}
                hint={metrics.isFiltered ? 'Filtered paid revenue' : '86 paid orders'}
                variant="sage"
              />
              <MetricCard
                title="Paid orders"
                value={metrics.paidOrders.toString()}
                hint={metrics.isFiltered ? 'Filtered paid transactions' : 'Total successful orders'}
                variant="sage"
              />
              <MetricCard
                title="Avg. order"
                value={formatCurrency(metrics.avgOrderValue)}
                hint="Average order value"
                variant="sage"
              />
              <MetricCard
                title="Refunds"
                value={metrics.refunds.toString()}
                hint={metrics.isFiltered ? 'Filtered refunded orders' : 'Total refunds recorded'}
                variant="refund"
              />
            </div>
          </section>

          {/* Insight & Highlights Banners */}
          <BannerCards metrics={metrics} />

          {/* Transactions Section */}
          <section className="transactions-section" aria-labelledby="transactions-heading">
            <div className="transactions-section__header">
              <h2 id="transactions-heading" className="transactions-title">
                Recent transactions
              </h2>
            </div>

            {/* Filter and Search Bar */}
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              paymentStatus={paymentStatus}
              onPaymentStatusChange={setPaymentStatus}
              channel={channel}
              onChannelChange={setChannel}
              region={region}
              onRegionChange={setRegion}
              onReset={handleResetFilters}
              totalMatches={filteredTransactions.length}
              totalRecords={transactionsData.length}
            />

            {/* Transaction Data Table */}
            <TransactionTable
              transactions={filteredTransactions}
              onResetFilters={handleResetFilters}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
