import React from "react";

export default function Modal({ title, onClose, children, actions }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {children}

        {actions && (
          <div className="modal-actions">{actions}</div>
        )}
      </div>
    </div>
  );
}
