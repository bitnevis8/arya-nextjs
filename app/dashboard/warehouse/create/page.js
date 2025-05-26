"use client";

import WarehouseForm from '@/app/components/warehouse/WarehouseForm/WarehouseForm';

export default function CreateWarehousePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">ایجاد انبار جدید</h1>
      <WarehouseForm />
    </div>
  );
} 