import React from 'react';
import { Package, CheckCircle2, AlertTriangle, XCircle, BellRing } from 'lucide-react';
import MetricCard from '../common/MetricCard';
import { useInventory } from '../../context/InventoryContext';

export default function StatCardsGrid() {
  const { metrics } = useInventory();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {/* 1. Total Items */}
      <MetricCard
        title="Total Items"
        value={metrics.totalItems}
        subtitle="Across all warehouses"
        icon={Package}
        colorVariant="default"
      />

      {/* 2. In Stock */}
      <MetricCard
        title="In Stock"
        value={metrics.inStock}
        subtitle={`${Math.round((metrics.inStock / (metrics.totalItems || 1)) * 100)}% of total catalog`}
        icon={CheckCircle2}
        colorVariant="success"
      />

      {/* 3. Low Stock */}
      <MetricCard
        title="Low Stock"
        value={metrics.lowStock}
        subtitle="At or below reorder level"
        icon={AlertTriangle}
        colorVariant="warning"
        alert={metrics.lowStock > 0}
      />

      {/* 4. Out of Stock */}
      <MetricCard
        title="Out of Stock"
        value={metrics.outOfStock}
        subtitle="Zero quantity available"
        icon={XCircle}
        colorVariant="danger"
        alert={metrics.outOfStock > 0}
      />

      {/* 5. Items Requiring Attention */}
      <MetricCard
        title="Needs Attention"
        value={metrics.requiringAttentionCount}
        subtitle="Critical action required"
        icon={BellRing}
        colorVariant={metrics.requiringAttentionCount > 0 ? "danger" : "default"}
        alert={metrics.requiringAttentionCount > 0}
      />
    </div>
  );
}
