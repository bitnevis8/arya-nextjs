"use client";

import WarehouseItemList from '@/app/components/warehouse/ItemList/WarehouseItemList';

export default function WarehouseItemsPage() {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <WarehouseItemList />
      </div>
    </div>
  );
} 