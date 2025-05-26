"use client";

import InventoryForm from '@/app/components/warehouse/InventoryForm/InventoryForm';

export default function CreateInventoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">افزودن موجودی جدید</h1>
      <InventoryForm />
    </div>
  );
} 