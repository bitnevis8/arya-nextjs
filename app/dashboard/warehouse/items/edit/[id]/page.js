"use client";

import WarehouseItemForm from '@/app/components/warehouse/ItemForm/WarehouseItemForm';

export default function EditWarehouseItemPage({ params }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">ویرایش کالا</h1>
      <WarehouseItemForm itemId={params.id} />
    </div>
  );
} 