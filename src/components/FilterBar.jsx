import React from 'react';

/**
 * FilterBar component
 * Controls for searching and filtering transactions.
 * 
 * @param {Object} props
 * @param {string} props.search - Search input text
 * @param {Function} props.onSearchChange - Search change callback
 * @param {string} props.paymentStatus - Selected payment status
 * @param {Function} props.onPaymentStatusChange - Payment status change callback
 * @param {string} props.channel - Selected channel
 * @param {Function} props.onChannelChange - Channel change callback
 * @param {string} props.region - Selected region
 * @param {Function} props.onRegionChange - Region change callback
 * @param {Function} props.onReset - Reset filters callback
 * @param {number} props.totalMatches - Number of filtered matches
 * @param {number} props.totalRecords - Total records count
 */
export default function FilterBar({
  search,
  onSearchChange,
  paymentStatus,
  onPaymentStatusChange,
  channel,
  onChannelChange,
  region,
  onRegionChange,
  onReset,
  totalMatches,
  totalRecords,
}) {
  const isFiltered = 
    search.trim() !== '' ||
    paymentStatus !== 'All' ||
    channel !== 'All' ||
    region !== 'All';

  return (
    <div className="filter-bar" aria-label="Transaction Filter Controls">
      <div className="filter-bar__search-group">
        <label htmlFor="transaction-search" className="filter-label">
          Search transactions
        </label>
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            id="transaction-search"
            type="search"
            className="filter-input search-input"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search transactions by ID, product, customer or channel"
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-bar__selects-group">
        <div className="filter-field">
          <label htmlFor="filter-status" className="filter-label">Payment Status</label>
          <select
            id="filter-status"
            className="filter-select"
            value={paymentStatus}
            onChange={(e) => onPaymentStatusChange(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-channel" className="filter-label">Channel</label>
          <select
            id="filter-channel"
            className="filter-select"
            value={channel}
            onChange={(e) => onChannelChange(e.target.value)}
          >
            <option value="All">All Channels</option>
            <option value="Website">Website</option>
            <option value="Marketplace">Marketplace</option>
            <option value="Mobile App">Mobile App</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-region" className="filter-label">Region</label>
          <select
            id="filter-region"
            className="filter-select"
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            <option value="All">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="West">West</option>
            <option value="East">East</option>
          </select>
        </div>

        {isFiltered && (
          <button
            type="button"
            className="btn btn--reset"
            onClick={onReset}
            title="Clear all active filters"
            aria-label="Clear all active filters"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="filter-bar__summary" aria-live="polite">
        <span className="summary-badge">
          Showing <strong>{totalMatches}</strong> of {totalRecords} records
        </span>
      </div>
    </div>
  );
}
