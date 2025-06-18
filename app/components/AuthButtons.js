"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function AuthButtons() {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (user) {
    return (
      <Link href="/dashboard" className="text-white hover:text-gray-300 font-bold py-2 px-4 rounded text-sm sm:text-base text-center transition-colors duration-300">
        {user.firstName} {user.lastName}
      </Link>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
      <Link href="/auth/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base text-center">
        ثبت نام
      </Link>
      <Link href="/auth/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base text-center">
        ورود
      </Link>
    </div>
  );
} 