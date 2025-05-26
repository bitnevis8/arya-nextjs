"use client";

import InventoryForm from '@/app/components/warehouse/InventoryForm/InventoryForm';

export default function EditInventoryPage({ params }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">ویرایش موجودی</h1>
      <InventoryForm inventoryId={params.id} />
    </div>
  );
} 