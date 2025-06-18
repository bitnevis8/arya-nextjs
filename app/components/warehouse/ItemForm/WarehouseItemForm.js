"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/app/config/api';
import Button from '@/app/components/ui/Button/Button';
import Input from '@/app/components/ui/Input/Input';

const WarehouseItemForm = ({ itemId = null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    unit: '',
    description: '',
    equipment_code: '',
    model: '',
    serial_number: '',
    ownership: '',
    location: '',
    calibration_certificate: '',
    calibration_period_years: '',
    calibration_place: '',
    has_identity_document: false,
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.items.getById(itemId));
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در دریافت اطلاعات کالا');
      }
      setFormData(data.data);
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
    try {
      const url = itemId ? API_ENDPOINTS.items.update(itemId) : API_ENDPOINTS.items.create;
      const method = itemId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'خطا در ذخیره اطلاعات کالا');
      }
      router.push('/dashboard/warehouse/items');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading && itemId) return <div className="text-center py-10">در حال بارگیری...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-full sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام کالا</label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="نام کالا را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">کد کالا</label>
            <Input id="code" name="code" value={formData.code} onChange={handleChange} required placeholder="کد کالا را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="equipment_code" className="block text-sm font-medium text-gray-700 mb-1">کد تجهیزات</label>
            <Input id="equipment_code" name="equipment_code" value={formData.equipment_code} onChange={handleChange} placeholder="کد تجهیزات را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">واحد</label>
            <Input id="unit" name="unit" value={formData.unit} onChange={handleChange} required placeholder="واحد کالا را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">مدل</label>
            <Input id="model" name="model" value={formData.model} onChange={handleChange} placeholder="مدل را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700 mb-1">شماره سریال</label>
            <Input id="serial_number" name="serial_number" value={formData.serial_number} onChange={handleChange} placeholder="شماره سریال را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="ownership" className="block text-sm font-medium text-gray-700 mb-1">مالکیت</label>
            <select id="ownership" name="ownership" value={formData.ownership} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="">انتخاب کنید</option>
              <option value="ملکی">ملکی</option>
              <option value="استیجاری">استیجاری</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">موقعیت</label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="موقعیت را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی</label>
            <Input id="category" name="category" value={formData.category} onChange={handleChange} placeholder="دسته‌بندی را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="calibration_certificate" className="block text-sm font-medium text-gray-700 mb-1">گواهی کالیبراسیون</label>
            <Input id="calibration_certificate" name="calibration_certificate" value={formData.calibration_certificate} onChange={handleChange} placeholder="شماره گواهی کالیبراسیون را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="calibration_period_years" className="block text-sm font-medium text-gray-700 mb-1">دوره کالیبراسیون (سال)</label>
            <Input id="calibration_period_years" name="calibration_period_years" type="number" value={formData.calibration_period_years} onChange={handleChange} placeholder="دوره کالیبراسیون را وارد کنید" className="w-full" />
          </div>
          <div>
            <label htmlFor="calibration_place" className="block text-sm font-medium text-gray-700 mb-1">محل کالیبراسیون</label>
            <Input id="calibration_place" name="calibration_place" value={formData.calibration_place} onChange={handleChange} placeholder="محل کالیبراسیون را وارد کنید" className="w-full" />
          </div>
          <div className="flex items-center col-span-1 md:col-span-2">
            <input
              type="checkbox"
              id="has_identity_document"
              name="has_identity_document"
              checked={formData.has_identity_document}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="has_identity_document" className="mr-2 block text-sm text-gray-700">دارای مدارک شناسایی</label>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="توضیحات کالا را وارد کنید" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
            {loading ? 'در حال ذخیره...' : 'ذخیره'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()} className="w-full sm:w-auto">
            انصراف
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WarehouseItemForm; 