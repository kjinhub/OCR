import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div style={{ color: "red", fontSize: "1.2rem", marginTop: "10px" }}>
      {message}
    </div>
  );
}
