// src/components/ResultBadge.js
import React from 'react';

export default function ResultBadge({ result }) {
  if (!result) return null;

  // Soft background colors
  const bgColor = result.toLowerCase() === 'mild'
    ? '#67AE6E' // light green
    : '#E55050'; // light red

  return (
    <div
      className="result-badge"
      style={{
        backgroundColor: bgColor,
        color: '#fff'        // white text
      }}
    >
      Prediction: <strong>{result}</strong>
    </div>
  );
}
