"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/app/config/api';
import Button from '@/app/components/ui/Button/Button';
import Table from '@/app/components/ui/Table/Table';

const InventoryList = () => {
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.inventory.getAll);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در دریافت موجودی‌ها');
      }
      setInventory(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این موجودی اطمینان دارید؟')) return;
    try {
      const response = await fetch(API_ENDPOINTS.inventory.delete(id), { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در حذف موجودی');
      }
      setInventory(inventory.filter(item => item.id !== id));
    } catch (err) {
      alert(err.message || 'خطا در حذف موجودی');
    }
  };

  const columns = [
    { header: 'نام انبار', accessor: 'warehouse.name' },
    { header: 'نام کالا', accessor: 'item.name' },
    { header: 'کد کالا', accessor: 'item.code' },
    { header: 'موجودی', accessor: 'quantity' },
    { header: 'حداقل موجودی', accessor: 'minQuantity' },
    { header: 'حداکثر موجودی', accessor: 'maxQuantity' },
    { header: 'موقعیت', accessor: 'location' },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/dashboard/warehouse/inventory/edit/${row.id}`)}
            variant="primary"
            size="sm"
          >
            ویرایش
          </Button>
          <Button
            onClick={() => handleDelete(row.id)}
            variant="danger"
            size="sm"
          >
            حذف
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="text-center py-10">در حال بارگیری...</div>;
  if (error) return <div className="text-center py-10 text-red-600">خطا: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">لیست موجودی‌ها</h1>
        <Button
          onClick={() => router.push('/dashboard/warehouse/inventory/create')}
          variant="primary"
        >
          افزودن موجودی جدید
        </Button>
      </div>
      <Table columns={columns} data={inventory} emptyMessage="هیچ موجودی یافت نشد" />
    </div>
  );
};

export default InventoryList; 