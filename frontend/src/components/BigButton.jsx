import React from "react";

export default function BigButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "1.5rem",
        padding: "20px 40px",
        margin: "10px",
        borderRadius: "12px",
      }}>
      {label}
    </button>
  );
}
