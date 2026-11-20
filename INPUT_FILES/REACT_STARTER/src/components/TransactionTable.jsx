import React from 'react';
export default function TransactionTable({ transactions }) {
  // TODO: build accessible table, support sorting, filtering and empty states.
  return <div className="transaction-list" role="status">{transactions.length} transaction records available.</div>;
}
