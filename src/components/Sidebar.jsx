import React from 'react';

/**
 * Sidebar navigation component matching Verdant Beauty branding
 * Supports desktop sticky layout and mobile accessible drawer.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Mobile drawer open state
 * @param {Function} props.onClose - Mobile drawer close handler
 * @param {string} props.activeTab - Currently active navigation tab
 * @param {Function} props.onSelectTab - Tab selection handler
 */
export default function Sidebar({
  isOpen,
  onClose,
  activeTab = 'Overview',
  onSelectTab,
}) {
  const navItems = [
    { id: 'Overview', label: 'Overview', icon: '📊' },
    { id: 'Transactions', label: 'Transactions', icon: '💳' },
    { id: 'Products', label: 'Products', icon: '🌿' },
    { id: 'Customers', label: 'Customers', icon: '👥' },
    { id: 'Settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true" 
        />
      )}

      <aside 
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        aria-label="Primary Navigation"
      >
        <div className="sidebar__brand">
          <div className="sidebar__brand-row">
            <span className="brand-logo-text">verdant.</span>
            {isOpen && (
              <button 
                type="button" 
                className="sidebar__close-btn"
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            )}
          </div>
          <span className="brand-subtitle">ADMIN WORKSPACE</span>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__menu" role="menubar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} role="none" className="sidebar__menu-item">
                  <button
                    type="button"
                    role="menuitem"
                    className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    onClick={() => {
                      if (onSelectTab) onSelectTab(item.id);
                      if (isOpen && onClose) onClose();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="sidebar__link-icon" aria-hidden="true">{item.icon}</span>
                    <span className="sidebar__link-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <div className="store-pill">
            <span className="store-status-dot" aria-hidden="true" />
            <span className="store-name">Global Organic Store</span>
          </div>
          <p className="sidebar__version">Verdant Beauty v1.0.0</p>
        </div>
      </aside>
    </>
  );
}
