"use client";

import WarehouseItemForm from '@/app/components/warehouse/ItemForm/WarehouseItemForm';

export default function CreateWarehouseItemPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">افزودن کالای جدید</h1>
      <WarehouseItemForm />
    </div>
  );
} 