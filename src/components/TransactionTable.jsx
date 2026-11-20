import React, { useState, useMemo } from 'react';

/**
 * Format currency in Indian Rupees format (e.g., ₹1,598)
 */
function formatCurrency(amount) {
  if (typeof amount !== 'number') return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Format date string (YYYY-MM-DD -> DD MMM YYYY)
 */
function formatDate(dateString) {
  if (!dateString) return '—';
  try {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, parseInt(month, 10) - 1, day);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * TransactionTable component
 * Renders transactions with sorting, pagination, empty states,
 * and a CSS-driven mobile-responsive card view.
 * 
 * @param {Object} props
 * @param {Array<Object>} props.transactions - Array of transaction records
 * @param {Function} [props.onResetFilters] - Callback to clear active filters
 * @param {boolean} [props.isLoading] - Loading indicator state
 */
export default function TransactionTable({
  transactions = [],
  onResetFilters,
  isLoading = false,
}) {
  const [sortField, setSortField] = useState('order_date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Sorting
  const sortedTransactions = useMemo(() => {
    const list = [...transactions];
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'net_amount_inr' || sortField === 'gross_amount_inr') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA || '').toLowerCase();
      const strB = String(valB || '').toLowerCase();
      if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [transactions, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getSortIndicator = (field) => {
    if (sortField !== field) return ' ⇅';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'status-badge status-badge--paid';
      case 'Refunded':
        return 'status-badge status-badge--refunded';
      case 'Pending':
        return 'status-badge status-badge--pending';
      default:
        return 'status-badge';
    }
  };

  const getFulfillmentClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'fulfillment-pill fulfillment-pill--delivered';
      case 'Shipped':
        return 'fulfillment-pill fulfillment-pill--shipped';
      case 'Processing':
        return 'fulfillment-pill fulfillment-pill--processing';
      case 'Cancelled':
        return 'fulfillment-pill fulfillment-pill--cancelled';
      default:
        return 'fulfillment-pill';
    }
  };

  if (isLoading) {
    return (
      <div className="table-state-box table-state-box--loading" role="status">
        <div className="spinner" aria-hidden="true" />
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transaction-table-wrapper">
      {sortedTransactions.length === 0 ? (
        <div className="table-state-box table-state-box--empty" role="status">
          <div className="empty-icon" aria-hidden="true">🍃</div>
          <h4 className="empty-title">No transactions match your search.</h4>
          <p className="empty-hint">Try adjusting your keywords, payment status, or channel filters.</p>
          {onResetFilters && (
            <button
              type="button"
              className="btn btn--outline"
              onClick={onResetFilters}
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop & Tablet Table */}
          <div className="table-container">
            <table className="transaction-table" aria-label="Recent Transactions Table">
              <thead>
                <tr>
                  <th scope="col">
                    <button
                      type="button"
                      className="table-sort-btn"
                      onClick={() => handleSort('transaction_id')}
                      aria-label="Sort by Order ID"
                    >
                      Order{getSortIndicator('transaction_id')}
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      type="button"
                      className="table-sort-btn"
                      onClick={() => handleSort('order_date')}
                      aria-label="Sort by Date"
                    >
                      Date{getSortIndicator('order_date')}
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      type="button"
                      className="table-sort-btn"
                      onClick={() => handleSort('product_name')}
                      aria-label="Sort by Product"
                    >
                      Product{getSortIndicator('product_name')}
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      type="button"
                      className="table-sort-btn"
                      onClick={() => handleSort('channel')}
                      aria-label="Sort by Channel"
                    >
                      Channel{getSortIndicator('channel')}
                    </button>
                  </th>
                  <th scope="col" className="table-col-right">
                    <button
                      type="button"
                      className="table-sort-btn"
                      onClick={() => handleSort('net_amount_inr')}
                      aria-label="Sort by Amount"
                    >
                      Amount{getSortIndicator('net_amount_inr')}
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      type="button"
                      className="table-sort-btn"
                      onClick={() => handleSort('payment_status')}
                      aria-label="Sort by Status"
                    >
                      Status{getSortIndicator('payment_status')}
                    </button>
                  </th>
                  <th scope="col" className="col-fulfillment">Fulfillment</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((tx) => (
                  <tr key={tx.transaction_id} className="transaction-row">
                    <td className="cell-id">
                      <span className="id-code">{tx.transaction_id}</span>
                      <span className="customer-sub">{tx.customer_ref}</span>
                    </td>
                    <td className="cell-date">{formatDate(tx.order_date)}</td>
                    <td className="cell-product">
                      <div className="product-title">{tx.product_name}</div>
                      <div className="product-meta">
                        <span className="category-tag">{tx.category}</span>
                        {tx.quantity > 1 && <span className="qty-tag">Qty: {tx.quantity}</span>}
                      </div>
                    </td>
                    <td className="cell-channel">
                      <span className="channel-badge">{tx.channel}</span>
                      <span className="region-sub">{tx.region}</span>
                    </td>
                    <td className="cell-amount table-col-right">
                      {formatCurrency(tx.net_amount_inr)}
                    </td>
                    <td className="cell-status">
                      <span className={getPaymentStatusClass(tx.payment_status)}>
                        {tx.payment_status}
                      </span>
                    </td>
                    <td className="cell-fulfillment col-fulfillment">
                      <span className={getFulfillmentClass(tx.fulfillment_status)}>
                        {tx.fulfillment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View (Rendered via CSS display rules, <= 600px) */}
          <div className="mobile-transaction-list" aria-label="Mobile Transactions List">
            {paginatedTransactions.map((tx) => (
              <article key={`mob-${tx.transaction_id}`} className="mobile-transaction-card">
                <div className="mobile-card-row mobile-card-row--top">
                  <span className="mobile-card-id">{tx.transaction_id}</span>
                  <span className="mobile-card-amount">{formatCurrency(tx.net_amount_inr)}</span>
                </div>
                <div className="mobile-card-row mobile-card-row--bottom">
                  <span className="mobile-card-product" title={tx.product_name}>
                    {tx.product_name}
                  </span>
                  <span className={getPaymentStatusClass(tx.payment_status)}>
                    {tx.payment_status}
                  </span>
                </div>
                <div className="mobile-card-row mobile-card-row--sub">
                  <span className="mobile-card-meta">{formatDate(tx.order_date)} • {tx.channel}</span>
                  <span className={getFulfillmentClass(tx.fulfillment_status)}>
                    {tx.fulfillment_status}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <nav className="table-pagination" aria-label="Transaction pagination">
            <div className="pagination-info">
              Showing <strong>{startIndex + 1}</strong>–<strong>{Math.min(startIndex + pageSize, sortedTransactions.length)}</strong> of <strong>{sortedTransactions.length}</strong> records
            </div>
            <div className="pagination-actions">
              <button
                type="button"
                className="btn btn--pagination"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={activePage <= 1}
                aria-label="Previous page"
              >
                ← Prev
              </button>
              <span className="pagination-current">
                Page {activePage} of {totalPages}
              </span>
              <button
                type="button"
                className="btn btn--pagination"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={activePage >= totalPages}
                aria-label="Next page"
              >
                Next →
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
