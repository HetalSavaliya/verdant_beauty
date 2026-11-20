import React from 'react';
export default function MetricCard({ title, value }) {
  // TODO: implement reference layout; reusable card receives KPI props.
  return <article className="metric-card"><h3>{title}</h3><p>{value}</p></article>;
}
