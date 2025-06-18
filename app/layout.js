import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer/Footer";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
import AuthButtons from "./components/AuthButtons";

const vazirmatn = Vazirmatn({ 
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata = {
  title: "سیستم حکم ماموریت",
  description: "سیستم مدیریت حکم ماموریت اریا فولاد",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <nav className="bg-gray-800 py-3 sm:py-4 px-4 text-white">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
              <Link href="/" className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
                آریا فولاد
              </Link>
              <AuthButtons />
            </div>
          </nav>
          <div className="min-h-screen w-full">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
