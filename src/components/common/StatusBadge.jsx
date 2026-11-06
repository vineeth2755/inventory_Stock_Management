import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function StatusBadge({ status, size = 'md' }) {
  let config = {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
    text: 'In Stock'
  };

  if (status === 'Low Stock') {
    config = {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      text: 'Low Stock'
    };
  } else if (status === 'Out of Stock') {
    config = {
      // Pale washed-out red (#FEE2E2) with high-contrast red text and border
      bg: 'bg-[#FEE2E2] text-red-700 border-red-300',
      icon: XCircle,
      text: 'Out of Stock'
    };
  }

  const IconComponent = config.icon;
  const isSmall = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${config.bg} ${
        isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <IconComponent className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.text}</span>
    </span>
  );
}
