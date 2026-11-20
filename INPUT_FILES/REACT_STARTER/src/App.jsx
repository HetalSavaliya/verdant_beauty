import React, { useState } from 'react';
import MetricCard from './components/MetricCard.jsx';
import TransactionTable from './components/TransactionTable.jsx';

export default function App() {
  const [search, setSearch] = useState('');
  // TODO: load INPUT_FILES/DATA/transactions_144.json into src/data and calculate metrics.
  // TODO: construct responsive KPI grid and pass transaction objects to the table.
  return (
    <div className="dashboard">
      <header className="dashboard__header"><strong>verdant.</strong><span>Commerce workspace</span></header>
      <main className="dashboard__main">
        <h1>Commerce overview</h1>
        <p>Track your beauty store performance at a glance.</p>
        <section aria-labelledby="metrics-heading">
          <h2 id="metrics-heading">Key performance indicators</h2>
          <MetricCard title="Net sales" value="—" />
        </section>
        <section aria-labelledby="transactions-heading">
          <h2 id="transactions-heading">Recent transactions</h2>
          <label htmlFor="transaction-search">Search transactions</label>
          <input id="transaction-search" value={search} onChange={(event) => setSearch(event.target.value)} />
          <TransactionTable transactions={[]} />
        </section>
      </main>
    </div>
  );
}
