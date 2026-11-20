import React from 'react';

/**
 * BannerCards component
 * Displays the "Thoughtful commerce, clearly tracked" brand banner
 * and the "Quick insights" card per the reference design.
 */
export default function BannerCards({ metrics }) {
  return (
    <section className="banner-cards-grid" aria-label="Brand Highlights and Quick Insights">
      {/* Botanical Brand Highlight Banner */}
      <div className="banner-card banner-card--botanical">
        <div className="banner-card__content">
          <h2 className="banner-card__title">Thoughtful commerce, clearly tracked.</h2>
          <p className="banner-card__subtitle">Curated wellness products • mindful growth</p>
          <div className="banner-card__tags">
            <span className="organic-tag">🌱 100% Certified Organic</span>
            <span className="organic-tag">🐰 Cruelty-Free</span>
            <span className="organic-tag">♻️ Eco-Packaged</span>
          </div>
        </div>
        <div className="banner-card__graphic" aria-hidden="true">
          <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="botanical-leaf-svg">
            <path
              d="M10 130 C40 40, 110 30, 150 15 C130 90, 70 120, 10 130 Z"
              fill="#8FB39A"
              opacity="0.9"
            />
            <path
              d="M10 130 Q70 70 150 15"
              stroke="#244E3B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M50 90 Q75 60 90 75"
              stroke="#244E3B"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M80 65 Q105 35 120 50"
              stroke="#244E3B"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Quick Insights Banner */}
      <div className="banner-card banner-card--insights">
        <div className="banner-card__content">
          <h2 className="banner-card__title">Quick insights</h2>
          <p className="banner-card__desc">Monitor transactions, payments and fulfillment.</p>
          <p className="banner-card__desc">Use filters to narrow your view.</p>
          
          <div className="insights-metrics-row">
            <div className="insight-stat">
              <span className="insight-stat__label">Fulfillment Rate</span>
              <span className="insight-stat__value">94.8%</span>
            </div>
            <div className="insight-stat__divider" />
            <div className="insight-stat">
              <span className="insight-stat__label">Top Channel</span>
              <span className="insight-stat__value">Website (42%)</span>
            </div>
            <div className="insight-stat__divider" />
            <div className="insight-stat">
              <span className="insight-stat__label">Active Region</span>
              <span className="insight-stat__value">West & South</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
