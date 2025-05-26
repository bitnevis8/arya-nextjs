"use client";

import { useEffect, useState } from "react";

export default function RolesList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/role/getAll");
        const data = await response.json();
        
        if (data.success) {
          setRoles(data.data || []);
        } else {
          setError(data.message || "خطا در دریافت اطلاعات نقش‌ها");
        }
      } catch (error) {
        setError("خطا در ارتباط با سرور");
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 text-center">
      {error}
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">لیست نقش‌ها</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          افزودن نقش جدید
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-right">نام نقش</th>
              <th className="py-3 px-4 border-b text-right">نام انگلیسی</th>
              <th className="py-3 px-4 border-b text-right">نام فارسی</th>
              <th className="py-3 px-4 border-b text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  هیچ نقشی یافت نشد
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-right">{role.name}</td>
                  <td className="py-3 px-4 border-b text-right">{role.nameEn}</td>
                  <td className="py-3 px-4 border-b text-right">{role.nameFa}</td>
                  <td className="py-3 px-4 border-b text-right">
                    <button className="text-blue-500 hover:text-blue-700 ml-2">ویرایش</button>
                    <button className="text-red-500 hover:text-red-700">حذف</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 