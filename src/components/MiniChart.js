import React from "react";

export default function MiniChart({ data }) {
  const max = Math.max(...data);

  return (
    <div className="chart-placeholder">
      {data.map((v, i) => (
        <div
          key={i}
          className="chart-bar"
          style={{ height: `${(v / max) * 100}%` }}
          title={`Value: ${v}`}
        />
      ))}
    </div>
  );
}
