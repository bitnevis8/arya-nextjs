import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer/Footer";

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
        <div className="min-h-screen w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
