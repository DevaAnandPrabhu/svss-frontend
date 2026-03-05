import React from "react";

export default function StatusBadge({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`badge badge-${status}`}>{label}</span>;
}
