"use client";

import WarehouseItemForm from '@/app/components/warehouse/ItemForm/WarehouseItemForm';

export default function EditWarehouseItemPage({ params }) {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">ویرایش کالا</h1>
        <WarehouseItemForm itemId={params.id} />
      </div>
    </div>
  );
} 