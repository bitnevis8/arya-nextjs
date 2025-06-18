"use client";

import InventoryList from '@/app/components/warehouse/InventoryList/InventoryList';

export default function WarehouseInventoryPage() {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <InventoryList />
      </div>
    </div>
  );
} 