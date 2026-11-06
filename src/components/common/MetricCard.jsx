import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, colorVariant = 'default', alert = false }) {
  const colorMap = {
    default: {
      iconBg: 'bg-indigo-50 text-indigo-600',
      border: 'border-slate-200'
    },
    success: {
      iconBg: 'bg-emerald-50 text-emerald-600',
      border: 'border-slate-200'
    },
    warning: {
      iconBg: 'bg-amber-50 text-amber-600',
      border: alert ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
    },
    danger: {
      iconBg: 'bg-rose-50 text-rose-600',
      border: alert ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
    }
  };

  const currentTheme = colorMap[colorVariant] || colorMap.default;

  return (
    <div className={`bg-white rounded-xl border p-5 shadow-xs transition-all hover:shadow-md ${currentTheme.border}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${currentTheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900">{value}</span>
      </div>
      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
