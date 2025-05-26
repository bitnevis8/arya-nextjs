// بررسی محیط اجرا
const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Current environment:', process.env.NODE_ENV); // برای دیباگ

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (isDevelopment ? 'http://localhost:3000' : 'https://api.parandx.com');

export const API_ENDPOINTS = {
  unitLocations: {
    base: `${API_BASE_URL}/aryafoulad/unit-locations`,
    getAll: `${API_BASE_URL}/aryafoulad/unit-locations`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/unit-locations/${id}`,
    create: `${API_BASE_URL}/aryafoulad/unit-locations/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/unit-locations/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/unit-locations/delete/${id}`,
    default: `${API_BASE_URL}/aryafoulad/unit-locations/default`,
  },
  users: {
    base: `${API_BASE_URL}/user/user`,
    getAll: `${API_BASE_URL}/user/user/getAll`,
    getById: (id) => `${API_BASE_URL}/user/user/getOne/${id}`,
    create: `${API_BASE_URL}/user/user/create`,
    update: (id) => `${API_BASE_URL}/user/user/update/${id}`,
    delete: (id) => `${API_BASE_URL}/user/user/delete/${id}`,
  },
  roles: {
    base: `${API_BASE_URL}/user/role`,
    getAll: `${API_BASE_URL}/user/role/getAll`,
    getById: (id) => `${API_BASE_URL}/user/role/getOne/${id}`,
    create: `${API_BASE_URL}/user/role/create`,
    update: (id) => `${API_BASE_URL}/user/role/update/${id}`,
    delete: (id) => `${API_BASE_URL}/user/role/delete/${id}`,
  },
  missionOrders: {
    base: `${API_BASE_URL}/aryafoulad/mission-orders`,
    getAll: `${API_BASE_URL}/aryafoulad/mission-orders/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/mission-orders/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/mission-orders/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/mission-orders/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/mission-orders/delete/${id}`,
  },
  rateSettings: {
    base: `${API_BASE_URL}/aryafoulad/rate-settings`,
    getAll: `${API_BASE_URL}/aryafoulad/rate-settings/getAll`,
    getActive: `${API_BASE_URL}/aryafoulad/rate-settings/getActive`,
    create: `${API_BASE_URL}/aryafoulad/rate-settings/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/rate-settings/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/rate-settings/delete/${id}`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/rate-settings/${id}`,
  },
  // انبارداری
  warehouse: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/delete/${id}`,
    search: (query) => `${API_BASE_URL}/aryafoulad/warehouse-module/warehouse/search?query=${query}`,
  },
  items: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/item`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/item/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/item/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item/delete/${id}`,
  },
  inventory: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/inventory`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/inventory/delete/${id}`,
  },
  itemAssignments: {
    base: `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment`,
    getAll: `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/getAll`,
    getById: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/getOne/${id}`,
    create: `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/create`,
    update: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/update/${id}`,
    delete: (id) => `${API_BASE_URL}/aryafoulad/warehouse-module/item-assignment/delete/${id}`,
  },
}; 