import React from 'react';

/**
 * Reusable MetricCard component for displaying top-level KPIs.
 * 
 * @param {Object} props
 * @param {string} props.title - Title label for the KPI (e.g. "Net sales")
 * @param {string|number} props.value - Main metric display value (e.g. "₹73,436")
 * @param {string} [props.hint] - Supplementary contextual info (e.g. "86 paid orders")
 * @param {string} [props.variant] - Visual theme variant ('sage' | 'refund' | 'neutral')
 * @param {string} [props.subtext] - Secondary status or comparison text
 */
export default function MetricCard({
  title,
  value,
  hint,
  variant = 'sage',
  subtext,
}) {
  const badgeClass = variant === 'refund' 
    ? 'metric-card__badge metric-card__badge--refund' 
    : 'metric-card__badge metric-card__badge--sage';

  return (
    <article className="metric-card" aria-label={`${title}: ${value}`}>
      <div className="metric-card__header">
        <h3 className="metric-card__title">{title}</h3>
        <span className={badgeClass} aria-hidden="true" />
      </div>
      <p className="metric-card__value">{value}</p>
      {hint && <p className="metric-card__hint">{hint}</p>}
      {subtext && <p className="metric-card__subtext">{subtext}</p>}
    </article>
  );
}
