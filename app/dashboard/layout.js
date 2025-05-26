"use client";

import Sidebar from '../components/ui/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
              {children}
      </main>
    </div>
  );
} 