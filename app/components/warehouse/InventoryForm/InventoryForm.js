"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/app/config/api';
import Button from '@/app/components/ui/Button/Button';
import Input from '@/app/components/ui/Input/Input';

const InventoryForm = ({ inventoryId = null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    warehouseId: '',
    itemId: '',
    quantity: 0,
    minQuantity: 0,
    maxQuantity: 0,
    location: '',
    notes: ''
  });
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWarehouses();
    fetchItems();
    if (inventoryId) {
      fetchInventory();
    }
  }, [inventoryId]);

  const fetchWarehouses = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.warehouse.getAll);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در دریافت لیست انبارها');
      }
      setWarehouses(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.items.getAll);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در دریافت لیست کالاها');
      }
      setItems(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.inventory.getById(inventoryId));
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در دریافت اطلاعات موجودی');
      }
      // تبدیل نام‌های فیلدها به فرمت مورد نیاز فرم
      const transformedData = {
        warehouseId: data.data.warehouse_id,
        itemId: data.data.item_id,
        quantity: data.data.quantity,
        minQuantity: data.data.min_quantity,
        maxQuantity: data.data.max_quantity,
        location: data.data.location,
        notes: data.data.notes
      };
      setFormData(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // اعتبارسنجی داده‌ها
    if (!formData.warehouseId || !formData.itemId) {
      setError('لطفاً انبار و کالا را انتخاب کنید');
      setLoading(false);
      return;
    }

    if (formData.quantity < 0 || formData.minQuantity < 0 || formData.maxQuantity < 0) {
      setError('مقادیر عددی نمی‌توانند منفی باشند');
      setLoading(false);
      return;
    }

    if (formData.minQuantity > formData.maxQuantity) {
      setError('حداقل موجودی نمی‌تواند از حداکثر موجودی بیشتر باشد');
      setLoading(false);
      return;
    }

    try {
      // تبدیل داده‌ها به فرمت مورد نیاز API
      const apiData = {
        warehouse_id: parseInt(formData.warehouseId),
        item_id: parseInt(formData.itemId),
        quantity: parseInt(formData.quantity),
        min_quantity: parseInt(formData.minQuantity),
        max_quantity: parseInt(formData.maxQuantity),
        location: formData.location,
        notes: formData.notes
      };

      const url = inventoryId ? API_ENDPOINTS.inventory.update(inventoryId) : API_ENDPOINTS.inventory.create;
      const method = inventoryId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در ذخیره اطلاعات موجودی');
      }
      router.push('/dashboard/warehouse/inventory');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  if (loading && inventoryId) return <div className="text-center py-10">در حال بارگیری...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="warehouseId" className="block text-sm font-medium text-gray-700 mb-1">انبار</label>
          <select
            id="warehouseId"
            name="warehouseId"
            value={formData.warehouseId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب انبار</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="itemId" className="block text-sm font-medium text-gray-700 mb-1">کالا</label>
          <select
            id="itemId"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کالا</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.code})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">موجودی</label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700 mb-1">حداقل موجودی</label>
          <Input
            id="minQuantity"
            name="minQuantity"
            type="number"
            value={formData.minQuantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="maxQuantity" className="block text-sm font-medium text-gray-700 mb-1">حداکثر موجودی</label>
          <Input
            id="maxQuantity"
            name="maxQuantity"
            type="number"
            value={formData.maxQuantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">موقعیت در انبار</label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="موقعیت کالا در انبار را وارد کنید"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="توضیحات را وارد کنید"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'در حال ذخیره...' : 'ذخیره'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            انصراف
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InventoryForm; 