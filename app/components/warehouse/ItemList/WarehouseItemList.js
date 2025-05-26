"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/app/config/api';
import Button from '@/app/components/ui/Button/Button';
import Table from '@/app/components/ui/Table/Table';

const WarehouseItemList = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.items.getAll);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در دریافت کالاها');
      }
      setItems(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این کالا اطمینان دارید؟')) return;
    try {
      const response = await fetch(API_ENDPOINTS.items.delete(id), { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در حذف کالا');
      }
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      alert(err.message || 'خطا در حذف کالا');
    }
  };

  const columns = [
    { header: 'نام کالا', accessor: 'name' },
    { header: 'کد کالا', accessor: 'code' },
    { header: 'واحد', accessor: 'unit' },
    { header: 'توضیحات', accessor: 'description' },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/dashboard/warehouse/items/edit/${row.id}`)}
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
        <h1 className="text-2xl font-bold">لیست کالاها</h1>
        <Button
          onClick={() => router.push('/dashboard/warehouse/items/create')}
          variant="primary"
        >
          افزودن کالای جدید
        </Button>
      </div>
      <Table columns={columns} data={items} emptyMessage="هیچ کالایی یافت نشد" />
    </div>
  );
};

export default WarehouseItemList; 