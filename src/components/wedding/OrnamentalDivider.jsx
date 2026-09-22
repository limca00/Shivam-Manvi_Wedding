import React, { useEffect, useRef } from 'react';

/**
 * OrnamentalDivider — reusable gold divider: ——— ◇ ———
 * Used between sections on the cream background pages.
 */
export default function OrnamentalDivider({ className = '' }) {
  return (
    <div className={`ornament-divider ${className}`} aria-hidden="true">
      <span style={{ color: '#b8860b', fontSize: '1rem' }}>◇</span>
    </div>
  );
}
