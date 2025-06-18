import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditUserPage = () => {
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    businessName: "",
    businessContactInfo: "",
    roleIds: []
  });
  const [roles, setRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    const { options } = e.target;
    const selectedRoleIds = Array.from(options, option => option.value);
    setFormData({ ...formData, roleIds: selectedRoleIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Handle form submission
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">ویرایش کاربر</h1>

        {loadingUser || loadingRoles ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">نام:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">نام کاربری:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ایمیل:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">موبایل:</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">نام کسب و کار (اختیاری):</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="businessContactInfo" className="block text-sm font-medium text-gray-700 mb-1">اطلاعات تماس کسب و کار (اختیاری):</label>
                <input
                  type="text"
                  id="businessContactInfo"
                  name="businessContactInfo"
                  value={formData.businessContactInfo}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="roleIds" className="block text-sm font-medium text-gray-700 mb-1">نقش‌ها:</label>
                <select
                  id="roleIds"
                  name="roleIds"
                  multiple
                  value={formData.roleIds}
                  onChange={handleRoleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-32"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.nameFa}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">برای انتخاب چندگانه، Ctrl (یا Cmd) را نگه دارید و کلیک کنید.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <button
                type="button"
                onClick={() => router.push("/dashboard/user-management/users")}
                className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                بازگشت
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUserPage; 