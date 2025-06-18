"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/app/config/api';
import Button from '@/app/components/ui/Button/Button';
import Table from '@/app/components/ui/Table/Table';

const WarehouseList = () => {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.warehouse.getAll);
      
      if (!response.ok) {
        throw new Error(`Error fetching warehouses: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setWarehouses(data.data || []);
        setError(null);
      } else {
        throw new Error(data.message || 'خطا در دریافت اطلاعات');
      }
    } catch (err) {
      console.error("Error fetching warehouses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این انبار اطمینان دارید؟')) return;

    try {
      const response = await fetch(API_ENDPOINTS.warehouse.delete(id), {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'خطا در حذف انبار');
      }

      // حذف انبار از لیست
      setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
    } catch (err) {
      console.error('Error deleting warehouse:', err);
      alert(err.message || 'خطا در حذف انبار');
    }
  };

  const columns = [
    { header: 'نام انبار', accessor: 'name' },
    { header: 'موقعیت', accessor: 'location' },
    { header: 'توضیحات', accessor: 'description' },
    {
      header: 'عملیات',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/dashboard/warehouse/edit/${row.id}`)}
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

  if (loading) {
    return <div className="text-center py-10">در حال بارگیری...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">خطا: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">مدیریت انبارها</h1>
        <Button
          onClick={() => router.push('/dashboard/warehouse/create')}
          variant="primary"
          className="w-full sm:w-auto py-2 px-4 text-sm"
        >
          ایجاد انبار جدید
        </Button>
      </div>

      <Table
        columns={columns}
        data={warehouses}
        emptyMessage="هیچ انباری یافت نشد"
      />
    </div>
  );
};

export default WarehouseList; 