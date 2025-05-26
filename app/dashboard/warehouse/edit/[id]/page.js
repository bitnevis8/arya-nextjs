import { use } from 'react';
import WarehouseForm from '@/app/components/warehouse/WarehouseForm/WarehouseForm';

export default function EditWarehousePage({ params }) {
  const { id } = use(params);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">ویرایش انبار</h1>
      <WarehouseForm warehouseId={id} />
    </div>
  );
} 