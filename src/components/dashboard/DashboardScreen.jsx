import React from 'react';
import StatCardsGrid from './StatCardsGrid';
import CategoryChart from './CategoryChart';
import UrgentItemsWidget from './UrgentItemsWidget';

export default function DashboardScreen() {
  return (
    <div className="space-y-6">
      {/* 1. Summary Indicators (5 KPI Metrics) */}
      <StatCardsGrid />

      {/* 2. Visual Analytics & Urgent Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart />
        <UrgentItemsWidget />
      </div>
    </div>
  );
}

